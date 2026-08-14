export const ceilingSystemSlugs = [
  "lay-on",
  "lay-in",
  "clip-in",
  "open-cell",
  "mesh",
  "hook-on",
  "baffle-vektorel",
  "t15-t24",
  "akustik-tavanlar",
] as const;

export type CeilingSystemSlug = (typeof ceilingSystemSlugs)[number];

export type CeilingSystemCopyKey =
  | "layOn"
  | "layIn"
  | "clipIn"
  | "openCell"
  | "mesh"
  | "hookOn"
  | "baffleVectorial"
  | "carrierSystems"
  | "acoustic";

export type CeilingVisualLabelKey =
  | "application"
  | "applicationTwo"
  | "systemDetail"
  | "carrierDetail"
  | "corridorApplication"
  | "sectionDetail"
  | "woodApplication"
  | "officeApplication"
  | "woodProfileDetail"
  | "vectorialDetail"
  | "standardCarrier"
  | "groovedCarrier"
  | "circularIslands"
  | "freeForms"
  | "panelApplication"
  | "acousticBaffle"
  | "greenIslands"
  | "customGeometry"
  | "turquoiseBaffle"
  | "aluminumPattern"
  | "steelPattern"
  | "stainlessPattern"
  | "patternReference";

export type CeilingVisual = {
  image: string;
  labelKey: CeilingVisualLabelKey;
  /** Katalogda açıkça yazan desen/taşıyıcı referansı; ürün kodu uydurulmaz. */
  code?: string;
};

export type CeilingSystem = {
  slug: CeilingSystemSlug;
  copyKey: CeilingSystemCopyKey;
  cardImage: string;
  mediaSlot: string;
  visuals: readonly CeilingVisual[];
};

const root = "/catalog/asma-tavan";

