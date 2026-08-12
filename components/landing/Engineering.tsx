import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/site/Emphasis";
import type { Dictionary } from "@/lib/dictionaries/tr";

export function Engineering({ dict, imageSrc }: { dict: Dictionary; imageSrc?: string }) {
  const t = dict.engineering;
  return (
    <section className="mx-auto max-w-[1120px] px-5 sm:px-8 py-14">
      <Reveal>
        <div className="bg-paper rounded-[28px] grid lg:grid-cols-[0.92fr_1.08fr] overflow-hidden">
          <div className="relative min-h-[300px] lg:min-h-[460px] m-6 [background:linear-gradient(160deg,#E9E2D5,#DCD3C2)] rounded-[18px] overflow-hidden flex items-center justify-center">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt=""
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                quality={100}
                className="object-cover"
              />
            ) : (
              // Yer tutucu etiketi yalnız görsel yokken anlamlı.
              <div className="font-mono text-[11px] text-[#5F5647] tracking-[0.08em]">
                {t.imageCaption}
              </div>
            )}
          </div>
          <div className="px-8 py-10 sm:px-14 sm:py-16 flex flex-col justify-center">
            <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-bronze-2 mb-5">{t.kicker}</p>
            <h2 className="text-[clamp(32px,4.5vw,44px)] font-bold tracking-[-0.03em] leading-[1.05]">
              <Emphasis parts={t.title} />
            </h2>
            <p className="text-[17px] leading-[1.6] text-[#6E6860] max-w-[440px] mt-[22px]">{t.body}</p>
            <div className="flex flex-wrap gap-x-11 gap-y-6 mt-9">
              {t.stats.map((s) => (
                <div key={s.label}>
                  <div className="text-[30px] font-bold tracking-[-0.02em] whitespace-nowrap">{s.value}</div>
                  <div className="text-xs text-muted mt-1 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
