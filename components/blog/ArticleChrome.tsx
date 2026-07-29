"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/blog-config";
import type { Dictionary } from "@/lib/dictionaries/tr";

/** Sayfa üstünde ince okuma ilerleme çubuğu. Nav'ın hemen altına yapışır. */
export function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const read = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setPct(max > 0 ? Math.min(100, Math.max(0, (doc.scrollTop / max) * 100)) : 0);
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  return (
    <div aria-hidden className="sticky top-[71px] z-[49] h-0.5 bg-ink/7">
      <div className="h-full bg-bronze transition-[width] duration-100 ease-linear" style={{ width: `${pct}%` }} />
    </div>
  );
}

/** Sticky içindekiler + paylaşım. Aktif bölüm scroll'a göre işaretlenir. */
export function ArticleAside({ toc, dict }: { toc: TocEntry[]; dict: Dictionary }) {
  const t = dict.blog;
  const [active, setActive] = useState<string>(toc[0]?.id ?? "");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (toc.length === 0) return;
    const read = () => {
      // Görüntü alanının üst çeyreğini geçmiş son başlık aktif sayılır.
      let current = toc[0].id;
      for (const { id } of toc) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    return () => window.removeEventListener("scroll", read);
  }, [toc]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Pano izni yoksa sessizce geç — adres çubuğu zaten bağlantıyı gösteriyor.
    }
  };

  return (
    <aside className="hidden lg:block sticky top-[100px]">
      {toc.length > 0 && (
        <>
          <div className="font-mono text-[10.5px] tracking-[0.14em] text-label mb-3.5">
            {t.toc.toLocaleUpperCase("tr-TR")}
          </div>
          <nav className="flex flex-col gap-0.5">
            {toc.map((e) => (
              <a
                key={e.id}
                href={`#${e.id}`}
                aria-current={active === e.id ? "true" : undefined}
                className={`text-[13.5px] leading-[1.45] px-3 py-[7px] rounded-[9px] transition-colors hover:bg-paper ${
                  active === e.id ? "bg-paper text-ink font-semibold" : "text-muted"
                }`}
              >
                {e.label}
              </a>
            ))}
          </nav>
        </>
      )}
      <div className="mt-[22px] pt-[18px] border-t border-ink/10 flex flex-col gap-2.5">
        <span className="font-mono text-[10.5px] tracking-[0.14em] text-label">
          {t.share.toLocaleUpperCase("tr-TR")}
        </span>
        <button
          type="button"
          onClick={copy}
          className="size-8 rounded-full border border-ink/[0.14] flex items-center justify-center text-[13px] text-ink-3 transition-colors hover:bg-paper"
          aria-label={t.copyLink}
        >
          ⧉
        </button>
        <span aria-live="polite" className="text-xs text-muted min-h-4">
          {copied ? t.copied : ""}
        </span>
      </div>
    </aside>
  );
}
