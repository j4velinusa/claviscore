// Proforma sabitleri ve satıcı künyesi. İstemci-güvenli (fs/server-only yok) —
// hazırlayıcı tamamen tarayıcıda çalışıyor, belge tarayıcıdan PDF'e basılıyor.
//
// DOLDURULACAK: vergi no, Mersis ve banka bilgileri bilinmiyor. Boş bırakıldılar ve
// belgede "—" olarak görünüyorlar. Uydurma numara basılmış bir proforma gümrükte
// ve akreditif kontrolünde sorun çıkarır — bu yüzden bilinçli olarak boş.

import { site } from "@/lib/site";

export const seller = {
  name: site.legalNameUpper,
  legalName: site.legalName,
  address: site.addressFull,
  email: site.email,
  phone: site.phone,
  country: "Türkiye",
  /** Vergi kimlik numarası — DOLDUR */
  taxNo: "",
  /** Mersis numarası — DOLDUR */
  mersis: "",
} as const;

export const bank = {
  /** Banka ve şube adı — DOLDUR (ör. "Türkiye İş Bankası — Çerkezköy Şb.") */
  name: "",
  /** SWIFT/BIC — DOLDUR */
  swift: "",
} as const;

export type CurrencyCode = "EUR" | "USD" | "GBP";

export const currencies: Record<CurrencyCode, { symbol: string; label: string; iban: string }> = {
  // Her para birimi için ayrı hesap: IBAN'lar DOLDURULACAK.
  EUR: { symbol: "€", label: "EUR — Euro", iban: "" },
  USD: { symbol: "$", label: "USD — US Dollar", iban: "" },
  GBP: { symbol: "£", label: "GBP — Pound Sterling", iban: "" },
};

export type IncotermCode = "EXW" | "FOB" | "CFR" | "CIF" | "DAP" | "DDP";

export const incoterms: Record<IncotermCode, string> = {
  EXW: "Ex Works",
  FOB: "Free On Board",
  CFR: "Cost and Freight",
  CIF: "Cost, Insurance and Freight",
  DAP: "Delivered at Place",
  DDP: "Delivered Duty Paid",
};

export type PaymentTermCode = "tt100" | "tt3070" | "lc" | "lc60";

export const paymentTerms: Record<PaymentTermCode, { tr: string; en: string }> = {
  tt100: { tr: "%100 Peşin (T/T)", en: "100% Advance Payment (T/T)" },
  tt3070: {
    tr: "%30 Avans + %70 Sevkiyat Öncesi (T/T)",
    en: "30% Advance, 70% Before Shipment (T/T)",
  },
  lc: { tr: "Akreditif — Görüldüğünde", en: "Irrevocable L/C at Sight" },
  lc60: { tr: "Vadeli Akreditif — 60 Gün", en: "Deferred L/C — 60 Days" },
};

export type ProformaItem = {
  id: string;
  /** Katalog SKU'su veya serbest metin — kataloğa bağlı olmayan kalem de girilebilir. */
  code: string;
  name: string;
  hs: string;
  qty: number;
  unitPrice: number;
};

export type Buyer = {
  company: string;
  attn: string;
  address: string;
  country: string;
};

/** Belgede gösterilen para biçimi: her zaman en-US (uluslararası belge). */
export function money(n: number): string {
  return (Number.isFinite(n) ? n : 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function qty(n: number): string {
  return (Number.isFinite(n) ? n : 0).toLocaleString("en-US");
}

export function lineAmount(item: ProformaItem): number {
  return (Number(item.qty) || 0) * (Number(item.unitPrice) || 0);
}

export function totals(items: ProformaItem[], discountPct: number, freight: number) {
  const subtotal = items.reduce((a, it) => a + lineAmount(it), 0);
  const discount = subtotal * ((Number(discountPct) || 0) / 100);
  const freightNum = Number(freight) || 0;
  return { subtotal, discount, freight: freightNum, total: subtotal - discount + freightNum };
}

/** Belgede boş alanların uydurma değerle dolmaması için tek yerden geçen gösterim. */
export function orDash(value: string): string {
  return value.trim() === "" ? "—" : value;
}

/** PI-YYYY-NNNN. Sıra numarası kalıcı sayaç olmadığı için elle verilir/düzenlenir. */
export function suggestProformaNo(date: Date, sequence: number): string {
  return `PI-${date.getUTCFullYear()}-${String(sequence).padStart(4, "0")}`;
}
