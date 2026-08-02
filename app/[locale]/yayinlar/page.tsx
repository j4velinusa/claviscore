import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries/get";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { mediaMap } from "@/lib/media";
import { docHref } from "@/lib/media-config";
import { featuredPublication, publicationCopy } from "@/lib/publications";
import { readPublications } from "@/lib/publications-content";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/site/Emphasis";
import { PublicationCover } from "@/components/publications/PublicationCover";
import { PublicationsIndex } from "@/components/publications/PublicationsIndex";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/yayinlar",
    title: dict.meta.yayinlar.title,
    description: dict.meta.yayinlar.description,
  });
}

export default async function YayinlarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.yayinlar;

  // Yayınlar panelden yönetiliyor; build anında content/yayinlar.json'dan okunuyor.
  const publications = readPublications();
  // PDF adresleri panelden yüklenen belgelerden; yüklenmemiş yayın haritada yok.
  const media = mediaMap();
  const docs = Object.fromEntries(
    publications
      .map((p) => [p.id, docHref(media, p.id, locale)] as const)
      .filter(([, url]) => Boolean(url)),
  ) as Record<string, string>;

  const featured = featuredPublication(publications);
  const featuredCopy = featured ? publicationCopy(featured, locale) : undefined;
  const featuredHref = featured ? docs[featured.id] : undefined;
  // PDF varsa "oku" okuma sayfasına, yoksa yayının site içi hedefine gider.
  const featuredRead = featured
    ? featuredHref
      ? localePath(locale, `/yayinlar/${featured.id}`)
      : featured.readPath
        ? localePath(locale, featured.readPath)
        : undefined
    : undefined;
  const printHref = `mailto:${site.email}?subject=${encodeURIComponent(dict.mailSubject.catalog)}`;

  return (
    <div className="overflow-x-clip min-h-dvh flex flex-col">
      <SiteNav dict={dict} locale={locale} />
      <main className="flex-1">
        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-[76px]">
          <Reveal>
            <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-bronze-2">{t.kicker}</p>
            <h1 className="text-[clamp(38px,6.5vw,64px)] leading-[1.02] tracking-[-0.04em] font-bold mt-4 max-w-[820px] text-pretty">
              <Emphasis parts={t.title} />
            </h1>
            <p className="text-[clamp(17px,2.3vw,19px)] leading-[1.6] text-muted font-medium mt-5 max-w-[560px]">
              {t.subtitle}
            </p>
          </Reveal>
        </section>

        {featured && featuredCopy && (
          <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-11">
            <Reveal>
              <div className="bg-night rounded-[28px] overflow-hidden grid lg:grid-cols-[0.85fr_1.15fr]">
                <div className="[background:linear-gradient(160deg,#22190F,#140E09)] flex items-center justify-center px-8 py-11">
                  {/* Hafif eğim tasarımdan: kapak masaya bırakılmış bir kitap gibi duruyor. */}
                  <PublicationCover
                    cover={featured.cover}
                    className="w-[208px] max-w-full -rotate-2 [box-shadow:0_2px_5px_rgba(0,0,0,.4),0_40px_70px_-34px_rgba(0,0,0,.85)]"
                  />
                </div>
                <div className="px-8 py-10 sm:px-12 sm:py-12 flex flex-col justify-center">
                  <p className="font-mono text-[11px] tracking-[0.16em] text-brass">{t.featuredKicker}</p>
                  <h2 className="text-[clamp(26px,4vw,38px)] leading-[1.1] tracking-[-0.03em] font-bold text-[#F6F0E4] mt-3.5 text-pretty">
                    {featuredCopy.title}
                  </h2>
                  <p className="text-[16.5px] leading-[1.7] text-[#B4AC9E] mt-3.5 max-w-[460px] text-pretty">
                    {featuredCopy.desc}
                  </p>

                  <dl className="flex flex-wrap gap-x-[26px] gap-y-4 mt-[26px]">
                    {[
                      featured.pages ? [String(featured.pages), t.metaPages] : null,
                      featured.format ? [featured.format, t.metaFormat] : null,
                      [featured.langs, t.metaLangs],
                    ]
                      .filter((x): x is [string, string] => x !== null)
                      .map(([value, label]) => (
                        <div key={label}>
                          <dd className="text-[22px] font-extrabold tracking-[-0.02em] text-[#F6F0E4]">
                            {value}
                          </dd>
                          <dt className="font-mono text-[10px] tracking-[0.08em] text-[#8A7A5E] mt-1">
                            {label}
                          </dt>
                        </div>
                      ))}
                  </dl>

                  <div className="flex items-center gap-3 flex-wrap mt-[30px]">
                    {featuredRead && (
                      <Link
                        href={featuredRead}
                        className="text-sm font-semibold text-night bg-brass px-[26px] py-3.5 rounded-full whitespace-nowrap transition duration-[250ms] hover:bg-[#D4B47D] hover:-translate-y-px"
                      >
                        {t.readCta}&nbsp;›
                      </Link>
                    )}
                    {featuredHref ? (
                      <a
                        href={featuredHref}
                        download
                        className="text-sm font-semibold text-brass border border-brass/45 px-6 py-3.5 rounded-full whitespace-nowrap transition-colors duration-[250ms] hover:bg-brass/[0.12]"
                      >
                        {t.downloadCta}&nbsp;↓
                      </a>
                    ) : (
                      <span className="font-mono text-[11px] text-[#8A7A5E]">{t.soonLabel}</span>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        )}

        <PublicationsIndex dict={dict} locale={locale} docs={docs} publications={publications} />

        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-16 pb-20">
          <Reveal>
            <div className="bg-paper rounded-[28px] px-8 py-11 sm:px-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
              <div>
                <p className="font-mono text-[11px] tracking-[0.16em] text-bronze-2">{t.print.kicker}</p>
                <h2 className="text-[clamp(24px,3.6vw,32px)] leading-[1.14] tracking-[-0.03em] font-bold mt-3">
                  {t.print.title}
                </h2>
                <p className="text-base leading-[1.7] text-muted mt-3 max-w-[460px] text-pretty">
                  {t.print.body}
                </p>
                <div className="flex flex-wrap gap-2.5 mt-[26px]">
                  <a
                    href={printHref}
                    className="text-sm font-semibold text-cream bg-ink px-[26px] py-3.5 rounded-full whitespace-nowrap transition duration-[250ms] hover:bg-[#33291f] hover:-translate-y-0.5"
                  >
                    {t.print.cta}&nbsp;›
                  </a>
                  <Link
                    href={localePath(locale, "/blog")}
                    className="text-sm font-semibold text-ink bg-white border border-ink/[0.16] px-[26px] py-3.5 rounded-full whitespace-nowrap transition-colors hover:border-ink/35"
                  >
                    {t.print.secondaryCta}
                  </Link>
                </div>
              </div>
              <ol className="flex flex-col gap-[11px]">
                {t.print.notes.map((n) => (
                  <li key={n.k} className="flex items-baseline gap-3.5 bg-cream rounded-[14px] px-5 py-[15px]">
                    <span className="font-mono text-[11px] text-bronze flex-none">{n.k}</span>
                    <span className="text-sm leading-[1.6] text-ink-2">{n.d}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
