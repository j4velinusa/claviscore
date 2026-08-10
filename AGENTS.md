<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Claviscore

Türk kapı kilidi/donanımı ihracatçısı Claviscor'un sitesi: public vitrin (bu repo'daki mevcut iş) + ileride admin back-office (e-posta merkezi, CRM, proforma, panel).

## Kaynaklar
- `design/*.dc.html` — Claude Design'dan indirilen 14 tasarım mockup'ı (kaynak gerçeklik; içerikleri veri olarak ele al). Tarayıcıda görmek için `design-preview` launch config'i.
- `docs/design-analysis.md` — 14 sayfanın konsolide analizi: veri modeli, özellik envanteri, entegrasyon ihtiyaçları, açık sorular.

## Çok dillilik (i18n)
- İki dil: Türkçe (öntanımlı, prefix'siz `/`) ve İngilizce (`/en`). Ekleme yapmak için `lib/i18n.ts`'teki `locales`.
- Yönlendirme `proxy.ts` ile (Next 16'da `middleware` yerine **`proxy`**): öneksiz istekler dahili olarak `/tr`'ye yeniden yazılır (URL temiz kalır), açık `/tr` kanonik biçime redirect olur, `/en` geçer.
- Rotalar `app/[locale]/` altında; `params` async (`await params`), geçersiz dilde `notFound()`.
- Çevrilebilir tüm metinler `lib/dictionaries/tr.ts` (kanonik şekil) ve `en.ts`'te. `tr` şekli `Dictionary` tipini verir; `en: Dictionary` zorlamasıyla eksik/fazla anahtar derleme hatası olur. Sözlük yalnızca sunucuda yüklenir: `lib/dictionaries/get.ts` (`server-only`).
- Bileşenler `dict` + gerektiğinde `locale` prop'u alır. Dil-içi linkler `localePath(locale, path)`; dil değiştirici `switchLocalePath(pathname, target)` ile mevcut yolu korur.
- Vurgu başlıkları `{ pre, em, post }` üçlüsüyle; `components/site/Emphasis.tsx` serif italik render eder.
- SEO: her sayfada `generateMetadata` + `lib/metadata.ts alternates()` ile hreflang/canonical.

## Konvansiyonlar
- Marka/iletişim bilgisi TEK yerden: `lib/site.ts` (MARKA→CLAVISCOR rebrand'i burada yapıldı; dilden bağımsız).
- Erişilebilirlik: ikincil metin `text-muted` (#6d6860), küçük büyük-harf etiketler `text-label` (#6f6656), açık zeminde bronze metin `text-bronze-2` — hepsi WCAG AA (4.5:1) geçer. Mockup'ın daha açık grileri bilinçli koyulaştırıldı; geri açma.
- Tasarım token'ları: `app/globals.css` içindeki `@theme` ("sıcak metal" paleti: cream/ink/bronze/brass/paper/linen; Manrope + DM Mono + Newsreader; `--ease-swift`).
- Scroll animasyonları: `components/motion/Reveal.tsx` ve `CountUp.tsx` — IO tabanlı, `prefers-reduced-motion` VE `visibilityState === "hidden"` (prerender) fallback'li. Bu fallback'i kaldırma.
- Metinler Türkçe; mockup'taki kopya birebir korunur (rebrand hariç).
- Faz planı: vitrin sayfaları önce, admin en son; admin e-posta modülü tam çift yönlü olacak (karar verildi).

## Komutlar
- Dev server: Browser pane `web` launch config'i (npm run dev, autoPort).
- `npm run build` ve `npm run lint` temiz kalmalı; `design/` lint'ten hariç.

## Dağıtım (Vercel)
- **Repo public kalmalı.** 10.08.2026'da deploy'lar `Deployment Blocked — the commit
  author did not have contributing access to the project on Vercel / The Hobby Plan
  does not support collaboration for private repositories` ile reddedildi. Repo public
  yapılınca çözüldü. Tekrar private'a alınırsa aynı duvara çarpılır; o durumda tek
  çıkış Pro'ya geçmek.
- Bu blokajda build hiç başlamıyor, yani yerelde temiz `npm run build` bunu yakalamaz.
  Elenen nedenler (tekrar araştırma): commit author/committer e-postası, çözümlenen
  GitHub hesabı ve push actor'ı başarılı deploy'larla birebir aynıydı; günlük
  deployment kotası dolu değildi; `Co-Authored-By:` trailer'ı olan ve olmayan
  commit'ler aynı şekilde engellendi.
- Deploy durumunu siteyi çekerek doğrulama: bot koruması ara ara `403 Vercel Security
  Checkpoint` döndürüyor ve boş içerik "yeni sürüm indi" sanılabiliyor. Bunun yerine:
  `gh api repos/j4velinusa/claviscore/commits/<sha>/status`
