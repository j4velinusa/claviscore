import { Reveal } from "@/components/motion/Reveal";
import type { Dictionary } from "@/lib/dictionaries/tr";

// Üretim bölümleri hem /uretim hem /ihracat sayfasında kullanılıyor — tek kaynak.
// İhracat sayfası "üretim bizde" iddiasını burada somutluyor.

export function ProductionSteps({ dict }: { dict: Dictionary }) {
  const t = dict.production;
  return (
    <Reveal>
      <h2 className="font-mono text-[11px] tracking-[0.14em] text-label pb-4 border-b border-ink/10">
        {t.stepsLabel}
      </h2>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {t.steps.map((s) => (
          <li key={s.step} className="bg-white border border-ink/[0.08] rounded-[18px] px-5 py-5 flex flex-col">
            <div className="font-mono text-[11px] tracking-[0.12em] text-bronze-2">{s.step}</div>
            <h3 className="text-[17px] font-bold tracking-[-0.015em] mt-2">{s.title}</h3>
            <p className="text-[13.5px] leading-[1.55] text-muted mt-1.5 text-pretty">{s.desc}</p>
            <div className="font-mono text-[10.5px] tracking-[0.08em] text-bronze-2 mt-auto pt-4">
              {s.spec}
            </div>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

export function QualityTable({ dict }: { dict: Dictionary }) {
  const t = dict.production;
  return (
    <Reveal>
      <h2 className="font-mono text-[11px] tracking-[0.14em] text-label pb-4 border-b border-ink/10">
        {t.qcLabel}
      </h2>
      <div className="mt-5 bg-white border border-ink/[0.08] rounded-[18px] overflow-x-auto">
        <table className="w-full text-left text-[13.5px] min-w-[520px]">
          <thead>
            <tr className="bg-linen">
              {[t.qcColumns.name, t.qcColumns.value, t.qcColumns.method].map((h) => (
                <th
                  key={h}
                  className="font-mono text-[10px] tracking-[0.12em] text-label font-normal px-5 py-3.5 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.qc.map((r) => (
              <tr key={r.name} className="border-t border-ink/[0.06]">
                <td className="px-5 py-3.5 font-semibold">{r.name}</td>
                <td className="px-5 py-3.5 font-mono text-bronze-2 whitespace-nowrap">{r.value}</td>
                <td className="px-5 py-3.5 text-muted">{r.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

export function DeliveryTimeline({ dict }: { dict: Dictionary }) {
  const t = dict.production;
  return (
    <Reveal>
      <h2 className="font-mono text-[11px] tracking-[0.14em] text-label pb-4 border-b border-ink/10">
        {t.timelineLabel}
      </h2>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
        {t.timeline.map((s, i) => (
          <li key={s.days} className="bg-paper rounded-[18px] px-5 py-5">
            {/* Koyudan açığa: zaman ilerledikçe ton açılıyor, tasarımdaki renk dizisi. */}
            <div
              aria-hidden
              className="h-1 w-10 rounded-full mb-3.5"
              style={{ background: ["#C2A06A", "#A87C4F", "#8A6638", "#6B5330", "#4A3A22"][i] }}
            />
            <div className="font-mono text-[11px] tracking-[0.1em] text-bronze-2">{s.days}</div>
            <div className="text-[16px] font-bold tracking-[-0.015em] mt-1.5">{s.title}</div>
            <p className="text-[13px] leading-[1.5] text-muted mt-1 text-pretty">{s.desc}</p>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