export const ceilingSystems: readonly CeilingSystem[] = [
  {
    slug: "lay-on",
    copyKey: "layOn",
    cardImage: `${root}/lay-on/uygulama.webp`,
    mediaSlot: "tavan-lay-on",
    visuals: [
      { image: `${root}/lay-on/uygulama.webp`, labelKey: "application" },
      { image: `${root}/lay-on/sistem-detayi.webp`, labelKey: "systemDetail" },
    ],
  },
  {
    slug: "lay-in",
    copyKey: "layIn",
    cardImage: `${root}/lay-in/uygulama.webp`,
    mediaSlot: "tavan-lay-in",
    visuals: [
      { image: `${root}/lay-in/uygulama.webp`, labelKey: "application" },
      { image: `${root}/lay-in/sistem-detayi.webp`, labelKey: "systemDetail" },
    ],
  },
  {
    slug: "clip-in",
    copyKey: "clipIn",
    cardImage: `${root}/clip-in/uygulama.webp`,
    mediaSlot: "tavan-clip-in",
    visuals: [
      { image: `${root}/clip-in/uygulama.webp`, labelKey: "application" },
      { image: `${root}/clip-in/tasiyici-detayi.webp`, labelKey: "carrierDetail" },
      { image: `${root}/clip-in/sistem-detayi.webp`, labelKey: "systemDetail" },
    ],
  },
  {
    slug: "open-cell",
    copyKey: "openCell",
    cardImage: `${root}/open-cell/uygulama.webp`,
    mediaSlot: "tavan-open-cell",
    visuals: [
      { image: `${root}/open-cell/uygulama.webp`, labelKey: "application" },
      { image: `${root}/open-cell/uygulama-2.webp`, labelKey: "applicationTwo" },
      { image: `${root}/open-cell/sistem-detayi.webp`, labelKey: "systemDetail" },
      { image: `${root}/open-cell/koridor-uygulamasi.webp`, labelKey: "corridorApplication" },
    ],
  },
  {
    slug: "mesh",
    copyKey: "mesh",
    cardImage: `${root}/mesh/uygulama.webp`,
    mediaSlot: "tavan-mesh",
    visuals: [
      { image: `${root}/mesh/uygulama.webp`, labelKey: "application" },
      { image: `${root}/mesh/aluminyum-a1.webp`, labelKey: "aluminumPattern", code: "A1" },
      { image: `${root}/mesh/aluminyum-a2.webp`, labelKey: "aluminumPattern", code: "A2" },
      { image: `${root}/mesh/aluminyum-a3.webp`, labelKey: "aluminumPattern", code: "A3" },
      { image: `${root}/mesh/aluminyum-a4.webp`, labelKey: "aluminumPattern", code: "A4" },
      { image: `${root}/mesh/celik-c1.webp`, labelKey: "steelPattern", code: "C1" },
      { image: `${root}/mesh/celik-c2.webp`, labelKey: "steelPattern", code: "C2" },
      { image: `${root}/mesh/celik-c3.webp`, labelKey: "steelPattern", code: "C3" },
      { image: `${root}/mesh/celik-c4.webp`, labelKey: "steelPattern", code: "C4" },
      { image: `${root}/mesh/celik-c5.webp`, labelKey: "steelPattern", code: "C5" },
      { image: `${root}/mesh/celik-c6.webp`, labelKey: "steelPattern", code: "C6" },
      { image: `${root}/mesh/paslanmaz-s1.webp`, labelKey: "stainlessPattern", code: "S1" },
      { image: `${root}/mesh/paslanmaz-s2.webp`, labelKey: "stainlessPattern", code: "S2" },
    ],
  },
  {
    slug: "hook-on",
    copyKey: "hookOn",
    cardImage: `${root}/hook-on/uygulama.webp`,
    mediaSlot: "tavan-hook-on",
    visuals: [
      { image: `${root}/hook-on/uygulama.webp`, labelKey: "application" },
      { image: `${root}/hook-on/sistem-detayi.webp`, labelKey: "systemDetail" },
      { image: `${root}/hook-on/kesit-detayi.webp`, labelKey: "sectionDetail" },
    ],
  },
  {
    slug: "baffle-vektorel",
    copyKey: "baffleVectorial",
    cardImage: `${root}/baffle-vektorel/uygulama.webp`,
    mediaSlot: "tavan-baffle-vektorel",
    visuals: [
      { image: `${root}/baffle-vektorel/uygulama.webp`, labelKey: "application" },
      { image: `${root}/baffle-vektorel/ahsap-uygulama.webp`, labelKey: "woodApplication" },
      { image: `${root}/baffle-vektorel/ofis-uygulama.webp`, labelKey: "officeApplication" },
      { image: `${root}/baffle-vektorel/baffle-sistem-detayi.webp`, labelKey: "systemDetail" },
      { image: `${root}/baffle-vektorel/ahsap-profil-detayi.webp`, labelKey: "woodProfileDetail" },
      { image: `${root}/baffle-vektorel/vektorel-detay-1.webp`, labelKey: "vectorialDetail" },
      { image: `${root}/baffle-vektorel/vektorel-detay-2.webp`, labelKey: "vectorialDetail" },
    ],
  },
  {
    slug: "t15-t24",
    copyKey: "carrierSystems",
    cardImage: `${root}/t15-t24/t24.webp`,
    mediaSlot: "tavan-t15-t24",
    visuals: [
      { image: `${root}/t15-t24/t24.webp`, labelKey: "standardCarrier", code: "T24" },
      { image: `${root}/t15-t24/t15.webp`, labelKey: "standardCarrier", code: "T15" },
      { image: `${root}/t15-t24/t24-kanalli.webp`, labelKey: "groovedCarrier", code: "T24 KANALLI" },
      { image: `${root}/t15-t24/t15-ultraline.webp`, labelKey: "groovedCarrier", code: "T15 KANALLI / ULTRALINE" },
    ],
  },
  {
    slug: "akustik-tavanlar",
    copyKey: "acoustic",
    cardImage: `${root}/akustik/uygulama.webp`,
    mediaSlot: "tavan-akustik",
    visuals: [
      { image: `${root}/akustik/uygulama.webp`, labelKey: "application" },
      { image: `${root}/akustik/dairesel-adalar.webp`, labelKey: "circularIslands" },
      { image: `${root}/akustik/serbest-bicimler.webp`, labelKey: "freeForms" },
      { image: `${root}/akustik/panel-uygulama-1.webp`, labelKey: "panelApplication" },
      { image: `${root}/akustik/panel-uygulama-2.webp`, labelKey: "panelApplication" },
      { image: `${root}/akustik/akustik-baffle.webp`, labelKey: "acousticBaffle" },
      { image: `${root}/akustik/yesil-adalar.webp`, labelKey: "greenIslands" },
      { image: `${root}/akustik/ozel-geometri.webp`, labelKey: "customGeometry" },
      { image: `${root}/akustik/turkuaz-baffle.webp`, labelKey: "turquoiseBaffle" },
    ],
  },
];

export function ceilingSystemBySlug(slug: string): CeilingSystem | undefined {
  return ceilingSystems.find((system) => system.slug === slug);
}
