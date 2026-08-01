import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries/get";
import { buildMetadata } from "@/lib/metadata";
import { getPostSummaries, getFeaturedPost } from "@/lib/blog";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { mediaMap } from "@/lib/media";
import { blogSlotId } from "@/lib/media-config";

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
    path: "/blog",
    title: dict.meta.blog.title,
    description: dict.meta.blog.description,
  });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const posts = getPostSummaries(locale);
  // Kapaklar görsel kaydında, yazının markdown'ında değil — slug ile eşleşiyor.
  const media = mediaMap();
  const covers = Object.fromEntries(
    posts
      .map((p) => [p.slug, media[blogSlotId(locale, p.slug)]] as const)
      .filter(([, url]) => Boolean(url)),
  ) as Record<string, string>;

  return (
    <div className="overflow-x-clip min-h-dvh flex flex-col">
      <SiteNav dict={dict} locale={locale} />
      <main className="flex-1">
        <BlogIndex
          posts={posts}
          covers={covers}
          featured={getFeaturedPost(locale)}
          dict={dict}
          locale={locale}
        />
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
