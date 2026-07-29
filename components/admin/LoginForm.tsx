"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Giriş başarısız");
        return;
      }
      router.replace("/admin/blog");
      router.refresh();
    } catch {
      setError("Sunucuya ulaşılamadı");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="w-full max-w-[380px]">
      <div className="flex items-center gap-[9px]">
        <span className="size-2 rounded-full bg-bronze" aria-hidden />
        <span className="text-[19px] font-bold tracking-[-0.02em]">CLAVISCOR</span>
      </div>
      <h1 className="text-[28px] font-bold tracking-[-0.03em] mt-6">Yönetim paneli</h1>
      <p className="text-sm text-muted mt-2">Devam etmek için parolanızı girin.</p>

      <label htmlFor="pw" className="block font-mono text-[10px] tracking-[0.14em] text-label mt-8">
        PAROLA
      </label>
      <input
        id="pw"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mt-2 bg-transparent border-b-[1.5px] border-ink/15 focus:border-bronze outline-none py-2.5 text-[15px] transition-colors"
      />

      {error && (
        <p role="alert" className="text-[13px] text-[#B4503F] mt-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy || password.length === 0}
        className="mt-7 w-full text-sm font-semibold text-cream bg-ink py-3 rounded-full transition disabled:opacity-40 hover:bg-[#33291f]"
      >
        {busy ? "Kontrol ediliyor…" : "Giriş yap"}
      </button>
    </form>
  );
}
