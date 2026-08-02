import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, localePath, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries/get";
import { buildMetadata } from "@/lib/metadata";
import { mediaMap } from "@/lib/media";
import { docHref } from "@/lib/media-config";
import { publicationCopy } from "@/lib/publications";
import { readPublications } from "@/lib/publications-content";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";

type Params = { locale: string; id: string };

// Dil × yayın çarpımı: iki dilin okuma sayfası da build anında üretiliyor.
export function generateStaticParams() {
  const ids = readPublications().map((p) => p.id);
  return locales.flatMap((locale) => ids.map((id) => ({ locale, id })));
}

function findPublication(id: string) {
  return readPublications().find((p) => p.id === id);
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, id } = await params;
  if (!isLocale(locale)) return {};
  const pub = findPublication(id);
  if (!pub) return {};
  const copy = publicationCopy(pub, locale);
  return buildMetadata({
    locale,
    path: `/yayinlar/${id}`,
    title: `${copy.title} — CLAVISCOR`,
    description: copy.desc,
  });
}

export default async function PublicationViewerPage({ params }: { params: Promise<Params> }) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();
  const pub = findPublication(id);
  if (!pub) notFound();
  const dict = await getDictionary(locale);
  const t = dict.yayinlar;
  const v = t.viewer;
  const loc: Locale = locale;
  const copy = publicationCopy(pub, loc);
  const pdf = docHref(mediaMap(), pub.id, loc);

  const meta = [pub.pages ? `${pub.pages} ${t.metaPages.toLocaleLowerCase("tr")}` : null, pub.format, pub.langs]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="overflow-x-clip min-h-dvh flex flex-col">
      <SiteNav dict={dict} locale={loc} />
      <main className="flex-1">
        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-[60px]">
          <Link
            href={localePath(loc, "/yayinlar")}
            className="text-[13px] text-bronze-2 hover:opacity-70 transition-opacity"
          >
            ‹&nbsp;{v.back}
          </Link>

          <div className="flex items-end justify-between gap-6 flex-wrap mt-4 pb-5 border-b border-ink/10">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[10px] tracking-[0.12em] text-bronze-2 bg-[#F4EEE2] px-2.5 py-1 rounded-full">
                  {copy.kind}
                </span>
                <span className="font-mono text-[10.5px] text-muted">{meta}</span>
              </div>
              <h1 className="text-[clamp(26px,4vw,38px)] leading-[1.1] tracking-[-0.03em] font-bold mt-3 text-pretty">
                {copy.title}
              </h1>
            </div>

            {pdf && (
              <div className="flex items-center gap-2.5 flex-wrap">
                <a
                  href={pdf}
                  target="_blank"
                  rel="noopener"
                  className="text-sm font-semibold text-cream bg-ink px-[22px] py-3 rounded-full whitespace-nowrap transition duration-[250ms] hover:bg-[#33291f]"
                >
                  {v.openNewTab}&nbsp;↗
                </a>
                <a
                  href={pdf}
                  download
                  className="text-sm font-semibold text-ink bg-white border border-ink/[0.16] px-[22px] py-3 rounded-full whitespace-nowrap transition-colors hover:border-ink/35"
                >
                  {v.download}&nbsp;↓
                </a>
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-6 pb-16">
          {pdf ? (
            <>
              {/*
                Tarayıcının gömülü PDF görüntüleyicisi kullanılıyor — ayrı bir
                PDF kütüphanesi yüklemiyoruz. Mobil tarayıcıların çoğu iframe
                içinde PDF göstermez; o yüzden çerçeve mobilde gizli ve üstteki
                "yeni sekmede aç" düğmesi her zaman duruyor.
              */}
              <iframe
                src={pdf}
                title={copy.title}
                className="hidden sm:block w-full h-[78vh] min-h-[520px] rounded-[18px] border border-ink/[0.1] bg-paper"
              />
              <p className="text-[13px] text-muted mt-3">{v.fallback}</p>
            </>
          ) : (
            <p className="text-[15px] text-muted py-14 text-center">{v.missing}</p>
          )}
        </section>
      </main>
      <SiteFooter dict={dict} locale={loc} />
    </div>
  );
}
