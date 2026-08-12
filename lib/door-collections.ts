export const doorCollectionSlugs = ["celik-kapi", "pvc-serisi"] as const;

export type DoorCollectionSlug = (typeof doorCollectionSlugs)[number];
export type DoorCollectionCopyKey = "steelDoor" | "pvcSeries";

export type DoorModel = {
  code: string;
  image: string;
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

export const doorCollections: Record<DoorCollectionSlug, DoorCollection> = {
  "celik-kapi": {
    slug: "celik-kapi",
    copyKey: "steelDoor",
    cardImage: "/catalog/celik-kapi/kt-501.webp",
    mediaSlot: "aile-celik-kapi",
    models: steelDoorModels,
  },
  "pvc-serisi": {
    slug: "pvc-serisi",
    copyKey: "pvcSeries",
    cardImage: "/catalog/pvc-serisi/pf-005-bal-teak.webp",
    mediaSlot: "aile-pvc-serisi",
    models: pvcSeriesModels,
  },
};

export function isDoorCollectionSlug(value: string): value is DoorCollectionSlug {
  return doorCollectionSlugs.includes(value as DoorCollectionSlug);
}
