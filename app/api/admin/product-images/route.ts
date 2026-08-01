import { NextResponse } from "next/server";
import { hasSession } from "@/lib/admin/auth";
import {
  getProductImageManifest,
  putProductImage,
  removeProductImage,
} from "@/lib/admin/github";
import { products } from "@/lib/products";

// Yüklenen ikili base64 olarak JSON gövdede geliyor; base64 ham boyutu ~%33 şişirir.
// 2 MB ham ≈ 2,7 MB gövde — Vercel'in istek sınırının (4,5 MB) altında güvenli pay.
// Panel zaten tarayıcıda 1600px WebP'ye indiriyor; bu sınır ona karşı değil,
// dönüşüm atlanırsa diye son savunma.
const MAX_BYTES = 2 * 1024 * 1024;

const KNOWN_SKUS = new Set(products.map((p) => p.sku));

export async function GET() {
  if (!(await hasSession())) {
    return NextResponse.json({ error: "Oturum yok" }, { status: 401 });
  }
  try {
    const { manifest } = await getProductImageManifest();
    return NextResponse.json({ manifest });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!(await hasSession())) {
    return NextResponse.json({ error: "Oturum yok" }, { status: 401 });
  }

  let body: { sku?: unknown; base64?: unknown };
  try {
    body = (await request.json()) as { sku?: unknown; base64?: unknown };
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const sku = typeof body.sku === "string" ? body.sku : "";
  // SKU katalogdaki sabit listeden gelmeli: dosya adı bundan türetildiği için
  // serbest metin kabul etmek yol kaçışına (../) açık kapı bırakırdı.
  if (!KNOWN_SKUS.has(sku)) {
    return NextResponse.json({ error: "Bilinmeyen ürün kodu" }, { status: 400 });
  }

  const base64 = typeof body.base64 === "string" ? body.base64 : "";
  if (!base64) {
    return NextResponse.json({ error: "Görsel yok" }, { status: 400 });
  }
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(base64)) {
    return NextResponse.json({ error: "Görsel base64 olmalı (data URL öneki olmadan)" }, { status: 400 });
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
    const result = await putProductImage({ sku, base64 });
    return NextResponse.json({ ok: true, sku, ...result });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}

export async function DELETE(request: Request) {
  if (!(await hasSession())) {
    return NextResponse.json({ error: "Oturum yok" }, { status: 401 });
  }
  const sku = new URL(request.url).searchParams.get("sku") ?? "";
  if (!KNOWN_SKUS.has(sku)) {
    return NextResponse.json({ error: "Bilinmeyen ürün kodu" }, { status: 400 });
  }
  try {
    await removeProductImage(sku);
    return NextResponse.json({ ok: true, sku });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}
