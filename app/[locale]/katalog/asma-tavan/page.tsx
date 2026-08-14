import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CeilingCatalog } from "@/components/katalog/CeilingCatalog";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { getDictionary } from "@/lib/dictionaries/get";
import { isLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

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
    path: "/katalog/asma-tavan",
    title: dict.meta.ceilingCatalog.title,
    description: dict.meta.ceilingCatalog.description,
  });
}

export default async function CeilingCatalogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip">
      <SiteNav dict={dict} locale={locale} />
      <main className="flex-1">
        <CeilingCatalog dict={dict} locale={locale} />
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
