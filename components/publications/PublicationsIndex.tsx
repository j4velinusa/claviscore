"use client";

import Link from "next/link";
import { useState } from "react";
import { PublicationCover } from "@/components/publications/PublicationCover";
import { Reveal } from "@/components/motion/Reveal";
import { type Locale, localePath } from "@/lib/i18n";
import {
  publicationCopy,
  publicationGroups,
  type Publication,
  type PublicationGroup,
} from "@/lib/publications";
import type { Dictionary } from "@/lib/dictionaries/tr";

type Filter = PublicationGroup | "all";

/**
 * Yayın listesi ve grup filtresi.
 *
 * Filtre çipleri yalnız BİRDEN FAZLA grup varsa görünüyor: tek yayınla dolu bir
 * sayfada beş sekmelik filtre, seçenek varmış izlenimi verirdi.
 */
export function PublicationsIndex({
  dict,
  locale,
  docs,
  publications,
}: {
  dict: Dictionary;
  locale: Locale;
  /** Yayın kimliği → PDF adresi. Yüklenmemiş yayın haritada yok. */
  docs: Record<string, string>;
  publications: readonly Publication[];
}) {
  const t = dict.yayinlar;
  const [filter, setFilter] = useState<Filter>("all");

  const presentGroups = publicationGroups.filter((g) => publications.some((p) => p.group === g));
  const shown = filter === "all" ? publications : publications.filter((p) => p.group === filter);

  return (
    <>
      {presentGroups.length > 1 && (
        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-12">
          <Reveal>
            <div className="flex items-center justify-between gap-5 flex-wrap pb-5 border-b border-ink/10">
              <div role="group" aria-label={t.groups.all} className="flex flex-wrap items-center gap-2">
                {(["all", ...presentGroups] as Filter[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setFilter(g)}
                    aria-pressed={filter === g}
                    className={`font-mono text-[12px] px-[17px] py-[9px] rounded-full border transition duration-[250ms] ${
                      filter === g
                        ? "bg-ink text-cream border-ink"
                        : "bg-transparent text-ink-3 border-ink/[0.16] hover:border-ink/35"
                    }`}
                  >
                    {t.groups[g]}
                  </button>
                ))}
              </div>
              <span className="font-mono text-[12px] text-muted">
                {shown.length} {t.countSuffix}
              </span>
            </div>
          </Reveal>
        </section>
      )}

      <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-8 pb-4">
        {shown.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shown.map((pub, i) => (
              <Reveal key={pub.id} delay={(i % 3) * 70}>
                <PublicationCard pub={pub} dict={dict} locale={locale} href={docs[pub.id]} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-center text-[15px] text-muted py-14">{t.empty}</p>
        )}
      </section>
    </>
  );
}

function PublicationCard({
  pub,
  dict,
  locale,
  href,
}: {
  pub: Publication;
  dict: Dictionary;
  locale: Locale;
  href?: string;
}) {
  const t = dict.yayinlar;
  const copy = publicationCopy(pub, locale);
  const readHref = href
    ? localePath(locale, `/yayinlar/${pub.id}`)
    : pub.readPath
      ? localePath(locale, pub.readPath)
      : undefined;
  // Sayfa sayısı bilinmiyorsa meta satırına yazılmıyor — uydurma sayı basmıyoruz.
  const meta = [pub.pages ? `${pub.pages} ${t.metaPages.toLocaleLowerCase("tr")}` : null, pub.format, pub.langs]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="flex flex-col gap-4 h-full">
      <PublicationCover
        cover={pub.cover}
        className="transition-[transform,box-shadow] duration-[450ms] ease-swift hover:-translate-y-1.5"
      />
      <div className="flex flex-col gap-[7px] flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[10px] tracking-[0.12em] text-bronze-2 bg-[#F4EEE2] px-2.5 py-1 rounded-full">
            {copy.kind}
          </span>
          <span className="font-mono text-[10.5px] text-muted">{meta}</span>
        </div>
        <h3 className="text-[19px] font-bold tracking-[-0.02em] leading-[1.24] text-pretty">
          {copy.title}
        </h3>
        <p className="text-sm leading-[1.6] text-muted text-pretty">{copy.desc}</p>
        <div className="flex items-center gap-3.5 mt-auto pt-2">
          {/* PDF varsa "oku" okuma sayfasını açar; yoksa yayının işaret ettiği
              site içi sayfaya düşer (ör. katalog listesi). */}
          {readHref && (
            <Link
              href={readHref}
              className="text-[13.5px] font-semibold text-bronze-2 hover:opacity-70 transition-opacity"
            >
              {t.readCta}&nbsp;›
            </Link>
          )}
          {/* PDF yüklenmemişse indirme yerine "Yakında" — ölü bir link bırakmıyoruz. */}
          {href ? (
            <a
              href={href}
              download
              className="text-[13.5px] font-semibold text-bronze-2 hover:opacity-70 transition-opacity"
            >
              {t.downloadCta}&nbsp;↓
            </a>
          ) : (
            <span className="text-[13.5px] font-semibold text-label">{t.soonLabel}</span>
          )}
        </div>
      </div>
    </div>
  );
}
