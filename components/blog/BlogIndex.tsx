"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/site/Emphasis";
import { PostCard, FeaturedCard } from "@/components/blog/PostCard";
import { site } from "@/lib/site";
import { blogCategories, type BlogCategory, type PostSummary } from "@/lib/blog-config";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/tr";

type Tab = "all" | BlogCategory;
const tabs: readonly Tab[] = ["all", ...blogCategories];

const chip =
  "font-mono text-xs px-[17px] py-[9px] rounded-full border whitespace-nowrap transition duration-[250ms] ease-swift";
const chipOn = "bg-ink text-cream border-ink";
const chipOff = "bg-white text-ink-3 border-ink/[0.14] hover:border-ink/35 hover:text-ink";

export function BlogIndex({
  posts,
  featured,
  dict,
  locale,
  covers,
}: {
  posts: PostSummary[];
  featured: PostSummary | null;
  dict: Dictionary;
  locale: Locale;
  /** slug → kapak görseli yolu. Sunucuda üretilip geçiliyor. */
  covers?: Record<string, string>;
}) {
  const t = dict.blog;
  const [tab, setTab] = useState<Tab>("all");
  // Öne çıkan yazı üstte ayrıca gösterildiği için gridden düşülür; kategori
  // seçiliyken öne çıkan gizlenir ve o yazı da listeye geri girer.
  const showFeatured = tab === "all" && featured !== null;
  const list = posts.filter(
    (p) => (tab === "all" || p.category === tab) && !(showFeatured && p.slug === featured?.slug),
  );
  const newsletterHref = `mailto:${site.email}?subject=${encodeURIComponent(dict.mailSubject.newsletter)}`;

  return (
    <>
      <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-[76px] pb-[34px]">
        <Reveal>
          <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-bronze-2">{t.kicker}</p>
          <h1 className="text-[clamp(38px,7vw,68px)] leading-[1.03] tracking-[-0.04em] font-bold mt-4 max-w-[860px] text-pretty">
            <Emphasis parts={t.title} />
          </h1>
          <p className="text-[clamp(17px,2.4vw,20px)] leading-[1.55] text-muted font-medium max-w-[620px] mt-[22px]">
            {t.subtitle}
          </p>
        </Reveal>
      </section>

      {showFeatured && featured && (
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
          <Reveal>
            <FeaturedCard cover={covers?.[featured.slug]} post={featured} dict={dict} locale={locale} />
          </Reveal>
        </div>
      )}

      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-13 sm:pt-[52px]">
        <div className="flex items-center justify-between gap-5 flex-wrap pb-5 border-b border-ink/10">
          <div role="group" aria-label={t.filterLabel} className="flex items-center gap-[9px] flex-wrap">
            {tabs.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setTab(c)}
                aria-pressed={c === tab}
                className={`${chip} ${c === tab ? chipOn : chipOff}`}
              >
                {t.categories[c]}
              </button>
            ))}
          </div>
          <span className="font-mono text-xs text-muted">
            {list.length + (showFeatured ? 1 : 0)} {t.countSuffix}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-[34px]">
        {list.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 70} className="h-full">
                <PostCard post={p} dict={dict} locale={locale} cover={covers?.[p.slug]} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="py-[60px] text-center text-[15px] text-muted">{t.empty}</p>
        )}
      </div>

      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-[72px]">
        <Reveal>
          <div className="bg-night rounded-[28px] px-8 py-12 sm:px-14 sm:py-[58px] grid lg:grid-cols-[1.2fr_1fr] gap-11 items-center">
            <div>
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-brass">
                {t.newsletter.kicker}
              </div>
              <h2 className="text-[clamp(28px,4vw,38px)] leading-[1.1] tracking-[-0.03em] font-bold text-[#F4EEE2] mt-3.5">
                <Emphasis parts={t.newsletter.title} />
              </h2>
              <p className="text-base leading-[1.6] text-[#B4AC9E] mt-3.5 max-w-[430px]">{t.newsletter.body}</p>
            </div>
            <div>
              {/* Kayıt formu için backend yok — site genelindeki mailto modeli. */}
              <a
                href={newsletterHref}
                className="inline-flex text-sm font-semibold text-night bg-brass px-[26px] py-3.5 rounded-full transition duration-[250ms] hover:bg-[#D4B47D] hover:-translate-y-px"
              >
                {t.newsletter.cta}
              </a>
              <div className="font-mono text-[11px] tracking-[0.06em] text-[#8a8472] mt-3.5">
                {t.newsletter.note}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
