import "server-only";
import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

// Basit tek kullanıcılı oturum: parola doğrulanır, imzalı httpOnly çerez bırakılır.
// Veritabanı yok — çerezin kendisi HMAC ile mühürlü olduğu için sunucu durum tutmaz.
// Çok kullanıcı / rol gerektiğinde burası GitHub OAuth ile değiştirilir; panelin
// geri kalanı requireSession() üzerinden çalıştığı için etkilenmez.

const COOKIE = "claviscor_admin";
const MAX_AGE_SECONDS = 60 * 60 * 12;

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET tanımlı değil veya 32 karakterden kısa");
  }
  return s;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

/** Uzunluk farkında da sabit zamanda kalmak için karşılaştırma öncesi hash'lenir. */
function safeEqual(a: string, b: string): boolean {
  const ha = createHmac("sha256", secret()).update(a).digest();
  const hb = createHmac("sha256", secret()).update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("ADMIN_PASSWORD tanımlı değil");
  return safeEqual(input, expected);
}

export function createToken(): string {
  const expiresAt = Date.now() + MAX_AGE_SECONDS * 1000;
  // nonce: aynı süre içinde üretilen iki token'ın aynı olmaması için.
  const payload = `${expiresAt}.${randomBytes(12).toString("hex")}`;
  return `${payload}.${sign(payload)}`;
}

function isValidToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expiresAt, nonce, mac] = parts;
  if (!safeEqual(sign(`${expiresAt}.${nonce}`), mac)) return false;
  const exp = Number(expiresAt);
  return Number.isFinite(exp) && exp > Date.now();
}

export async function setSessionCookie(token: string): Promise<void> {
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

/** Oturum geçerli mi? Sayfa ve route handler'ların tek kontrol noktası. */
export async function hasSession(): Promise<boolean> {
  const store = await cookies();
  return isValidToken(store.get(COOKIE)?.value);
}

/** Gerekli ortam değişkenleri eksikse panel hiç açılmasın diye erken uyarı. */
export function missingEnv(): string[] {
  return (["ADMIN_PASSWORD", "ADMIN_SESSION_SECRET", "GITHUB_TOKEN", "GITHUB_REPO"] as const).filter(
    (k) => !process.env[k],
  );
}
