"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MEDIA_URL_BASE,
  PRODUCT_SLOTS,
  SITE_SLOTS,
  slotId,
  type MediaManifest,
  type MediaSlot,
} from "@/lib/media-config";
import { tr } from "@/lib/dictionaries/tr";

// Panel tek dilli (Türkçe) — admin arayüzü public site i18n'ine dahil değil.
// Ürün adları için Türkçe sözlük doğrudan içe aktarılıyor; sunucudan geçirmeye gerek yok.
const NAMES = tr.katalog.products;

const MAX_EDGE = 1600;
const QUALITY = 0.82;

/**
 * Seçilen dosyayı en uzun kenarı 1600px olacak şekilde küçültüp WebP'ye çevirir.
 *
 * Neden istemcide: telefon fotoğrafı 4–8 MB gelir. Ham hâliyle gönderilirse hem
 * Vercel'in istek gövdesi sınırına takılır hem de repoya her yüklemede megabaytlar
 * commit'lenir. Sunucuda dönüştürmek sharp bağımlılığı gerektirirdi; tarayıcının
 * canvas'ı bu iş için yeterli.
 */
async function toWebp(file: File): Promise<string> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    // En sık sebep: iPhone'dan gelen HEIC. accept="image/*" seçilmesine izin verir
    // ama tarayıcıların çoğu çözemez — kullanıcıya ne yapacağını söyle.
    throw new Error("Bu görsel biçimi okunamadı. JPEG veya PNG olarak kaydedip tekrar deneyin.");
  }

  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Tarayıcı canvas desteklemiyor");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", QUALITY),
  );
  if (!blob) throw new Error("Görsel WebP'ye çevrilemedi");
  if (blob.type !== "image/webp") throw new Error("Tarayıcı WebP üretemedi");

  const buf = await blob.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buf);
  // Tek seferde String.fromCharCode(...bytes) büyük dosyada yığın taşırır; parça parça.
  for (let i = 0; i < bytes.length; i += 8192) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  }
  return btoa(binary);
}

function slotTitle(slot: MediaSlot): string {
  if (slot.group !== "urun") return slot.label;
  return NAMES[slot.key as keyof typeof NAMES]?.name ?? slot.key;
}

export function MediaManager({ initial }: { initial: MediaManifest }) {
  const router = useRouter();
  const [manifest, setManifest] = useState<MediaManifest>(initial);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  // Yüklenen görselin URL'i commit sonrası deploy bitene kadar 404 döner; o aralıkta
  // kartta yerel önizleme gösteriliyor.
  const [preview, setPreview] = useState<Record<string, string>>({});
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

  async function upload(id: string, file: File) {
    setError(null);
    setNote(null);
    setBusyId(id);
    try {
      const base64 = await toWebp(file);
      const res = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, base64 }),
      });
      const data = (await res.json()) as { error?: string; file?: string };
      if (!res.ok) throw new Error(data.error || `Yükleme başarısız (${res.status})`);

      setManifest((m) => ({ ...m, [id]: { file: data.file!, updatedAt: new Date().toISOString() } }));
      const url = URL.createObjectURL(file);
      setPreview((p) => {
        if (p[id]) URL.revokeObjectURL(p[id]);
        return { ...p, [id]: url };
      });
      setNote("Yüklendi. Sitede görünmesi için dağıtımın bitmesi gerekiyor (~1 dk).");
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
      const res = await fetch(`/api/admin/media?id=${encodeURIComponent(id)}`, { method: "DELETE" });
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
    const src = preview[id] ?? (entry ? `${MEDIA_URL_BASE}/${entry.file}` : null);
    const busy = busyId === id;

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
          ) : (
            <span className="font-mono text-[11px] text-label">görsel yok</span>
          )}
          {slot.group === "urun" && (
            <span className="absolute top-3 left-3 font-mono text-[10px] text-bronze-2 bg-cream/85 rounded-full px-2 py-0.5">
              {slot.key}
            </span>
          )}
        </div>

        <div className="px-4 py-3.5 flex flex-col gap-2 flex-1">
          <div className="text-sm font-semibold leading-tight">{slotTitle(slot)}</div>
          <p className="text-[12px] leading-[1.45] text-muted">{slot.note}</p>
          <input
            ref={(el) => {
              inputs.current[id] = el;
            }}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (file) void upload(id, file);
            }}
          />
          <div className="flex items-center gap-2 mt-auto pt-1">
            <button
              type="button"
              disabled={busy}
              onClick={() => inputs.current[id]?.click()}
              className="text-[13px] font-semibold text-cream bg-ink px-3.5 py-2 rounded-full disabled:opacity-50 transition-opacity"
            >
              {busy ? "Yükleniyor…" : entry ? "Değiştir" : "Görsel yükle"}
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
  const total = SITE_SLOTS.length + PRODUCT_SLOTS.length;

  return (
    <div className="flex min-h-dvh">
      <aside className="hidden md:flex w-[238px] flex-none flex-col bg-night text-[#C9C0B2] px-3 py-6">
        <div className="flex items-center gap-[9px] px-3">
          <span className="size-2 rounded-full bg-bronze" aria-hidden />
          <span className="text-[17px] font-bold tracking-[-0.02em] text-[#F4EEE2]">CLAVISCOR</span>
        </div>
        <div className="font-mono text-[10px] tracking-[0.14em] text-[#6f6452] px-3 pt-8 pb-2.5">
          İÇERİK
        </div>
        <Link
          href="/admin/blog"
          className="flex items-center gap-[11px] px-3 py-2.5 rounded-[10px] text-sm font-medium hover:bg-white/5 transition-colors"
        >
          <span aria-hidden className="font-mono text-[11px] w-5 text-[#6f6452]">
            ✎
          </span>
          Blog Yazıları
        </Link>
        <span
          aria-current="page"
          className="flex items-center gap-[11px] px-3 py-2.5 rounded-[10px] text-sm font-medium bg-white/5 text-[#F4EEE2]"
        >
          <span aria-hidden className="font-mono text-[11px] w-5 text-[#6f6452]">
            ▦
          </span>
          Görseller
          <span className="ml-auto text-[11px] font-bold text-[#6f6452]">
            {filled}/{total}
          </span>
        </span>
        <div className="font-mono text-[10px] tracking-[0.14em] text-[#6f6452] px-3 pt-6 pb-2.5">
          BELGELER
        </div>
        <Link
          href="/admin/proforma"
          className="flex items-center gap-[11px] px-3 py-2.5 rounded-[10px] text-sm font-medium hover:bg-white/5 transition-colors"
        >
          <span aria-hidden className="font-mono text-[11px] w-5 text-[#6f6452]">
            ⎘
          </span>
          Proforma
        </Link>
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
