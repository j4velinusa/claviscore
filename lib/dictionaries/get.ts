import "server-only";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "./tr";

// Sözlükler yalnızca sunucuda yüklenir; istemci paketine dahil olmaz.
const loaders: Record<Locale, () => Promise<Dictionary>> = {
  tr: () => import("./tr").then((m) => m.tr),
  en: () => import("./en").then((m) => m.en),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}
