"use client";

import { Fragment, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/site/Emphasis";
import { ProductCard } from "@/components/katalog/ProductCard";
import { site } from "@/lib/site";
import { catalogTabs, filterProducts, type CatalogTab } from "@/lib/products";
import type { Dictionary } from "@/lib/dictionaries/tr";

const tabBase =
  "text-sm font-semibold px-5 py-[9px] rounded-full border transition duration-[250ms] ease-swift";
const tabOn = "bg-ink text-cream border-ink";
const tabOff = "bg-transparent text-ink-3 border-ink/[0.16] hover:border-ink/35 hover:text-ink";

/**
 * "{count} / {total} ürün gösteriliyor." şablonunu parçalayıp {count}'u vurgulu basar.
 * Şablon olarak tutuluyor çünkü İngilizcede kelime sırası farklı ("Showing X of Y").
 */
function Showing({ template, count, total }: { template: string; count: number; total: number }) {
  return (
    <>
      {template.split(/(\{count\}|\{total\})/).map((part, i) => (
        <Fragment key={i}>
          {part === "{count}" ? (
            <span className="text-ink font-semibold">{count}</span>
          ) : part === "{total}" ? (
            total
          ) : (
            part
          )}
        </Fragment>
      ))}
    </>
  );
}

export function Catalog({ dict }: { dict: Dictionary }) {
  const t = dict.katalog;
  const [tab, setTab] = useState<CatalogTab>("all");
  const list = filterProducts(tab);
  const total = filterProducts("all").length;
  const sampleHref = `mailto:${site.email}?subject=${encodeURIComponent(dict.mailSubject.sample)}`;

  return (
    <>
      <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-16 pb-9 text-center">
        <Reveal>
          <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-bronze-2">{t.kicker}</p>
          <h1 className="text-[clamp(40px,6.5vw,64px)] leading-[1.04] font-bold tracking-[-0.035em] mt-3.5">
            <Emphasis parts={t.title} />
          </h1>
          <p className="text-[clamp(16px,2.2vw,19px)] text-muted font-medium max-w-[480px] mx-auto mt-[18px]">
            {t.intro} <Showing template={t.showing} count={list.length} total={total} />
          </p>
        </Reveal>
      </section>

      {/* top-[71px] = SiteNav yüksekliği (py-4 + 38px içerik + 1px alt çizgi).
          Nav'ın dolgusu değişirse burası da değişmeli. */}
      <div className="sticky top-[71px] z-40 bg-cream/90 backdrop-blur-[18px] border-b border-ink/7">
        <div
          role="group"
          aria-label={t.filterLabel}
          className="mx-auto max-w-[1120px] px-5 sm:px-8 py-4 flex flex-wrap justify-center gap-2.5"
        >
          {catalogTabs.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setTab(c)}
              aria-pressed={c === tab}
              className={`${tabBase} ${c === tab ? tabOn : tabOff}`}
            >
              {t.categories[c]}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-9 pb-20">
        {list.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((p, i) => (
              <Reveal key={p.sku} delay={(i % 3) * 70} className="h-full">
                <ProductCard product={p} dict={dict} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted py-16">{t.empty}</p>
        )}

        <Reveal>
          <div className="bg-paper rounded-[22px] mt-9 px-6 sm:px-11 py-9 flex flex-col sm:flex-row items-center justify-between gap-6">
            <span className="text-base text-muted font-medium text-center sm:text-left">{t.oem.text}</span>
            <a
              href={sampleHref}
              className="flex-none text-[15px] font-semibold text-cream bg-ink px-7 py-[13px] rounded-full transition duration-[250ms] hover:bg-[#33291f] hover:-translate-y-0.5"
            >
              {t.oem.cta}
            </a>
          </div>
        </Reveal>
      </div>
    </>
  );
}
