import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import { toMediaMap, type MediaManifest, type MediaMap } from "@/lib/media-config";

// Görsel yuvaları: public site tarafı (build anında dosyadan okur).
// Panel tarafı repo'nun anlık halini GitHub API'den çeker — bkz. lib/admin/github.ts.
// İstemcinin de gördüğü sabit ve tipler lib/media-config.ts'te; bu modül server-only
// olduğu için oradan içe aktarılamaz.
//
// Görsellerin kendisi public/gorseller/ altında repoda durur — ayrı bir depolama
// servisi yok, panelin geri kalanıyla (blog, proforma) aynı model.

const MANIFEST = path.join(process.cwd(), "content", "media.json");

export function readMediaManifest(): MediaManifest {
  try {
    return JSON.parse(readFileSync(MANIFEST, "utf8")) as MediaManifest;
  } catch {
    // Henüz hiç görsel yüklenmemişse dosya yok — alanlar yer tutucuyla render edilir.
    return {};
  }
}

/**
 * Sayfalar bunu sunucuda çağırıp istemci bileşenlerine düz nesne olarak geçer.
 * İstemcide fs erişimi olmadığı için tersi mümkün değil.
 */
export function mediaMap(): MediaMap {
  return toMediaMap(readMediaManifest());
}
