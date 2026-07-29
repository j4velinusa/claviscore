import { redirect } from "next/navigation";
import { hasSession, missingEnv } from "@/lib/admin/auth";
import { LoginForm } from "@/components/admin/LoginForm";

// Oturum çerezine ve ortam değişkenlerine bakar; build anında prerender EDİLMEMELİ.
// Aksi halde env'siz build'de üretilen "yapılandırılmamış" ekranı statik olarak donar
// ve değişkenler sonradan eklense bile o HTML servis edilmeye devam eder.
export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const missing = missingEnv();

  // Ortam değişkenleri eksikken giriş formu göstermek anlamsız — doğrudan ne
  // eksik olduğunu söyle. Değer değil yalnızca anahtar adı gösteriliyor.
  if (missing.length > 0) {
    return (
      <main className="min-h-dvh flex items-center justify-center px-6">
        <div className="max-w-[460px]">
          <h1 className="text-[22px] font-bold tracking-[-0.02em]">Panel yapılandırılmamış</h1>
          <p className="text-sm text-muted mt-3 leading-relaxed">
            Şu ortam değişkenleri tanımlı değil. Yerelde <code className="font-mono">.env.local</code>,
            üretimde Vercel proje ayarlarına eklenmeli:
          </p>
          <ul className="mt-4 flex flex-col gap-1.5">
            {missing.map((k) => (
              <li key={k} className="font-mono text-[13px] text-bronze-2">
                {k}
              </li>
            ))}
          </ul>
        </div>
      </main>
    );
  }

  if (await hasSession()) redirect("/admin/blog");

  return (
    <main className="min-h-dvh flex items-center justify-center px-6">
      <LoginForm />
    </main>
  );
}
