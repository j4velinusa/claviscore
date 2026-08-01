import { del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { hasSession } from "@/lib/admin/auth";
import { putMediaUrl, removeMediaRecord } from "@/lib/admin/github";
import { ALL_SLOTS, slotId, slotKind } from "@/lib/media-config";

// Blob deposuna yüklenen belgenin KAYDINI tutar. Dosyanın kendisi buradan
// geçmiyor (bkz. /api/admin/blob-upload); bu uç nokta yalnız content/media.json'a
// adresi işliyor ve yerini alan eski dosyayı depodan siliyor.

function pdfSlot(id: string) {
  const slot = ALL_SLOTS.find((s) => slotId(s.group, s.key) === id);
  return slot && slotKind(slot) === "pdf" ? slot : undefined;
}

/** Blob'daki dosyayı siler; başarısız olursa yüklemeyi bozmuyor, sadece iz kalıyor. */
async function dropBlob(url?: string): Promise<void> {
  if (!url) return;
  try {
    await del(url);
  } catch {
    // Depoda kullanılmayan bir dosya kalması, kullanıcının işlemini
    // başarısız saymaya değmez.
  }
}

export async function POST(request: Request) {
  if (!(await hasSession())) {
    return NextResponse.json({ error: "Oturum yok" }, { status: 401 });
  }

  let body: { id?: unknown; url?: unknown; pathname?: unknown; size?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id : "";
  if (!pdfSlot(id)) {
    return NextResponse.json({ error: "Bilinmeyen belge yuvası" }, { status: 400 });
  }

  const url = typeof body.url === "string" ? body.url : "";
  const pathname = typeof body.pathname === "string" ? body.pathname : "";
  const size = Number(body.size);
  // Adres blob deposundan gelmeli; serbest bir URL kayda yazılamaz, yoksa panel
  // üzerinden siteye istenen adres bağlanabilirdi.
  if (!/^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//i.test(url)) {
    return NextResponse.json({ error: "Geçersiz belge adresi" }, { status: 400 });
  }
  if (!pathname || !Number.isFinite(size) || size <= 0) {
    return NextResponse.json({ error: "Eksik belge bilgisi" }, { status: 400 });
  }

  try {
    const { previous } = await putMediaUrl({ id, file: pathname, url, size });
    if (previous?.url && previous.url !== url) await dropBlob(previous.url);
    return NextResponse.json({ ok: true, id, url });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}

export async function DELETE(request: Request) {
  if (!(await hasSession())) {
    return NextResponse.json({ error: "Oturum yok" }, { status: 401 });
  }
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!pdfSlot(id)) {
    return NextResponse.json({ error: "Bilinmeyen belge yuvası" }, { status: 400 });
  }
  try {
    const removed = await removeMediaRecord(id);
    if (!removed) {
      return NextResponse.json({ error: "Bu yuvada belge yok" }, { status: 404 });
    }
    await dropBlob(removed.url);
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}
