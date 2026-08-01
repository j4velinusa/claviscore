import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, localePath, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries/get";
import { buildMetadata } from "@/lib/metadata";
import { getPost, getPostSlugs, getRelatedPosts } from "@/lib/blog";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PostCard } from "@/components/blog/PostCard";
import { ReadingProgress, ArticleAside } from "@/components/blog/ArticleChrome";

type Params = { locale: string; slug: string };

// Dil × slug çarpımını burada üretiyoruz; üst segmentin params'ına bağlı kalmadan
// her iki dilin yazıları da build anında prerender edilsin diye.
export function generateStaticParams() {
  return locales.flatMap((locale) => getPostSlugs(locale).map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = getPost(locale, slug);
  if (!post) return {};
  return buildMetadata({
    locale,
    path: `/blog/${slug}`,
    title: `${post.title} — CLAVISCOR`,
    description: post.excerpt,
  });
}

/** Başlığın sonundaki vurgu öbeğini serif italik ayırır (frontmatter: titleAccent). */
function SplitTitle({ title, accent }: { title: string; accent?: string }) {
  if (!accent || !title.endsWith(accent)) return <>{title}</>;
  return (
    <>
      {title.slice(0, title.length - accent.length)}
      <span className="font-serif italic font-medium tracking-[-0.01em]">{accent}</span>
    </>
  );
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = getPost(locale, slug);
  if (!post) notFound();
  const dict = await getDictionary(locale);
  const t = dict.blog;
  const related = getRelatedPosts(locale, slug);
  const loc: Locale = locale;

  return (
    <div className="overflow-x-clip min-h-dvh flex flex-col">
      <SiteNav dict={dict} locale={loc} />
      <ReadingProgress />
      <main className="flex-1">
        <header className="mx-auto max-w-[780px] px-5 sm:px-8 pt-[60px]">
          <div className="flex items-center gap-2.5 text-[13px] text-muted">
            <Link href={localePath(loc, "/blog")} className="text-bronze-2 hover:opacity-70 transition-opacity">
              {t.kicker}
            </Link>
            <span aria-hidden>›</span>
            <span className="text-bronze-2">{t.categories[post.category]}</span>
          </div>
          <h1 className="text-[clamp(32px,5.5vw,54px)] leading-[1.08] tracking-[-0.035em] font-bold mt-[22px] text-pretty">
            <SplitTitle title={post.title} accent={post.titleAccent} />
          </h1>
          <p className="text-[clamp(17px,2.4vw,20px)] leading-[1.55] text-muted font-medium mt-5 text-pretty">
            {post.excerpt}
          </p>
          {/* Yazar künyesi kaldırıldı: tasarımdaki isimler uydurmaydı ve gerçek bir
              kişiye bağlanamıyor. Yerinde tarih ve okuma süresi kalıyor. */}
          <div className="flex items-center gap-4 flex-wrap mt-[30px] py-5 border-y border-ink/10">
            <div className="flex-1 min-w-[200px]">
              <div className="text-[13px] text-muted">
                {post.dateLabel} · {post.readingMinutes} {t.readingSuffix}
              </div>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] text-bronze-2 bg-[#F4EEE2] px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <div className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-10">
          <div
            aria-hidden
            className="relative [background:linear-gradient(160deg,#F1ECE2,#E6DFD1)] rounded-[28px] h-[260px] sm:h-[460px] flex items-center justify-center"
          >
            <div className="size-[150px] sm:size-[230px] rounded-full border-[1.5px] border-ink/20 flex items-center justify-center">
              <div className="size-[84px] sm:size-[130px] rounded-full border-[1.5px] border-ink/[0.16] flex items-center justify-center">
                <div className="size-[34px] sm:size-[50px] rounded-full bg-bronze/25 border border-bronze/55" />
              </div>
            </div>
          </div>
          {post.coverCaption && (
            <p className="text-[13px] text-muted mt-3 pl-1">{post.coverCaption}</p>
          )}
        </div>

        <div className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-14 grid lg:grid-cols-[220px_minmax(0,1fr)] gap-14 items-start">
          <ArticleAside toc={post.toc} dict={dict} />
          <div className="max-w-[700px]">
            <div className="prose-article" dangerouslySetInnerHTML={{ __html: post.html }} />
            {post.productCta && (
              <div className="mt-[46px] bg-night rounded-[22px] px-8 py-8 sm:px-9 flex flex-col sm:flex-row sm:items-center justify-between gap-7">
                <div>
                  <div className="font-mono text-[11px] tracking-[0.16em] text-brass">{post.productCta.sku}</div>
                  <div className="text-2xl font-bold tracking-[-0.02em] text-[#F4EEE2] mt-2">
                    {post.productCta.title}
                  </div>
                  <div className="text-[15px] text-[#B4AC9E] mt-1.5">{post.productCta.desc}</div>
                </div>
                <Link
                  href={localePath(loc, "/katalog")}
                  className="flex-none self-start sm:self-auto text-sm font-semibold text-night bg-brass px-[26px] py-3.5 rounded-full whitespace-nowrap transition duration-[250ms] hover:bg-[#D4B47D] hover:-translate-y-px"
                >
                  {t.productCta}&nbsp;›
                </Link>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-[78px]">
            <div className="flex items-baseline justify-between pb-[22px] border-b border-ink/10">
              <h2 className="text-[28px] font-bold tracking-[-0.025em]">{t.related}</h2>
              <Link
                href={localePath(loc, "/blog")}
                className="text-sm font-semibold text-bronze-2 hover:opacity-70 transition-opacity"
              >
                {t.seeAll}&nbsp;›
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[22px] mt-[26px]">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} dict={dict} locale={loc} />
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter dict={dict} locale={loc} />
    </div>
  );
}
