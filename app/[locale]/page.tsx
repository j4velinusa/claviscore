import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries/get";
import { buildMetadata } from "@/lib/metadata";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { ProductFamilies, CeilingSystems } from "@/components/landing/Families";
import { Engineering } from "@/components/landing/Engineering";
import { ExportPanel } from "@/components/landing/ExportPanel";
import { Certificates } from "@/components/landing/Certificates";
import { ClosingCta } from "@/components/landing/ClosingCta";
import { mediaMap } from "@/lib/media";
import { slotId } from "@/lib/media-config";

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
    path: "/",
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  // Görsel eşlemesi build anında dosyadan okunuyor; bileşenler istemciye de
  // gidebildiği için fs'e kendileri erişemez.
  const media = mediaMap();

  return (
    <div className="overflow-x-clip">
      <SiteNav dict={dict} locale={locale} />
      <main>
        <Hero dict={dict} locale={locale} imageSrc={media[slotId("site", "hero")]} />
        <Stats dict={dict} locale={locale} />
        <ProductFamilies dict={dict} locale={locale} />
        <CeilingSystems dict={dict} />
        <Engineering dict={dict} imageSrc={media[slotId("site", "muhendislik")]} />
        <ExportPanel dict={dict} locale={locale} />
        <Certificates dict={dict} />
        <ClosingCta dict={dict} />
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
