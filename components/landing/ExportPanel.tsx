import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/site/Emphasis";
import { site } from "@/lib/site";
import { type Locale, localePath } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/tr";

export function ExportPanel({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.exportPanel;
  return (
    <section id="ihracat" className="mx-auto max-w-[1120px] px-5 sm:px-8 py-8 scroll-mt-20">
      <Reveal>
        <div className="bg-ink rounded-[28px] text-[#F4EEE2] px-7 py-12 sm:px-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-brass mb-6">{t.kicker}</p>
              <h2 className="text-[clamp(38px,5.5vw,54px)] font-bold tracking-[-0.035em] leading-[1.02]">
                <Emphasis parts={t.title} />
              </h2>
              <p className="text-[17px] leading-[1.6] text-[#B7AFA2] max-w-[400px] mt-6">{t.body}</p>
              <div className="flex flex-wrap items-center gap-x-[26px] gap-y-4 mt-9">
                <Link
                  href={localePath(locale, "/katalog")}
                  className="text-[15px] font-semibold text-ink bg-brass px-7 py-3.5 rounded-full transition duration-[250ms] hover:-translate-y-0.5 hover:brightness-[1.06]"
                >
                  {t.ctaCatalog}
                </Link>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(dict.mailSubject.distributor)}`}
                  className="text-[15px] font-semibold text-[#D8CDBB] transition-opacity duration-[250ms] hover:opacity-65"
                >
                  {t.ctaDistributor}&nbsp;›
                </a>
              </div>
            </div>
            <div>
              {t.regions.map((r, i) => (
                <div
                  key={r.name}
                  className={`flex justify-between items-center gap-4 py-[18px] ${i < t.regions.length - 1 ? "border-b border-white/10" : ""}`}
                >
                  <span className="text-base font-semibold">{r.name}</span>
                  <span className="font-mono text-xs text-[#9C957F] text-right">{r.codes}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
