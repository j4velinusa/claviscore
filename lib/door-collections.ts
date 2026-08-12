export const doorCollectionSlugs = [
  "celik-kapi",
  "hemyuz",
  "aluminyum-giris",
  "acil-cikis",
  "premium-lake",
  "deluxe-lake",
  "classic-lake",
  "pvc-serisi",
  "melamin-serisi",
] as const;

export type DoorCollectionSlug = (typeof doorCollectionSlugs)[number];
export type DoorCollectionCopyKey =
  | "steelDoor"
  | "flushEntrance"
  | "aluminumEntrance"
  | "emergencyExit"
  | "premiumLacquer"
  | "deluxeLacquer"
  | "classicLacquer"
  | "pvcSeries"
  | "melamineSeries";

export type DoorModel = {
  code: string;
  image: string;
  kind?: "model" | "reference";
};

export type DoorCollection = {
  slug: DoorCollectionSlug;
  copyKey: DoorCollectionCopyKey;
  cardImage: string;
  mediaSlot: string;
  models: readonly DoorModel[];
};

const steelDoorModels: readonly DoorModel[] = [
  { code: "KT-501", image: "/catalog/celik-kapi/kt-501.webp" },
  { code: "PRX-100", image: "/catalog/celik-kapi/prx-100.webp" },
  { code: "PR-309", image: "/catalog/celik-kapi/pr-309.webp" },
  { code: "PR-300", image: "/catalog/celik-kapi/pr-300.webp" },
  { code: "PR-301", image: "/catalog/celik-kapi/pr-301.webp" },
  { code: "PRX-101", image: "/catalog/celik-kapi/prx-101.webp" },
  { code: "PR-304", image: "/catalog/celik-kapi/pr-304.webp" },
  { code: "PR-305", image: "/catalog/celik-kapi/pr-305.webp" },
  { code: "PK-404", image: "/catalog/celik-kapi/pk-404.webp" },
  { code: "PR-308", image: "/catalog/celik-kapi/pr-308.webp" },
  { code: "PK-407", image: "/catalog/celik-kapi/pk-407.webp" },
  { code: "KT-502", image: "/catalog/celik-kapi/kt-502.webp" },
  { code: "SAFE", image: "/catalog/celik-kapi/safe.webp" },
  { code: "ZURICH", image: "/catalog/celik-kapi/zurich.webp" },
  { code: "VENEDİK", image: "/catalog/celik-kapi/venedik.webp" },
  { code: "LYON", image: "/catalog/celik-kapi/lyon.webp" },
  { code: "KD-168", image: "/catalog/celik-kapi/kd-168.webp" },
  { code: "KD-169", image: "/catalog/celik-kapi/kd-169.webp" },
  { code: "KD-170", image: "/catalog/celik-kapi/kd-170.webp" },
  { code: "KD-171", image: "/catalog/celik-kapi/kd-171.webp" },
];

const flushEntranceModels: readonly DoorModel[] = [
  { code: "HM-101", image: "/catalog/hemyuz/hm-101.webp" },
  { code: "HM-102", image: "/catalog/hemyuz/hm-102.webp" },
  { code: "HM-103", image: "/catalog/hemyuz/hm-103.webp" },
  { code: "HM-104", image: "/catalog/hemyuz/hm-104.webp" },
  { code: "HM-105", image: "/catalog/hemyuz/hm-105.webp" },
  { code: "HM-106", image: "/catalog/hemyuz/hm-106.webp" },
  { code: "HM-107", image: "/catalog/hemyuz/hm-107.webp" },
  { code: "HM-108", image: "/catalog/hemyuz/hm-108.webp" },
  { code: "HM-109", image: "/catalog/hemyuz/hm-109.webp" },
  { code: "HM-110", image: "/catalog/hemyuz/hm-110.webp" },
  { code: "HM-111", image: "/catalog/hemyuz/hm-111.webp" },
  { code: "HM-112", image: "/catalog/hemyuz/hm-112.webp" },
  { code: "HM-113", image: "/catalog/hemyuz/hm-113.webp" },
];

const aluminumEntranceModels: readonly DoorModel[] = [
  { code: "ALP-523", image: "/catalog/aluminyum-giris/alp-523.webp" },
  { code: "ALP-513", image: "/catalog/aluminyum-giris/alp-513.webp" },
  { code: "ALP-511", image: "/catalog/aluminyum-giris/alp-511.webp" },
  { code: "ALP-504", image: "/catalog/aluminyum-giris/alp-504.webp" },
  {
    code: "DİKEY AHŞAP RİTİM",
    image: "/catalog/aluminyum-giris/dikey-ahsap-ritim.webp",
    kind: "reference",
  },
  {
    code: "DOĞAL TAŞ ETKİSİ",
    image: "/catalog/aluminyum-giris/dogal-tas-etkisi.webp",
    kind: "reference",
  },
];

