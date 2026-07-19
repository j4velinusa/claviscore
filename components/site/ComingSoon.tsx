import Link from "next/link";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";
import { type Locale, localePath } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/tr";

/** Henüz inşa edilmemiş public sayfalar için marka diline uygun geçici sayfa. */
export function ComingSoon({
  dict,
  locale,
  page,
}: {
  dict: Dictionary;
  locale: Locale;
  page: "katalog" | "koleksiyon";
}) {
  const t = dict.comingSoon[page];
  // Katalog sayfası katalog talebi, koleksiyon sayfası numune/kartela talebi konusuyla açar.
  const mailSubject = page === "koleksiyon" ? dict.mailSubject.sample : dict.mailSubject.catalog;
  return (
    <div className="overflow-x-clip min-h-dvh flex flex-col">
      <SiteNav dict={dict} locale={locale} />
      <main className="flex-1 flex items-center">
        <section className="mx-auto max-w-[760px] px-5 sm:px-8 py-24 text-center">
          <Reveal delay={60}>
            <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-bronze-2 mb-6">{t.kicker}</p>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="text-[clamp(40px,6.5vw,64px)] leading-[1.04] tracking-[-0.035em] font-bold">
              {t.title} <span className="font-serif italic font-medium">{t.accent}</span>
            </h1>
          </Reveal>
          <Reveal delay={250}>
            <p className="text-[clamp(16px,2.2vw,19px)] leading-[1.55] text-muted font-medium max-w-[520px] mx-auto mt-6">
              {t.description}
            </p>
          </Reveal>
          <Reveal delay={350}>
            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4 mt-9">
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(mailSubject)}`}
                className="text-[15px] font-semibold text-cream bg-ink px-[30px] py-3.5 rounded-full transition duration-[250ms] hover:bg-[#33291f] hover:-translate-y-0.5"
              >
                {dict.comingSoon.ctaEmail}
              </a>
              <Link
                href={localePath(locale, "/")}
                className="text-base font-semibold text-bronze-2 transition-opacity duration-[250ms] hover:opacity-65"
              >
                ‹&nbsp;{dict.comingSoon.back}
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
