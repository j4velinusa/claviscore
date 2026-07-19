# Claviscore

Claviscor — kapı kilidi/donanımı ve tavan sistemleri ihracatçısı — için web sitesi. Public vitrin + (planlanan) admin back-office.

## Geliştirme

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Yapı

| Yol | İçerik |
| --- | --- |
| `app/[locale]/` | Next.js App Router sayfaları — TR (`/`) ve EN (`/en`): ana sayfa, `katalog`, `koleksiyon` |
| `proxy.ts` | Dil yönlendirmesi (Next 16'da `middleware` yerine `proxy`) |
| `components/landing/` | Ana sayfa bölümleri |
| `components/site/` | Nav, footer, ortak sayfa parçaları |
| `components/motion/` | Reveal / CountUp scroll animasyonları |
| `lib/i18n.ts` | Dil yapılandırması ve yol yardımcıları |
| `lib/dictionaries/` | TR/EN çeviri sözlükleri (`tr.ts` kanonik şekil) |
| `lib/site.ts` | Marka ve iletişim bilgisi (dilden bağımsız, tek kaynak) |
| `design/` | Claude Design mockup'ları (kaynak gerçeklik, lint dışı) |
| `docs/design-analysis.md` | 14 tasarım sayfasının konsolide analizi |

Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4. İki dilli (TR/EN). Deploy hedefi: Vercel (+ ileriki fazlarda Supabase).

Proje konvansiyonları için `AGENTS.md`'ye bakın.
