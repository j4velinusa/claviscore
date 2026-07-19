import { Reveal } from "@/components/motion/Reveal";
import type { Dictionary } from "@/lib/dictionaries/tr";

// Sertifika rozetleri dilden bağımsızdır.
const certificates = ["CE", "TSE", "ISO 9001", "EN 1303", "Anti-Snap ★"];

export function Certificates({ dict }: { dict: Dictionary }) {
  return (
    <section id="sertifikalar" className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-16 pb-6 text-center scroll-mt-20">
      <Reveal>
        <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-bronze-2 mb-7">
          {dict.certificates.kicker}
        </p>
        <div className="flex justify-center flex-wrap gap-3">
          {certificates.map((c) => (
            <div
              key={c}
              className="px-[30px] py-4 rounded-full border border-ink/15 text-[17px] font-bold transition-colors duration-[250ms] hover:border-bronze-2 hover:text-bronze-2"
            >
              {c}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
