import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries/get";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { incoterms, paymentTerms, type IncotermCode, type PaymentTermCode } from "@/lib/proforma";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/site/Emphasis";

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
    path: "/ihracat",
    title: dict.meta.ihracat.title,
    description: dict.meta.ihracat.description,
  });
}

export default async function IhracatPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.exportPage;
  // Bölgeler ana sayfadaki ihracat panelinden geliyor — tek kaynak, iki yerde
  // farklı ülke listesi olmasın.
  const regions = dict.exportPanel.regions;
  const quoteHref = `mailto:${site.email}?subject=${encodeURIComponent(dict.mailSubject.quote)}`;
  const distHref = `mailto:${site.email}?subject=${encodeURIComponent(dict.mailSubject.distributor)}`;

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
            <p className="text-[clamp(17px,2.3vw,19px)] leading-[1.6] text-muted font-medium mt-5 max-w-[600px]">
              {t.subtitle}
            </p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-14">
          <Reveal>
            <h2 className="text-[clamp(24px,3.4vw,30px)] font-bold tracking-[-0.03em] pb-4 border-b border-ink/10">
              {t.regionsTitle}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {regions.map((r) => (
                <div key={r.name} className="bg-white border border-ink/[0.08] rounded-[18px] px-5 py-5">
                  <div className="text-[17px] font-bold tracking-[-0.015em]">{r.name}</div>
                  <div className="font-mono text-[12px] text-bronze-2 mt-2">{r.codes}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-16">
          <Reveal>
            <h2 className="text-[clamp(24px,3.4vw,30px)] font-bold tracking-[-0.03em] pb-4 border-b border-ink/10">
              {t.packagingTitle}
            </h2>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {t.packaging.map((p, i) => (
                <li key={p.title} className="bg-paper rounded-[18px] px-5 py-5">
                  <div className="font-mono text-[11px] tracking-[0.12em] text-bronze-2">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="text-[17px] font-bold tracking-[-0.015em] mt-2">{p.title}</div>
                  <p className="text-[13.5px] leading-[1.55] text-muted mt-1.5 text-pretty">{p.desc}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-16">
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-10">
              <div>
                <h2 className="text-[clamp(24px,3.4vw,30px)] font-bold tracking-[-0.03em] pb-4 border-b border-ink/10">
                  {t.incotermsTitle}
                </h2>
                <dl className="mt-5 flex flex-col">
                  {(Object.keys(incoterms) as IncotermCode[]).map((c) => (
                    <div key={c} className="flex items-baseline gap-4 py-2.5 border-b border-ink/[0.06]">
                      <dt className="font-mono text-[13px] font-medium text-ink w-[52px] flex-none">{c}</dt>
                      <dd className="text-[14.5px] text-muted">{incoterms[c]}</dd>
                    </div>
                  ))}
                </dl>
                <p className="text-[13px] text-muted mt-4">{t.incotermsNote}</p>
              </div>
              <div>
                <h2 className="text-[clamp(24px,3.4vw,30px)] font-bold tracking-[-0.03em] pb-4 border-b border-ink/10">
                  {t.paymentTitle}
                </h2>
                <ul className="mt-5 flex flex-col">
                  {(Object.keys(paymentTerms) as PaymentTermCode[]).map((c) => (
                    <li key={c} className="py-2.5 border-b border-ink/[0.06] text-[14.5px]">
                      {paymentTerms[c][locale === "tr" ? "tr" : "en"]}
                    </li>
                  ))}
                </ul>
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
                <a
                  href={quoteHref}
                  className="text-sm font-semibold text-night bg-brass px-[26px] py-3.5 rounded-full transition duration-[250ms] hover:bg-[#D4B47D] hover:-translate-y-px"
                >
                  {t.ctaQuote}
                </a>
                <a
                  href={distHref}
                  className="text-[15px] font-semibold text-brass hover:opacity-70 transition-opacity"
                >
                  {t.ctaDistributor}&nbsp;›
                </a>
                <Link
                  href={localePath(locale, "/blog/incoterms-secimi")}
                  className="text-[15px] font-semibold text-[#B4AC9E] hover:text-brass transition-colors"
                >
                  FOB · CIF · EXW&nbsp;›
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
