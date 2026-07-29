import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

// Next.js 16: `middleware` -> `proxy`. Dil yönlendirmesi:
// - Öntanımlı dil (tr) prefix'sizdir: "/..." dahili olarak "/tr/..."e yeniden yazılır (URL temiz kalır).
// - "/tr" veya "/tr/..." kanonik prefix'siz biçime yönlendirilir.
// - "/en/..." olduğu gibi geçer.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Öntanımlı dilin açık öneki: kanonik (prefix'siz) biçime kalıcı yönlendir (308).
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const stripped = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(new URL(stripped, request.url), 308);
  }

  // Öntanımlı olmayan bir dil öneki varsa dokunma.
  const hasOtherLocale = locales.some(
    (l) => l !== defaultLocale && (pathname === `/${l}` || pathname.startsWith(`/${l}/`)),
  );
  if (hasOtherLocale) return NextResponse.next();

  // Öneksiz istek: öntanımlı dile dahili olarak yeniden yaz (tarayıcı URL'i değişmez).
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // API, admin paneli, _next varlıkları ve nokta içeren dosyaları (icon.svg, resimler)
  // hariç tut. Admin dil yönlendirmesinin dışındadır: /admin, /tr/admin'e yazılmamalı.
  matcher: ["/((?!api|admin|_next/static|_next/image|.*\\..*).*)"],
};
