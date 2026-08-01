// Yayın tipleri ve kapak temaları — istemci-güvenli kısım (fs/server-only İÇERMEZ).
// Veriyi dosyadan okuma lib/publications-content.ts'te, panele yazma
// lib/admin/github.ts'te. Bu ayrım lib/media-config.ts ↔ lib/media.ts ile aynı.
//
// Yayınlar artık kodda sabit DEĞİL: panelden yönetiliyor ve content/yayinlar.json
// içinde duruyor. Başlık/açıklama da sözlükte değil veride — sözlüğü kullanıcı
// düzenleyemiyor, yayın metni ise onun içeriği. Blog yazılarıyla aynı gerekçe.

export const publicationGroups = ["katalog", "dergi", "secki", "teknik"] as const;
export type PublicationGroup = (typeof publicationGroups)[number];

/**
 * Kapak temaları — tasarımdaki (design/Yayınlar.dc.html) paletlerden.
 *
 * Panelde on bir ayrı renk alanı sormak yerine hazır tema seçtiriliyor: yayın
 * ekleyen kişi renk paleti kurmak zorunda kalmıyor ve kapaklar birbirinden
 * kopmuyor.
 */
export const coverThemes = {
  koyu: { bg: "#18120D", fg: "#F6F0E4", muted: "#8A7A5E", accent: "#C2A06A", label: "Koyu" },
  krem: { bg: "#F4EEE2", fg: "#1A1714", muted: "#8A7A5E", accent: "#A87C4F", label: "Krem" },
  lacivert: { bg: "#0F2436", fg: "#FAF7F1", muted: "#B9AC94", accent: "#B08D57", label: "Lacivert" },
  acik: { bg: "#EFEBE3", fg: "#1A1714", muted: "#8a857c", accent: "#B9975B", label: "Açık" },
} as const;

export type CoverTheme = keyof typeof coverThemes;
export const coverThemeKeys = Object.keys(coverThemes) as CoverTheme[];

export type CoverFont = "sans" | "serif";

/**
 * Yazı tipine bağlı ağırlık ve harf aralığı. Tasarımda sans kapaklar kalın ve
 * sıkışık, serif kapaklar ince ve seyrek dizilmişti; ikisini ayrı alan yapmak
 * yerine yazı tipinden türetiliyor.
 */
export function coverType(font: CoverFont): { weight: number; track: string } {
  return font === "serif" ? { weight: 400, track: "0.2em" } : { weight: 800, track: "-0.035em" };
}

export type PublicationCopy = {
  /** Kart üzerindeki tür rozeti, ör. "KATALOG". */
  kind: string;
  title: string;
  desc: string;
};

export type Publication = {
  /** Dosya adı ve yuva anahtarı buradan türüyor; küçük harf, rakam ve tire. */
  id: string;
  group: PublicationGroup;
  /** Sayfanın üstündeki tanıtım bandında gösterilecek yayın. */
  featured?: boolean;
  /** Sayfa sayısı. Bilinmiyorsa yazılmaz — uydurma sayı basmıyoruz. */
  pages?: number;
  /** Ölçü, ör. "A4" ya da "200×280". */
  format?: string;
  /** Hangi dillerde basıldığı, ör. "TR / EN". */
  langs: string;
  /** "Ekranda oku" hedefi — site içi bir yol, ör. "/katalog". */
  readPath?: string;
  cover: {
    theme: CoverTheme;
    font: CoverFont;
    tag: string;
    title: string;
    sub: string;
    foot: string;
  };
  tr: PublicationCopy;
  en: PublicationCopy;
};

/** Kimlik biçimi — dosya adına ve yuva anahtarına girdiği için sıkı. */
export const PUBLICATION_ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,48}$/;

export function isPublicationId(id: string): boolean {
  return PUBLICATION_ID_PATTERN.test(id);
}

/** Belge yuvası anahtarı: katalog + tr → "katalog-tr" */
export function publicationSlotKey(id: string, locale: string): string {
  return `${id}-${locale}`;
}

/** Yuva anahtarı geçerli bir yayın belgesine mi ait — API bunu doğruluyor. */
export function isPublicationSlotKey(key: string): boolean {
  const m = /^([a-z0-9][a-z0-9-]{0,48})-(tr|en)$/.exec(key);
  return m !== null && isPublicationId(m[1]);
}

export function publicationCopy(pub: Publication, locale: string): PublicationCopy {
  return locale === "en" ? pub.en : pub.tr;
}

/** Tanıtım bandında gösterilecek yayın; işaretli yoksa ilki. */
export function featuredPublication(list: readonly Publication[]): Publication | undefined {
  return list.find((p) => p.featured) ?? list[0];
}
