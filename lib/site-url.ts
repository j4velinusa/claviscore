// Production URL'ini çözer (yalnızca sunucu tarafı: metadata, sitemap, robots).
// Öncelik: açık NEXT_PUBLIC_SITE_URL > production'da sabit domain > Vercel önizleme URL'i > localhost.
// Canonical/OG/sitemap böylece production'da her zaman claviscor.com'a oturur; önizleme
// dağıtımları (Vercel varsayılan olarak noindex) kendi geçici URL'ini kullanır.
const PRODUCTION_URL = "https://claviscor.com";

export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  if (process.env.NODE_ENV === "production") return PRODUCTION_URL;

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}
