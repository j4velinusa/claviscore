import { NextResponse } from "next/server";
import { hasSession } from "@/lib/admin/auth";
import { getPost, putPost, slugifyTitle } from "@/lib/admin/github";
import { blogCategories, type BlogCategory, type PostStatus } from "@/lib/blog-config";
import { isLocale, type Locale } from "@/lib/i18n";

const STATUSES: PostStatus[] = ["live", "scheduled", "draft"];

type Payload = {
  locale?: unknown;
  slug?: unknown;
  sha?: unknown;
  title?: unknown;
  titleAccent?: unknown;
  excerpt?: unknown;
  category?: unknown;
  status?: unknown;
  date?: unknown;
  readingMinutes?: unknown;
  authorName?: unknown;
  authorRole?: unknown;
  tags?: unknown;
  featured?: unknown;
  coverCaption?: unknown;
  body?: unknown;
};

function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v.trim() : fallback;
}

/** Ad-soyaddan baş harfler — tasarımdaki yuvarlak avatar için. */
function initials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "??";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return (first + last).toLocaleUpperCase("tr-TR");
}

/** Tek yazıyı gövdesi ve sha'sıyla döndürür — düzenleme çekmecesi bunu kullanır. */
export async function GET(request: Request) {
  if (!(await hasSession())) {
    return NextResponse.json({ error: "Oturum yok" }, { status: 401 });
  }
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") ?? "";
  const slug = url.searchParams.get("slug") ?? "";
  if (!isLocale(locale) || !slug) {
    return NextResponse.json({ error: "Eksik parametre" }, { status: 400 });
  }
  try {
    const post = await getPost(locale as Locale, slug);
    if (!post) return NextResponse.json({ error: "Yazı bulunamadı" }, { status: 404 });
    return NextResponse.json({ post });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!(await hasSession())) {
    return NextResponse.json({ error: "Oturum yok" }, { status: 401 });
  }

  let p: Payload;
  try {
    p = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const locale = str(p.locale);
  if (!isLocale(locale)) {
    return NextResponse.json({ error: "Geçersiz dil" }, { status: 400 });
  }

  const title = str(p.title);
  if (!title) return NextResponse.json({ error: "Başlık zorunlu" }, { status: 400 });

  const category = str(p.category) as BlogCategory;
  if (!blogCategories.includes(category)) {
    return NextResponse.json({ error: "Geçersiz kategori" }, { status: 400 });
  }

  const status = str(p.status) as PostStatus;
  if (!STATUSES.includes(status)) {
    return NextResponse.json({ error: "Geçersiz durum" }, { status: 400 });
  }

  const date = str(p.date);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Tarih YYYY-AA-GG olmalı" }, { status: 400 });
  }

  const slug = str(p.slug) || slugifyTitle(title);
  const providedSha = str(p.sha);
  const authorName = str(p.authorName, "Claviscor");

  // Yeni yazıda aynı slug varsa üstüne yazmayı reddet — kaza eseri içerik kaybı olmasın.
  if (!providedSha) {
    const existing = await getPost(locale as Locale, slug);
    if (existing) {
      return NextResponse.json(
        { error: `"${slug}" zaten var. Başlığı veya slug'ı değiştirin.` },
        { status: 409 },
      );
    }
  }

  const readingMinutes = Number(p.readingMinutes);
  const tags = Array.isArray(p.tags) ? p.tags.filter((t): t is string => typeof t === "string") : [];

  const frontmatter = {
    title,
    ...(str(p.titleAccent) ? { titleAccent: str(p.titleAccent) } : {}),
    excerpt: str(p.excerpt),
    category,
    status,
    ...(p.featured === true ? { featured: true } : {}),
    date,
    readingMinutes: Number.isFinite(readingMinutes) && readingMinutes > 0 ? readingMinutes : 5,
    author: {
      name: authorName,
      role: str(p.authorRole, "Claviscor"),
      initials: initials(authorName),
    },
    ...(tags.length > 0 ? { tags } : {}),
    ...(str(p.coverCaption) ? { coverCaption: str(p.coverCaption) } : {}),
  };

  try {
    const result = await putPost({
      locale: locale as Locale,
      slug,
      frontmatter,
      body: str(p.body),
      sha: providedSha || undefined,
      message: `${providedSha ? "content(blog): güncelle" : "content(blog): yeni yazı"} ${locale}/${slug}`,
    });
    return NextResponse.json({ ok: true, slug, ...result });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}
