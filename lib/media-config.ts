// Görsel yuvaları — istemci-güvenli kısım (fs / server-only İÇERMEZ).
// Dosyadan okuma lib/media.ts'te, GitHub'a yazma lib/admin/github.ts'te.
// Bu ayrım lib/blog-config.ts ↔ lib/blog.ts ile aynı: server-only bir modül
// istemci bileşeninden içe aktarılamaz, panel ise bu tipleri kullanmak zorunda.

import { products } from "@/lib/products";
import { publications, publicationSlotKey } from "@/lib/publications";

/** Yüklenen görsellerin servis edildiği kök. Dosyalar public/gorseller/ altında. */
export const MEDIA_URL_BASE = "/gorseller";
/** Belgeler (PDF) ayrı kökte — "gorseller" altında PDF durması yanıltıcı olurdu. */
export const DOC_URL_BASE = "/belgeler";

export type MediaGroup = "site" | "urun" | "dok" | "blog";

/** Yuvanın ne tuttuğu. Doğrulama, dönüşüm ve dizin buna göre değişiyor. */
export type MediaKind = "image" | "pdf";

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
  /** Görsel mi belge mi. Belirtilmezse görsel. */
  kind?: MediaKind;
  /**
   * Yüklemeden önce inilecek en uzun kenar (px). Yalnız görsel yuvalarında.
   *
   * Alanın CSS genişliğinin ~2 katı seçiliyor: retina ekranda 1 CSS pikseli
   * 2 cihaz pikseli demek, kaynak bunun altında kalırsa görsel yumuşak çıkar.
   * Hero 1056 CSS px'te gösteriliyor → 2560; ürün kartı ~348 px → 1800 fazlasıyla
   * yeter ama kırpma payı bırakıyor.
   */
  maxEdge?: number;
};

/** Yuvanın tipi — belirtilmemişse görsel. */
export function slotKind(slot: MediaSlot): MediaKind {
  return slot.kind ?? "image";
}

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
export function slotFile(
  group: MediaGroup,
  key: string,
  version: string,
  kind: MediaKind = "image",
): string {
  const ext = kind === "pdf" ? "pdf" : "webp";
  return `${group}-${key.toLowerCase()}-${version}.${ext}`;
}

