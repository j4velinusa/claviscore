import type { Metadata } from "next";
import type { ReactNode } from "react";

// Admin dil yönlendirmesinin dışında (bkz. proxy.ts matcher) ve her zaman noindex.
export const metadata: Metadata = {
  title: "Yönetim — CLAVISCOR",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-dvh bg-cream">{children}</div>;
}
