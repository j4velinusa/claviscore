import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries/get";
import { buildMetadata } from "@/lib/metadata";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/site/Emphasis";
import { ProductionSteps, QualityTable } from "@/components/production/ProductionSections";
import {
  FactoryPlanSketch,
  FactoryHallSketch,
  LatheSketch,
  CeilingLineSketch,
} from "@/components/site/Illustrations";

// Hat çizimleri sözlükteki `production.lines` sırasını izler:
// 0 = Kilit & Donanım (torna), 1 = Tavan & Panel (T-profil + LED).
const lineSketches = [LatheSketch, CeilingLineSketch];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/uretim",
    title: dict.meta.uretim.title,
    description: dict.meta.uretim.description,
  });
}

export default async function UretimPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.production;

  return (
    <div className="overflow-x-clip min-h-dvh flex flex-col">
      <SiteNav dict={dict} locale={locale} />
      <main className="flex-1">
        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-[76px]">
          <Reveal>
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
              <div>
                <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-bronze-2">{t.kicker}</p>
                <h1 className="text-[clamp(38px,6.5vw,64px)] leading-[1.02] tracking-[-0.04em] font-bold mt-4 text-pretty">
                  <Emphasis parts={t.title} />
                </h1>
                <p className="text-[clamp(17px,2.3vw,19px)] leading-[1.6] text-muted font-medium mt-5 max-w-[620px]">
                  {t.subtitle}
                </p>
              </div>
              {/* Vaziyet planı: tasarımdaki hero çizimi. */}
              <div className="[background:linear-gradient(160deg,#F4F0E6,#EDE7DA)] rounded-[28px] px-7 py-8 sm:px-8">
                <FactoryPlanSketch dict={dict} />
                <p className="font-mono text-[11px] tracking-[0.08em] text-label mt-3 text-center">
                  {t.planCaption}
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-14">
          <Reveal>
            <h2 className="font-mono text-[11px] tracking-[0.14em] text-label pb-4 border-b border-ink/10">
              {t.linesLabel}
            </h2>
            {/* Tasarımdaki düzen: hat detayı solda, hattın çizimi sağda bir panelde.
                Çizim küçültülünce üzerindeki ölçü yazıları okunmaz oluyor — sütun dar tutulmuyor. */}
            <div className="flex flex-col gap-6 mt-6">
              {t.lines.map((line, i) => {
                const Sketch = lineSketches[i];
                return (
                  <div
                    key={line.name}
                    className="bg-white border border-ink/[0.08] rounded-[20px] px-6 py-6 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] gap-6 lg:gap-10 items-start"
                  >
                    <div>
                      <h3 className="text-[20px] font-bold tracking-[-0.02em]">{line.name}</h3>
                      <p className="text-[14px] leading-[1.55] text-muted mt-1.5 text-pretty">{line.desc}</p>
                      <ul className="mt-5 flex flex-col">
                        {line.machines.map((m) => (
                          <li
                            key={m.name}
                            className="flex items-baseline gap-3 py-2.5 border-t border-ink/[0.06]"
                          >
                            <span className="font-mono text-[13px] text-bronze-2 w-8 flex-none">{m.qty}</span>
                            <span className="flex-1 min-w-0">
                              <span className="text-[14px] font-semibold">{m.name}</span>
                              <span className="block text-[12.5px] text-muted mt-0.5">{m.note}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {Sketch && (
                      <div className="[background:linear-gradient(160deg,#F4F0E6,#EDE7DA)] rounded-[18px] px-6 py-6 max-w-[300px] w-full mx-auto lg:mx-0">
                        <Sketch dict={dict} />
                        <p className="font-mono text-[10.5px] tracking-[0.08em] text-label mt-3 text-center">
                          {line.caption}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-16">
          {/* Üretim holü: akış adımlarının geçtiği yer. Dekoratif, tasarımdaki fabrika turu çizimi. */}
          <Reveal>
            <div className="[background:linear-gradient(160deg,#F4F0E6,#EDE7DA)] rounded-[24px] px-6 py-8 sm:px-12 sm:py-10">
              <FactoryHallSketch className="max-w-[520px] mx-auto" />
            </div>
          </Reveal>
          <div className="pt-12">
            <ProductionSteps dict={dict} />
          </div>
        </section>

        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-16 pb-20">
          <QualityTable dict={dict} />
          <Reveal>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
              <Link
                href={localePath(locale, "/sertifikalar")}
                className="text-sm font-semibold text-bronze-2 hover:opacity-70 transition-opacity"
              >
                {dict.nav.certificates}&nbsp;›
              </Link>
              <Link
                href={localePath(locale, "/ihracat")}
                className="text-sm font-semibold text-bronze-2 hover:opacity-70 transition-opacity"
              >
                {dict.nav.export}&nbsp;›
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
