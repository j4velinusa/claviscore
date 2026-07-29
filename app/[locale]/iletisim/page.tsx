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
import { ContactForm } from "@/components/contact/ContactForm";

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
    path: "/iletisim",
    title: dict.meta.iletisim.title,
    description: dict.meta.iletisim.description,
  });
}

export default async function IletisimPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.contact;

  return (
    <div className="overflow-x-clip min-h-dvh flex flex-col">
      <SiteNav dict={dict} locale={locale} />
      <main className="flex-1">
        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-[76px]">
          <Reveal>
            <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-bronze-2">{t.kicker}</p>
            <h1 className="text-[clamp(38px,6.5vw,64px)] leading-[1.02] tracking-[-0.04em] font-bold mt-4 max-w-[780px] text-pretty">
              <Emphasis parts={t.title} />
            </h1>
            <p className="text-[clamp(17px,2.3vw,19px)] leading-[1.6] text-muted font-medium mt-5 max-w-[560px]">
              {t.subtitle}
            </p>
          </Reveal>
        </section>

        <div className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-10 pb-20">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
            <Reveal>
              <ContactForm dict={dict} />
            </Reveal>

            <Reveal delay={100} className="flex flex-col gap-[18px]">
              <div className="[background:linear-gradient(160deg,#F4F0E6,#EDE7DA)] rounded-[24px] px-[30px] py-7">
                <div className="font-mono text-[10.5px] tracking-[0.12em] text-bronze-2">
                  {t.info.addressLabel}
                </div>
                <div className="text-xl font-bold tracking-[-0.02em] mt-2.5">{site.addressShort}</div>
                <address className="not-italic text-[14.5px] leading-[1.6] text-[#5C564C] mt-1.5">
                  {site.addressFull}
                </address>
              </div>

              <div className="bg-white border border-ink/[0.08] rounded-[22px] px-[26px] py-6">
                <div className="font-mono text-[10.5px] tracking-[0.12em] text-label">
                  {t.info.linesLabel}
                </div>
                <div className="flex flex-col gap-3 mt-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[14.5px] font-semibold flex-none">{t.info.emailLabel}</span>
                    <a
                      href={`mailto:${site.email}`}
                      className="font-mono text-[13px] text-bronze-2 ml-auto text-right hover:opacity-70 transition-opacity break-all"
                    >
                      {site.email}
                    </a>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[14.5px] font-semibold flex-none">{t.info.phoneLabel}</span>
                    <a
                      href={`tel:${site.phone.replace(/\s/g, "")}`}
                      className="font-mono text-[13px] text-bronze-2 ml-auto text-right hover:opacity-70 transition-opacity"
                    >
                      {site.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-night rounded-[22px] px-7 py-[26px]">
                <div className="font-mono text-[10.5px] tracking-[0.12em] text-brass">
                  {t.info.promiseLabel}
                </div>
                <div className="flex items-baseline gap-2.5 mt-4">
                  <span className="text-[22px] font-extrabold tracking-[-0.02em] text-brass">
                    {t.info.promise}
                  </span>
                  <span className="text-[14.5px] font-semibold text-[#F6F0E4]">{t.info.promiseWhat}</span>
                </div>
                <p className="text-[13px] leading-[1.5] text-[#B4AC9E] mt-1.5">{t.info.promiseDesc}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
