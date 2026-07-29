import Link from "next/link";
import { type Locale, localePath } from "@/lib/i18n";
import type { PostSummary } from "@/lib/blog-config";
import type { Dictionary } from "@/lib/dictionaries/tr";

const shell =
  "bg-white overflow-hidden flex flex-col [box-shadow:0_1px_2px_rgba(0,0,0,.04),0_16px_40px_-28px_rgba(0,0,0,.22)] transition-[transform,box-shadow] duration-[450ms] ease-swift hover:-translate-y-1.5 hover:[box-shadow:0_1px_2px_rgba(0,0,0,.04),0_28px_56px_-28px_rgba(0,0,0,.3)]";

/** Görsel yer tutucu — tasarımdaki iç içe halkalar. Gerçek kapak görselleri gelene dek. */
function Well({ size, dot }: { size: number; dot: number }) {
  return (
    <div
      aria-hidden
      className="rounded-full border-[1.5px] border-ink/[0.18] flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div
        className="rounded-full border border-bronze/50 bg-bronze/20"
        style={{ width: dot, height: dot }}
      />
    </div>
  );
}

function CatChip({ label }: { label: string }) {
  return (
    <span className="absolute top-4 left-[18px] font-mono text-[10px] tracking-[0.14em] text-bronze-2 bg-cream/95 px-2.5 py-[5px] rounded-full">
      {label}
    </span>
  );
}

export function PostCard({
  post,
  dict,
  locale,
}: {
  post: PostSummary;
  dict: Dictionary;
  locale: Locale;
}) {
  const t = dict.blog;
  const meta = `${post.dateLabel} · ${post.readingMinutes} ${t.minutes}`;
  return (
    <Link href={localePath(locale, `/blog/${post.slug}`)} className={`${shell} h-full rounded-[22px]`}>
      <div className="relative aspect-[16/10] [background:linear-gradient(160deg,#F1ECE2,#E6DFD1)] flex items-center justify-center">
        <Well size={92} dot={34} />
        <CatChip label={t.categories[post.category]} />
      </div>
      <div className="px-[26px] pt-6 pb-7 flex flex-col flex-1">
        <div className="text-[12.5px] text-muted">{meta}</div>
        <h3 className="text-[21px] leading-[1.22] tracking-[-0.02em] font-bold mt-2.5 text-pretty">{post.title}</h3>
        <p className="text-[14.5px] leading-[1.6] text-muted mt-[11px] text-pretty">{post.excerpt}</p>
        <div className="mt-auto pt-5 text-sm font-semibold text-bronze-2">{t.cardCta}&nbsp;›</div>
      </div>
    </Link>
  );
}

/** Öne çıkan yazı — masaüstünde iki sütun, mobilde üst üste. */
export function FeaturedCard({
  post,
  dict,
  locale,
}: {
  post: PostSummary;
  dict: Dictionary;
  locale: Locale;
}) {
  const t = dict.blog;
  return (
    <Link
      href={localePath(locale, `/blog/${post.slug}`)}
      className={`${shell} rounded-[28px] lg:grid lg:grid-cols-[1.15fr_1fr] lg:flex-row`}
    >
      <div className="relative [background:linear-gradient(160deg,#F1ECE2,#E6DFD1)] min-h-[260px] lg:min-h-[420px] flex items-center justify-center">
        <Well size={210} dot={46} />
      </div>
      <div className="px-8 py-10 sm:px-11 sm:py-12 flex flex-col justify-center">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.14em] text-bronze-2 bg-[#F4EEE2] px-[11px] py-[5px] rounded-full">
            {t.categories[post.category].toLocaleUpperCase(locale === "tr" ? "tr-TR" : "en-US")}
          </span>
          <span className="text-[12.5px] text-muted">
            {post.dateLabel} · {post.readingMinutes} {t.minutes}
          </span>
        </div>
        <h2 className="text-[clamp(28px,4vw,38px)] leading-[1.12] tracking-[-0.03em] font-bold mt-5 text-pretty">
          {post.title}
        </h2>
        <p className="text-[16.5px] leading-[1.65] text-muted mt-4 text-pretty">{post.excerpt}</p>
        <div className="mt-[26px] text-[15px] font-semibold text-bronze-2">{t.featuredCta}&nbsp;›</div>
      </div>
    </Link>
  );
}
