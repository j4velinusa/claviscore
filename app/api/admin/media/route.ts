import { NextResponse } from "next/server";
import { hasSession } from "@/lib/admin/auth";
import { getMediaManifest, putMedia, removeMedia } from "@/lib/admin/github";
import {
  ALL_SLOTS,
  blogCoverSlot,
  isBlogSlotId,
  slotId,
  slotKind,
  type MediaSlot,
} from "@/lib/media-config";

// Yüklenen ikili base64 olarak JSON gövdede geliyor; base64 ham boyutu ~%33 şişirir.
// 2 MB ham ≈ 2,7 MB gövde — Vercel'in istek sınırının (4,5 MB) altında güvenli pay.
// Panel zaten tarayıcıda 1600px WebP'ye indiriyor; bu sınır ona karşı değil,
// dönüşüm atlanırsa diye son savunma.
const MAX_BYTES = 2 * 1024 * 1024;
// PDF dönüştürülmüyor, ham gidiyor. base64 %33 şişirdiği için 3 MB ≈ 4 MB gövde —
// Vercel'in 4,5 MB istek sınırının hemen altı. Daha büyük katalog sıkıştırılmalı.
const MAX_PDF_BYTES = 3 * 1024 * 1024;

/** Kimlikten yuva — dosya adı yükleme anında sürümle birlikte türetiliyor. */
function slotForId(id: string): MediaSlot | undefined {
  // Blog kapakları sabit listede yok; kimlik desene uyuyorsa yuva türetiliyor.
  if (isBlogSlotId(id)) return blogCoverSlot(id);
  return ALL_SLOTS.find((s) => slotId(s.group, s.key) === id);
}

export async function GET() {
  if (!(await hasSession())) {
    return NextResponse.json({ error: "Oturum yok" }, { status: 401 });
  }
  try {
    const { manifest } = await getMediaManifest();
    return NextResponse.json({ manifest });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!(await hasSession())) {
    return NextResponse.json({ error: "Oturum yok" }, { status: 401 });
  }

  let body: { id?: unknown; base64?: unknown };
  try {
    body = (await request.json()) as { id?: unknown; base64?: unknown };
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id : "";
  // Kimlik kayıtlı yuva listesinden gelmeli: dosya adı bundan türetildiği için
  // serbest metin kabul etmek yol kaçışına (../) açık kapı bırakırdı.
  const slot = slotForId(id);
  if (!slot) {
    return NextResponse.json({ error: "Bilinmeyen görsel yuvası" }, { status: 400 });
  }

  const base64 = typeof body.base64 === "string" ? body.base64 : "";
  if (!base64) {
    return NextResponse.json({ error: "Görsel yok" }, { status: 400 });
  }
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(base64)) {
    return NextResponse.json(
      { error: "Görsel base64 olmalı (data URL öneki olmadan)" },
      { status: 400 },
    );
  }

  const kind = slotKind(slot);
  const bytes = Buffer.from(base64, "base64");
  if (bytes.byteLength === 0) {
    return NextResponse.json({ error: "Dosya boş" }, { status: 400 });
  }
  const limit = kind === "pdf" ? MAX_PDF_BYTES : MAX_BYTES;
  if (bytes.byteLength > limit) {
    return NextResponse.json(
      {
        error:
          kind === "pdf"
            ? "PDF 3 MB'ı aşıyor. Dosyayı sıkıştırıp tekrar deneyin."
            : "Görsel 2 MB'ı aşıyor",
      },
      { status: 413 },
    );
  }

  if (kind === "pdf") {
    // PDF imzası: dosya "%PDF-" ile başlar.
    if (bytes.toString("latin1", 0, 5) !== "%PDF-") {
      return NextResponse.json({ error: "Dosya PDF olmalı" }, { status: 415 });
    }
  } else {
  // WebP imzası: "RIFF" .... "WEBP". latin1 kullanılıyor — Node'un ascii
  // çözücüsü her baytın yüksek bitini düşürdüğü için 0xD2 gibi baytlar da "R"
  // olarak okunuyor ve imza kontrolü atlatılabiliyordu. Panel dönüşümü atlarsa ya da başka bir
  // istemci JPEG gönderirse repoda .webp adıyla JPEG durmasın.
    const isWebp =
      bytes.length > 12 &&
      bytes.toString("latin1", 0, 4) === "RIFF" &&
      bytes.toString("latin1", 8, 12) === "WEBP";
    if (!isWebp) {
      return NextResponse.json({ error: "Görsel WebP olmalı" }, { status: 415 });
    }
  }

  try {
    const result = await putMedia({ id, group: slot.group, key: slot.key, kind, base64 });
    return NextResponse.json({ ok: true, id, ...result });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}

export async function DELETE(request: Request) {
  if (!(await hasSession())) {
    return NextResponse.json({ error: "Oturum yok" }, { status: 401 });
  }
  const id = new URL(request.url).searchParams.get("id") ?? "";
  const slot = slotForId(id);
  if (!slot) {
    return NextResponse.json({ error: "Bilinmeyen görsel yuvası" }, { status: 400 });
  }
  try {
    const removed = await removeMedia(id, slotKind(slot));
    // Kayıt yoksa silinecek bir şey de yok — 404, sessiz "ok" yerine.
    if (!removed) {
      return NextResponse.json({ error: "Bu yuvada görsel yok" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}