/** Yuvanın dosyalarının durduğu repo dizini. */
export function mediaDir(kind: MediaKind): string {
  return kind === "pdf" ? "public/belgeler" : "public/gorseller";
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
  // Ana sayfadaki ürün ailesi ve tavan kartları. Anahtarlar sözlükteki
  // families.items / ceiling.items anahtarlarını izliyor — bileşen eşleştirmeyi
  // bunun üzerinden yapıyor, ayrı bir tablo tutulmuyor.
  ...(
    [
      ["aile-cylinder", "Ürün ailesi — Silindir Bareller"],
      ["aile-padlock", "Ürün ailesi — Asma Kilitler"],
      ["aile-hinge", "Ürün ailesi — Menteşeler"],
      ["aile-handle", "Ürün ailesi — Kapı Kolları"],
      ["aile-hotel", "Ürün ailesi — Otel Kilit Sistemleri"],
      ["tavan-suspended", "Tavan — Asma Tavan"],
      ["tavan-lighting", "Tavan — Tavan Aydınlatma"],
      ["tavan-gypsum", "Tavan — Alçı Tavan"],
    ] as const
  ).map(([key, label]) => ({
    key,
    group: "site" as const,
    label,
    note: "Ana sayfa kartı. 16:11 oranında kırpılır.",
    aspect: "16 / 11",
    maxEdge: 1600,
  })),
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

/**
 * Belgeler — yayın kayıt defterinden TÜRETİLİYOR (lib/publications.ts).
 * Yayın eklenince yuvası kendiliğinden oluşuyor, burada elle liste tutulmuyor.
 *
 * Her yayının dil başına bir yuvası var: ihracat sitesinde TR ve EN nüshalar
 * ayrı dosyalar. Yalnız biri yüklüyse diğer dil de ona düşüyor (bkz. docHref).
 *
 * Anahtar biçimi "<yayın>-<dil>" — katalog için "katalog-tr" / "katalog-en".
 * Bu adlar bilinçle korundu: yuvalar yayın defterine taşınmadan önce de aynıydı,
 * değiştirilseydi panelden yüklenmiş PDF'ler sahipsiz kalırdı.
 */
export const DOC_SLOTS: readonly MediaSlot[] = publications.flatMap((pub) =>
  (["tr", "en"] as const).map((lang) => ({
    key: publicationSlotKey(pub.id, lang),
    group: "dok" as const,
    label: `${pub.cover.tag} — ${lang === "tr" ? "Türkçe" : "İngilizce"} (PDF)`,
    note: `${lang === "tr" ? "Türkçe" : "İngilizce"} nüsha. En fazla 100 MB.`,
    aspect: "3 / 4",
    kind: "pdf" as const,
  })),
);

export const ALL_SLOTS: readonly MediaSlot[] = [...SITE_SLOTS, ...PRODUCT_SLOTS, ...DOC_SLOTS];

/** API katmanı gelen kimliği buna karşı doğrular — serbest metin dosya adına dönüşmesin. */
export const VALID_SLOT_IDS: ReadonlySet<string> = new Set(
  ALL_SLOTS.map((s) => slotId(s.group, s.key)),
);

// --- Blog kapakları: kimlik SABİT LİSTEDE DEĞİL, yazı başına türetiliyor ------
// Yazılar panelden eklendiği için yuva listesi önceden bilinemiyor. Kimlik yine
// de serbest metin değil: dil sabit iki değerden biri, slug yalnız küçük harf,
// rakam ve tire kabul ediyor — dosya adına yol kaçışı sokulamıyor.

const BLOG_SLOT_PATTERN = /^blog:(tr|en)-[a-z0-9-]{1,70}$/;

/** Yazının kapak yuvası kimliği: blog:tr-anti-snap-barel */
export function blogSlotId(locale: string, slug: string): string {
  return `blog:${locale}-${slug}`;
}

export function isBlogSlotId(id: string): boolean {
  return BLOG_SLOT_PATTERN.test(id);
}

/** Blog kapağı için sentetik yuva — sabit kayıt defterinde karşılığı yok. */
export function blogCoverSlot(id: string): MediaSlot {
  return {
    key: id.slice("blog:".length),
    group: "blog",
    label: "Kapak görseli",
    note: "Yazı sayfasının üstünde ve listedeki kartta gösterilir.",
    aspect: "16 / 10",
    maxEdge: 1800,
  };
}

/**
 * slotId → dosya kaydı. Kaynak: content/media.json
 *
 * İki depolama var ve kayıt hangisi olduğunu `url` ile ayırıyor:
 * - Görseller repoda (public/gorseller) → yalnız `file`, adres yoldan türetiliyor.
 * - Büyük belgeler blob deposunda → `url` dolu, `file` silme için blob yolu.
 *   Sebebi: 60 MB'lık bir katalog ne repoya ne de sunucusuz fonksiyonun
 *   4,5 MB'lık istek gövdesine sığıyor.
 */
export type MediaManifest = Record<
  string,
  { file: string; updatedAt: string; url?: string; size?: number }
>;

/** slotId → public URL. Görseli olmayan yuva haritada yer almaz. */
export type MediaMap = Record<string, string>;

/** Manifest'i URL haritasına çevirir; hem sunucu hem panel kullanır. */
export function toMediaMap(manifest: MediaManifest): MediaMap {
  const out: MediaMap = {};
  for (const [id, entry] of Object.entries(manifest)) {
    if (!entry) continue;
    // Blob deposundaki dosyanın adresi kayıtta duruyor; repodakinin adresi
    // yuvanın tipinden türetiliyor (belgeler /belgeler, görseller /gorseller).
    if (entry.url) {
      out[id] = entry.url;
      continue;
    }
    if (!entry.file) continue;
    const slot = ALL_SLOTS.find((sl) => slotId(sl.group, sl.key) === id);
    const base = slot && slotKind(slot) === "pdf" ? DOC_URL_BASE : MEDIA_URL_BASE;
    out[id] = `${base}/${entry.file}`;
  }
  return out;
}

/**
 * Bir yayının dile göre indirme adresi. Yalnız bir dilde nüsha varsa diğer dil de
 * onu indirir — tek dilde basılan yayın için iki yuva doldurmak gerekmesin.
 */
export function docHref(media: MediaMap, id: string, locale: string): string | undefined {
  const own = media[slotId("dok", publicationSlotKey(id, locale === "en" ? "en" : "tr"))];
  const other = media[slotId("dok", publicationSlotKey(id, locale === "en" ? "tr" : "en"))];
  return own ?? other;
}

/** Ana sayfadaki "Kataloğu indir" düğmesi — ürün kataloğu yayınına bağlı. */
export function catalogHref(media: MediaMap, locale: string): string | undefined {
  return docHref(media, "katalog", locale);
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