const emergencyExitModels: readonly DoorModel[] = [
  { code: "Y-003", image: "/catalog/acil-cikis/y-003.webp" },
  { code: "Y-011", image: "/catalog/acil-cikis/y-011.webp" },
];

const premiumLacquerModels: readonly DoorModel[] = [
  { code: "VEGA I", image: "/catalog/premium-lake/vega-i.webp" },
  { code: "VEGA II", image: "/catalog/premium-lake/vega-ii.webp" },
  { code: "VEGA I-C", image: "/catalog/premium-lake/vega-i-c.webp" },
  { code: "VEGA II-C", image: "/catalog/premium-lake/vega-ii-c.webp" },
  { code: "PERA I", image: "/catalog/premium-lake/pera-i.webp" },
  { code: "PERA II", image: "/catalog/premium-lake/pera-ii.webp" },
  { code: "PERA I-C", image: "/catalog/premium-lake/pera-i-c.webp" },
  { code: "PERA II-C", image: "/catalog/premium-lake/pera-ii-c.webp" },
  { code: "RIGEL I", image: "/catalog/premium-lake/rigel-i.webp" },
  { code: "RIGEL II", image: "/catalog/premium-lake/rigel-ii.webp" },
  { code: "RIGEL I-C", image: "/catalog/premium-lake/rigel-i-c.webp" },
  { code: "RIGEL II-C", image: "/catalog/premium-lake/rigel-ii-c.webp" },
  { code: "DIAMOND", image: "/catalog/premium-lake/diamond.webp" },
  { code: "DIAMOND-C", image: "/catalog/premium-lake/diamond-c.webp" },
  { code: "EMERALD", image: "/catalog/premium-lake/emerald.webp" },
  { code: "EMERALD-C", image: "/catalog/premium-lake/emerald-c.webp" },
  { code: "STAR I", image: "/catalog/premium-lake/star-i.webp" },
  { code: "STAR II", image: "/catalog/premium-lake/star-ii.webp" },
  { code: "STAR I-C", image: "/catalog/premium-lake/star-i-c.webp" },
  { code: "STAR II-C", image: "/catalog/premium-lake/star-ii-c.webp" },
];

const deluxeLacquerModels: readonly DoorModel[] = [
  { code: "ALASKA", image: "/catalog/deluxe-lake/alaska.webp" },
  { code: "ATLAS", image: "/catalog/deluxe-lake/atlas.webp" },
  { code: "BENFICA I", image: "/catalog/deluxe-lake/benfica-i.webp" },
  { code: "BYWOOD II", image: "/catalog/deluxe-lake/bywood-ii.webp" },
  { code: "DOĞA II", image: "/catalog/deluxe-lake/doga-ii.webp" },
  { code: "YENİ ROSA II", image: "/catalog/deluxe-lake/yeni-rosa-ii.webp" },
  { code: "İNCİ", image: "/catalog/deluxe-lake/inci.webp" },
  { code: "KARAT", image: "/catalog/deluxe-lake/karat.webp" },
  { code: "PORTO I", image: "/catalog/deluxe-lake/porto-i.webp" },
  { code: "SOLID II", image: "/catalog/deluxe-lake/solid-ii.webp" },
  { code: "TİNA", image: "/catalog/deluxe-lake/tina.webp" },
  { code: "TRIO", image: "/catalog/deluxe-lake/trio.webp" },
  { code: "VALENCIA I", image: "/catalog/deluxe-lake/valencia-i.webp" },
  { code: "VARNA", image: "/catalog/deluxe-lake/varna.webp" },
  { code: "VESKA I", image: "/catalog/deluxe-lake/veska-i.webp" },
  { code: "VIANA", image: "/catalog/deluxe-lake/viana.webp" },
  { code: "BYWOOD II-C", image: "/catalog/deluxe-lake/bywood-ii-c.webp" },
  { code: "YENİ ROSA II-C", image: "/catalog/deluxe-lake/yeni-rosa-ii-c.webp" },
  { code: "TRIO-C", image: "/catalog/deluxe-lake/trio-c.webp" },
  { code: "VARNA-C", image: "/catalog/deluxe-lake/varna-c.webp" },
];

