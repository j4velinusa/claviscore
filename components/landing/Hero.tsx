import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/site/Emphasis";
import { site } from "@/lib/site";
import { type Locale, localePath } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/tr";

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.hero;
  return (
    <>
      <section className="mx-auto max-w-[920px] px-5 sm:px-8 pt-16 sm:pt-[100px] pb-14 text-center">
        <Reveal delay={60}>
          <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-bronze-2 mb-[26px]">{t.kicker}</p>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="text-[clamp(46px,8vw,84px)] leading-[1.02] tracking-[-0.04em] font-bold">
            <Emphasis parts={t.title} />
          </h1>
        </Reveal>
        <Reveal delay={250}>
          <p className="text-[clamp(17px,2.4vw,21px)] leading-[1.5] text-muted font-medium max-w-[640px] mx-auto mt-7">
            {t.subtitle}
          </p>
        </Reveal>
        <Reveal delay={350}>
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4 mt-[38px]">
            <Link
              href={localePath(locale, "/katalog")}
              className="text-[15px] font-semibold text-cream bg-ink px-[30px] py-3.5 rounded-full transition duration-[250ms] hover:bg-[#33291f] hover:-translate-y-0.5"
            >
              {t.ctaCatalog}
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="text-base font-semibold text-bronze-2 transition-opacity duration-[250ms] hover:opacity-65"
            >
              {t.ctaTeam}&nbsp;›
            </a>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pb-4">
        <Reveal delay={240}>
          <div className="relative h-[380px] sm:h-[540px] rounded-[28px] overflow-hidden [background:linear-gradient(160deg,#F1ECE2,#E6DFD1)] flex items-center justify-center">
            <div className="anim-spin-slow size-[280px] rounded-full border-[1.5px] border-ink/20 flex items-center justify-center">
              <div className="size-[168px] rounded-full border-[1.5px] border-ink/15 flex items-center justify-center">
                <div className="anim-breathe size-[60px] rounded-full bg-bronze/25 border border-bronze/55" />
              </div>
            </div>
            <div className="absolute bottom-7 left-8 font-mono text-[11px] text-[#8A7F6B] tracking-[0.06em]">
              {t.imageCaption}
            </div>
            <div className="absolute top-8 right-8 font-mono text-[11px] text-bronze-2 text-right leading-[1.9]">
              {t.specLines.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
