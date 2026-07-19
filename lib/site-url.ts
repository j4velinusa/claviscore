// Production URL'ini ortamdan çözer (yalnızca sunucu tarafı: metadata, sitemap, robots).
// Vercel otomatik olarak VERCEL_PROJECT_PRODUCTION_URL sağlar — özel domain bağlıysa o,
// yoksa proje '*.vercel.app' adresi. Böylece canonical/OG/sitemap her ortamda doğru olur.
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}
