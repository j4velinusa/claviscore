"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { blogCategories, type BlogCategory, type PostStatus } from "@/lib/blog-config";
import { locales, type Locale } from "@/lib/i18n";
import { blogSlotId } from "@/lib/media-config";
import { upload as uploadToBlob } from "@vercel/blob/client";
import { toWebp } from "@/lib/image-encode";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export type AdminRow = {
  slug: string;
  locale: Locale;
  title: string;
  category: BlogCategory;
  status: PostStatus;
  date: string;
  sha: string;
};

const CATS: Record<BlogCategory, string> = {
  teknik: "Teknik",
  standart: "Standartlar",
  ihracat: "İhracat",
  tavan: "Tavan Sistemleri",
  proje: "Proje",
};

const STATUS: Record<PostStatus, { label: string; cls: string }> = {
  live: { label: "Yayında", cls: "text-[#2E7D5B] bg-[#2E7D5B]/15" },
  scheduled: { label: "Planlandı", cls: "text-bronze-2 bg-bronze/15" },
  draft: { label: "Taslak", cls: "text-muted bg-ink/8" },
};

type Filter = "all" | PostStatus;

type Draft = {
  locale: Locale;
  slug: string;
  sha: string;
  title: string;
  titleAccent: string;
  excerpt: string;
  category: BlogCategory;
  status: PostStatus;
  date: string;
  readingMinutes: number;
  tags: string;
  coverCaption: string;
  featured: boolean;
  body: string;
};

const emptyDraft = (locale: Locale, today: string): Draft => ({
  locale,
  slug: "",
  sha: "",
  title: "",
  titleAccent: "",
  excerpt: "",
  category: "teknik",
  status: "draft",
  date: today,
  readingMinutes: 5,
  tags: "",
  coverCaption: "",
  featured: false,
  body: "",
});

const label = "font-mono text-[10px] tracking-[0.1em] text-label";
const field =
  "w-full mt-2 bg-white border border-ink/[0.14] rounded-xl px-3.5 py-2.5 text-[13.5px] outline-none focus:border-bronze transition-colors";

