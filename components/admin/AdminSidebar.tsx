"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

// Panel kenar çubuğu. Blog, Görseller ve Yayınlar sayfalarında birebir aynıydı;
// üçüncü kopyada ortak bileşene çıkarıldı — yeni bir bölüm eklenince üç ayrı
// yerde güncellemek unutuluyordu.

type Section = "blog" | "gorseller" | "yayinlar" | "proforma";

const ITEMS: { key: Section; href: string; icon: string; label: string; group: string }[] = [
  { key: "blog", href: "/admin/blog", icon: "✎", label: "Blog Yazıları", group: "İÇERİK" },
  { key: "yayinlar", href: "/admin/yayinlar", icon: "◫", label: "Yayınlar", group: "İÇERİK" },
  { key: "gorseller", href: "/admin/gorseller", icon: "▦", label: "Görseller", group: "İÇERİK" },
  { key: "proforma", href: "/admin/proforma", icon: "⎘", label: "Proforma", group: "BELGELER" },
];

export function AdminSidebar({
  active,
  counts = {},
}: {
  active: Section;
  /** Bölüm adının yanında gösterilen sayı (ör. yazı adedi). */
  counts?: Partial<Record<Section, number>>;
}) {
  const router = useRouter();
  const groups = [...new Set(ITEMS.map((i) => i.group))];

  return (
    <aside className="hidden md:flex w-[238px] flex-none flex-col bg-night text-[#C9C0B2] px-3 py-6">
      <div className="flex items-center gap-[9px] px-3">
        <span className="size-2 rounded-full bg-bronze" aria-hidden />
        <span className="text-[17px] font-bold tracking-[-0.02em] text-[#F4EEE2]">CLAVISCOR</span>
      </div>

      {groups.map((group) => (
        <div key={group}>
          <div className="font-mono text-[10px] tracking-[0.14em] text-[#6f6452] px-3 pt-8 pb-2.5">
            {group}
          </div>
          {ITEMS.filter((i) => i.group === group).map((item) => {
            const isActive = item.key === active;
            const inner = (
              <>
                <span aria-hidden className="font-mono text-[11px] w-5 text-[#6f6452]">
                  {item.icon}
                </span>
                {item.label}
                {counts[item.key] !== undefined && (
                  <span className="ml-auto text-[11px] font-bold text-[#6f6452]">
                    {counts[item.key]}
                  </span>
                )}
              </>
            );
            return isActive ? (
              <span
                key={item.key}
                aria-current="page"
                className="flex items-center gap-[11px] px-3 py-2.5 rounded-[10px] text-sm font-medium bg-white/5 text-[#F4EEE2]"
              >
                {inner}
              </span>
            ) : (
              <Link
                key={item.key}
                href={item.href}
                className="flex items-center gap-[11px] px-3 py-2.5 rounded-[10px] text-sm font-medium hover:bg-white/5 transition-colors"
              >
                {inner}
              </Link>
            );
          })}
        </div>
      ))}

      <div className="mt-auto px-3">
        <button
          type="button"
          onClick={async () => {
            await fetch("/api/admin/login", { method: "DELETE" });
            router.replace("/admin");
            router.refresh();
          }}
          className="text-[13px] text-[#6f6452] hover:text-[#C9C0B2] transition-colors"
        >
          Çıkış yap
        </button>
      </div>
    </aside>
  );
}
