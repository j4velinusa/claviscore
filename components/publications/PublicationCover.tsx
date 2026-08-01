import type { PublicationCover as Cover } from "@/lib/publications";

/**
 * Yayın kapağı — fotoğraf değil, tipografiyle çiziliyor.
 *
 * Tasarımdaki kurgu bu: her yayın için ayrı kapak görseli hazırlanmıyor, renk
 * ve yazı değerleri kayıt defterinden geliyor. Böylece yeni yayın eklemek bir
 * satır veri, bir dosya yüklemesi kadar iş.
 *
 * Renkler yayına özel olduğu için tema tokenı kullanılamıyor; değerler
 * lib/publications.ts'te duruyor.
 */
export function PublicationCover({ cover, className }: { cover: Cover; className?: string }) {
  return (
    <div
      className={`aspect-[3/4] rounded-[4px] px-6 py-[26px] flex flex-col justify-between overflow-hidden [box-shadow:0_1px_3px_rgba(0,0,0,.12),0_22px_44px_-28px_rgba(0,0,0,.5)] ${className ?? ""}`}
      style={{ background: cover.bg }}
    >
      <div className="flex items-start justify-between gap-2.5">
        <span
          className="font-mono text-[8px] tracking-[0.24em] uppercase"
          style={{ color: cover.muted }}
        >
          {cover.tag}
        </span>
        <span
          aria-hidden
          className="size-[7px] rounded-full flex-none mt-0.5"
          style={{ background: cover.accent }}
        />
      </div>

      <div>
        <div
          className={`text-[30px] leading-[1.02] ${cover.font === "serif" ? "font-serif" : "font-sans"}`}
          style={{
            color: cover.fg,
            fontWeight: cover.weight,
            letterSpacing: cover.track,
          }}
        >
          {cover.title}
        </div>
        <div
          aria-hidden
          className="w-[26px] h-px my-3"
          style={{ background: cover.accent }}
        />
        <div className="font-serif italic text-[13px]" style={{ color: cover.muted }}>
          {cover.sub}
        </div>
      </div>

      <span
        className="font-mono text-[7.5px] tracking-[0.2em] uppercase"
        style={{ color: cover.muted }}
      >
        {cover.foot}
      </span>
    </div>
  );
}
