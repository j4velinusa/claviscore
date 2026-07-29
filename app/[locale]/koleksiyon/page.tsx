import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries/get";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/site/Emphasis";
import { FinishExplorer } from "@/components/collection/FinishExplorer";

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
    path: "/koleksiyon",
    title: dict.meta.koleksiyon.title,
    description: dict.meta.koleksiyon.description,
  });
}

export default async function KoleksiyonPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.koleksiyonPage;
  const swatchHref = `mailto:${site.email}?subject=${encodeURIComponent(dict.mailSubject.sample)}`;

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

        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-12">
          <Reveal>
            <FinishExplorer dict={dict} locale={locale} />
          </Reveal>
        </section>

        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-16 pb-20">
          <Reveal>
            <div className="bg-paper rounded-[26px] px-8 py-10 sm:px-12 flex flex-col lg:flex-row lg:items-center gap-8 justify-between">
              <div className="max-w-[520px]">
                <h2 className="text-[clamp(24px,3.6vw,32px)] leading-[1.15] tracking-[-0.03em] font-bold text-pretty">
                  <Emphasis parts={t.swatchTitle} />
                </h2>
                <p className="text-[15.5px] leading-[1.65] text-muted mt-3 text-pretty">{t.swatchBody}</p>
              </div>
              <a
                href={swatchHref}
                className="flex-none self-start lg:self-auto text-[15px] font-semibold text-cream bg-ink px-[30px] py-3.5 rounded-full transition duration-[250ms] hover:bg-[#33291f] hover:-translate-y-0.5"
              >
                {t.swatchCta}
              </a>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
