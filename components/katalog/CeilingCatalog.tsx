import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/site/Emphasis";
import { ceilingSystems, type CeilingVisualLabelKey } from "@/lib/ceiling-systems";
import type { Dictionary } from "@/lib/dictionaries/tr";
import { type Locale, localePath } from "@/lib/i18n";
import { site } from "@/lib/site";

const containLabels = new Set<CeilingVisualLabelKey>([
  "systemDetail",
  "carrierDetail",
  "sectionDetail",
  "woodProfileDetail",
  "vectorialDetail",
  "standardCarrier",
  "groovedCarrier",
]);

const patternLabels = new Set<CeilingVisualLabelKey>([
  "aluminumPattern",
  "steelPattern",
  "stainlessPattern",
  "patternReference",
]);

function countLabel(template: string, count: number): string {
  return template.replace("{count}", String(count));
}

export function CeilingCatalog({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.ceilingCatalog;
  const hero = ceilingSystems.find((system) => system.copyKey === "baffleVectorial")?.cardImage;
  const quoteHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `${dict.mailSubject.quote} — ${t.breadcrumbCatalog}`,
  )}`;

  return (
    <>
      <section className="overflow-hidden bg-ink text-[#F4EEE2]">
        <div className="mx-auto grid max-w-[1120px] lg:grid-cols-[1.03fr_.97fr]">
          <div className="px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#AFA79A]">
              <Link href={localePath(locale, "/")} className="transition-colors hover:text-brass">
                {t.breadcrumbHome}
              </Link>
              <span aria-hidden>/</span>
              <span>{t.breadcrumbCatalog}</span>
            </nav>

            <Reveal delay={40}>
              <p className="mt-9 text-[12px] font-semibold tracking-[0.14em] uppercase text-brass">{t.kicker}</p>
              <h1 className="mt-4 max-w-[690px] text-[clamp(42px,6.8vw,72px)] font-bold leading-[.98] tracking-[-0.045em]">
                <Emphasis parts={t.title} />
              </h1>
              <p className="mt-7 max-w-[650px] text-[16px] leading-[1.7] text-[#C9C1B4] sm:text-[18px]">{t.intro}</p>
              <div className="mt-8 inline-flex rounded-full border border-white/15 px-4 py-2 font-mono text-[10px] tracking-[0.07em] uppercase text-[#D8CDBD]">
                {t.systemCount}
              </div>
            </Reveal>
          </div>

          <div className="relative min-h-[360px] overflow-hidden lg:min-h-[610px]">
            {hero && (
              <Image
                src={hero}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 544px, 100vw"
                quality={92}
                className="object-cover"
              />
            )}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/45 via-transparent to-transparent lg:from-ink/25" />
            <span aria-hidden className="absolute bottom-5 right-6 font-mono text-[120px] leading-none text-white/[0.09] sm:text-[170px]">
              09
            </span>
          </div>
        </div>
      </section>

      <nav aria-label={t.jumpLabel} className="border-b border-ink/8 bg-cream">
        <div className="mx-auto max-w-[1120px] px-5 py-7 sm:px-8">
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-label">{t.jumpLabel}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {ceilingSystems.map((system, index) => (
              <a
                key={system.slug}
                href={`#${system.slug}`}
                className="rounded-full border border-ink/12 bg-white px-3.5 py-2 text-[12px] font-semibold transition hover:-translate-y-0.5 hover:border-ink/30"
              >
                <span className="mr-1.5 font-mono text-[9px] text-bronze-2">{String(index + 1).padStart(2, "0")}</span>
                {t.systems[system.copyKey].title}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        {ceilingSystems.map((system) => {
          const copy = t.systems[system.copyKey];

          return (
            <section
              key={system.slug}
              id={system.slug}
              className="scroll-mt-24 border-b border-ink/10 py-16 last:border-b-0 sm:py-20"
            >
              <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:gap-14">
                <Reveal>
                  <div className="lg:sticky lg:top-28">
                    <p className="text-[12px] font-semibold tracking-[0.13em] uppercase text-bronze-2">{copy.eyebrow}</p>
                    <h2 className="mt-3 text-[clamp(36px,5vw,52px)] font-bold tracking-[-0.04em]">{copy.title}</h2>
                    <p className="mt-5 text-[15.5px] leading-[1.7] text-muted sm:text-[16.5px]">{copy.intro}</p>
                    <ul className="mt-7 space-y-2.5">
                      {copy.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-[13.5px] leading-[1.5] text-ink-3">
                          <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brass" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <div>
                  <div className="mb-4 flex items-end justify-between gap-4 border-b border-ink/10 pb-3">
                    <h3 className="font-mono text-[10px] tracking-[0.12em] uppercase text-label">{t.galleryLabel}</h3>
                    <span className="font-mono text-[10px] text-muted">
                      {countLabel(t.visualCount, system.visuals.length)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
                    {system.visuals.map((visual, visualIndex) => {
                      const label = t.visualLabels[visual.labelKey];
                      const primary = visualIndex === 0;
                      const contain = containLabels.has(visual.labelKey);

                      return (
                        <Reveal
                          key={`${visual.image}-${visualIndex}`}
                          delay={(visualIndex % 4) * 45}
                          className={primary ? "col-span-2" : ""}
                        >
                          <article className="group overflow-hidden rounded-[18px] border border-ink/8 bg-white">
                            <div
                              className={`relative overflow-hidden ${
                                primary ? "aspect-[16/9]" : patternLabels.has(visual.labelKey) ? "aspect-[3/2]" : "aspect-[4/3]"
                              } ${contain ? "bg-[#EEEAE3]" : "bg-[#D8D2C7]"}`}
                            >
                              <Image
                                src={visual.image}
                                alt=""
                                fill
                                sizes={
                                  primary
                                    ? "(min-width: 1024px) 650px, 100vw"
                                    : "(min-width: 1024px) 320px, 50vw"
                                }
                                quality={90}
                                className={`${contain ? "object-contain p-2.5 sm:p-4" : "object-cover"} transition-transform duration-[600ms] ease-swift group-hover:scale-[1.025]`}
                              />
                            </div>
                            <div className="min-h-[64px] border-t border-ink/7 px-4 py-3.5 sm:px-5">
                              <h4 className="font-mono text-[10px] font-medium tracking-[0.04em] text-ink-3">
                                {visual.code ?? label}
                              </h4>
                              {visual.code && <p className="mt-1 text-[11px] text-muted">{label}</p>}
                            </div>
                          </article>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="mx-auto max-w-[1120px] px-5 pb-20 sm:px-8">
        <Reveal>
          <div className="rounded-[26px] border border-ink/8 bg-paper px-7 py-9 sm:px-12 sm:py-11 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div>
              <h2 className="text-[27px] font-bold tracking-[-0.03em] sm:text-[34px]">{t.quoteTitle}</h2>
              <p className="mt-3 max-w-[720px] text-[15px] leading-[1.65] text-muted sm:text-base">{t.quoteBody}</p>
            </div>
            <a
              href={quoteHref}
              className="mt-7 inline-flex shrink-0 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-[#33291f] lg:mt-0"
            >
              {t.quoteCta}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
