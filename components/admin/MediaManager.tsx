"use client";

import { useEffect, useRef, useState } from "react";
import {
  DOC_SLOTS,
  DOC_URL_BASE,
  MEDIA_URL_BASE,
  PRODUCT_SLOTS,
  SITE_SLOTS,
  slotId,
  slotKind,
  type MediaManifest,
  type MediaSlot,
} from "@/lib/media-config";
import { tr } from "@/lib/dictionaries/tr";
// Yerel upload() fonksiyonuyla çakışmasın diye ad değiştirildi.
import { upload as uploadToBlob } from "@vercel/blob/client";
import { toWebp } from "@/lib/image-encode";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

// Panel tek dilli (Türkçe) — admin arayüzü public site i18n'ine dahil değil.
// Ürün adları için Türkçe sözlük doğrudan içe aktarılıyor; sunucudan geçirmeye gerek yok.
const NAMES = tr.katalog.products;

function slotTitle(slot: MediaSlot): string {
  if (slot.group !== "urun") return slot.label;
  return NAMES[slot.key as keyof typeof NAMES]?.name ?? slot.key;
}

/** Kimlik bir belge yuvasına mı ait — silmede hangi uç noktaya gidileceğini belirler. */
function isPdfId(id: string): boolean {
  return DOC_SLOTS.some((s) => slotId(s.group, s.key) === id);
}

