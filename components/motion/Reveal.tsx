"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Gecikme (ms) — kart gridlerinde kademeli giriş için */
  delay?: number;
  /** Başlangıçtaki dikey ofset (px) */
  y?: number;
  className?: string;
};

/**
 * Görünüme girince yumuşakça beliren sarmalayıcı.
 * Tasarım mockup'ındaki data-reveal davranışının IntersectionObserver karşılığı.
 * State yerine doğrudan DOM'a yazar; SSR çıktısı gizli başlar, istemcide açılır.
 */
export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => {
      el.style.opacity = "1";
      el.style.transform = "none";
    };
    // Gizli belgelerde (prerender, arka plan sekmesi) render adımları çalışmaz
    // ve IO hiç tetiklenmez — içerik saklı kalmasın diye animasyonsuz gösteriyoruz.
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.visibilityState === "hidden"
    ) {
      el.style.transition = "none";
      show();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: `translateY(${y}px)`,
        transition: `opacity 0.85s cubic-bezier(0.16,0.84,0.44,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,0.84,0.44,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
