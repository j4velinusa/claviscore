// Yayın kayıt defteri — dilden bağımsız yapısal veri.
// Çevrilebilir metinler (başlık, açıklama) burada DEĞİL; lib/dictionaries/*
// içinde yayın kimliğiyle tutulur. Bu ayrım lib/products.ts ve
// lib/certificates.ts ile aynı konvansiyondur.
//
// PDF'ler kayıt defterinden TÜRETİLEN belge yuvalarına panelden yükleniyor
// (bkz. lib/media-config.ts). Yayın ekleyince yuvası kendiliğinden oluşuyor.
//
// DOLDURULACAK: tasarımdaki (design/Yayınlar.dc.html) beş yayından yalnız ürün
// kataloğu gerçek. PLENUM dergisi, SWAN otel seçkisi ve kartela/sertifika
// paketleri mockup içeriğiydi — var olmayan yayını listelemek, basılı nüsha
// isteyen bir mimarlık ofisine yanlış bilgi vermek olurdu. Gerçek yayınlar
// çıktıkça buraya eklenecek.

export const publicationGroups = ["katalog", "dergi", "secki", "teknik"] as const;
export type PublicationGroup = (typeof publicationGroups)[number];

/**
 * Tasarımdaki tipografik kapak. Fotoğraf değil: renk ve yazı değerlerinden
 * çiziliyor, böylece her yayın için ayrı kapak görseli hazırlamak gerekmiyor.
 */
export type PublicationCover = {
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  /** Üstteki küçük versal etiket. */
  tag: string;
  /** Kapağın büyük adı. */
  title: string;
  /** Altındaki serif italik satır. */
  sub: string;
  /** En alttaki küçük versal satır. */
  foot: string;
  font: "sans" | "serif";
  weight: number;
  /** letter-spacing değeri (ör. "-0.035em"). */
  track: string;
};

export type Publication = {
  id: string;
  group: PublicationGroup;
  /** Sayfanın üstündeki büyük tanıtım bandında gösterilecek yayın. */
  featured?: boolean;
  cover: PublicationCover;
  /** Sayfa sayısı. Bilinmiyorsa yazılmaz — uydurma sayı basmıyoruz. */
  pages?: number;
  /** Ölçü, ör. "A4" ya da "200×280". */
  format?: string;
  /** Hangi dillerde basıldığı, ör. "TR" / "TR / EN". */
  langs: string;
  /** "Ekranda oku" hedefi — site içi bir sayfa varsa. */
  readPath?: string;
};

export const publications: readonly Publication[] = [
  {
    id: "katalog",
    group: "katalog",
    featured: true,
    pages: undefined,
    format: "A4",
    langs: "TR / EN",
    readPath: "/katalog",
    cover: {
      bg: "#18120D",
      fg: "#F6F0E4",
      muted: "#8A7A5E",
      accent: "#C2A06A",
      tag: "Katalog",
      title: "Bir mekânın bütün yüzeyleri",
      sub: "Kilit · Kapı · Tavan",
      foot: "Claviscor",
      font: "sans",
      weight: 800,
      track: "-0.035em",
    },
  },
];

/** Belge yuvası anahtarı: katalog + tr → "katalog-tr" */
export function publicationSlotKey(id: string, locale: string): string {
  return `${id}-${locale}`;
}

export function publicationsInGroup(group: PublicationGroup | "all"): readonly Publication[] {
  return group === "all" ? publications : publications.filter((p) => p.group === group);
}

/** Sayfanın üstünde tanıtılan yayın; işaretli yoksa ilk yayın. */
export function featuredPublication(): Publication | undefined {
  return publications.find((p) => p.featured) ?? publications[0];
}
