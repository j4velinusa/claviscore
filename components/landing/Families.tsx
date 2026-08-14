import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/site/Emphasis";
import { type Locale, localePath } from "@/lib/i18n";
import { slotId, type MediaMap } from "@/lib/media-config";
import { doorCollections } from "@/lib/door-collections";
import { ceilingSystems } from "@/lib/ceiling-systems";
import type { Dictionary } from "@/lib/dictionaries/tr";

const cardClass =
  "h-full bg-white rounded-[22px] overflow-hidden [box-shadow:0_1px_2px_rgba(0,0,0,.04),0_16px_40px_-26px_rgba(0,0,0,.22)] transition-[transform,box-shadow] duration-[450ms] ease-swift hover:-translate-y-1.5 hover:[box-shadow:0_1px_2px_rgba(0,0,0,.04),0_28px_56px_-26px_rgba(0,0,0,.3)]";

/* Kart görselleri — mockup'taki soyut çizimlerin birebir karşılığı (dilden bağımsız) */
function FamilyCard({
  href,
  title,
  desc,
  countLabel,
  imageSrc,
  number,
  delay,
}: {
  href: string;
  title: string;
  desc: string;
  countLabel: string;
  imageSrc: string;
  number: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link href={href} className={`${cardClass} group block`}>
        <div className="relative aspect-[16/10] overflow-hidden bg-[#E9E3D8]">
          <div
            aria-hidden
            className="absolute inset-0 [background:radial-gradient(circle_at_72%_35%,rgba(200,163,106,.34),transparent_36%),linear-gradient(145deg,#F4F0E8,#DED5C6)]"
          />
          <span
            aria-hidden
            className="absolute right-5 -bottom-5 font-mono text-[112px] leading-none text-ink/[0.055]"
          >
            {number}
          </span>
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(min-width: 1120px) 348px, (min-width: 640px) 50vw, 100vw"
            quality={92}
            className="object-contain object-center p-5 sm:p-7 transition-transform duration-[600ms] ease-swift group-hover:scale-[1.035]"
          />
        </div>
        <div className="px-[26px] pt-6 pb-7">
          <div className="flex items-baseline justify-between gap-5">
            <div className="text-[24px] font-bold tracking-[-0.02em]">{title}</div>
            <span aria-hidden className="text-[22px] text-bronze-2 transition-transform group-hover:translate-x-1">
              ›
            </span>
          </div>
          <div className="text-[15px] text-muted mt-1.5 leading-[1.5]">{desc}</div>
          <div className="font-mono text-[11px] tracking-[0.06em] uppercase text-bronze-2 mt-5">
            {countLabel}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

function CeilingCard({
  href,
  title,
  desc,
  cta,
  imageSrc,
  number,
  delay,
}: {
  href: string;
  title: string;
  desc: string;
  cta: string;
  imageSrc: string;
  number: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link href={href} className={`${cardClass} group block`}>
        <div className="relative aspect-[16/11] overflow-hidden bg-[#D8D2C7]">
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(min-width: 1024px) 348px, (min-width: 640px) 50vw, 100vw"
            quality={90}
            className="object-cover transition-transform duration-[700ms] ease-swift group-hover:scale-[1.045]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
          <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/20 px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-white backdrop-blur-sm">
            {number}
          </span>
        </div>
        <div className="px-[26px] pt-6 pb-7">
          <div className="flex items-baseline justify-between gap-5">
            <div className="text-[23px] font-bold tracking-[-0.02em]">{title}</div>
            <span aria-hidden className="text-[22px] text-bronze-2 transition-transform group-hover:translate-x-1">
              ›
            </span>
          </div>
          <div className="text-[15px] text-muted mt-1.5 leading-[1.55]">{desc}</div>
          <div className="mt-5 font-mono text-[10px] font-medium tracking-[0.08em] uppercase text-bronze-2">
            {cta}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export function ProductFamilies({
  dict,
  locale,
  media = {},
}: {
  dict: Dictionary;
  locale: Locale;
  media?: MediaMap;
}) {
  const t = dict.families;
  const collections = Object.values(doorCollections);

  return (
    <>
      <section id="urunler" className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-16 pb-10 text-center scroll-mt-20">
        <Reveal>
          <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-bronze-2">{t.kicker}</p>
          <h2 className="text-[clamp(36px,5.5vw,52px)] font-bold tracking-[-0.03em] mt-3.5">
            <Emphasis parts={t.title} />
          </h2>
        </Reveal>
      </section>
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {collections.map((collection, i) => {
            const copy = t.items[collection.copyKey];
            return (
              <FamilyCard
                key={collection.slug}
                href={localePath(locale, `/katalog/${collection.slug}`)}
                title={copy.title}
                desc={copy.desc}
                countLabel={copy.count}
                imageSrc={media[slotId("site", collection.mediaSlot)] ?? collection.cardImage}
                number={String(i + 1).padStart(2, "0")}
                delay={i * 90}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export function CeilingSystems({
  dict,
  locale,
  media = {},
}: {
  dict: Dictionary;
  locale: Locale;
  media?: MediaMap;
}) {
  const t = dict.ceiling;

  return (
    <>
      <section id="tavan-sistemleri" className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-[72px] text-center scroll-mt-20">
        <Reveal>
          <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-bronze-2">{t.kicker}</p>
          <h2 className="text-[clamp(36px,5.5vw,52px)] font-bold tracking-[-0.03em] mt-3.5">
            <Emphasis parts={t.title} />
          </h2>
          <p className="text-[clamp(16px,2.2vw,19px)] text-muted font-medium max-w-[560px] mx-auto mt-4">
            {t.subtitle}
          </p>
        </Reveal>
      </section>
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ceilingSystems.map((system, i) => {
            const copy = t.items[system.copyKey];
            return (
              <CeilingCard
                key={system.slug}
                href={`${localePath(locale, "/katalog/asma-tavan")}#${system.slug}`}
                title={copy.title}
                desc={copy.desc}
                cta={t.cardCta}
                delay={i * 80}
                number={String(i + 1).padStart(2, "0")}
                imageSrc={media[slotId("site", system.mediaSlot)] ?? system.cardImage}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
