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
};

/**
 * Yuva kimliği. Grup öneki bilinçli: SKU'lar ile site yuvalarının adları bugün
 * çakışmıyor ama kimliği açık tutmak ileride çakışma riskini tamamen kaldırıyor.
 */
export function slotId(group: MediaGroup, key: string): string {
  return `${group}:${key}`;
}

/** Dosya adı yuvadan türetilir; uzantı daima .webp (panel yüklemeden önce çevirir). */
export function slotFile(group: MediaGroup, key: string): string {
  return `${group}-${key.toLowerCase()}.webp`;
}

/** Ana sayfadaki iki büyük görsel alanı. Tasarımda yer tutucu olarak duruyorlardı. */
export const SITE_SLOTS: readonly MediaSlot[] = [
  {
    key: "hero",
    group: "site",
    label: "Ana sayfa — büyük görsel",
    note: "Geniş ürün fotoğrafı. 1120×540 alanda ortadan kırpılır, yatay çekim uygun.",
    aspect: "16 / 9",
  },
  {
    key: "muhendislik",
    group: "site",
    label: "Ana sayfa — mühendislik bölümü",
    note: "Kesit veya yakın detay fotoğrafı. Dikeye yakın alanda gösterilir.",
    aspect: "4 / 5",
  },
];

/** Katalogdaki 16 ürünün yuvaları — ürün listesinden türetiliyor, elle tutulmuyor. */
export const PRODUCT_SLOTS: readonly MediaSlot[] = products.map((p) => ({
  key: p.sku,
  group: "urun" as const,
  label: p.sku,
  note: "Ürün fotoğrafı. Kart 5:4 oranında kırpar.",
  aspect: "5 / 4",
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

/** Manifest'i doğrudan URL haritasına çevirir; hem sunucu hem panel kullanır. */
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
