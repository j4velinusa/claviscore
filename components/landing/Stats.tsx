import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/tr";

const valueClass = "text-[clamp(34px,4vw,46px)] font-bold tracking-[-0.03em]";
const labelClass = "text-[13px] text-muted mt-1.5 font-medium";

export function Stats({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.stats;
  return (
    <section className="mx-auto max-w-[1120px] px-5 sm:px-8 py-14">
      <Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 text-center">
          <div className="px-4 py-2">
            <CountUp value={40} suffix="+" locale={locale} className={valueClass} />
            <div className={labelClass}>{t.countries}</div>
          </div>
          <div className="px-4 py-2 border-l border-ink/10">
            <CountUp value={1200} suffix="+" locale={locale} className={valueClass} />
            <div className={labelClass}>{t.sku}</div>
          </div>
          <div className="px-4 py-2 lg:border-l border-ink/10">
            <div className={valueClass}>CE·TSE</div>
            <div className={labelClass}>{t.certified}</div>
          </div>
          <div className="px-4 py-2 border-l border-ink/10">
            <CountUp value={1976} group={false} locale={locale} className={valueClass} />
            <div className={labelClass}>{t.founded}</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
