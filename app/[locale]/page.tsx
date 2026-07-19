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

  return (
    <div className="overflow-x-clip">
      <SiteNav dict={dict} locale={locale} />
      <main>
        <Hero dict={dict} locale={locale} />
        <Stats dict={dict} locale={locale} />
        <ProductFamilies dict={dict} locale={locale} />
        <CeilingSystems dict={dict} />
        <Engineering dict={dict} />
        <ExportPanel dict={dict} locale={locale} />
        <Certificates dict={dict} />
        <ClosingCta dict={dict} />
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
