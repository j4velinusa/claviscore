import Link from "next/link";
import { site } from "@/lib/site";
import { type Locale, localePath } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries/tr";

export function SiteFooter({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const home = localePath(locale, "/");

  return (
    <footer id="iletisim" className="bg-paper border-t border-ink/8">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-14 pb-7 grid grid-cols-2 gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center gap-[9px]">
            <span className="size-2 rounded-full bg-bronze" aria-hidden />
            <span className="text-lg font-bold tracking-[-0.02em]">{site.name}</span>
          </div>
          <p className="text-sm leading-[1.6] text-muted max-w-[280px] mt-4">{dict.footer.tagline}</p>
        </div>
        <div>
          <div className="text-xs font-semibold tracking-[0.06em] text-label mb-4 uppercase">
            {dict.footer.products}
          </div>
          <div className="flex flex-col gap-[11px] text-sm text-ink-3">
            {dict.footer.productLinks.map((label) => (
              <Link key={label} href={`${home}#urunler`} className="hover:text-bronze-2 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold tracking-[0.06em] text-label mb-4 uppercase">
            {dict.footer.corporate}
          </div>
          <div className="flex flex-col gap-[11px] text-sm text-ink-3">
            {dict.footer.corporateLinks.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold tracking-[0.06em] text-label mb-4 uppercase">
            {dict.footer.contact}
          </div>
          <div className="flex flex-col gap-[11px] text-sm text-ink-3">
            <a href={`mailto:${site.email}`} className="hover:text-bronze-2 transition-colors">
              {site.email}
            </a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-bronze-2 transition-colors">
              {site.phone}
            </a>
            <span>{site.addressShort}</span>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 py-[22px] border-t border-ink/8 flex flex-col sm:flex-row gap-2 justify-between text-xs text-muted">
        <span>© 2026 {site.legalNameUpper}</span>
        <span>{dict.footer.rights}</span>
      </div>
    </footer>
  );
}
