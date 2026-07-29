import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";
import { localePath } from "@/lib/i18n";
import { getPostSlugs } from "@/lib/blog";

const base = siteUrl();
const abs = (path: string) => new URL(localePath("tr", path), base).toString();
const absEn = (path: string) => new URL(localePath("en", path), base).toString();

// Yalnızca indekslenebilir sayfalar.
const staticPaths = ["/", "/katalog", "/blog", "/koleksiyon", "/sertifikalar", "/ihracat", "/iletisim"];

export default function sitemap(): MetadataRoute.Sitemap {
  // Yazılar iki dilde ayrı dosyalar; yalnız her iki dilde de yayında olanlar
  // hreflang çifti olarak girer, tek dilli yazı kendi diliyle listelenir.
  const trSlugs = getPostSlugs("tr");
  const enSlugs = new Set(getPostSlugs("en"));
  const postPaths = [...new Set([...trSlugs, ...enSlugs])].map((slug) => `/blog/${slug}`);

  return [...staticPaths, ...postPaths].map((path) => ({
    url: abs(path),
    alternates: {
      languages: { tr: abs(path), en: absEn(path) },
    },
  }));
}
