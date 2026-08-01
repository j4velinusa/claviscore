import { NextResponse } from "next/server";
import { hasSession } from "@/lib/admin/auth";
import { getPublications, updatePublications } from "@/lib/admin/github";
import {
  coverThemeKeys,
  isPublicationId,
  publicationGroups,
  type CoverFont,
  type CoverTheme,
  type Publication,
  type PublicationGroup,
} from "@/lib/publications";

function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v.trim() : fallback;
}

export async function GET() {
  if (!(await hasSession())) {
    return NextResponse.json({ error: "Oturum yok" }, { status: 401 });
  }
  try {
    const { list } = await getPublications();
    return NextResponse.json({ list });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!(await hasSession())) {
    return NextResponse.json({ error: "Oturum yok" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  // Kimlik dosya adına ve belge yuvası anahtarına giriyor; biçimi sıkı.
  const id = str(body.id).toLowerCase();
  if (!isPublicationId(id)) {
    return NextResponse.json(
      { error: "Kimlik küçük harf, rakam ve tireden oluşmalı (ör. otel-seckisi)" },
      { status: 400 },
    );
  }

  const group = str(body.group) as PublicationGroup;
  if (!publicationGroups.includes(group)) {
    return NextResponse.json({ error: "Geçersiz grup" }, { status: 400 });
  }

  const cover = (body.cover ?? {}) as Record<string, unknown>;
  const theme = str(cover.theme) as CoverTheme;
  if (!coverThemeKeys.includes(theme)) {
    return NextResponse.json({ error: "Geçersiz kapak teması" }, { status: 400 });
  }
  const font: CoverFont = str(cover.font) === "serif" ? "serif" : "sans";

  const tr = (body.tr ?? {}) as Record<string, unknown>;
  const en = (body.en ?? {}) as Record<string, unknown>;
  if (!str(tr.title)) {
    return NextResponse.json({ error: "Türkçe başlık zorunlu" }, { status: 400 });
  }

  const pages = Number(body.pages);
  // readPath site içi bir yol olmalı — dışarıya link verilmesini istemiyoruz.
  const readPath = str(body.readPath);
  if (readPath && !/^\/[a-z0-9/-]*$/.test(readPath)) {
    return NextResponse.json({ error: "Okuma yolu / ile başlamalı" }, { status: 400 });
  }

  const record: Publication = {
    id,
    group,
    ...(body.featured === true ? { featured: true } : {}),
    ...(Number.isFinite(pages) && pages > 0 ? { pages: Math.round(pages) } : {}),
    ...(str(body.format) ? { format: str(body.format) } : {}),
    langs: str(body.langs, "TR"),
    ...(readPath ? { readPath } : {}),
    cover: {
      theme,
      font,
      tag: str(cover.tag),
      title: str(cover.title),
      sub: str(cover.sub),
      foot: str(cover.foot),
    },
    tr: { kind: str(tr.kind), title: str(tr.title), desc: str(tr.desc) },
    en: {
      // İngilizce boş bırakılırsa Türkçesi kullanılıyor: tek dilde hazırlanan
      // bir yayın için İngilizce sayfada boş kart çıkmasın.
      kind: str(en.kind) || str(tr.kind),
      title: str(en.title) || str(tr.title),
      desc: str(en.desc) || str(tr.desc),
    },
  };

  try {
    await updatePublications((list) => {
      const i = list.findIndex((p) => p.id === id);
      if (i >= 0) list[i] = record;
      else list.push(record);
      // Tek bir yayın öne çıkabilir; yenisi işaretlenince diğerleri düşüyor.
      if (record.featured) {
        for (const p of list) if (p.id !== id) delete p.featured;
      }
    }, `yayın: ${id}`);
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}

export async function DELETE(request: Request) {
  if (!(await hasSession())) {
    return NextResponse.json({ error: "Oturum yok" }, { status: 401 });
  }
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!isPublicationId(id)) {
    return NextResponse.json({ error: "Geçersiz kimlik" }, { status: 400 });
  }
  try {
    let found = false;
    await updatePublications((list) => {
      const i = list.findIndex((p) => p.id === id);
      if (i >= 0) {
        list.splice(i, 1);
        found = true;
      }
    }, `yayın silindi: ${id}`);
    if (!found) return NextResponse.json({ error: "Yayın bulunamadı" }, { status: 404 });
    // Not: yayının PDF'leri blob deposunda kalıyor. Panelden ayrıca kaldırılabilir;
    // silmeyi buraya bağlamak, yanlışlıkla silinen bir yayının dosyasını da
    // geri getirilemez hâle sokardı.
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}
