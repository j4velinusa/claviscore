import { redirect } from "next/navigation";
import { hasSession } from "@/lib/admin/auth";
import { getMediaManifest, getPublications } from "@/lib/admin/github";
import { PublicationsAdmin } from "@/components/admin/PublicationsAdmin";
import { toMediaMap } from "@/lib/media-config";
import type { Publication } from "@/lib/publications";

// Oturum çerezine bakıyor — build anında prerender edilmemeli.
export const dynamic = "force-dynamic";

export default async function AdminYayinlarPage() {
  if (!(await hasSession())) redirect("/admin");

  // İkisi de GitHub'dan: panel son commit'i deploy beklemeden görsün.
  let list: Publication[] = [];
  let docs: Record<string, string> = {};
  try {
    [{ list }, docs] = await Promise.all([
      getPublications(),
      getMediaManifest().then(({ manifest }) => {
        const media = toMediaMap(manifest);
        const out: Record<string, string> = {};
        for (const [id, url] of Object.entries(media)) {
          if (id.startsWith("dok:")) out[id.slice("dok:".length)] = url;
        }
        return out;
      }),
    ]);
  } catch {
    // Okuma başarısızsa panel yine açılsın; kaydetme denemesi gerçek hatayı gösterir.
  }

  return <PublicationsAdmin initial={list} docs={docs} />;
}
