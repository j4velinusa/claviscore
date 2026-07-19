import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";
import { localePath } from "@/lib/i18n";

const base = siteUrl();
const abs = (path: string) => new URL(localePath("tr", path), base).toString();
const absEn = (path: string) => new URL(localePath("en", path), base).toString();

// Yalnızca indekslenebilir sayfalar. Coming-soon stub'ları (katalog/koleksiyon) noindex,
// bu yüzden içerik yayınlanana dek sitemap'e dahil edilmez.
const indexablePaths = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePaths.map((path) => ({
    url: abs(path),
    alternates: {
      languages: { tr: abs(path), en: absEn(path) },
    },
  }));
}
