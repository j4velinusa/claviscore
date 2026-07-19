"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/i18n";

type CountUpProps = {
  value: number;
  suffix?: string;
  /** Binlik ayracı uygulansın mı (1976 gibi yıllar için kapatılır) */
  group?: boolean;
  locale?: Locale;
  className?: string;
};

function format(n: number, target: number, group: boolean, tag: string) {
  const rounded = Math.round(n);
  return group && target >= 1000 ? rounded.toLocaleString(tag) : String(rounded);
}

/**
 * Görünüme girince 0'dan hedefe sayan istatistik değeri.
 * SSR'da nihai değeri basar (SEO/no-JS); animasyon yalnızca istemcide oynar.
 * Binlik ayracı dile göre biçimlenir (tr: 1.200, en: 1,200).
 */
export function CountUp({ value, suffix = "", group = true, locale = "tr", className }: CountUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tag = locale === "tr" ? "tr-TR" : "en-US";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // SSR çıktısı zaten nihai değer; azaltılmış hareket veya gizli belge durumunda animasyonu atla.
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.visibilityState === "hidden"
    )
      return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const duration = 1100;
        const start = performance.now();
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          el.textContent = format(value * easeOut(t), value, group, tag) + suffix;
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, suffix, group, tag]);

  return (
    <div ref={ref} className={className}>
      {format(value, value, group, tag)}
      {suffix}
    </div>
  );
}
