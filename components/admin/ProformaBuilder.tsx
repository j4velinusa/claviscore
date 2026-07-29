"use client";

import { useState } from "react";
import {
  seller,
  bank,
  currencies,
  incoterms,
  paymentTerms,
  money,
  qty as fmtQty,
  lineAmount,
  totals,
  orDash,
  type CurrencyCode,
  type IncotermCode,
  type PaymentTermCode,
  type ProformaItem,
  type Buyer,
} from "@/lib/proforma";
import { products } from "@/lib/products";

const label = "font-mono text-[10px] tracking-[0.1em] text-label";
const field =
  "w-full mt-1.5 bg-white border border-ink/[0.14] rounded-lg px-3 py-2 text-[13px] outline-none focus:border-bronze transition-colors";

let seq = 0;
const newId = () => `it-${++seq}`;

export function ProformaBuilder({ today }: { today: string }) {
  const [no, setNo] = useState("PI-0000-0000");
  const [date, setDate] = useState(today);
  const [validity, setValidity] = useState(30);
  const [currency, setCurrency] = useState<CurrencyCode>("EUR");
  const [buyer, setBuyer] = useState<Buyer>({ company: "", attn: "", address: "", country: "" });
  const [items, setItems] = useState<ProformaItem[]>([]);
  const [discountPct, setDiscountPct] = useState(0);
  const [freight, setFreight] = useState(0);
  const [incoterm, setIncoterm] = useState<IncotermCode>("FOB");
  const [portLoad, setPortLoad] = useState("");
  const [portDisch, setPortDisch] = useState("");
  const [payment, setPayment] = useState<PaymentTermCode>("tt3070");
  const [notes, setNotes] = useState("");

  const cur = currencies[currency];
  const t = totals(items, discountPct, freight);

  const addItem = (code = "", name = "") =>
    setItems((prev) => [...prev, { id: newId(), code, name, hs: "", qty: 0, unitPrice: 0 }]);

  const setItem = (id: string, patch: Partial<ProformaItem>) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));

  const removeItem = (id: string) => setItems((prev) => prev.filter((it) => it.id !== id));

  return (
    <div className="grid lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] gap-8 items-start">
      {/* ---------- FORM ---------- */}
      <section className="pf-hide-print flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label} htmlFor="p-no">
              PROFORMA NO
            </label>
            <input id="p-no" className={`${field} font-mono`} value={no} onChange={(e) => setNo(e.target.value)} />
          </div>
          <div>
            <label className={label} htmlFor="p-date">
              TARİH
            </label>
            <input id="p-date" type="date" className={field} value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label className={label} htmlFor="p-val">
              GEÇERLİLİK (GÜN)
            </label>
            <input
              id="p-val"
              type="number"
              min={1}
              className={field}
              value={validity}
              onChange={(e) => setValidity(Number(e.target.value))}
            />
          </div>
          <div>
            <label className={label} htmlFor="p-cur">
              PARA BİRİMİ
            </label>
            <select
              id="p-cur"
              className={field}
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            >
              {(Object.keys(currencies) as CurrencyCode[]).map((c) => (
                <option key={c} value={c}>
                  {currencies[c].label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div className={`${label} mb-1`}>ALICI</div>
          <input
            className={field}
            placeholder="Firma"
            value={buyer.company}
            onChange={(e) => setBuyer({ ...buyer, company: e.target.value })}
          />
          <input
            className={field}
            placeholder="İlgili kişi (Attn:)"
            value={buyer.attn}
            onChange={(e) => setBuyer({ ...buyer, attn: e.target.value })}
          />
          <input
            className={field}
            placeholder="Adres"
            value={buyer.address}
            onChange={(e) => setBuyer({ ...buyer, address: e.target.value })}
          />
          <input
            className={field}
            placeholder="Ülke"
            value={buyer.country}
            onChange={(e) => setBuyer({ ...buyer, country: e.target.value })}
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className={label}>KALEMLER · {items.length}</span>
            <div className="flex gap-2">
              <select
                aria-label="Katalogdan ekle"
                className="text-[12px] border border-ink/[0.14] rounded-full px-3 py-1.5 bg-white outline-none focus:border-bronze"
                value=""
                onChange={(e) => {
                  const p = products.find((x) => x.sku === e.target.value);
                  if (p) addItem(p.sku, "");
                }}
              >
                <option value="">Katalogdan ekle…</option>
                {products.map((p) => (
                  <option key={p.sku} value={p.sku}>
                    {p.sku}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => addItem()}
                className="text-[12px] font-semibold border border-ink/[0.14] rounded-full px-3 py-1.5 hover:border-ink/35 transition-colors"
              >
                Boş satır
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2.5">
            {items.map((it) => (
              <div key={it.id} className="bg-white border border-ink/[0.1] rounded-xl p-3">
                <div className="grid grid-cols-[80px_minmax(0,1fr)_28px] gap-2">
                  <input
                    className="font-mono text-[12px] border-b border-ink/10 outline-none focus:border-bronze py-1"
                    placeholder="SKU"
                    value={it.code}
                    onChange={(e) => setItem(it.id, { code: e.target.value })}
                  />
                  <input
                    className="text-[12.5px] border-b border-ink/10 outline-none focus:border-bronze py-1"
                    placeholder="Ürün açıklaması (belgeye basılır)"
                    value={it.name}
                    onChange={(e) => setItem(it.id, { name: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(it.id)}
                    aria-label="Kalemi sil"
                    className="text-muted hover:text-[#B4503F] transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2.5">
                  <input
                    className="font-mono text-[12px] border-b border-ink/10 outline-none focus:border-bronze py-1"
                    placeholder="GTİP / HS"
                    value={it.hs}
                    onChange={(e) => setItem(it.id, { hs: e.target.value })}
                  />
                  <input
                    type="number"
                    min={0}
                    className="font-mono text-[12px] border-b border-ink/10 outline-none focus:border-bronze py-1"
                    placeholder="Adet"
                    value={it.qty || ""}
                    onChange={(e) => setItem(it.id, { qty: Number(e.target.value) })}
                  />
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    className="font-mono text-[12px] border-b border-ink/10 outline-none focus:border-bronze py-1"
                    placeholder="Birim fiyat"
                    value={it.unitPrice || ""}
                    onChange={(e) => setItem(it.id, { unitPrice: Number(e.target.value) })}
                  />
                </div>
                <div className="text-right font-mono text-[11.5px] text-muted mt-2">
                  {cur.symbol} {money(lineAmount(it))}
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <p className="text-[12.5px] text-muted py-4 text-center">Henüz kalem yok.</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label} htmlFor="p-disc">
              İSKONTO (%)
            </label>
            <input
              id="p-disc"
              type="number"
              min={0}
              max={100}
              className={field}
              value={discountPct || ""}
              onChange={(e) => setDiscountPct(Number(e.target.value))}
            />
          </div>
          <div>
            <label className={label} htmlFor="p-freight">
              NAVLUN ({incoterm})
            </label>
            <input
              id="p-freight"
              type="number"
              min={0}
              className={field}
              value={freight || ""}
              onChange={(e) => setFreight(Number(e.target.value))}
            />
          </div>
          <div>
            <label className={label} htmlFor="p-inco">
              INCOTERM
            </label>
            <select
              id="p-inco"
              className={field}
              value={incoterm}
              onChange={(e) => setIncoterm(e.target.value as IncotermCode)}
            >
              {(Object.keys(incoterms) as IncotermCode[]).map((c) => (
                <option key={c} value={c}>
                  {c} — {incoterms[c]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="p-pay">
              ÖDEME
            </label>
            <select
              id="p-pay"
              className={field}
              value={payment}
              onChange={(e) => setPayment(e.target.value as PaymentTermCode)}
            >
              {(Object.keys(paymentTerms) as PaymentTermCode[]).map((c) => (
                <option key={c} value={c}>
                  {paymentTerms[c].tr}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="p-pl">
              YÜKLEME LİMANI
            </label>
            <input id="p-pl" className={field} value={portLoad} onChange={(e) => setPortLoad(e.target.value)} />
          </div>
          <div>
            <label className={label} htmlFor="p-pd">
              VARIŞ LİMANI
            </label>
            <input id="p-pd" className={field} value={portDisch} onChange={(e) => setPortDisch(e.target.value)} />
          </div>
        </div>

        <div>
          <label className={label} htmlFor="p-notes">
            NOTLAR
          </label>
          <textarea
            id="p-notes"
            className={`${field} min-h-[80px] resize-y leading-[1.6]`}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="text-[13.5px] font-semibold text-cream bg-ink px-5 py-2.5 rounded-full transition hover:bg-[#33291f] self-start"
        >
          PDF olarak yazdır
        </button>
      </section>

      {/* ---------- A4 ÖNİZLEME ---------- */}
      <section>
        <div className="pf-hide-print flex items-center justify-between pb-2.5 mb-3 border-b border-ink/10">
          <span className="font-mono text-[11px] tracking-[0.1em] text-muted">BELGE ÖNİZLEME · A4</span>
          <span className="font-mono text-[11px] text-muted">
            {no} · {date}
          </span>
        </div>

        <div className="pf-sheet bg-white [box-shadow:0_1px_2px_rgba(0,0,0,.06),0_30px_60px_-34px_rgba(0,0,0,.4)] px-8 py-10 sm:px-[54px] sm:pt-[52px] sm:pb-[46px] text-ink">
          <header className="flex items-start justify-between gap-6 pb-[22px] border-b-2 border-ink">
            <div>
              <div className="flex items-center gap-2">
                <span className="size-[9px] rounded-full bg-brass" aria-hidden />
                <span className="text-[23px] font-extrabold tracking-[-0.02em]">{seller.name}</span>
              </div>
              <div className="text-[11.5px] text-[#5C564C] leading-[1.65] mt-2.5">
                {seller.legalName}
                <br />
                {seller.address}
                <br />
                Vergi No: {orDash(seller.taxNo)} · Mersis: {orDash(seller.mersis)}
                <br />
                {seller.email} · {seller.phone}
              </div>
            </div>
            <div className="text-right flex-none">
              <div className="font-serif text-[27px] font-medium tracking-[-0.01em] leading-none">Proforma</div>
              <div className="font-mono text-xs tracking-[0.24em] text-bronze mt-[5px]">INVOICE</div>
              <div className="mt-4 text-[11.5px] text-[#5C564C] leading-[1.9]">
                <div>
                  <span className="text-muted">No</span>&nbsp;&nbsp;<span className="font-mono">{no}</span>
                </div>
                <div>
                  <span className="text-muted">Date</span>&nbsp;&nbsp;<span className="font-mono">{date}</span>
                </div>
                <div>
                  <span className="text-muted">Valid</span>&nbsp;&nbsp;
                  <span className="font-mono">{validity} days</span>
                </div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-2 gap-8 py-[22px] border-b border-ink/[0.12]">
            <div>
              <div className="font-mono text-[10px] tracking-[0.14em] text-bronze mb-2">SELLER / EXPORTER</div>
              <div className="text-sm font-bold tracking-[-0.01em]">{seller.legalName}</div>
              <div className="text-[11.5px] text-[#5C564C] leading-[1.65] mt-1">
                {seller.address}
                <br />
                {seller.country}
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.14em] text-bronze mb-2">BUYER / IMPORTER</div>
              <div className="text-sm font-bold tracking-[-0.01em]">{orDash(buyer.company)}</div>
              <div className="text-[11.5px] text-[#5C564C] leading-[1.65] mt-1">
                {buyer.attn && (
                  <>
                    {buyer.attn}
                    <br />
                  </>
                )}
                {buyer.address}
                {buyer.address && <br />}
                {buyer.country}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-ink/10 border border-ink/10 rounded-[9px] overflow-hidden my-[22px]">
            {[
              ["INCOTERMS® 2020", incoterm],
              ["PORT OF LOADING", orDash(portLoad)],
              ["PORT OF DISCHARGE", orDash(portDisch)],
              ["ORIGIN", seller.country],
            ].map(([k, v]) => (
              <div key={k} className="bg-cream px-[13px] py-[11px] min-w-0">
                <div className="font-mono text-[9.5px] tracking-[0.08em] text-muted">{k}</div>
                <div className="text-[12.5px] font-bold mt-[3px] truncate">{v}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[22px_minmax(0,1fr)_58px_46px_64px_78px] gap-2.5 pb-2.5 border-b-[1.5px] border-ink font-mono text-[9.5px] tracking-[0.06em] text-muted">
            <div>#</div>
            <div>DESCRIPTION</div>
            <div>HS CODE</div>
            <div className="text-right">QTY</div>
            <div className="text-right">UNIT</div>
            <div className="text-right">AMOUNT</div>
          </div>
          {items.map((it, i) => (
            <div
              key={it.id}
              className="grid grid-cols-[22px_minmax(0,1fr)_58px_46px_64px_78px] gap-2.5 py-[11px] border-b border-ink/8 items-baseline"
            >
              <div className="font-mono text-xs text-muted">{i + 1}</div>
              <div className="min-w-0">
                <div className="text-[12.5px] font-semibold tracking-[-0.01em]">{orDash(it.name)}</div>
                <div className="font-mono text-[10.5px] text-muted mt-px">{it.code}</div>
              </div>
              <div className="font-mono text-[11px] text-[#5C564C]">{orDash(it.hs)}</div>
              <div className="text-right font-mono text-[11.5px]">{fmtQty(it.qty)}</div>
              <div className="text-right font-mono text-[11.5px]">{money(it.unitPrice)}</div>
              <div className="text-right font-mono text-[11.5px] font-medium">{money(lineAmount(it))}</div>
            </div>
          ))}

          <div className="flex justify-end mt-5">
            <div className="w-[290px]">
              <div className="flex justify-between py-[7px] text-[12.5px] text-[#5C564C]">
                <span>Subtotal</span>
                <span className="font-mono text-ink">
                  {cur.symbol} {money(t.subtotal)}
                </span>
              </div>
              {t.discount > 0 && (
                <div className="flex justify-between py-[7px] text-[12.5px] text-[#5C564C]">
                  <span>Discount ({discountPct}%)</span>
                  <span className="font-mono text-[#B4503F]">
                    − {cur.symbol} {money(t.discount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between py-[7px] text-[12.5px] text-[#5C564C] border-b border-ink/[0.12]">
                <span>Freight ({incoterm})</span>
                <span className="font-mono text-ink">
                  + {cur.symbol} {money(t.freight)}
                </span>
              </div>
              <div className="flex items-baseline justify-between pt-3.5">
                <span className="text-[13px] font-bold tracking-[0.02em]">TOTAL</span>
                <span className="font-mono text-xl font-medium tracking-[-0.01em]">
                  {cur.symbol} {money(t.total)}
                </span>
              </div>
              <div className="text-right text-[10.5px] text-muted mt-[3px]">{cur.label}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-7 mt-[30px] pt-[22px] border-t border-ink/[0.12]">
            <div>
              <div className="font-mono text-[10px] tracking-[0.12em] text-bronze mb-2.5">TERMS</div>
              <div className="text-[11.5px] leading-[1.85] text-ink-2">
                <div>
                  <span className="text-muted">Payment</span> — {paymentTerms[payment].en}
                </div>
                <div>
                  <span className="text-muted">Delivery</span> — {incoterms[incoterm]} ({incoterm})
                </div>
                <div>
                  <span className="text-muted">Validity</span> — {validity} days from issue date
                </div>
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.12em] text-bronze mb-2.5">BANK DETAILS</div>
              <div className="text-[11.5px] leading-[1.85] text-ink-2">
                <div>{orDash(bank.name)}</div>
                <div>
                  <span className="text-muted">IBAN</span> <span className="font-mono">{orDash(cur.iban)}</span>
                </div>
                <div>
                  <span className="text-muted">SWIFT</span> <span className="font-mono">{orDash(bank.swift)}</span>
                </div>
              </div>
            </div>
          </div>

          {notes.trim() && (
            <div className="mt-6 bg-cream rounded-[9px] px-[15px] py-[13px]">
              <div className="font-mono text-[9.5px] tracking-[0.1em] text-muted mb-[5px]">NOTES</div>
              <div className="text-[11.5px] leading-[1.6] text-ink-2 whitespace-pre-wrap">{notes}</div>
            </div>
          )}

          <div className="flex justify-between items-end gap-6 mt-[38px]">
            <div className="text-[10.5px] text-muted leading-[1.6] max-w-[320px]">
              This is a proforma invoice for customs and payment reference only. It is not a demand for
              payment. Prices in {cur.label}.
            </div>
            <div className="text-center flex-none">
              <div className="w-[180px] border-b border-ink pb-[34px]" />
              <div className="text-[11.5px] font-bold mt-2">{seller.name}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
