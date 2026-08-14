// Dilden bağımsız ürün verisi. Donanım ailesi mevcut site kataloğundan, tavan
// sistemleri 2026 Claviscor Asma Tavan Sistemleri Kataloğu'ndan gelir.
// Çevrilebilir metinler (ad, açıklama, ölçü etiketi) burada DEĞİL; lib/dictionaries/*
// içinde SKU anahtarıyla tutulur. Bu ayrım lib/site.ts ile aynı konvansiyondur.

/** Filtre sekmeleri — "all" bir ürün kategorisi değil, "hepsini göster" durumudur. */
export const catalogTabs = [
  "all",
  "hinge",
  "handle",
  "hotel",
  "accessory",
  "ceiling",
] as const;
export type CatalogTab = (typeof catalogTabs)[number];

export type ProductCategory = Exclude<CatalogTab, "all">;
export type ProductBadge = "new" | "bestseller";

export type Product = {
  sku: string;
  category: ProductCategory;
  /** Kaplama/yüzey swatch'ları — mockup'taki hex değerleri, sıra korunur. */
  finishes: readonly string[];
  badge?: ProductBadge;
  /** Panelden görsel yüklenmediyse kullanılan gerçek katalog görseli. */
  image?: string;
  /** Ürün ailesinin ayrıntılı katalog sayfası; yoksa teklif e-postası açılır. */
  href?: string;
};

// Mockup'taki F sabitinin karşılığı. Kapı donanımında bunlar kaplama; tavan ürünlerinde
// panel/profil yüzey rengi — aynı swatch bileşeni ikisini de gösteriyor.
export const finishKeys = ["brass", "nickel", "black", "satin", "panel", "wood"] as const;
export type FinishKey = (typeof finishKeys)[number];

/** Kaplama/yüzey paleti. Koleksiyon sayfası bu anahtarlar üzerinden ürün türetir. */
export const FINISH: Record<FinishKey, string> = {
  brass: "#B08D57",
  nickel: "#C9C7C0",
  black: "#2A2724",
  satin: "#AEB2AD",
  panel: "#EFEBE3",
  wood: "#8A6A45",
};

export const products: readonly Product[] = [
  { sku: "HNG-310", category: "hinge", finishes: [FINISH.satin, FINISH.black] },
  { sku: "HNG-320", category: "hinge", finishes: [FINISH.satin] },
  { sku: "HDL-410", category: "handle", finishes: [FINISH.brass, FINISH.nickel, FINISH.black] },
  { sku: "HTL-510", category: "hotel", finishes: [FINISH.black, FINISH.satin], badge: "new" },
  { sku: "ACC-610", category: "accessory", finishes: [FINISH.nickel, FINISH.brass] },
  {
    sku: "LAY-ON",
    category: "ceiling",
    finishes: [FINISH.panel, FINISH.nickel, FINISH.satin],
    image: "/catalog/asma-tavan/lay-on/uygulama.webp",
    href: "/katalog/asma-tavan#lay-on",
  },
  {
    sku: "LAY-IN",
    category: "ceiling",
    finishes: [FINISH.panel, FINISH.nickel],
    image: "/catalog/asma-tavan/lay-in/uygulama.webp",
    href: "/katalog/asma-tavan#lay-in",
  },
  {
    sku: "CLIP-IN",
    category: "ceiling",
    finishes: [FINISH.panel, FINISH.black],
    image: "/catalog/asma-tavan/clip-in/uygulama.webp",
    href: "/katalog/asma-tavan#clip-in",
  },
  {
    sku: "OPEN-CELL",
    category: "ceiling",
    finishes: [FINISH.panel, FINISH.black, FINISH.satin],
    image: "/catalog/asma-tavan/open-cell/uygulama.webp",
    href: "/katalog/asma-tavan#open-cell",
  },
  {
    sku: "MESH",
    category: "ceiling",
    finishes: [FINISH.satin, FINISH.black, FINISH.nickel],
    image: "/catalog/asma-tavan/mesh/uygulama.webp",
    href: "/katalog/asma-tavan#mesh",
  },
  {
    sku: "HOOK-ON",
    category: "ceiling",
    finishes: [FINISH.satin, FINISH.black],
    image: "/catalog/asma-tavan/hook-on/uygulama.webp",
    href: "/katalog/asma-tavan#hook-on",
  },
  {
    sku: "BAFFLE-VEKTOREL",
    category: "ceiling",
    finishes: [FINISH.wood, FINISH.black, FINISH.panel],
    image: "/catalog/asma-tavan/baffle-vektorel/uygulama.webp",
    href: "/katalog/asma-tavan#baffle-vektorel",
  },
  {
    sku: "T15-T24",
    category: "ceiling",
    finishes: [FINISH.panel, FINISH.satin, FINISH.black],
    image: "/catalog/asma-tavan/t15-t24/t24.webp",
    href: "/katalog/asma-tavan#t15-t24",
  },
  {
    sku: "AKUSTIK-TAVAN",
    category: "ceiling",
    finishes: [FINISH.panel, FINISH.wood, FINISH.black],
    image: "/catalog/asma-tavan/akustik/uygulama.webp",
    href: "/katalog/asma-tavan#akustik-tavanlar",
  },
];

// Ürün görselleri burada DEĞİL: görsel yuvaları (ürün + site) tek yerde,
// lib/media-config.ts içinde toplanıyor.

/** Seçili sekmeye göre filtreler. "all" tüm listeyi olduğu gibi döndürür. */
export function filterProducts(tab: CatalogTab): readonly Product[] {
  return tab === "all" ? products : products.filter((p) => p.category === tab);
}

/** Bir kaplamayı sunan ürünler — koleksiyon sayfası katalogdan türetir. */
export function productsWithFinish(key: FinishKey): readonly Product[] {
  return products.filter((p) => p.finishes.includes(FINISH[key]));
}
