import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries/get";
import { buildMetadata } from "@/lib/metadata";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Catalog } from "@/components/katalog/Catalog";
import { productImageMap } from "@/lib/product-images";

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
    path: "/katalog",
    title: dict.meta.katalog.title,
    description: dict.meta.katalog.description,
  });
}

export default async function KatalogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  return (
    <div className="overflow-x-clip min-h-dvh flex flex-col">
      <SiteNav dict={dict} locale={locale} />
      <main className="flex-1">
        {/* Görsel eşlemesi build anında dosyadan okunuyor; Catalog istemci
            bileşeni olduğu için fs'e kendisi erişemez. */}
        <Catalog dict={dict} images={productImageMap()} />
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
