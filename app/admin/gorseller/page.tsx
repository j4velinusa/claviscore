import { redirect } from "next/navigation";
import { hasSession } from "@/lib/admin/auth";
import { getMediaManifest } from "@/lib/admin/github";
import { MediaManager } from "@/components/admin/MediaManager";
import type { MediaManifest } from "@/lib/media-config";

// Oturum çerezine bakıyor — build anında prerender edilmemeli (bkz. app/admin/page.tsx).
export const dynamic = "force-dynamic";

export default async function AdminGorsellerPage() {
  if (!(await hasSession())) redirect("/admin");

  // Kayıt dosyası GitHub'dan okunuyor: panel son commit'i deploy beklemeden görsün.
  let manifest: MediaManifest = {};
  try {
    ({ manifest } = await getMediaManifest());
  } catch {
    // Kayıt okunamazsa panel yine açılsın; kartlar "görsel yok" ile gelir ve
    // yükleme denemesi gerçek hatayı gösterir.
  }

  return <MediaManager initial={manifest} />;
}