const classicLacquerModels: readonly DoorModel[] = [
  { code: "LF 001", image: "/catalog/classic-lake/lf-001.webp" },
  { code: "LF 002", image: "/catalog/classic-lake/lf-002.webp" },
  { code: "LF 003", image: "/catalog/classic-lake/lf-003.webp" },
  { code: "LF 006", image: "/catalog/classic-lake/lf-006.webp" },
  { code: "LF 007", image: "/catalog/classic-lake/lf-007.webp" },
  { code: "LF 010", image: "/catalog/classic-lake/lf-010.webp" },
  { code: "LF 011", image: "/catalog/classic-lake/lf-011.webp" },
  { code: "LF 012", image: "/catalog/classic-lake/lf-012.webp" },
  { code: "LF 013", image: "/catalog/classic-lake/lf-013.webp" },
  { code: "LF 014", image: "/catalog/classic-lake/lf-014.webp" },
  { code: "LF 015", image: "/catalog/classic-lake/lf-015.webp" },
  { code: "LF 023", image: "/catalog/classic-lake/lf-023.webp" },
  { code: "LF 030", image: "/catalog/classic-lake/lf-030.webp" },
  { code: "LF 048", image: "/catalog/classic-lake/lf-048.webp" },
  { code: "LF 054", image: "/catalog/classic-lake/lf-054.webp" },
  { code: "LF 055", image: "/catalog/classic-lake/lf-055.webp" },
  { code: "LF 003-C", image: "/catalog/classic-lake/lf-003-c.webp" },
  { code: "LF 029-C", image: "/catalog/classic-lake/lf-029-c.webp" },
  { code: "LF 034-C", image: "/catalog/classic-lake/lf-034-c.webp" },
  { code: "LF 040-C", image: "/catalog/classic-lake/lf-040-c.webp" },
];

const pvcSeriesModels: readonly DoorModel[] = [
  { code: "PF 030_Y. MEŞE", image: "/catalog/pvc-serisi/pf-030-y-mese.webp" },
  { code: "PF 006_G. CEVİZ", image: "/catalog/pvc-serisi/pf-006-g-ceviz.webp" },
  { code: "PF 031_ANTİK CEVİZ", image: "/catalog/pvc-serisi/pf-031-antik-ceviz.webp" },
  { code: "PF 005_BAL TEAK", image: "/catalog/pvc-serisi/pf-005-bal-teak.webp" },
  { code: "PF 020_S. YOSUN", image: "/catalog/pvc-serisi/pf-020-s-yosun.webp" },
  { code: "PF 055_S. KAYA", image: "/catalog/pvc-serisi/pf-055-s-kaya.webp" },
  { code: "PF 027_BUZ GRİ", image: "/catalog/pvc-serisi/pf-027-buz-gri.webp" },
  { code: "PF 028 II_BEYAZ", image: "/catalog/pvc-serisi/pf-028-ii-beyaz.webp" },
  { code: "PF 046_FIRTINA GRİ", image: "/catalog/pvc-serisi/pf-046-firtina-gri.webp" },
  { code: "PF 032_KAYA GRİ", image: "/catalog/pvc-serisi/pf-032-kaya-gri.webp" },
  { code: "PF 036_KUM GRİ", image: "/catalog/pvc-serisi/pf-036-kum-gri.webp" },
  { code: "PF 030_FİLDİŞİ", image: "/catalog/pvc-serisi/pf-030-fildisi.webp" },
  { code: "PF 008_YENİ GRİ", image: "/catalog/pvc-serisi/pf-008-yeni-gri.webp" },
  { code: "PF 021_AYTAŞI", image: "/catalog/pvc-serisi/pf-021-aytasi.webp" },
  { code: "PF 014_GÖK GRİ", image: "/catalog/pvc-serisi/pf-014-gok-gri.webp" },
  { code: "P_RIVER_BEYAZ", image: "/catalog/pvc-serisi/p-river-beyaz.webp" },
  { code: "PF027 I-C_Y. MEŞE", image: "/catalog/pvc-serisi/pf027-i-c-y-mese.webp" },
  { code: "PF027 IV-C_G. CEVİZ", image: "/catalog/pvc-serisi/pf027-iv-c-g-ceviz.webp" },
  { code: "PF027 IV-CA_G. GRİ", image: "/catalog/pvc-serisi/pf027-iv-ca-g-gri.webp" },
  { code: "P_RIVER-C_BEYAZ", image: "/catalog/pvc-serisi/p-river-c-beyaz.webp" },
];

