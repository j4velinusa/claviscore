// İstemci-güvenli i18n yapılandırması ve yol yardımcıları (server-only İÇERMEZ).
// Sözlük yükleyici için bkz. lib/dictionaries/get.ts

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "tr";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Bir yolu verilen dile göre öneklendirir.
 * Öntanımlı dil (tr) prefix'sizdir: localePath("tr", "/katalog") -> "/katalog"
 * Diğer diller /<locale> ile: localePath("en", "/katalog") -> "/en/katalog"
 */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/** Bir yoldaki dil önekini (varsa) söker; öntanımlı dilde zaten prefix yoktur. */
export function stripLocale(pathname: string): string {
  for (const l of locales) {
    if (l === defaultLocale) continue;
    if (pathname === `/${l}`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname || "/";
}

/** Mevcut yolun karşı-dildeki karşılığını üretir (dil değiştirici için). */
export function switchLocalePath(pathname: string, target: Locale): string {
  return localePath(target, stripLocale(pathname));
}