export function BlogAdmin({ rows, today }: { rows: AdminRow[]; today: string }) {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);
  // Kapak görseli yazının slug'ına bağlı bir yuvaya yükleniyor; slug yoksa
  // (yazı henüz kaydedilmemişse) yükleme yapılamaz.
  const [coverBusy, setCoverBusy] = useState(false);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const coverInput = useRef<HTMLInputElement | null>(null);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr-TR");
    return rows.filter(
      (r) =>
        (filter === "all" || r.status === filter) &&
        (!q || r.title.toLocaleLowerCase("tr-TR").includes(q) || r.slug.includes(q)),
    );
  }, [rows, filter, query]);

  const counts = useMemo(
    () => ({
      all: rows.length,
      live: rows.filter((r) => r.status === "live").length,
      scheduled: rows.filter((r) => r.status === "scheduled").length,
      draft: rows.filter((r) => r.status === "draft").length,
    }),
    [rows],
  );

  const openNew = () => {
    setError("");
    setCoverUrl(null);
    setDraft(emptyDraft("tr", today));
  };

  /** Kapak görselini yazının yuvasına yükler. Slug yoksa yazı önce kaydedilmeli. */
  const uploadCover = async (file: File) => {
    if (!draft?.slug) return;
    setError("");
    setCoverBusy(true);
    try {
      const id = blogSlotId(draft.locale, draft.slug);
      const { blob } = await toWebp(file, 1800);
      // Kapak da blob deposuna: repoya commit'lemek yükleme başına bir dağıtım
      // harcıyordu ve günlük kota doluyordu.
      const uploaded = await uploadToBlob(`${id}/kapak.webp`, blob, {
        access: "public",
        handleUploadUrl: "/api/admin/blob-upload",
        contentType: "image/webp",
      });
      const res = await fetch("/api/admin/media-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          url: uploaded.url,
          pathname: uploaded.pathname,
          size: blob.size,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? `Kapak yüklenemedi (${res.status})`);
        return;
      }
      setCoverUrl(uploaded.url);
      setToast("Kapak yüklendi — yayına girmesi için deploy'u bekleyin");
      setTimeout(() => setToast(""), 4000);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setCoverBusy(false);
    }
  };

  const openExisting = async (row: AdminRow) => {
    setError("");
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/posts?locale=${row.locale}&slug=${row.slug}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Yazı yüklenemedi");
        return;
      }
      const p = data.post;
      setCoverUrl(data.coverUrl ?? null);
      setDraft({
        locale: row.locale,
        slug: p.slug,
        sha: p.sha,
        title: p.title ?? "",
        titleAccent: p.titleAccent ?? "",
        excerpt: p.excerpt ?? "",
        category: p.category ?? "teknik",
        status: p.status ?? "draft",
        date: p.date ?? today,
        readingMinutes: p.readingMinutes ?? 5,
        tags: (p.tags ?? []).join(", "),
        coverCaption: p.coverCaption ?? "",
        featured: p.featured === true,
        body: p.body ?? "",
      });
    } catch {
      setError("Sunucuya ulaşılamadı");
    } finally {
      setBusy(false);
    }
  };

  const save = async () => {
    if (!draft) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...draft,
          tags: draft.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Kaydedilemedi");
        return;
      }
      setToast("Commit atıldı — yayına girmesi için deploy'u bekleyin");
      setTimeout(() => setToast(""), 4000);
      setDraft(null);
      router.refresh();
    } catch {
      setError("Sunucuya ulaşılamadı");
    } finally {
      setBusy(false);
    }
  };

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) =>
    setDraft((d) => (d ? { ...d, [k]: v } : d));

  return (
    <div className="flex min-h-dvh">
      <AdminSidebar active="blog" counts={{ blog: rows.length }} />

      <main className="flex-1 min-w-0 px-5 sm:px-8 py-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-[22px] font-bold tracking-[-0.025em]">Blog Yazıları</h1>
          <button
            type="button"
            onClick={openNew}
            className="text-[13.5px] font-semibold text-cream bg-ink px-5 py-2.5 rounded-full transition hover:bg-[#33291f]"
          >
            Yeni yazı
          </button>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap mt-6">
          {(["all", "live", "scheduled", "draft"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`font-mono text-[11.5px] px-4 py-2 rounded-full border transition ${
                filter === f
                  ? "bg-ink text-cream border-ink"
                  : "bg-white text-ink-3 border-ink/[0.14] hover:border-ink/35"
              }`}
            >
              {f === "all" ? "Tümü" : STATUS[f].label} · {counts[f]}
            </button>
          ))}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Başlık veya slug ara"
            aria-label="Yazı ara"
            className="ml-auto bg-white border border-ink/[0.14] rounded-full px-4 py-2 text-[13px] outline-none focus:border-bronze transition-colors min-w-[200px]"
          />
        </div>

        {error && !draft && (
          <p role="alert" className="text-[13px] text-[#B4503F] mt-4">
            {error}
          </p>
        )}
        {toast && <p className="text-[13px] text-[#2E7D5B] mt-4">{toast}</p>}

        <div className="mt-5 bg-white border border-ink/[0.08] rounded-2xl overflow-x-auto">
          <table className="w-full text-left text-[13.5px] min-w-[640px]">
            <thead>
              <tr className="bg-linen">
                {["BAŞLIK", "DİL", "KATEGORİ", "DURUM", "TARİH"].map((h) => (
                  <th
                    key={h}
                    className="font-mono text-[10px] tracking-[0.12em] text-label font-normal px-5 py-3.5 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((r) => (
                <tr
                  key={`${r.locale}/${r.slug}`}
                  onClick={() => openExisting(r)}
                  className="border-t border-ink/[0.06] cursor-pointer hover:bg-linen/60 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="font-semibold">{r.title}</div>
                    <div className="font-mono text-[11px] text-muted mt-0.5">{r.slug}</div>
                  </td>
                  <td className="px-5 py-4 font-mono text-[11px] text-muted uppercase">{r.locale}</td>
                  <td className="px-5 py-4 text-muted whitespace-nowrap">{CATS[r.category]}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-[11.5px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${STATUS[r.status].cls}`}
                    >
                      {STATUS[r.status].label}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-[11.5px] text-muted whitespace-nowrap">
                    {r.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {list.length === 0 && (
            <p className="text-center text-[13.5px] text-muted py-12">Eşleşen yazı yok.</p>
          )}
        </div>
      </main>

      {draft && (
        <>
          <button
            type="button"
            aria-label="Kapat"
            onClick={() => setDraft(null)}
            className="fixed inset-0 bg-ink/30 z-40"
          />
          <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[456px] bg-cream z-50 flex flex-col border-l border-ink/10">
            <div className="flex-none flex items-center justify-between px-6 py-4 border-b border-ink/[0.08]">
              <span className="text-[15px] font-bold tracking-[-0.02em]">
                {draft.sha ? "Yazıyı düzenle" : "Yeni yazı"}
              </span>
              <button type="button" onClick={() => setDraft(null)} className="text-muted text-lg">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              <label className={label} htmlFor="f-title">
                BAŞLIK
              </label>
              <input
                id="f-title"
                className={field}
                value={draft.title}
                onChange={(e) => set("title", e.target.value)}
              />

              <label className={`${label} block mt-5`} htmlFor="f-accent">
                VURGU (BAŞLIK SONU, SERİF İTALİK)
              </label>
              <input
                id="f-accent"
                className={field}
                value={draft.titleAccent}
                onChange={(e) => set("titleAccent", e.target.value)}
              />

              <label className={`${label} block mt-5`} htmlFor="f-slug">
                SLUG {draft.sha ? "(değiştirilemez)" : "(boşsa başlıktan üretilir)"}
              </label>
              <input
                id="f-slug"
                className={field}
                value={draft.slug}
                disabled={!!draft.sha}
                onChange={(e) => set("slug", e.target.value)}
              />

              {/* DURUM ve KATEGORİ tasarımdaki gibi çip satırı — açılır menüde
                  değiller. Durum sekiz alanlık ızgaranın ortasında bir <select>
                  iken görülmüyordu: yazı yazılıp kaydediliyor, varsayılan "Taslak"
                  olduğu için sessizce yayınlanmamış kalıyordu. */}
              <div className="mt-5" role="group" aria-label="Durum">
                <span className={label}>DURUM</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(["draft", "scheduled", "live"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => set("status", s)}
                      aria-pressed={draft.status === s}
                      className={`text-[12.5px] px-3 py-[7px] rounded-lg transition-colors ${
                        draft.status === s
                          ? "bg-[#F4EEE2] text-ink font-semibold"
                          : "text-muted hover:bg-[#EFEAE0] font-medium"
                      }`}
                    >
                      {STATUS[s].label}
                    </button>
                  ))}
                </div>
                <p className="text-[12px] text-muted mt-2 leading-[1.5]">
                  {draft.status === "live"
                    ? "Kaydedince sitede yayına girer."
                    : "Yalnızca panelde görünür; sitede yayınlanmaz."}
                </p>
              </div>

              <div className="mt-5" role="group" aria-label="Kategori">
                <span className={label}>KATEGORİ</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {blogCategories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => set("category", c)}
                      aria-pressed={draft.category === c}
                      className={`text-[12.5px] px-3 py-[7px] rounded-lg transition-colors ${
                        draft.category === c
                          ? "bg-[#F4EEE2] text-ink font-semibold"
                          : "text-muted hover:bg-[#EFEAE0] font-medium"
                      }`}
                    >
                      {CATS[c]}
                    </button>
                  ))}
                </div>
              </div>

              <label className={`${label} block mt-5`} htmlFor="f-excerpt">
                ÖZET
              </label>
              <textarea
                id="f-excerpt"
                className={`${field} min-h-[88px] resize-y leading-[1.6]`}
                value={draft.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3 mt-5">
                <div>
                  <label className={label} htmlFor="f-locale">
                    DİL
                  </label>
                  <select
                    id="f-locale"
                    className={field}
                    value={draft.locale}
                    disabled={!!draft.sha}
                    onChange={(e) => set("locale", e.target.value as Locale)}
                  >
                    {locales.map((l) => (
                      <option key={l} value={l}>
                        {l.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={label} htmlFor="f-date">
                    TARİH
                  </label>
                  <input
                    id="f-date"
                    type="date"
                    className={field}
                    value={draft.date}
                    onChange={(e) => set("date", e.target.value)}
                  />
                </div>
                <div>
                  <label className={label} htmlFor="f-read">
                    OKUMA (DK)
                  </label>
                  <input
                    id="f-read"
                    type="number"
                    min={1}
                    className={field}
                    value={draft.readingMinutes}
                    onChange={(e) => set("readingMinutes", Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className={label} htmlFor="f-tags">
                    ETİKETLER (VİRGÜLLE)
                  </label>
                  <input
                    id="f-tags"
                    className={field}
                    value={draft.tags}
                    onChange={(e) => set("tags", e.target.value)}
                  />
                </div>
                </div>

              <div className="mt-5">
                <span className={label}>KAPAK GÖRSELİ</span>
                <div className="mt-2 flex items-center gap-3">
                  <div className="relative w-[104px] aspect-[16/10] rounded-lg overflow-hidden bg-linen flex items-center justify-center flex-none">
                    {coverUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={coverUrl} alt="" className="absolute inset-0 size-full object-cover" />
                    ) : (
                      <span className="font-mono text-[9.5px] text-label">yok</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <input
                      ref={coverInput}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        e.target.value = "";
                        if (f) void uploadCover(f);
                      }}
                    />
                    <button
                      type="button"
                      disabled={coverBusy || !draft.slug}
                      onClick={() => coverInput.current?.click()}
                      className="text-[13px] font-semibold text-cream bg-ink px-3.5 py-2 rounded-full disabled:opacity-40 transition-opacity"
                    >
                      {coverBusy ? "Yükleniyor…" : coverUrl ? "Değiştir" : "Görsel yükle"}
                    </button>
                    <p className="text-[11.5px] text-muted mt-1.5 leading-[1.45]">
                      {draft.slug
                        ? "Yazı sayfasının üstünde ve listedeki kartta görünür."
                        : "Önce yazıyı kaydedin; kapak slug'a bağlanıyor."}
                    </p>
                  </div>
                </div>
              </div>

              <label className={`${label} block mt-5`} htmlFor="f-cover">
                KAPAK ALTYAZISI
              </label>
              <input
                id="f-cover"
                className={field}
                value={draft.coverCaption}
                onChange={(e) => set("coverCaption", e.target.value)}
              />

              <label className="flex items-center gap-2.5 mt-5 text-[13.5px]">
                <input
                  type="checkbox"
                  checked={draft.featured}
                  onChange={(e) => set("featured", e.target.checked)}
                />
                Öne çıkan yazı
              </label>

              <label className={`${label} block mt-5`} htmlFor="f-body">
                GÖVDE (MARKDOWN — ## başlık, &gt; alıntı, tablo, 1. liste)
              </label>
              <textarea
                id="f-body"
                className={`${field} min-h-[300px] resize-y font-mono text-[12.5px] leading-[1.7]`}
                value={draft.body}
                onChange={(e) => set("body", e.target.value)}
              />

              {error && (
                <p role="alert" className="text-[13px] text-[#B4503F] mt-4">
                  {error}
                </p>
              )}
            </div>

            <div className="flex-none flex items-center gap-3 px-6 py-4 border-t border-ink/[0.08] bg-paper">
              <button
                type="button"
                onClick={save}
                disabled={busy || !draft.title.trim()}
                className="text-[13.5px] font-semibold text-cream bg-ink px-5 py-2.5 rounded-full transition disabled:opacity-40 hover:bg-[#33291f]"
              >
                {/* Etiket sonucu söylüyor: "Kaydet" basıp yazının taslakta kaldığını
                    sonradan fark etmek en sık yaşanan sorundu. */}
                {busy
                  ? "Commit atılıyor…"
                  : draft.status === "live"
                    ? "Yayınla ve commit'le"
                    : "Taslak olarak kaydet"}
              </button>
              <span className="font-mono text-[11px] text-muted">
                {draft.locale}/{draft.slug || "…"}.md
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
