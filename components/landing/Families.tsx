import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/site/Emphasis";
import { type Locale, localePath } from "@/lib/i18n";
import { slotId, type MediaMap } from "@/lib/media-config";
import { doorCollections } from "@/lib/door-collections";
import type { Dictionary } from "@/lib/dictionaries/tr";

const cardClass =
  "h-full bg-white rounded-[22px] overflow-hidden [box-shadow:0_1px_2px_rgba(0,0,0,.04),0_16px_40px_-26px_rgba(0,0,0,.22)] transition-[transform,box-shadow] duration-[450ms] ease-swift hover:-translate-y-1.5 hover:[box-shadow:0_1px_2px_rgba(0,0,0,.04),0_28px_56px_-26px_rgba(0,0,0,.3)]";

const wellClass =
  "aspect-[16/11] [background:linear-gradient(160deg,#F1ECE2,#E6DFD1)] flex items-center justify-center";

function Card({
  title,
  desc,
  delay,
  visual,
  imageSrc,
}: {
  title: string;
  desc: string;
  delay: number;
  /** Panelden görsel yüklenmediğinde gösterilen soyut çizim. */
  visual: ReactNode;
  imageSrc?: string;
}) {
  return (
    <Reveal delay={delay}>
      <div className={cardClass}>
        <div className={`${wellClass} relative`}>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt=""
              fill
              sizes="(min-width: 1024px) 348px, (min-width: 640px) 50vw, 100vw"
              quality={90}
              className="object-cover"
            />
          ) : (
            visual
          )}
        </div>
        <div className="px-[26px] pt-6 pb-7">
          <div className="text-[22px] font-bold tracking-[-0.01em]">{title}</div>
          <div className="text-[15px] text-muted mt-1.5 leading-[1.5]">{desc}</div>
        </div>
      </div>
    </Reveal>
  );
}

/* Kart görselleri — mockup'taki soyut çizimlerin birebir karşılığı (dilden bağımsız) */
function FamilyCard({
  href,
  title,
  desc,
  modelCount,
  imageSrc,
  number,
  delay,
}: {
  href: string;
  title: string;
  desc: string;
  modelCount: string;
  imageSrc: string;
  number: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
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
            sizes="(min-width: 1120px) 518px, (min-width: 640px) 50vw, 100vw"
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
            {modelCount}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

const visuals = {
  suspendedCeiling: (
    <div className="w-[118px] h-[84px] grid grid-cols-3 grid-rows-2 border-[1.5px] border-ink/22 bg-white/35">
      <div className="border-r border-b border-ink/15" />
      <div className="border-r border-b border-ink/15" />
      <div className="border-b border-ink/15" />
      <div className="border-r border-ink/15" />
      <div className="border-r border-ink/15" />
      <div />
    </div>
  ),
  lighting: (
    <div className="w-[134px] h-[58px] border-[1.5px] border-ink/22 rounded-[10px] flex items-center justify-around px-4">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="size-[22px] rounded-full [background:radial-gradient(circle_at_50%_42%,rgba(200,163,106,.9),rgba(168,124,79,.12))] [box-shadow:0_0_14px_rgba(200,163,106,.55)]"
        />
      ))}
    </div>
  ),
  gypsum: (
    <div className="w-[120px] h-[84px] border-[1.5px] border-ink/22 rounded-lg p-[11px]">
      <div className="size-full border-[1.5px] border-ink/17 rounded-md p-2.5">
        <div className="size-full border-[1.5px] border-ink/12 rounded" />
      </div>
    </div>
  ),
} as const;

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
        <div className="grid sm:grid-cols-2 gap-5">
          {collections.map((collection, i) => {
            const copy = t.items[collection.copyKey];
            return (
              <FamilyCard
                key={collection.slug}
                href={localePath(locale, `/katalog/${collection.slug}`)}
                title={copy.title}
                desc={copy.desc}
                modelCount={dict.doorCollections.modelCount}
                imageSrc={media[slotId("site", collection.mediaSlot)] ?? collection.cardImage}
                number={`0${i + 1}`}
                delay={i * 90}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export function CeilingSystems({ dict, media = {} }: { dict: Dictionary; media?: MediaMap }) {
  const t = dict.ceiling;
  const ceilingFamilies = [
    { ...t.items.suspended, visual: visuals.suspendedCeiling, slot: "tavan-suspended" },
    { ...t.items.lighting, visual: visuals.lighting, slot: "tavan-lighting" },
    { ...t.items.gypsum, visual: visuals.gypsum, slot: "tavan-gypsum" },
  ];

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
          {ceilingFamilies.map((f, i) => (
            <Card
              key={f.title}
              title={f.title}
              desc={f.desc}
              delay={i * 80}
              visual={f.visual}
              imageSrc={media[slotId("site", f.slot)]}
            />
          ))}
        </div>
      </div>
    </>
  );
}
