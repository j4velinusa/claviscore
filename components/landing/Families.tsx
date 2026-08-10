import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/site/Emphasis";
import { type Locale, localePath } from "@/lib/i18n";
import { slotId, type MediaMap } from "@/lib/media-config";
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
const visuals = {
  hinge: <div className="w-[92px] h-[62px] border-[1.5px] border-ink/20" />,
  handle: <div className="w-[100px] h-7 rounded-[14px] border-[1.5px] border-ink/20" />,
  hotel: (
    <div className="w-[60px] h-[84px] rounded-md border-[1.5px] border-ink/20 flex items-start justify-center">
      <div className="w-7 h-[7px] bg-bronze/40 mt-[18px] rounded-[2px]" />
    </div>
  ),
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
  // Yuva anahtarı sözlük anahtarını izliyor: aile-cylinder ↔ items.cylinder.
  const doorFamilies = [
    { ...t.items.hinge, visual: visuals.hinge, slot: "aile-hinge" },
    { ...t.items.handle, visual: visuals.handle, slot: "aile-handle" },
    { ...t.items.hotel, visual: visuals.hotel, slot: "aile-hotel" },
  ];

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
          {doorFamilies.map((f, i) => (
            <Card
              key={f.title}
              title={f.title}
              desc={f.desc}
              delay={(i % 3) * 80}
              visual={f.visual}
              imageSrc={media[slotId("site", f.slot)]}
            />
          ))}
          {/* Aksesuar & Yedek — koyu vurgu bandı. Üç aile kartının altında tam genişlik:
              kart sayısı üçe indiği için tek başına kalan dördüncü hücre yerine bant. */}
          <Reveal delay={160} className="sm:col-span-2 lg:col-span-3">
            <Link
              href={localePath(locale, "/katalog")}
              className="h-full bg-ink rounded-[22px] overflow-hidden flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 px-[26px] pt-[26px] pb-7 [box-shadow:0_1px_2px_rgba(0,0,0,.04),0_16px_40px_-26px_rgba(0,0,0,.3)] transition-[transform,box-shadow] duration-[450ms] ease-swift hover:-translate-y-1.5 hover:[box-shadow:0_1px_2px_rgba(0,0,0,.04),0_28px_56px_-24px_rgba(0,0,0,.45)]"
            >
              <div>
                <div className="text-[13px] font-semibold tracking-[0.1em] text-brass">ACC-600</div>
                <div className="text-[22px] font-bold text-[#F4EEE2] tracking-[-0.01em] mt-4">{t.accent.title}</div>
                <div className="text-[15px] text-[#A09A8E] mt-1.5 leading-[1.5]">{t.accent.desc}</div>
              </div>
              <div className="text-[15px] font-semibold text-brass shrink-0">{t.accent.cta}&nbsp;›</div>
            </Link>
          </Reveal>
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
      <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-[72px] text-center">
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
