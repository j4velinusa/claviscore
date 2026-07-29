import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries/get";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { certificates, certificateGroups, orDash } from "@/lib/certificates";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Reveal } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/site/Emphasis";
import { CertificateSketch } from "@/components/site/Illustrations";

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
    path: "/sertifikalar",
    title: dict.meta.sertifikalar.title,
    description: dict.meta.sertifikalar.description,
  });
}

export default async function SertifikalarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.certificatesPage;

  // Kategori filtresi tasarımda var ama şu an üç belge için anlamsız; liste
  // gruplara ayrılmış başlıklarla veriliyor. Belge sayısı artınca filtre gelir.
  const grouped = certificateGroups
    .map((g) => ({ group: g, items: certificates.filter((c) => c.group === g) }))
    .filter((x) => x.items.length > 0);

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
            <p className="text-[clamp(17px,2.3vw,19px)] leading-[1.6] text-muted font-medium mt-5 max-w-[600px]">
              {t.subtitle}
            </p>
          </Reveal>
        </section>

        <div className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-12 flex flex-col gap-10">
          {grouped.map(({ group, items }, gi) => (
            <Reveal key={group} delay={gi * 70}>
              <h2 className="font-mono text-[11px] tracking-[0.14em] text-label pb-3 border-b border-ink/10">
                {t.groups[group]}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                {items.map((c) => {
                  const copy = t.items[c.key as keyof typeof t.items];
                  const href = `mailto:${site.email}?subject=${encodeURIComponent(
                    `${t.requestCta} — ${c.standard}`,
                  )}`;
                  return (
                    <div
                      key={c.key}
                      className="h-full bg-white border border-ink/[0.08] rounded-[20px] px-6 py-6 flex flex-col"
                    >
                      <div className="font-mono text-[11px] tracking-[0.1em] text-bronze-2">{c.standard}</div>
                      <h3 className="text-[19px] font-bold tracking-[-0.02em] mt-2.5 text-pretty">
                        {copy.title}
                      </h3>
                      <p className="text-sm leading-[1.6] text-muted mt-2 text-pretty">{copy.desc}</p>

                      <dl className="mt-5 pt-4 border-t border-ink/8 flex flex-col gap-2 text-[12.5px]">
                        {(
                          [
                            [t.columns.issuer, c.issuer],
                            [t.columns.documentNo, c.documentNo],
                            [t.columns.valid, c.validUntil],
                          ] as const
                        ).map(([k, v]) => (
                          <div key={k} className="flex items-baseline justify-between gap-3">
                            <dt className="font-mono text-[10px] tracking-[0.1em] text-label">{k}</dt>
                            <dd className="font-mono text-muted">{orDash(v)}</dd>
                          </div>
                        ))}
                      </dl>

                      <a
                        href={href}
                        className="mt-auto pt-5 text-sm font-semibold text-bronze-2 hover:opacity-70 transition-opacity"
                      >
                        {t.requestCta}&nbsp;›
                      </a>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          ))}

          <Reveal>
            <p className="text-[13px] text-muted">{t.requestNote}</p>
          </Reveal>

          <Reveal>
            <div className="bg-paper rounded-[26px] px-8 py-10 sm:px-12 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] gap-10 items-center">
              <div>
              <h2 className="text-[clamp(24px,3.6vw,32px)] leading-[1.15] tracking-[-0.03em] font-bold max-w-[640px] text-pretty">
                <Emphasis parts={t.explainer.title} />
              </h2>
              <p className="text-[16px] leading-[1.7] text-muted mt-4 max-w-[680px] text-pretty">
                {t.explainer.body}
              </p>
              </div>
              <CertificateSketch className="max-w-[280px] mx-auto lg:mx-0" />
            </div>
          </Reveal>
        </div>
        <div className="pb-20" />
      </main>
      <SiteFooter dict={dict} locale={locale} />
    </div>
  );
}
