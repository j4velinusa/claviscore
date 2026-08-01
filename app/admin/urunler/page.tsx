import { redirect } from "next/navigation";
import { hasSession } from "@/lib/admin/auth";
import { getProductImageManifest } from "@/lib/admin/github";
import { ProductImages } from "@/components/admin/ProductImages";

// Oturum çerezine bakıyor — build anında prerender edilmemeli (bkz. app/admin/page.tsx).
export const dynamic = "force-dynamic";

export default async function AdminUrunlerPage() {
  if (!(await hasSession())) redirect("/admin");

  // Kayıt dosyası GitHub'dan okunuyor: panel son commit'i deploy beklemeden görsün.
  let manifest = {};
  try {
    ({ manifest } = await getProductImageManifest());
  } catch {
    // Kayıt okunamazsa panel yine açılsın; kartlar "görsel yok" ile gelir ve
    // yükleme denemesi gerçek hatayı gösterir.
  }

  return <ProductImages initial={manifest} />;
}
