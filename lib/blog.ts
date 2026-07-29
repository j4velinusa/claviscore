import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { Locale } from "@/lib/i18n";
import type { Post, PostFrontmatter, PostSummary, TocEntry } from "@/lib/blog-config";

export * from "@/lib/blog-config";

// Git tabanlı içerik: yazılar content/blog/<dil>/<slug>.md dosyalarında durur, build
// anında okunur. Veritabanı yok — admin panel bu dosyaları GitHub API ile commit'ler,
// site statik kalır. PostFrontmatter alanları admin formundaki alanlarla birebir eşleşir.
//
// GÜVEN SINIRI: markdown ham HTML'e izin verir ve çıktı dangerouslySetInnerHTML ile
// basılır. İçeriği yalnızca repoya commit yetkisi olanlar yazabildiği sürece bu güvenli.
// Admin panel güvenilmeyen yazarlara açılırsa burada sanitizasyon şart olur.

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

/** Türkçe karakterleri düşürerek URL/anchor güvenli kimlik üretir. */
export function slugify(input: string): string {
  const map: Record<string, string> = {
    ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u",
  };
  return input
    .toLocaleLowerCase("tr-TR")
    .split("")
    .map((ch) => map[ch] ?? ch)
    .join("")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function formatDate(iso: string, locale: Locale): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

function localeDir(locale: Locale): string {
  return path.join(CONTENT_DIR, locale);
}

function readFiles(locale: Locale): string[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
}

function parse(locale: Locale, file: string) {
  const raw = fs.readFileSync(path.join(localeDir(locale), file), "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  const slug = file.replace(/\.md$/, "");
  return { fm, body: content, slug };
}

function toSummary(fm: PostFrontmatter, slug: string, locale: Locale): PostSummary {
  return { ...fm, slug, dateLabel: formatDate(fm.date, locale) };
}

/** Yayındaki yazılar, tarihe göre yeniden eskiye. */
export function getPostSummaries(locale: Locale): PostSummary[] {
  return readFiles(locale)
    .map((f) => parse(locale, f))
    .filter(({ fm }) => fm.status === "live")
    .map(({ fm, slug }) => toSummary(fm, slug, locale))
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Öne çıkan yazı — frontmatter'da featured işaretli ilk yazı, yoksa en yenisi. */
export function getFeaturedPost(locale: Locale): PostSummary | null {
  const all = getPostSummaries(locale);
  return all.find((p) => p.featured) ?? all[0] ?? null;
}

export function getPostSlugs(locale: Locale): string[] {
  return readFiles(locale)
    .map((f) => parse(locale, f))
    .filter(({ fm }) => fm.status === "live")
    .map(({ slug }) => slug);
}

/**
 * Tek yazıyı gövdesiyle döndürür. h2 başlıklarına anchor id'si eklenir ve aynı sırayla
 * içindekiler listesi çıkarılır — marked'ın sürümden sürüme değişen renderer API'sine
 * bağlanmamak için id'ler HTML üzerinde sırayla yerleştiriliyor.
 */
export function getPost(locale: Locale, slug: string): Post | null {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(localeDir(locale), file))) return null;
  const { fm, body } = parse(locale, file);
  if (fm.status !== "live") return null;

  const headings = [...body.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
  const toc: TocEntry[] = headings.map((label) => ({ id: slugify(label), label }));

  let i = 0;
  const html = marked
    .parse(body, { async: false })
    .replace(/<h2>/g, () => (i < toc.length ? `<h2 id="${toc[i++].id}">` : "<h2>"));

  return { ...toSummary(fm, slug, locale), html, toc };
}

/** İlgili yazılar: aynı kategoriden, kendisi hariç, en yeniler. */
export function getRelatedPosts(locale: Locale, slug: string, limit = 3): PostSummary[] {
  const all = getPostSummaries(locale);
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.slice(0, limit);
  const sameCat = all.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = all.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCat, ...rest].slice(0, limit);
}
