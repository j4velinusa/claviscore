// İstemci-güvenli blog tipleri ve sabitleri (fs/server-only İÇERMEZ).
// Dosya okuma ve markdown işleme için bkz. lib/blog.ts — o modül yalnız sunucuda çalışır.
// Bu ayrım lib/i18n.ts ↔ lib/dictionaries/get.ts ayrımıyla aynıdır.

export const blogCategories = ["teknik", "standart", "ihracat", "tavan", "proje"] as const;
export type BlogCategory = (typeof blogCategories)[number];

/** Yalnızca "live" herkese açık render edilir; scheduled/draft gizlidir. */
export type PostStatus = "live" | "scheduled" | "draft";

export type PostFrontmatter = {
  title: string;
  excerpt: string;
  category: BlogCategory;
  status: PostStatus;
  /** ISO tarih (2026-07-14). Görüntüleme biçimi dile göre üretilir. */
  date: string;
  readingMinutes: number;
  /** Başlıkta serif italik render edilecek son kelime öbeği (opsiyonel). */
  titleAccent?: string;
  tags?: string[];
  featured?: boolean;
  coverCaption?: string;
  /** Yazı sonundaki koyu ürün bandı. Tasarımda var; markdown'a sığmadığı için alan. */
  productCta?: { sku: string; title: string; desc: string };
};

export type PostSummary = PostFrontmatter & {
  slug: string;
  /** Dile göre biçimlenmiş tarih — istemci bileşenine hazır string olarak geçer. */
  dateLabel: string;
};

export type TocEntry = { id: string; label: string };
export type Post = PostSummary & { html: string; toc: TocEntry[] };
