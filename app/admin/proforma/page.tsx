import Link from "next/link";
import { redirect } from "next/navigation";
import { hasSession } from "@/lib/admin/auth";
import { ProformaBuilder } from "@/components/admin/ProformaBuilder";

export const dynamic = "force-dynamic";

export default async function AdminProformaPage() {
  if (!(await hasSession())) redirect("/admin");

  // Tarih sunucudan geçiyor: istemcide new Date() ile üretilse saat dilimi farkı
  // hidrasyon uyuşmazlığı yaratırdı.
  const today = new Date().toISOString().slice(0, 10);

  return (
    <main className="px-5 sm:px-8 py-7">
      <div className="pf-hide-print flex items-center justify-between gap-4 flex-wrap mb-7">
        <div>
          <h1 className="text-[22px] font-bold tracking-[-0.025em]">Proforma Hazırlayıcı</h1>
          <p className="text-[13px] text-muted mt-1">
            Belge tarayıcıdan PDF&apos;e basılır. Taslak saklanmaz — sayfayı kapatınca form sıfırlanır.
          </p>
        </div>
        <Link
          href="/admin/blog"
          className="text-[13px] font-semibold text-bronze-2 hover:opacity-70 transition-opacity"
        >
          ‹ Blog Yazıları
        </Link>
      </div>
      <ProformaBuilder today={today} />
    </main>
  );
}
