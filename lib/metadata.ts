import type { Metadata } from "next";
import { type Locale, localePath } from "@/lib/i18n";
import { site } from "@/lib/site";

const ogLocale: Record<Locale, string> = { tr: "tr_TR", en: "en_US" };

/**
 * Bir sayfa için tam metadata üretir: başlık/açıklama, hreflang alternatifleri,
 * canonical ve OpenGraph/Twitter. `index: false` ise (henüz boş sayfalar) noindex.
 * Yollar görecelidir; layout'taki metadataBase ile mutlaklaşır.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  index = true,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  index?: boolean;
}): Metadata {
  const url = localePath(locale, path);
  const other: Locale = locale === "tr" ? "en" : "tr";

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        tr: localePath("tr", path),
        en: localePath("en", path),
        "x-default": localePath("tr", path),
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url,
      locale: ogLocale[locale],
      alternateLocale: ogLocale[other],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(index ? {} : { robots: { index: false, follow: true } }),
  };
}
