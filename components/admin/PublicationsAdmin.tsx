"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { upload as uploadToBlob } from "@vercel/blob/client";
import { PublicationCover } from "@/components/publications/PublicationCover";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  coverThemeKeys,
  coverThemes,
  publicationGroups,
  publicationSlotKey,
  type CoverFont,
  type CoverTheme,
  type Publication,
  type PublicationGroup,
} from "@/lib/publications";

const GROUPS: Record<PublicationGroup, string> = {
  katalog: "Katalog",
  dergi: "Dergi",
  secki: "Proje seçkisi",
  teknik: "Teknik doküman",
};

const label = "font-mono text-[10px] tracking-[0.1em] text-label";
const field =
  "w-full mt-2 bg-white border border-ink/[0.14] rounded-xl px-3.5 py-2.5 text-[13.5px] outline-none focus:border-bronze transition-colors";

const emptyDraft = (): Publication => ({
  id: "",
  group: "katalog",
  langs: "TR",
  cover: { theme: "koyu", font: "sans", tag: "", title: "", sub: "", foot: "" },
  tr: { kind: "", title: "", desc: "" },
  en: { kind: "", title: "", desc: "" },
});

export function PublicationsAdmin({
  initial,
  docs,
}: {
  initial: Publication[];
  /** "<id>-<dil>" → yüklü PDF adresi. */
  docs: Record<string, string>;
}) {
  const router = useRouter();
  const [list, setList] = useState<Publication[]>(initial);
  const [draft, setDraft] = useState<Publication | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [busy, setBusy] = useState(false);
  const [pdfBusy, setPdfBusy] = useState<string | null>(null);
  const [pdfUrls, setPdfUrls] = useState<Record<string, string>>(docs);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const pdfInputs = useRef<Record<string, HTMLInputElement | null>>({});

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 4000);
  };

  const set = <K extends keyof Publication>(k: K, v: Publication[K]) =>
    setDraft((d) => (d ? { ...d, [k]: v } : d));
  const setCover = <K extends keyof Publication["cover"]>(k: K, v: Publication["cover"][K]) =>
    setDraft((d) => (d ? { ...d, cover: { ...d.cover, [k]: v } } : d));
  const setCopy = (lang: "tr" | "en", k: keyof Publication["tr"], v: string) =>
    setDraft((d) => (d ? { ...d, [lang]: { ...d[lang], [k]: v } } : d));

  const save = async () => {
    if (!draft) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/publications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? `Kaydedilemedi (${res.status})`);
        return;
      }
      setList((prev) => {
        const i = prev.findIndex((p) => p.id === draft.id);
        const next = i >= 0 ? prev.map((p) => (p.id === draft.id ? draft : p)) : [...prev, draft];
        return draft.featured ? next.map((p) => (p.id === draft.id ? p : { ...p, featured: undefined })) : next;
      });
      setDraft(null);
      flash("Commit atıldı — yayına girmesi için deploy'u bekleyin");
      router.refresh();
    } catch {
      setError("Sunucuya ulaşılamadı");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/publications?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? `Silinemedi (${res.status})`);
        return;
      }
      setList((prev) => prev.filter((p) => p.id !== id));
      setDraft(null);
      flash("Yayın kaldırıldı");
      router.refresh();
    } catch {
      setError("Sunucuya ulaşılamadı");
    } finally {
      setBusy(false);
    }
  };

  /** PDF doğrudan blob deposuna gidiyor — 60 MB'lık katalog fonksiyondan geçemez. */
  const uploadPdf = async (id: string, lang: "tr" | "en", file: File) => {
    const key = publicationSlotKey(id, lang);
    const slotId = `dok:${key}`;
    setError("");
    setPdfBusy(key);
    try {
      const blob = await uploadToBlob(`${slotId}/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/blob-upload",
        contentType: "application/pdf",
      });
      const res = await fetch("/api/admin/media-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: slotId, url: blob.url, pathname: blob.pathname, size: file.size }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? `Kayıt yazılamadı (${res.status})`);
      setPdfUrls((u) => ({ ...u, [key]: blob.url }));
      flash("PDF yüklendi");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setPdfBusy(null);
    }
  };

  return (
    <div className="flex min-h-dvh">
      <AdminSidebar active="yayinlar" counts={{ yayinlar: list.length }} />

      <main className="flex-1 min-w-0 px-5 sm:px-8 py-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-[22px] font-bold tracking-[-0.025em]">Yayınlar</h1>
          <button
            type="button"
            onClick={() => {
              setError("");
              setIsNew(true);
              setDraft(emptyDraft());
            }}
            className="text-[13.5px] font-semibold text-cream bg-ink px-5 py-2.5 rounded-full hover:bg-[#33291f] transition-colors"
          >
            Yeni yayın
          </button>
        </div>
        <p className="text-sm text-muted mt-2 max-w-[640px] leading-relaxed">
          Yayınlar <span className="font-mono text-[12px]">/yayinlar</span> sayfasında listelenir.
          Kapak fotoğraf değil, seçtiğiniz tema ve yazılarla çiziliyor.
        </p>

        {error && (
          <p role="alert" className="mt-4 text-sm text-[#a33] bg-[#a33]/8 rounded-xl px-4 py-3">
            {error}
          </p>
        )}
        {toast && (
          <p role="status" className="mt-4 text-sm text-bronze-2 bg-bronze/8 rounded-xl px-4 py-3">
            {toast}
          </p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {list.map((pub) => (
            <div key={pub.id} className="bg-white border border-ink/[0.08] rounded-[18px] p-4 flex gap-4">
              <PublicationCover cover={pub.cover} className="w-[86px] flex-none" />
              <div className="min-w-0 flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-[10px] text-bronze-2">{GROUPS[pub.group]}</span>
                  {pub.featured && (
                    <span className="font-mono text-[9.5px] text-brass bg-ink px-2 py-0.5 rounded-full">
                      ÖNE ÇIKAN
                    </span>
                  )}
                </div>
                <div className="text-sm font-semibold leading-tight mt-1">{pub.tr.title}</div>
                <div className="font-mono text-[10.5px] text-muted mt-1">
                  {pdfUrls[publicationSlotKey(pub.id, "tr")] ? "PDF ✓" : "PDF yok"}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setIsNew(false);
                    setDraft(pub);
                  }}
                  className="text-[13px] font-semibold text-bronze-2 hover:opacity-70 transition-opacity mt-auto pt-2 text-left"
                >
                  Düzenle
                </button>
              </div>
            </div>
          ))}
          {list.length === 0 && (
            <p className="text-[13.5px] text-muted py-8">Henüz yayın yok.</p>
          )}
        </div>
      </main>

      {draft && (
        <>
          <button
            type="button"
            aria-label="Kapat"
            onClick={() => setDraft(null)}
            className="fixed inset-0 bg-ink/35 z-40"
          />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-[560px] bg-cream z-50 flex flex-col shadow-2xl">
            <div className="flex-none flex items-center justify-between px-6 py-5 border-b border-ink/[0.08]">
              <div>
                <div className="font-mono text-[10px] tracking-[0.14em] text-label">
                  {isNew ? "YENİ YAYIN" : "DÜZENLE"}
                </div>
                <div className="text-[17px] font-bold tracking-[-0.02em] mt-1">
                  {draft.tr.title || "Adsız yayın"}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDraft(null)}
                className="size-[26px] rounded-full bg-ink/8 text-[#5b5650] text-sm"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={label} htmlFor="p-id">
                    KİMLİK {isNew ? "(küçük harf, tire)" : "(değiştirilemez)"}
                  </label>
                  <input
                    id="p-id"
                    className={field}
                    value={draft.id}
                    disabled={!isNew}
                    onChange={(e) => set("id", e.target.value.toLowerCase())}
                  />
                </div>
                <div>
                  <label className={label} htmlFor="p-group">
                    GRUP
                  </label>
                  <select
                    id="p-group"
                    className={field}
                    value={draft.group}
                    onChange={(e) => set("group", e.target.value as PublicationGroup)}
                  >
                    {publicationGroups.map((g) => (
                      <option key={g} value={g}>
                        {GROUPS[g]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={label} htmlFor="p-pages">
                    SAYFA (boş bırakılabilir)
                  </label>
                  <input
                    id="p-pages"
                    type="number"
                    min={1}
                    className={field}
                    value={draft.pages ?? ""}
                    onChange={(e) =>
                      set("pages", e.target.value ? Number(e.target.value) : undefined)
                    }
                  />
                </div>
                <div>
                  <label className={label} htmlFor="p-format">
                    ÖLÇÜ
                  </label>
                  <input
                    id="p-format"
                    className={field}
                    placeholder="A4"
                    value={draft.format ?? ""}
                    onChange={(e) => set("format", e.target.value)}
                  />
                </div>
                <div>
                  <label className={label} htmlFor="p-langs">
                    DİL
                  </label>
                  <input
                    id="p-langs"
                    className={field}
                    placeholder="TR / EN"
                    value={draft.langs}
                    onChange={(e) => set("langs", e.target.value)}
                  />
                </div>
                <div>
                  <label className={label} htmlFor="p-read">
                    OKUMA YOLU (PDF yoksa)
                  </label>
                  <input
                    id="p-read"
                    className={field}
                    placeholder="/katalog"
                    value={draft.readPath ?? ""}
                    onChange={(e) => set("readPath", e.target.value)}
                  />
                </div>
              </div>

              <label className="flex items-center gap-2.5 mt-4 text-[13.5px]">
                <input
                  type="checkbox"
                  checked={draft.featured === true}
                  onChange={(e) => set("featured", e.target.checked || undefined)}
                />
                Sayfanın üstünde öne çıkar
              </label>

              <h3 className="font-mono text-[10px] tracking-[0.12em] text-label mt-7 pb-2 border-b border-ink/10">
                KAPAK
              </h3>
              <div className="flex gap-4 mt-4">
                <PublicationCover cover={draft.cover} className="w-[112px] flex-none" />
                <div className="min-w-0 flex-1">
                  <span className={label}>TEMA</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {coverThemeKeys.map((k) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setCover("theme", k as CoverTheme)}
                        aria-pressed={draft.cover.theme === k}
                        className={`text-[12px] px-2.5 py-1.5 rounded-lg border transition-colors ${
                          draft.cover.theme === k ? "border-ink" : "border-ink/[0.14]"
                        }`}
                        style={{ background: coverThemes[k].bg, color: coverThemes[k].fg }}
                      >
                        {coverThemes[k].label}
                      </button>
                    ))}
                  </div>
                  <span className={`${label} block mt-3`}>YAZI TİPİ</span>
                  <div className="flex gap-1.5 mt-2">
                    {(["sans", "serif"] as CoverFont[]).map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setCover("font", f)}
                        aria-pressed={draft.cover.font === f}
                        className={`text-[12px] px-3 py-1.5 rounded-lg transition-colors ${
                          draft.cover.font === f
                            ? "bg-[#F4EEE2] text-ink font-semibold"
                            : "text-muted hover:bg-[#EFEAE0]"
                        } ${f === "serif" ? "font-serif italic" : ""}`}
                      >
                        {f === "serif" ? "Serif" : "Sans"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {(
                  [
                    ["tag", "ÜST ETİKET"],
                    ["title", "KAPAK ADI"],
                    ["sub", "ALT SATIR"],
                    ["foot", "EN ALT SATIR"],
                  ] as const
                ).map(([k, lbl]) => (
                  <div key={k}>
                    <label className={label} htmlFor={`p-cover-${k}`}>
                      {lbl}
                    </label>
                    <input
                      id={`p-cover-${k}`}
                      className={field}
                      value={draft.cover[k]}
                      onChange={(e) => setCover(k, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              {(["tr", "en"] as const).map((lang) => (
                <div key={lang}>
                  <h3 className="font-mono text-[10px] tracking-[0.12em] text-label mt-7 pb-2 border-b border-ink/10">
                    {lang === "tr" ? "TÜRKÇE" : "İNGİLİZCE (boşsa Türkçesi kullanılır)"}
                  </h3>
                  <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-3 mt-3">
                    <div>
                      <label className={label} htmlFor={`p-${lang}-kind`}>
                        TÜR ROZETİ
                      </label>
                      <input
                        id={`p-${lang}-kind`}
                        className={field}
                        placeholder="KATALOG"
                        value={draft[lang].kind}
                        onChange={(e) => setCopy(lang, "kind", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={label} htmlFor={`p-${lang}-title`}>
                        BAŞLIK
                      </label>
                      <input
                        id={`p-${lang}-title`}
                        className={field}
                        value={draft[lang].title}
                        onChange={(e) => setCopy(lang, "title", e.target.value)}
                      />
                    </div>
                  </div>
                  <label className={`${label} block mt-3`} htmlFor={`p-${lang}-desc`}>
                    AÇIKLAMA
                  </label>
                  <textarea
                    id={`p-${lang}-desc`}
                    className={`${field} min-h-[80px] resize-y leading-[1.6]`}
                    value={draft[lang].desc}
                    onChange={(e) => setCopy(lang, "desc", e.target.value)}
                  />
                </div>
              ))}

              <h3 className="font-mono text-[10px] tracking-[0.12em] text-label mt-7 pb-2 border-b border-ink/10">
                PDF NÜSHALAR
              </h3>
              {isNew ? (
                <p className="text-[12.5px] text-muted mt-3 leading-[1.5]">
                  Önce yayını kaydedin; PDF yayının kimliğine bağlanıyor.
                </p>
              ) : (
                <div className="flex flex-col gap-2.5 mt-3">
                  {(["tr", "en"] as const).map((lang) => {
                    const key = publicationSlotKey(draft.id, lang);
                    const url = pdfUrls[key];
                    return (
                      <div key={lang} className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono text-[11px] text-label w-6">
                          {lang.toUpperCase()}
                        </span>
                        <input
                          ref={(el) => {
                            pdfInputs.current[key] = el;
                          }}
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            e.target.value = "";
                            if (f) void uploadPdf(draft.id, lang, f);
                          }}
                        />
                        <button
                          type="button"
                          disabled={pdfBusy === key}
                          onClick={() => pdfInputs.current[key]?.click()}
                          className="text-[13px] font-semibold text-cream bg-ink px-3.5 py-2 rounded-full disabled:opacity-40"
                        >
                          {pdfBusy === key ? "Yükleniyor…" : url ? "Değiştir" : "PDF yükle"}
                        </button>
                        {url && (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener"
                            className="text-[13px] font-semibold text-bronze-2 hover:opacity-70"
                          >
                            Aç
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex-none flex items-center gap-3 px-6 py-4 border-t border-ink/[0.08] bg-paper">
              <button
                type="button"
                onClick={save}
                disabled={busy || !draft.id || !draft.tr.title.trim()}
                className="text-[13.5px] font-semibold text-cream bg-ink px-5 py-2.5 rounded-full disabled:opacity-40 hover:bg-[#33291f] transition"
              >
                {busy ? "Commit atılıyor…" : "Kaydet ve commit'le"}
              </button>
              {!isNew && (
                <button
                  type="button"
                  onClick={() => void remove(draft.id)}
                  disabled={busy}
                  className="text-[13px] text-muted hover:text-[#a33] disabled:opacity-40 transition-colors"
                >
                  Yayını sil
                </button>
              )}
              <Link
                href="/yayinlar"
                target="_blank"
                className="ml-auto font-mono text-[11px] text-muted hover:text-bronze-2"
              >
                sayfayı gör ›
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
