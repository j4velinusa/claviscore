import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import { PRODUCT_IMAGE_URL_BASE, type ProductImageManifest } from "@/lib/products";

// Ürün görselleri: public site tarafı (build anında dosyadan okur).
// Admin tarafı GitHub API'yi kullanır — bkz. lib/admin/github.ts.
// İstemcinin de görebildiği sabit ve tipler lib/products.ts'te; bu modül
// server-only olduğu için oradan içe aktarılamaz.
//
// Görsellerin kendisi public/urunler/ altında repoda durur — ayrı bir depolama
// servisi yok, panelin geri kalanıyla aynı model.

const MANIFEST = path.join(process.cwd(), "content", "products", "images.json");

/** SKU → public URL. Görseli olmayan SKU haritada yer almaz. */
export type ProductImageMap = Record<string, string>;

function readManifest(): ProductImageManifest {
  try {
    return JSON.parse(readFileSync(MANIFEST, "utf8")) as ProductImageManifest;
  } catch {
    // Henüz hiç görsel yüklenmemişse dosya yok — kartlar yer tutucuyla render edilir.
    return {};
  }
}

/**
 * Katalog sayfası bunu sunucuda çağırıp istemci bileşenine düz nesne olarak geçer.
 * İstemcide fs erişimi olmadığı için tersi mümkün değil.
 */
export function productImageMap(): ProductImageMap {
  const manifest = readManifest();
  const out: ProductImageMap = {};
  for (const [sku, entry] of Object.entries(manifest)) {
    if (entry?.file) out[sku] = `${PRODUCT_IMAGE_URL_BASE}/${entry.file}`;
  }
  return out;
}
