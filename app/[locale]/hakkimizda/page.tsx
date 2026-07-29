import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries/get";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/site/Emphasis";
import { GrowthSketch } from "@/components/site/Illustrations";

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
    path: "/hakkimizda",
    title: dict.meta.hakkimizda.title,
    description: dict.meta.hakkimizda.description,
  });
}

export default async function HakkimizdaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.about;
  const contactHref = localePath(locale, "/iletisim");

  return (
    <div className="overflow-x-clip min-h-dvh flex flex-col">
      <SiteNav dict={dict} locale={locale} />
      <main className="flex-1">
        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-[76px]">
          <Reveal>
            <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-bronze-2">{t.kicker}</p>
            <h1 className="text-[clamp(38px,6.5vw,64px)] leading-[1.02] tracking-[-0.04em] font-bold mt-4 max-w-[820px] text-pretty">
              <Emphasis parts={t.title} />
            </h1>
            <p className="text-[clamp(17px,2.3vw,19px)] leading-[1.6] text-muted font-medium mt-5 max-w-[640px]">
              {t.subtitle}
            </p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-14">
          <Reveal>
            <div className="font-mono text-[11px] tracking-[0.14em] text-label pb-4 border-b border-ink/10">
              {t.statsLabel}
            </div>
            <dl className="grid grid-cols-2 lg:grid-cols-5 gap-y-8 gap-x-4 mt-8">
              {t.stats.map((s) => (
                <div key={s.label} className="text-center">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <div className="text-[clamp(26px,3.4vw,36px)] font-bold tracking-[-0.03em]">{s.value}</div>
                    <div className="text-[13px] text-muted mt-1.5 font-medium">{s.label}</div>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-16">
          <Reveal>
            <div className="grid lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
              <div>
                <h2 className="text-[clamp(28px,4.4vw,42px)] leading-[1.1] tracking-[-0.035em] font-bold text-pretty">
                  <Emphasis parts={t.storyTitle} />
                </h2>
                {/* Atölye → tesis → fabrika: tasarımdaki büyüme çizimi. */}
                <GrowthSketch className="mt-8 max-w-[340px]" />
              </div>
              <div className="flex flex-col gap-5">
                {t.story.map((p, i) => (
                  <p key={i} className="text-[clamp(16px,2.1vw,18px)] leading-[1.75] text-ink-2 text-pretty">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-16 pb-20">
          <Reveal>
            <div className="bg-night rounded-[28px] px-8 py-12 sm:px-14">
              <h2 className="text-[clamp(26px,4vw,38px)] leading-[1.1] tracking-[-0.03em] font-bold text-[#F4EEE2] max-w-[520px] text-pretty">
                <Emphasis parts={t.ctaTitle} />
              </h2>
              <p className="text-base leading-[1.6] text-[#B4AC9E] mt-4 max-w-[520px]">{t.ctaBody}</p>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-4 mt-8">
                <Link
                  href={contactHref}
                  className="text-sm font-semibold text-night bg-brass px-[26px] py-3.5 rounded-full transition duration-[250ms] hover:bg-[#D4B47D] hover:-translate-y-px"
                >
                  {t.ctaContact}
                </Link>
                <Link
                  href={localePath(locale, "/ihracat")}
                  className="text-[15px] font-semibold text-brass hover:opacity-70 transition-opacity"
                >
                  {t.ctaExport}&nbsp;›
                </Link>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(dict.mailSubject.distributor)}`}
                  className="text-[15px] font-semibold text-[#B4AC9E] hover:text-brass transition-colors"
                >
                  {dict.exportPanel.ctaDistributor}&nbsp;›
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
