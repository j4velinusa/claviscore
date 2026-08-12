import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { type Locale, localePath } from "@/lib/i18n";
import { site } from "@/lib/site";
import type { DoorCollection } from "@/lib/door-collections";
import type { Dictionary } from "@/lib/dictionaries/tr";

export function DoorCollectionGrid({
  dict,
  locale,
  collection,
}: {
  dict: Dictionary;
  locale: Locale;
  collection: DoorCollection;
}) {
  const common = dict.doorCollections;
  const family = dict.families.items[collection.copyKey];
  const copy = common.categories[collection.copyKey];
  const quoteHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `${dict.mailSubject.quote} — ${family.title}`,
  )}`;

  return (
    <>
      <section className="overflow-hidden bg-ink text-[#F4EEE2]">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8 grid lg:grid-cols-[1.08fr_.92fr]">
          <div className="py-14 sm:py-20 lg:py-24 flex flex-col justify-center">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-[#AFA79A]">
              <Link href={localePath(locale, "/")} className="transition-colors hover:text-brass">
                {common.breadcrumbHome}
              </Link>
              <span aria-hidden>/</span>
              <span>{common.breadcrumbCatalog}</span>
            </nav>

            <Reveal delay={40}>
              <p className="mt-9 text-[12px] font-semibold tracking-[0.14em] uppercase text-brass">{copy.kicker}</p>
              <h1 className="mt-4 text-[clamp(44px,7vw,76px)] font-bold leading-[.98] tracking-[-0.045em]">
                {family.title}
              </h1>
              <p className="mt-6 max-w-[620px] text-[17px] sm:text-[19px] leading-[1.65] text-[#C9C1B4]">{copy.intro}</p>
              <div className="mt-8 flex flex-wrap gap-2.5 font-mono text-[10px] tracking-[0.07em] uppercase">
                <span className="rounded-full border border-white/15 px-3.5 py-2">{common.modelCount}</span>
                <span className="rounded-full border border-white/15 px-3.5 py-2">{common.collectionYear}</span>
              </div>
            </Reveal>
          </div>

          <div className="relative min-h-[360px] lg:min-h-[560px]">
            <div
              aria-hidden
              className="absolute inset-0 [background:radial-gradient(circle_at_50%_48%,rgba(200,163,106,.26),transparent_45%)]"
            />
            <span
              aria-hidden
              className="absolute right-1/2 bottom-6 translate-x-1/2 font-mono text-[180px] sm:text-[240px] leading-none text-white/[0.035]"
            >
              20
            </span>
            <Image
              src={collection.cardImage}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 430px, 100vw"
              quality={92}
              className="object-contain object-center p-7 sm:p-10 lg:p-14"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 sm:px-8 py-16 sm:py-20">
        <div className="mb-8 sm:mb-10 flex items-end justify-between gap-5 border-b border-ink/10 pb-5">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-bronze-2">{copy.kicker}</p>
            <h2 className="mt-2 text-[30px] sm:text-[36px] font-bold tracking-[-0.03em]">{common.modelLabel}</h2>
          </div>
          <span className="font-mono text-[11px] text-muted whitespace-nowrap">{common.modelCount}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {collection.models.map((model, index) => (
            <article
              key={model.code}
              className="group overflow-hidden rounded-[18px] sm:rounded-[22px] bg-white [box-shadow:0_1px_2px_rgba(0,0,0,.04),0_16px_40px_-28px_rgba(0,0,0,.24)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#EFECE7]">
                <span className="absolute z-10 left-3.5 top-3.5 rounded-full bg-cream/90 px-2 py-1 font-mono text-[9px] text-bronze-2">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Image
                  src={model.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 252px, (min-width: 768px) 33vw, 50vw"
                  quality={90}
                  className="object-contain object-center p-2.5 sm:p-4 transition-transform duration-[500ms] ease-swift group-hover:scale-[1.025]"
                />
              </div>
              <div className="min-h-[92px] px-4 py-4 sm:px-5 sm:py-5 border-t border-ink/7">
                <h3 className="font-mono text-[11px] sm:text-[12px] leading-[1.45] font-medium tracking-[0.02em] break-words">
                  {model.code}
                </h3>
                <p className="mt-1.5 text-xs text-muted">{copy.productLabel}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pb-20">
        <Reveal>
          <div className="rounded-[26px] bg-paper border border-ink/8 px-7 py-9 sm:px-12 sm:py-11 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">
            <div>
              <h2 className="text-[27px] sm:text-[34px] font-bold tracking-[-0.03em]">{common.quoteTitle}</h2>
              <p className="mt-3 max-w-[700px] text-[15px] sm:text-base leading-[1.65] text-muted">{common.quoteBody}</p>
            </div>
            <a
              href={quoteHref}
              className="inline-flex self-start lg:self-center shrink-0 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-[#33291f]"
            >
              {common.quoteCta}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
