import { redirect } from "next/navigation";
import { hasSession } from "@/lib/admin/auth";
import { listPosts } from "@/lib/admin/github";
import { locales } from "@/lib/i18n";
import { BlogAdmin, type AdminRow } from "@/components/admin/BlogAdmin";

// Oturum çerezine ve GitHub'a bağlı — her istekte taze render.
export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  if (!(await hasSession())) redirect("/admin");

  let rows: AdminRow[] = [];
  let error = "";
  try {
    const perLocale = await Promise.all(locales.map((l) => listPosts(l)));
    rows = perLocale.flat().map((p) => ({
      slug: p.slug,
      locale: p.locale,
      title: p.title,
      category: p.category,
      status: p.status,
      date: p.date,
      author: { name: p.author?.name ?? "—" },
      sha: p.sha,
    }));
    rows.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  } catch (err) {
    error = (err as Error).message;
  }

  if (error) {
    return (
      <main className="min-h-dvh flex items-center justify-center px-6">
        <div className="max-w-[460px]">
          <h1 className="text-[20px] font-bold tracking-[-0.02em]">GitHub&apos;a bağlanılamadı</h1>
          <p className="text-sm text-muted mt-3 leading-relaxed">{error}</p>
        </div>
      </main>
    );
  }

  // Tarih alanı için bugünün ISO günü — sunucudan geçiyor ki istemcide
  // saat dilimi farkından kaynaklı hidrasyon uyuşmazlığı olmasın.
  const today = new Date().toISOString().slice(0, 10);

  return <BlogAdmin rows={rows} today={today} />;
}
