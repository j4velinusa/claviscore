// Görsel yuvaları — istemci-güvenli kısım (fs / server-only İÇERMEZ).
// Dosyadan okuma lib/media.ts'te, GitHub'a yazma lib/admin/github.ts'te.
// Bu ayrım lib/blog-config.ts ↔ lib/blog.ts ile aynı: server-only bir modül
// istemci bileşeninden içe aktarılamaz, panel ise bu tipleri kullanmak zorunda.

import { products } from "@/lib/products";

/** Yüklenen görsellerin servis edildiği kök. Dosyalar public/gorseller/ altında. */
export const MEDIA_URL_BASE = "/gorseller";

export type MediaGroup = "site" | "urun";

export type MediaSlot = {
  /** Grup içinde benzersiz. Ürünlerde SKU, sitede sabit ad. */
  key: string;
  group: MediaGroup;
  /** Panelde görünen ad (panel tek dilli Türkçe). */
  label: string;
  /** Nasıl bir görsel beklendiği — panelde ipucu olarak gösterilir. */
  note: string;
  /** Panel önizlemesinin oranı; sitedeki alana yakın seçildi. */
  aspect: string;
  /**
   * Yüklemeden önce inilecek en uzun kenar (px).
   *
   * Alanın CSS genişliğinin ~2 katı seçiliyor: retina ekranda 1 CSS pikseli
   * 2 cihaz pikseli demek, kaynak bunun altında kalırsa görsel yumuşak çıkar.
   * Hero 1056 CSS px'te gösteriliyor → 2560; ürün kartı ~348 px → 1800 fazlasıyla
   * yeter ama kırpma payı bırakıyor.
   */
  maxEdge: number;
};

/**
 * Yuva kimliği. Grup öneki bilinçli: SKU'lar ile site yuvalarının adları bugün
 * çakışmıyor ama kimliği açık tutmak ileride çakışma riskini tamamen kaldırıyor.
 */
export function slotId(group: MediaGroup, key: string): string {
  return `${group}:${key}`;
}

/** Yükleme zamanından 14 haneli sürüm damgası: 2026-08-01T08:47:00Z → 20260801084700 */
export function versionStamp(iso: string): string {
  return iso.replace(/\D/g, "").slice(0, 14);
}

/**
 * Dosya adı yuvadan VE sürümden türetilir; uzantı daima .webp.
 *
 * Sürüm dosya adında, sorgu dizesinde değil: Next 16 yerel görsellerde sorgu
 * dizesini `images.localPatterns` ile beyaz listeye almayı şart koşuyor ve
 * joker arama desteklemiyor. Adın kendisi değişince optimizasyon önbelleği,
 * CDN ve tarayıcı için anahtar da değişiyor — değiştirilen fotoğrafın eski
 * hâli servis edilemiyor. Eski dosya yükleme sonunda siliniyor.
 */
export function slotFile(group: MediaGroup, key: string, version: string): string {
  return `${group}-${key.toLowerCase()}-${version}.webp`;
}

/** Ana sayfadaki iki büyük görsel alanı. Tasarımda yer tutucu olarak duruyorlardı. */
export const SITE_SLOTS: readonly MediaSlot[] = [
  {
    key: "hero",
    group: "site",
    label: "Ana sayfa — büyük görsel",
    note: "Geniş ürün fotoğrafı. 1120×540 alanda ortadan kırpılır, yatay çekim uygun.",
    aspect: "16 / 9",
    maxEdge: 2560,
  },
  {
    key: "muhendislik",
    group: "site",
    label: "Ana sayfa — mühendislik bölümü",
    note: "Kesit veya yakın detay fotoğrafı. Dikeye yakın alanda gösterilir.",
    aspect: "4 / 5",
    maxEdge: 1800,
  },
];

/** Katalogdaki 16 ürünün yuvaları — ürün listesinden türetiliyor, elle tutulmuyor. */
export const PRODUCT_SLOTS: readonly MediaSlot[] = products.map((p) => ({
  key: p.sku,
  group: "urun" as const,
  label: p.sku,
  note: "Ürün fotoğrafı. Kart 5:4 oranında kırpar.",
  aspect: "5 / 4",
  maxEdge: 1800,
}));

export const ALL_SLOTS: readonly MediaSlot[] = [...SITE_SLOTS, ...PRODUCT_SLOTS];

/** API katmanı gelen kimliği buna karşı doğrular — serbest metin dosya adına dönüşmesin. */
export const VALID_SLOT_IDS: ReadonlySet<string> = new Set(
  ALL_SLOTS.map((s) => slotId(s.group, s.key)),
);

/** slotId → dosya kaydı. Kaynak: content/media.json */
export type MediaManifest = Record<string, { file: string; updatedAt: string }>;

/** slotId → public URL. Görseli olmayan yuva haritada yer almaz. */
export type MediaMap = Record<string, string>;

/** Manifest'i URL haritasına çevirir; hem sunucu hem panel kullanır. */
export function toMediaMap(manifest: MediaManifest): MediaMap {
  const out: MediaMap = {};
  for (const [id, entry] of Object.entries(manifest)) {
    if (entry?.file) out[id] = `${MEDIA_URL_BASE}/${entry.file}`;
  }
  return out;
}

/**
 * Yuva kimliğiyle anahtarlanmış haritayı SKU anahtarlı hâle indirger.
 * Katalog ve koleksiyon kartları ürünü SKU ile tanıyor, yuva kimliğiyle değil.
 */
export function productImages(media: MediaMap): Record<string, string> {
  const out: Record<string, string> = {};
  for (const slot of PRODUCT_SLOTS) {
    const url = media[slotId(slot.group, slot.key)];
    if (url) out[slot.key] = url;
  }
  return out;
}
