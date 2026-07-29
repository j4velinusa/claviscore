import Link from "next/link";
import { redirect } from "next/navigation";
import { hasSession } from "@/lib/admin/auth";
import { listProformas, nextProformaNo } from "@/lib/admin/github";
import { ProformaBuilder, type SavedProforma } from "@/components/admin/ProformaBuilder";

export const dynamic = "force-dynamic";

export default async function AdminProformaPage() {
  if (!(await hasSession())) redirect("/admin");

  // Tarih sunucudan geçiyor: istemcide new Date() ile üretilse saat dilimi farkı
  // hidrasyon uyuşmazlığı yaratırdı.
  const now = new Date();
  const today = now.toISOString().slice(0, 10);

  // GitHub erişilemezse hazırlayıcı yine açılsın — kaydetme çalışmaz ama belge
  // hazırlanıp yazdırılabilir. Araç tamamen bloke olmasın.
  let list: SavedProforma[] = [];
  let next = `PI-${now.getUTCFullYear()}-0001`;
  let loadError = "";
  try {
    [list, next] = await Promise.all([listProformas(), nextProformaNo(now.getUTCFullYear())]);
  } catch (err) {
    loadError = `Kayıtlar okunamadı: ${(err as Error).message}`;
  }

  return (
    <main className="px-5 sm:px-8 py-7">
      <div className="pf-hide-print flex items-center justify-between gap-4 flex-wrap mb-7">
        <div>
          <h1 className="text-[22px] font-bold tracking-[-0.025em]">Proforma Hazırlayıcı</h1>
          <p className="text-[13px] text-muted mt-1">
            Kayıtlar <code className="font-mono">content/proforma/</code> altına commit&apos;lenir.
            Numara mevcut dosyalardan türetilir.
          </p>
        </div>
        <Link
          href="/admin/blog"
          className="text-[13px] font-semibold text-bronze-2 hover:opacity-70 transition-opacity"
        >
          ‹ Blog Yazıları
        </Link>
      </div>
      <ProformaBuilder today={today} initialNo={next} initialList={list} loadError={loadError} />
    </main>
  );
}
