"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import { site } from "@/lib/site";
import { type Locale, locales, localePath, switchLocalePath } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/tr";

export function SiteNav({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const home = localePath(locale, "/");

  const links = [
    { label: dict.nav.products, href: `${home}#urunler` },
    { label: dict.nav.collection, href: localePath(locale, "/koleksiyon") },
    { label: dict.nav.certificates, href: localePath(locale, "/sertifikalar") },
    { label: dict.nav.export, href: `${home}#ihracat` },
    { label: dict.nav.blog, href: localePath(locale, "/blog") },
    { label: dict.nav.contact, href: localePath(locale, "/iletisim") },
  ];
  const quoteHref = `mailto:${site.email}?subject=${encodeURIComponent(dict.mailSubject.quote)}`;

  const langSwitch = (
    <div className="flex items-center gap-1.5 text-[13px] font-medium">
      {locales.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && <span aria-hidden className="text-muted">/</span>}
          {l === locale ? (
            <span aria-current="true" className="text-ink font-semibold">
              {l.toUpperCase()}
            </span>
          ) : (
            <Link
              href={switchLocalePath(pathname, l)}
              className="text-muted hover:text-bronze-2 transition-colors"
            >
              {l.toUpperCase()}
            </Link>
          )}
        </Fragment>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-[18px] border-b border-ink/7">
      <div className="mx-auto max-w-[1120px] flex items-center justify-between px-5 sm:px-8 py-4">
        <Link href={home} className="flex items-center gap-[9px]">
          <span className="size-2 rounded-full bg-bronze" aria-hidden />
          <span className="text-[19px] font-bold tracking-[-0.02em]">{site.name}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-[34px] text-sm font-medium text-ink-3">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className="transition-colors duration-[250ms] hover:text-bronze-2">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">{langSwitch}</div>
          <a
            href={quoteHref}
            className="text-sm font-semibold text-cream bg-ink px-5 py-[9px] rounded-full whitespace-nowrap transition duration-[250ms] hover:bg-[#33291f] hover:-translate-y-px"
          >
            {dict.nav.quote}
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={dict.nav.menu}
            className="lg:hidden flex flex-col justify-center gap-[5px] size-9 rounded-full border border-ink/10"
          >
            <span className={`mx-auto h-px w-4 bg-ink transition ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`mx-auto h-px w-4 bg-ink transition ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-ink/7 bg-cream px-5 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-[15px] font-medium text-ink-3 hover:text-bronze-2 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-3 mt-2 border-t border-ink/7">{langSwitch}</div>
        </nav>
      )}
    </header>
  );
}
