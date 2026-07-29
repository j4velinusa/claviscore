import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, DM_Mono, Newsreader } from "next/font/google";
import "../globals.css";

// Admin, [locale] segmentinin DIŞINDA (bkz. proxy.ts matcher) — dolayısıyla
// app/[locale]/layout.tsx'ten geçmez ve kendi kök layout'unu kurmak zorundadır:
// <html>/<body>, font değişkenleri ve globals.css burada olmalı.
// Panel arayüzü tek dilli (Türkçe); public site i18n'i buraya uzanmıyor.

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  subsets: ["latin", "latin-ext"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Yönetim — CLAVISCOR",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="tr"
      className={`${manrope.variable} ${dmMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream">{children}</body>
    </html>
  );
}
