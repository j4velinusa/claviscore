// Sertifika kayıtları. Dilden bağımsız yapısal veri; başlık/açıklama sözlükte.
//
// DOLDURULACAK: belge numarası, veren kuruluş ve geçerlilik tarihi biliniyor değil,
// bu yüzden boş. Sayfada "—" olarak görünüyorlar ve ziyaretçiye belgeyi e-postayla
// isteme yolu sunuluyor. Uydurma belge numarası/tarih yayınlamak müşterinin ve
// gümrüğün dayandığı bir bilgiyi yanlış vermek olur — bilinçli olarak boş.
//
// Tasarımdaki 12 kayıt (EN 1627 çelik kapı, EN 13501 duvar kaplama, ASTM G154 vb.)
// alınmadı: hem numaraları uydurmaydı hem de bu ürün hatları katalogda yok.

export const certificateGroups = ["system", "hardware", "ceiling"] as const;
export type CertificateGroup = (typeof certificateGroups)[number];

export type Certificate = {
  /** Sözlükteki metinlere ve React key'ine karşılık gelen kimlik. */
  key: string;
  group: CertificateGroup;
  /** Standart/belge kodu — kamuya açık, uydurma değil. */
  standard: string;
  /** Belgeyi veren kuruluş. Boşsa sayfada "—". */
  issuer: string;
  /** Geçerlilik bitişi (AA.YYYY). Boşsa "—". */
  validUntil: string;
  /** Belge numarası. Boşsa "—". */
  documentNo: string;
};

export const certificates: readonly Certificate[] = [
  { key: "iso9001", group: "system", standard: "ISO 9001", issuer: "", validUntil: "", documentNo: "" },
  { key: "tse", group: "system", standard: "TSE", issuer: "", validUntil: "", documentNo: "" },
  { key: "ce", group: "hardware", standard: "CE / DoP", issuer: "", validUntil: "", documentNo: "" },
];

/** Boş alanlar için tek yerden geçen gösterim — uydurma değer yerine tire. */
export function orDash(value: string): string {
  return value.trim() === "" ? "—" : value;
}