const melamineSeriesModels: readonly DoorModel[] = [
  { code: "ML 001-BEYAZ", image: "/catalog/melamin-serisi/ml-001-beyaz.webp" },
  { code: "ML 002-BEYAZ", image: "/catalog/melamin-serisi/ml-002-beyaz.webp" },
  { code: "ML 003-BEYAZ", image: "/catalog/melamin-serisi/ml-003-beyaz.webp" },
  { code: "ML 101-BEYAZ", image: "/catalog/melamin-serisi/ml-101-beyaz.webp" },
  { code: "ML 201-BEYAZ", image: "/catalog/melamin-serisi/ml-201-beyaz.webp" },
  { code: "ML 301-BEYAZ", image: "/catalog/melamin-serisi/ml-301-beyaz.webp" },
  { code: "ML 401-BEYAZ", image: "/catalog/melamin-serisi/ml-401-beyaz.webp" },
  { code: "ML 701-BEYAZ", image: "/catalog/melamin-serisi/ml-701-beyaz.webp" },
  { code: "ML 001-B. CEVİZ", image: "/catalog/melamin-serisi/ml-001-b-ceviz.webp" },
  { code: "ML 001-B. ANTİK", image: "/catalog/melamin-serisi/ml-001-b-antik.webp" },
  { code: "ML 001-AKMEŞE", image: "/catalog/melamin-serisi/ml-001-akmese.webp" },
  { code: "ML 001-BAŞAK", image: "/catalog/melamin-serisi/ml-001-basak.webp" },
  { code: "MB 001-CEVİZ", image: "/catalog/melamin-serisi/mb-001-ceviz.webp" },
  { code: "MB 001-BAMBU", image: "/catalog/melamin-serisi/mb-001-bambu.webp" },
  { code: "MB 001-TEAK", image: "/catalog/melamin-serisi/mb-001-teak.webp" },
  { code: "MB 001-BUZ MEŞE", image: "/catalog/melamin-serisi/mb-001-buz-mese.webp" },
  { code: "ML 001-CEVİZ", image: "/catalog/melamin-serisi/ml-001-ceviz.webp" },
  { code: "ML 001-ANTİK", image: "/catalog/melamin-serisi/ml-001-antik.webp" },
  { code: "ML 001-İBERYA", image: "/catalog/melamin-serisi/ml-001-iberya.webp" },
  { code: "MB 002-BUZ MEŞE", image: "/catalog/melamin-serisi/mb-002-buz-mese.webp" },
];

export const doorCollections: Record<DoorCollectionSlug, DoorCollection> = {
  "celik-kapi": {
    slug: "celik-kapi",
    copyKey: "steelDoor",
    cardImage: "/catalog/celik-kapi/kt-501.webp",
    mediaSlot: "aile-celik-kapi",
    models: steelDoorModels,
  },
  hemyuz: {
    slug: "hemyuz",
    copyKey: "flushEntrance",
    cardImage: "/catalog/hemyuz/hm-101.webp",
    mediaSlot: "aile-hemyuz",
    models: flushEntranceModels,
  },
  "aluminyum-giris": {
    slug: "aluminyum-giris",
    copyKey: "aluminumEntrance",
    cardImage: "/catalog/aluminyum-giris/alp-523.webp",
    mediaSlot: "aile-aluminyum-giris",
    models: aluminumEntranceModels,
  },
  "acil-cikis": {
    slug: "acil-cikis",
    copyKey: "emergencyExit",
    cardImage: "/catalog/acil-cikis/y-003.webp",
    mediaSlot: "aile-acil-cikis",
    models: emergencyExitModels,
  },
  "premium-lake": {
    slug: "premium-lake",
    copyKey: "premiumLacquer",
    cardImage: "/catalog/premium-lake/vega-i.webp",
    mediaSlot: "aile-premium-lake",
    models: premiumLacquerModels,
  },
  "deluxe-lake": {
    slug: "deluxe-lake",
    copyKey: "deluxeLacquer",
    cardImage: "/catalog/deluxe-lake/alaska.webp",
    mediaSlot: "aile-deluxe-lake",
    models: deluxeLacquerModels,
  },
  "classic-lake": {
    slug: "classic-lake",
    copyKey: "classicLacquer",
    cardImage: "/catalog/classic-lake/lf-011.webp",
    mediaSlot: "aile-classic-lake",
    models: classicLacquerModels,
  },
  "pvc-serisi": {
    slug: "pvc-serisi",
    copyKey: "pvcSeries",
    cardImage: "/catalog/pvc-serisi/pf-005-bal-teak.webp",
    mediaSlot: "aile-pvc-serisi",
    models: pvcSeriesModels,
  },
  "melamin-serisi": {
    slug: "melamin-serisi",
    copyKey: "melamineSeries",
    cardImage: "/catalog/melamin-serisi/ml-001-basak.webp",
    mediaSlot: "aile-melamin-serisi",
    models: melamineSeriesModels,
  },
};

export function isDoorCollectionSlug(value: string): value is DoorCollectionSlug {
  return doorCollectionSlugs.includes(value as DoorCollectionSlug);
}
