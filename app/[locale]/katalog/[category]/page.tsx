import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DoorCollectionGrid } from "@/components/katalog/DoorCollectionGrid";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import {
  doorCollections,
  doorCollectionSlugs,
  isDoorCollectionSlug,
} from "@/lib/door-collections";
import { getDictionary } from "@/lib/dictionaries/get";
import { isLocale, locales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

type Params = { locale: string; category: string };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    doorCollectionSlugs.map((category) => ({ locale, category })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isLocale(locale) || !isDoorCollectionSlug(category)) return {};
  const dict = await getDictionary(locale);
  const collection = doorCollections[category];
  const meta = dict.meta.doorCollections[collection.copyKey];

  return buildMetadata({
    locale,
    path: `/katalog/${category}`,
    title: meta.title,
    description: meta.description,
  });
}

export default async function DoorCollectionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, category } = await params;
  if (!isLocale(locale) || !isDoorCollectionSlug(category)) notFound();
  const dict = await getDictionary(locale);
  const collection = doorCollections[category];

  return (
    <div className="overflow-x-clip min-h-dvh flex flex-col">
      <SiteNav dict={dict} locale={locale} />
      <main className="flex-1">
        <DoorCollectionGrid dict={dict} locale={locale} collection={collection} />
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
