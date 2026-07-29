"use client";

import Link from "next/link";
import { useState } from "react";
import { finishKeys, FINISH, productsWithFinish, type FinishKey } from "@/lib/products";
import { type Locale, localePath } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/tr";

/**
 * Kaplama seçici. Ürün listesi katalogdan TÜRETİLİYOR (productsWithFinish) —
 * ayrı bir koleksiyon listesi tutulsaydı katalog değiştikçe ikisi ayrışırdı.
 */
export function FinishExplorer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.koleksiyonPage;
  const [active, setActive] = useState<FinishKey>("brass");
  const shown = productsWithFinish(active);
  const copy = t.finishes[active];

  return (
    <>
      <div role="group" aria-label={t.finishesLabel} className="flex flex-wrap gap-3">
        {finishKeys.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setActive(k)}
            aria-pressed={k === active}
            className={`flex items-center gap-2.5 pl-2.5 pr-4 py-2 rounded-full border transition duration-[250ms] ease-swift ${
              k === active
                ? "bg-ink text-cream border-ink"
                : "bg-white text-ink-3 border-ink/[0.14] hover:border-ink/35"
            }`}
          >
            <span
              aria-hidden
              className="size-5 rounded-full border border-black/[0.16]"
              style={{ background: FINISH[k] }}
            />
            <span className="text-[13.5px] font-semibold">{t.finishes[k].name}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 grid lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] gap-10 items-start">
        <div className="rounded-[24px] overflow-hidden border border-ink/[0.08]">
          <div
            aria-hidden
            className="h-[200px] sm:h-[260px] transition-colors duration-500"
            style={{ background: FINISH[active] }}
          />
          <div className="bg-white px-6 py-6">
            <div className="text-[22px] font-bold tracking-[-0.02em]">{copy.name}</div>
            <p className="text-sm leading-[1.6] text-muted mt-2 text-pretty">{copy.note}</p>
            <div className="font-mono text-[11px] text-label mt-4">{FINISH[active].toUpperCase()}</div>
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-ink/10">
            <h2 className="font-mono text-[11px] tracking-[0.14em] text-label">{t.productsLabel}</h2>
            <span className="font-mono text-[11px] text-muted">
              {shown.length} {t.countSuffix}
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mt-5">
            {shown.map((p) => {
              const c = dict.katalog.products[p.sku as keyof typeof dict.katalog.products];
              return (
                <div key={p.sku} className="bg-white border border-ink/[0.08] rounded-[18px] px-5 py-5">
                  <div className="font-mono text-[11px] tracking-[0.06em] text-bronze-2">{p.sku}</div>
                  <div className="text-[17px] font-bold tracking-[-0.015em] mt-1.5">{c.name}</div>
                  <p className="text-[13.5px] leading-[1.55] text-muted mt-1.5 text-pretty">{c.desc}</p>
                  <div className="font-mono text-[11px] text-muted mt-3">{c.spec}</div>
                </div>
              );
            })}
          </div>
          <Link
            href={localePath(locale, "/katalog")}
            className="inline-block mt-6 text-sm font-semibold text-bronze-2 hover:opacity-70 transition-opacity"
          >
            {t.catalogCta}&nbsp;›
          </Link>
        </div>
      </div>
    </>
  );
}
