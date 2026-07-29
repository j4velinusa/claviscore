import { NextResponse } from "next/server";
import { hasSession } from "@/lib/admin/auth";
import {
  listProformas,
  getProforma,
  putProforma,
  nextProformaNo,
  type ProformaRecord,
} from "@/lib/admin/github";

const NO_PATTERN = /^PI-\d{4}-\d{4}$/;

/** ?no=PI-2026-0001 → tek kayıt; parametresiz → liste + sıradaki numara. */
export async function GET(request: Request) {
  if (!(await hasSession())) {
    return NextResponse.json({ error: "Oturum yok" }, { status: 401 });
  }
  const no = new URL(request.url).searchParams.get("no");
  try {
    if (no) {
      if (!NO_PATTERN.test(no)) {
        return NextResponse.json({ error: "Geçersiz proforma no" }, { status: 400 });
      }
      const found = await getProforma(no);
      if (!found) return NextResponse.json({ error: "Kayıt bulunamadı" }, { status: 404 });
      return NextResponse.json(found);
    }
    const [list, next] = await Promise.all([
      listProformas(),
      nextProformaNo(new Date().getUTCFullYear()),
    ]);
    return NextResponse.json({ list, next });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!(await hasSession())) {
    return NextResponse.json({ error: "Oturum yok" }, { status: 401 });
  }

  let body: { record?: unknown; sha?: unknown };
  try {
    body = (await request.json()) as { record?: unknown; sha?: unknown };
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const record = body.record as ProformaRecord | undefined;
  if (!record || typeof record !== "object") {
    return NextResponse.json({ error: "Kayıt eksik" }, { status: 400 });
  }
  // Numara dosya adı olduğu için biçimi sıkı: yol kaçışı (../) ve çakışma riski kalmasın.
  if (!NO_PATTERN.test(String(record.no))) {
    return NextResponse.json({ error: "Proforma no PI-YYYY-NNNN olmalı" }, { status: 400 });
  }
  if (record.status !== "draft" && record.status !== "final") {
    return NextResponse.json({ error: "Geçersiz durum" }, { status: 400 });
  }

  const sha = typeof body.sha === "string" && body.sha ? body.sha : undefined;

  try {
    const result = await putProforma({ ...record, updatedAt: new Date().toISOString() }, sha);
    return NextResponse.json({ ok: true, no: record.no, ...result });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 502 });
  }
}