export function MediaManager({
  initial,
  blobReady = true,
}: {
  initial: MediaManifest;
  /** Blob deposu bağlı mı — belgeler oraya yükleniyor. */
  blobReady?: boolean;
}) {
  const [manifest, setManifest] = useState<MediaManifest>(initial);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  // Yüklenen görselin URL'i commit sonrası deploy bitene kadar 404 döner; o aralıkta
  // kartta yerel önizleme gösteriliyor.
  const [preview, setPreview] = useState<Record<string, string>>({});
  // Yükleme sonucu: kartın altında gösterilen ölçü/boyut/kodlama bilgisi.
  // Blob'a yüklenen belgenin adresi — kart "aç" bağlantısı için.
  const [docUrl, setDocUrl] = useState<Record<string, string>>({});
  const [info, setInfo] = useState<
    Record<string, { text: string; dusukKaynak: boolean; sourceEdge: number; maxEdge: number }>
  >({});
  const inputs = useRef<Record<string, HTMLInputElement | null>>({});

  // Blob URL'leri yalnız (a) yerini yeni bir önizleme aldığında ve (b) bileşen
  // sökülürken serbest bırakılıyor. `preview` değişimine bağlı bir temizleme
  // fonksiyonu kullanılamaz: o, hâlâ ekranda olan URL'leri de iptal eder.
  const previewRef = useRef<Record<string, string>>({});
  useEffect(() => {
    previewRef.current = preview;
  }, [preview]);
  useEffect(() => {
    return () => Object.values(previewRef.current).forEach((u) => URL.revokeObjectURL(u));
  }, []);

  async function upload(slot: MediaSlot, file: File) {
    const id = slotId(slot.group, slot.key);
    const isPdf = slotKind(slot) === "pdf";
    setError(null);
    setNote(null);
    setBusyId(id);
    try {
      let savedFile: string;
      // Görsel yolunda kodlama sonucu; belge yolunda yok (dönüşüm yapılmıyor).
      let enc: Awaited<ReturnType<typeof toWebp>> | null = null;

      if (isPdf) {
        // Dosya sunucusuz fonksiyondan GEÇMİYOR: tarayıcı doğrudan blob deposuna
        // yüklüyor, uç nokta yalnız kısa ömürlü jeton üretiyor. Vercel'in 4,5 MB'lık
        // istek gövdesi sınırı böylece devre dışı kalıyor — 60 MB katalog geçebiliyor.
        const blob = await uploadToBlob(`${id}/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/admin/blob-upload",
          contentType: "application/pdf",
        });
        const res = await fetch("/api/admin/media-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, url: blob.url, pathname: blob.pathname, size: file.size }),
        });
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        if (!res.ok) throw new Error(data.error || `Kayıt yazılamadı (${res.status})`);
        savedFile = blob.pathname;
        setDocUrl((d) => ({ ...d, [id]: blob.url }));
      } else {
        enc = await toWebp(file, slot.maxEdge ?? 1600);
        const res = await fetch("/api/admin/media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, base64: enc.base64 }),
        });
        // res.ok ÖNCE: JSON olmayan bir hata yanıtında (proxy/timeout sayfası)
        // ayrıştırma istisnası gerçek durum kodunu gizliyordu.
        const data = (await res.json().catch(() => ({}))) as { error?: string; file?: string };
        if (!res.ok) throw new Error(data.error || `Yükleme başarısız (${res.status})`);
        savedFile = data.file!;

        // Önizleme ham dosyadan değil, commit edilen blob'dan: ekranda görünen
        // ile repoya giden aynı olsun; ham dosya da bellekte tutulmasın.
        const objectUrl = URL.createObjectURL(enc.blob);
        setPreview((prev) => {
          if (prev[id]) URL.revokeObjectURL(prev[id]);
          return { ...prev, [id]: objectUrl };
        });
      }

      setManifest((m) => ({ ...m, [id]: { file: savedFile, updatedAt: new Date().toISOString() } }));

      // Ne yüklendiğini rakamla söyle. "Kalite düşüyor" şikâyetinin sebebi çoğu
      // zaman kaynağın küçük gelmesi oluyor ve panel bunu göstermediği sürece
      // kullanıcı sebebi göremiyor.
      const maxEdge = slot.maxEdge ?? 1600;
      const kb = Math.round((enc ? enc.blob.size : file.size) / 1024);
      const dusukKaynak = !!enc && enc.sourceEdge < maxEdge;
      setInfo((prev) => ({
        ...prev,
        [id]: {
          text: enc
            ? `${enc.width}×${enc.height} · ${kb} KB · ${enc.lossless ? "kayıpsız" : "kayıplı"}`
            : `${file.name} · ${kb >= 1024 ? (kb / 1024).toFixed(1) + " MB" : kb + " KB"}`,
          dusukKaynak,
          sourceEdge: enc ? enc.sourceEdge : 0,
          maxEdge,
        },
      }));
      setNote(
        dusukKaynak && enc
          ? `Yüklendi ama kaynak küçük: en uzun kenar ${enc.sourceEdge} px geldi, bu yuva ${maxEdge} px'e kadar kullanabiliyor. Daha büyük bir dosya yüklersen görsel daha net olur.`
          : isPdf
            ? "Belge yüklendi. Sitede görünmesi için dağıtımın bitmesi gerekiyor (~1 dk)."
            : "Yüklendi. Sitede görünmesi için dağıtımın bitmesi gerekiyor (~1 dk).",
      );
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyId(null);
    }
  }

  async function remove(id: string) {
    setError(null);
    setNote(null);
    setBusyId(id);
    try {
      const endpoint = isPdfId(id) ? "/api/admin/media-url" : "/api/admin/media";
      const res = await fetch(`${endpoint}?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || `Silinemedi (${res.status})`);
      setManifest((m) => {
        const next = { ...m };
        delete next[id];
        return next;
      });
      setPreview((p) => {
        if (p[id]) URL.revokeObjectURL(p[id]);
        const next = { ...p };
        delete next[id];
        return next;
      });
      setNote("Görsel kaldırıldı.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyId(null);
    }
  }

  function Card({ slot }: { slot: MediaSlot }) {
    const id = slotId(slot.group, slot.key);
    const entry = manifest[id];
    const isPdf = slotKind(slot) === "pdf";
    const src = isPdf ? null : preview[id] ?? (entry ? `${MEDIA_URL_BASE}/${entry.file}` : null);
    // Kilit panel geneli: farklı yuvalara paralel yükleme, kayıt dosyasında
    // eşzamanlı yazma yarışı üretiyordu.
    const busy = busyId !== null;
    const busyHere = busyId === id;

    return (
      <div className="bg-white border border-ink/[0.08] rounded-[18px] overflow-hidden flex flex-col">
        <div
          className="relative bg-linen flex items-center justify-center"
          style={{ aspectRatio: slot.aspect }}
        >
          {src ? (
            // next/image değil: yeni commit'lenen dosya için optimizasyon önbelleği
            // yanıltıcı olabiliyor, ayrıca panelde boyut kritik değil.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt="" className="absolute inset-0 size-full object-cover" />
          ) : isPdf && entry ? (
            // PDF'in önizlemesi yok; yüklü olduğunu ve açılabildiğini göster.
            // Adres blob'dan geliyorsa kayıtta duruyor, repodaysa yoldan türetiliyor.
            <a
              href={docUrl[id] ?? entry.url ?? `${DOC_URL_BASE}/${entry.file}`}
              target="_blank"
              rel="noopener"
              className="flex flex-col items-center gap-1.5 text-bronze-2 hover:opacity-70 transition-opacity"
            >
              <span aria-hidden className="text-[28px] leading-none">
                ⎙
              </span>
              <span className="font-mono text-[10.5px]">PDF yüklü — aç</span>
            </a>
          ) : (
            <span className="font-mono text-[11px] text-label">
              {isPdf ? "PDF yok" : "görsel yok"}
            </span>
          )}
          {slot.group === "urun" && (
            <span className="absolute top-3 left-3 font-mono text-[10px] text-bronze-2 bg-cream/85 rounded-full px-2 py-0.5">
              {slot.key}
            </span>
          )}
        </div>

        <div className="px-4 py-3.5 flex flex-col gap-2 flex-1">
          <div className="text-sm font-semibold leading-tight">{slotTitle(slot)}</div>
          {info[id] ? (
            <p
              className={`font-mono text-[11px] leading-[1.5] ${
                info[id].dusukKaynak ? "text-[#a33]" : "text-bronze-2"
              }`}
            >
              {info[id].text}
              {info[id].dusukKaynak && (
                <span className="block font-sans text-[11.5px] mt-0.5">
                  Kaynak {info[id].sourceEdge} px — {info[id].maxEdge} px önerilir
                </span>
              )}
            </p>
          ) : (
            <p className="text-[12px] leading-[1.45] text-muted">{slot.note}</p>
          )}
          <input
            ref={(el) => {
              inputs.current[id] = el;
            }}
            type="file"
            accept={isPdf ? "application/pdf" : "image/*"}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (file) void upload(slot, file);
            }}
          />
          <div className="flex items-center gap-2 mt-auto pt-1">
            <button
              type="button"
              disabled={busy}
              onClick={() => inputs.current[id]?.click()}
              className="text-[13px] font-semibold text-cream bg-ink px-3.5 py-2 rounded-full disabled:opacity-50 transition-opacity"
            >
              {busyHere ? "Yükleniyor…" : entry ? "Değiştir" : isPdf ? "PDF yükle" : "Görsel yükle"}
            </button>
            {entry && (
              <button
                type="button"
                disabled={busy}
                onClick={() => void remove(id)}
                className="text-[13px] text-muted hover:text-[#a33] disabled:opacity-50 transition-colors"
              >
                Kaldır
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const filled = Object.keys(manifest).length;
  const total = SITE_SLOTS.length + PRODUCT_SLOTS.length + DOC_SLOTS.length;

  return (
    <div className="flex min-h-dvh">
      <AdminSidebar active="gorseller" counts={{ gorseller: filled }} />

      <main className="flex-1 min-w-0 px-5 sm:px-8 py-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-[22px] font-bold tracking-[-0.025em]">Görseller</h1>
          <span className="font-mono text-[11px] text-muted">
            {filled} / {total} dolu
          </span>
        </div>
        <p className="text-sm text-muted mt-2 max-w-[660px] leading-relaxed">
          Görsel seçtiğinizde tarayıcıda 1600 px&apos;e küçültülüp WebP&apos;ye çevrilir, sonra repoya
          commit&apos;lenir. Sitede görünmesi için dağıtımın tamamlanması gerekir (~1 dk).
        </p>

        {error && (
          <p role="alert" className="mt-4 text-sm text-[#a33] bg-[#a33]/8 rounded-xl px-4 py-3">
            {error}
          </p>
        )}
        {note && (
          <p role="status" className="mt-4 text-sm text-bronze-2 bg-bronze/8 rounded-xl px-4 py-3">
            {note}
          </p>
        )}

        <h2 className="font-mono text-[11px] tracking-[0.14em] text-label mt-8 pb-3 border-b border-ink/10">
          SİTE GÖRSELLERİ
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mt-5 max-w-[720px]">
          {SITE_SLOTS.map((s) => (
            <Card key={slotId(s.group, s.key)} slot={s} />
          ))}
        </div>

        <h2 className="font-mono text-[11px] tracking-[0.14em] text-label mt-10 pb-3 border-b border-ink/10">
          BELGELER
        </h2>
        {!blobReady && (
          <p role="alert" className="mt-4 text-sm text-[#a33] bg-[#a33]/8 rounded-xl px-4 py-3">
            Blob deposu bağlı değil, belge yüklenemez. Vercel → Storage → Blob store
            oluşturun ve bağlarken &quot;read-write token&quot; kutusunu işaretleyin.
          </p>
        )}
        <div className="grid sm:grid-cols-2 gap-4 mt-5 max-w-[720px]">
          {DOC_SLOTS.map((s) => (
            <Card key={slotId(s.group, s.key)} slot={s} />
          ))}
        </div>

        <h2 className="font-mono text-[11px] tracking-[0.14em] text-label mt-10 pb-3 border-b border-ink/10">
          ÜRÜN GÖRSELLERİ
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
          {PRODUCT_SLOTS.map((s) => (
            <Card key={slotId(s.group, s.key)} slot={s} />
          ))}
        </div>
      </main>
    </div>
  );
}
