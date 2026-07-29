import "server-only";
import matter from "gray-matter";
import type { Locale } from "@/lib/i18n";
import type { PostFrontmatter } from "@/lib/blog-config";

// Admin panelin içerik katmanı: GitHub Contents API. Public site içeriği build anında
// dosyadan okur (lib/blog.ts); admin ise repo'nun ANLIK halini görsün diye doğrudan
// GitHub'a sorar. Böylece yeni commit sonrası panel deploy beklemeden güncel olur ve
// serverless'ta çalışma anında dosya sistemine bağımlılık kalmaz.
//
// Token yalnız sunucuda kullanılır; hiçbir değeri istemciye sızmaz.

const API = "https://api.github.com";

type RepoConfig = { owner: string; repo: string; branch: string; token: string };

function config(): RepoConfig {
  const token = process.env.GITHUB_TOKEN;
  const slug = process.env.GITHUB_REPO;
  if (!token) throw new Error("GITHUB_TOKEN tanımlı değil");
  if (!slug || !slug.includes("/")) throw new Error("GITHUB_REPO 'sahip/repo' biçiminde olmalı");
  const [owner, repo] = slug.split("/");
  return { owner, repo, branch: process.env.GITHUB_BRANCH || "main", token };
}

async function gh(path: string, init?: RequestInit) {
  const { token } = config();
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.headers ?? {}),
    },
    // Panel her zaman güncel repo durumunu göstermeli.
    cache: "no-store",
  });
  return res;
}

function contentPath(locale: Locale, slug: string): string {
  return `content/blog/${locale}/${slug}.md`;
}

export type AdminPost = PostFrontmatter & {
  slug: string;
  locale: Locale;
  body: string;
  /** GitHub blob SHA — güncellemede zorunlu, aynı zamanda çakışma koruması. */
  sha: string;
};

export type AdminPostSummary = Omit<AdminPost, "body" | "sha"> & { sha: string };

/** Bir dildeki tüm yazıların özetleri. Dosya yoksa boş liste döner (henüz yazı yok). */
export async function listPosts(locale: Locale): Promise<AdminPostSummary[]> {
  const { owner, repo, branch } = config();
  const res = await gh(`/repos/${owner}/${repo}/contents/content/blog/${locale}?ref=${branch}`);
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`GitHub listeleme hatası (${res.status})`);

  const entries = (await res.json()) as { name: string; type: string }[];
  const files = entries.filter((e) => e.type === "file" && e.name.endsWith(".md"));

  const posts = await Promise.all(
    files.map(async (f) => {
      const post = await getPost(locale, f.name.replace(/\.md$/, ""));
      if (!post) return null;
      // Liste görünümü gövdeyi taşımaz; yalnız çekmece açılınca ayrıca çekilir.
      const { body, ...summary } = post;
      void body;
      return summary;
    }),
  );
  return posts
    .filter((p): p is AdminPostSummary => p !== null)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export async function getPost(locale: Locale, slug: string): Promise<AdminPost | null> {
  const { owner, repo, branch } = config();
  const res = await gh(
    `/repos/${owner}/${repo}/contents/${contentPath(locale, slug)}?ref=${branch}`,
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub okuma hatası (${res.status})`);

  const file = (await res.json()) as { content: string; sha: string };
  const raw = Buffer.from(file.content, "base64").toString("utf8");
  const { data, content } = matter(raw);
  return { ...(data as PostFrontmatter), slug, locale, body: content, sha: file.sha };
}

/**
 * Yazıyı repoya commit'ler. `sha` verilirse güncelleme, verilmezse yeni dosya.
 * Güncellemede yanlış sha → GitHub 409 döner; bu, iki kişi aynı yazıyı düzenlerse
 * birinin diğerinin üstüne sessizce yazmasını engelleyen çakışma korumasıdır.
 */
export async function putPost(input: {
  locale: Locale;
  slug: string;
  frontmatter: PostFrontmatter;
  body: string;
  sha?: string;
  message: string;
}): Promise<{ sha: string; commitUrl: string }> {
  const { owner, repo, branch } = config();
  // gray-matter frontmatter'ı YAML olarak serialize eder; okuma yolu da aynı kütüphane.
  const file = matter.stringify(input.body.trim() + "\n", input.frontmatter);

  const res = await gh(`/repos/${owner}/${repo}/contents/${contentPath(input.locale, input.slug)}`, {
    method: "PUT",
    body: JSON.stringify({
      message: input.message,
      content: Buffer.from(file, "utf8").toString("base64"),
      branch,
      ...(input.sha ? { sha: input.sha } : {}),
    }),
  });

  if (res.status === 409 || res.status === 422) {
    throw new Error("Bu yazı başka bir yerden değiştirilmiş. Sayfayı yenileyip tekrar deneyin.");
  }
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`GitHub yazma hatası (${res.status}): ${detail.slice(0, 200)}`);
  }

  const out = (await res.json()) as { content: { sha: string }; commit: { html_url: string } };
  return { sha: out.content.sha, commitUrl: out.commit.html_url };
}

/** Türkçe karakterleri düşürerek dosya adı güvenli slug üretir. */
export function slugifyTitle(title: string): string {
  const map: Record<string, string> = {
    ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u",
  };
  return (
    title
      .toLocaleLowerCase("tr-TR")
      .split("")
      .map((ch) => map[ch] ?? ch)
      .join("")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 60) || "yeni-yazi"
  );
}
