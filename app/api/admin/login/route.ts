import { NextResponse } from "next/server";
import { verifyPassword, createToken, setSessionCookie, clearSessionCookie } from "@/lib/admin/auth";

export async function POST(request: Request) {
  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  try {
    if (!verifyPassword(password)) {
      // Kaba kuvvet denemesini yavaşlatmak için küçük gecikme. Kalıcı sayaç için
      // durum saklamak gerekir; tek kullanıcılı panelde bu bilinçli olarak yok.
      await new Promise((r) => setTimeout(r, 600));
      return NextResponse.json({ error: "Parola hatalı" }, { status: 401 });
    }
    await setSessionCookie(createToken());
    return NextResponse.json({ ok: true });
  } catch (err) {
    // Ortam değişkeni eksikse mesajı gösteriyoruz — kurulum hatası, sır içermiyor.
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE() {
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
