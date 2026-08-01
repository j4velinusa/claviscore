import Image from "next/image";
import { site } from "@/lib/site";
import type { Product } from "@/lib/products";
import type { Dictionary } from "@/lib/dictionaries/tr";

const cardClass =
  "h-full bg-white rounded-[22px] overflow-hidden flex flex-col [box-shadow:0_1px_2px_rgba(0,0,0,.04),0_16px_40px_-26px_rgba(0,0,0,.22)] transition-[transform,box-shadow] duration-[450ms] ease-swift hover:-translate-y-1.5 hover:[box-shadow:0_1px_2px_rgba(0,0,0,.04),0_28px_56px_-24px_rgba(0,0,0,.32)]";

/**
 * Katalog ürün kartı. Mockup kartı `cursor:pointer` + › ile ürün detayına gidişi ima
 * ediyor ama detay sayfasının tasarımı yok (bkz. docs/design-analysis.md §1.3). Ölü bir
 * ok bırakmamak için kart, SKU'su konuya yazılmış teklif e-postası açıyor — sitenin
 * geri kalanındaki mailto CTA modeliyle aynı. Detay sayfası gelince href oraya döner.
 */
export function ProductCard({
  product,
  dict,
  imageSrc,
}: {
  product: Product;
  dict: Dictionary;
  /** Panelden yüklenmiş görselin yolu. Yoksa mockup'taki soyut yer tutucu kalır. */
  imageSrc?: string;
}) {
  const t = dict.katalog;
  const copy = t.products[product.sku as keyof typeof t.products];
  const href = `mailto:${site.email}?subject=${encodeURIComponent(`${dict.mailSubject.quote} — ${product.sku}`)}`;

  return (
    <a href={href} className={cardClass}>
      <div className="relative aspect-[5/4] [background:linear-gradient(160deg,#F1ECE2,#E6DFD1)] flex items-center justify-center">
        {imageSrc ? (
          // alt="" bilinçli: görselin taşıdığı bilgi zaten kartta yazıyor (ad, SKU,
          // açıklama). Ürün adını burada tekrar etmek ekran okuyucuda çift okuma yapar.
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(min-width: 1024px) 348px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="size-[86px] rounded-full border-[1.5px] border-ink/[0.18] flex items-center justify-center"
          >
            <div className="size-[34px] rounded-full border-[1.5px] border-ink/[0.16]" />
          </div>
        )}
        <span className="absolute top-4 left-[18px] font-mono text-[11px] tracking-[0.04em] text-bronze-2">
          {product.sku}
        </span>
        {product.badge && (
          <span className="absolute top-3.5 right-4 text-[10px] font-bold tracking-[0.08em] text-ink bg-brass px-2.5 py-1 rounded-full">
            {t.badges[product.badge]}
          </span>
        )}
      </div>

      <div className="px-6 pt-[22px] pb-6 flex flex-col flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[21px] font-bold tracking-[-0.01em]">{copy.name}</span>
          <span aria-hidden className="flex-none text-[18px] text-bronze-2">
            ›
          </span>
        </div>
        {/* mb + mt-auto: kısa açıklamalarda mockup'ın 18px boşluğu korunur, uzunlarda
            alt şerit kartın dibine yaslanır ve grid satırındaki kartlar hizalı kalır. */}
        <p className="text-sm text-muted mt-[5px] mb-[18px] leading-[1.5] min-h-[42px]">{copy.desc}</p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-ink/8">
          <span className="flex items-center gap-[7px]" aria-label={t.finishesLabel}>
            {product.finishes.map((hex) => (
              <span
                key={hex}
                aria-hidden
                className="size-[15px] rounded-full border border-black/[0.16]"
                style={{ background: hex }}
              />
            ))}
          </span>
          <span className="font-mono text-[11px] text-muted">{copy.spec}</span>
        </div>
      </div>
    </a>
  );
}
