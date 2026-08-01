import { NextResponse } from "next/server";
import { hasSession } from "@/lib/admin/auth";
import { getMediaManifest, putMedia, removeMedia } from "@/lib/admin/github";
import { ALL_SLOTS, slotId, slotFile, VALID_SLOT_IDS } from "@/lib/media-config";

// Yüklenen ikili base64 olarak JSON gövdede geliyor; base64 ham boyutu ~%33 şişirir.
// 2 MB ham ≈ 2,7 MB gövde — Vercel'in istek sınırının (4,5 MB) altında güvenli pay.
// Panel zaten tarayıcıda 1600px WebP'ye indiriyor; bu sınır ona karşı değil,
// dönüşüm atlanırsa diye son savunma.
const MAX_BYTES = 2 * 1024 * 1024;

/** Kimlikten dosya adı — yalnız kayıtlı yuvalar için. Bilinmeyen kimlik null döner. */
function fileForId(id: string): string | null {
  const slot = ALL_SLOTS.find((s) => slotId(s.group, s.key) === id);
  return slot ? slotFile(slot.group, slot.key) : null;
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
  if (!VALID_SLOT_IDS.has(id)) {
    return NextResponse.json({ error: "Bilinmeyen görsel yuvası" }, { status: 400 });
  }
  const file = fileForId(id);
  if (!file) {
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

  const bytes = Buffer.from(base64, "base64");
  if (bytes.byteLength === 0) {
    return NextResponse.json({ error: "Görsel boş" }, { status: 400 });
  }
  if (bytes.byteLength > MAX_BYTES) {
    return NextResponse.json({ error: "Görsel 2 MB'ı aşıyor" }, { status: 413 });
  }
  // WebP imzası: "RIFF" .... "WEBP". Panel dönüşümü atlarsa ya da başka bir
  // istemci JPEG gönderirse repoda .webp adıyla JPEG durmasın.
  const isWebp =
    bytes.length > 12 &&
    bytes.toString("ascii", 0, 4) === "RIFF" &&
    bytes.toString("ascii", 8, 12) === "WEBP";
  if (!isWebp) {
    return NextResponse.json({ error: "Görsel WebP olmalı" }, { status: 415 });
  }

  try {
    const result = await putMedia({ id, file, base64 });
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
  if (!VALID_SLOT_IDS.has(id)) {
    return NextResponse.json({ error: "Bilinmeyen görsel yuvası" }, { status: 400 });
  }
  const file = fileForId(id);
  if (!file) {
    return NextResponse.json({ error: "Bilinmeyen görsel yuvası" }, { status: 400 });
  }
  try {
    await removeMedia(id, file);
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}
