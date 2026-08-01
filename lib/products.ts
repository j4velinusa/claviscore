// Dilden bağımsız ürün verisi — kaynak: design/Katalog - Apple.dc.html (16 ürün, 7 kategori).
// Çevrilebilir metinler (ad, açıklama, ölçü etiketi) burada DEĞİL; lib/dictionaries/*
// içinde SKU anahtarıyla tutulur. Bu ayrım lib/site.ts ile aynı konvansiyondur.

/** Filtre sekmeleri — "all" bir ürün kategorisi değil, "hepsini göster" durumudur. */
export const catalogTabs = [
  "all",
  "barrel",
  "padlock",
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
};

// Mockup'taki F sabitinin karşılığı. Kapı donanımında bunlar kaplama; tavan ürünlerinde
// panel/profil yüzey rengi — aynı swatch bileşeni ikisini de gösteriyor.
// Not: kaplama kodu AN (antik, #6E5A3E) marka kılavuzunda var ama bu 16 üründe kullanılmıyor.
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
  { sku: "BRL-110", category: "barrel", finishes: [FINISH.brass, FINISH.nickel, FINISH.black], badge: "bestseller" },
  { sku: "BRL-120", category: "barrel", finishes: [FINISH.brass, FINISH.nickel] },
  { sku: "BRL-130", category: "barrel", finishes: [FINISH.brass, FINISH.nickel] },
  { sku: "PAD-210", category: "padlock", finishes: [FINISH.brass, FINISH.black] },
  { sku: "PAD-220", category: "padlock", finishes: [FINISH.nickel, FINISH.black], badge: "new" },
  { sku: "HNG-310", category: "hinge", finishes: [FINISH.satin, FINISH.black] },
  { sku: "HNG-320", category: "hinge", finishes: [FINISH.satin] },
  { sku: "HDL-410", category: "handle", finishes: [FINISH.brass, FINISH.nickel, FINISH.black] },
  { sku: "HTL-510", category: "hotel", finishes: [FINISH.black, FINISH.satin], badge: "new" },
  { sku: "ACC-610", category: "accessory", finishes: [FINISH.nickel, FINISH.brass] },
  { sku: "CLG-710", category: "ceiling", finishes: [FINISH.panel, FINISH.nickel, FINISH.satin], badge: "new" },
  { sku: "CLG-720", category: "ceiling", finishes: [FINISH.satin, FINISH.black, FINISH.panel] },
  { sku: "LGT-730", category: "ceiling", finishes: [FINISH.panel, FINISH.black] },
  { sku: "LGT-740", category: "ceiling", finishes: [FINISH.panel, FINISH.black, FINISH.satin], badge: "bestseller" },
  { sku: "GYP-750", category: "ceiling", finishes: [FINISH.panel] },
  { sku: "GYP-760", category: "ceiling", finishes: [FINISH.panel, FINISH.wood] },
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
