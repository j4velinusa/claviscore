import { Reveal } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/site/Emphasis";
import { site } from "@/lib/site";
import type { Dictionary } from "@/lib/dictionaries/tr";

export function ClosingCta({ dict }: { dict: Dictionary }) {
  const t = dict.closing;
  return (
    <section id="teklif" className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-20 pb-24 text-center scroll-mt-20">
      <Reveal>
        <h2 className="text-[clamp(38px,5.5vw,54px)] font-bold tracking-[-0.035em] leading-[1.04]">
          <Emphasis parts={t.title} />
        </h2>
        <p className="text-[clamp(16px,2.2vw,19px)] text-muted font-medium max-w-[460px] mx-auto mt-[22px]">{t.body}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-[26px] gap-y-4 mt-9">
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent(dict.mailSubject.quote)}`}
            className="text-base font-semibold text-cream bg-ink px-[38px] py-4 rounded-full transition duration-[250ms] hover:bg-[#33291f] hover:-translate-y-0.5"
          >
            {t.cta}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="text-base font-semibold text-bronze-2 transition-opacity duration-[250ms] hover:opacity-65"
          >
            {site.email}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
