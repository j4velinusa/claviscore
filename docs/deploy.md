# Deploy — Vercel + claviscor.com

Public landing sitesi Vercel'de barınıyor. Repo: `j4velinusa/claviscore` (private).

## İlk kurulum (tek seferlik)

1. **https://vercel.com/new** → **Import Git Repository**
2. Private repo için Vercel'in GitHub app'ine `j4velinusa/claviscore` erişimi ver.
3. `claviscore`'u seç → **Import**. Framework otomatik **Next.js** algılanır; build/output ayarlarına dokunma.
4. **Deploy**. İlk dağıtım `claviscore-*.vercel.app` adresinde canlı olur.

Sonraki her `git push origin main` otomatik production deploy tetikler (preview'lar diğer branch'lerde).

## Domain: claviscor.com

1. Vercel projesi → **Settings → Domains** → `claviscor.com` (ve istersen `www.claviscor.com`) ekle.
2. Vercel'in gösterdiği **tam DNS kayıtlarını** registrar'da (domaini aldığın yerde) uygula. Tipik şekil:
   - Apex `claviscor.com`: **A** kaydı → Vercel'in panelde verdiği IP (ör. `216.198.79.1` — panelde gösterilen değeri kullan).
   - `www.claviscor.com`: **CNAME** → `cname.vercel-dns.com`.
   - Alternatif: domain'in nameserver'larını Vercel'e devret (panel yönlendirir).
3. `claviscor.com`'u **primary** yap. DNS yayılınca (dakikalar–saatler) HTTPS sertifikası otomatik gelir.

## URL / SEO davranışı

- `canonical`, OpenGraph, `sitemap.xml`, `robots.txt` production'da `https://claviscor.com`'a sabitlenir (`lib/site-url.ts`).
- Farklı bir domaine geçilirse: kod değiştirmeden Vercel'de **`NEXT_PUBLIC_SITE_URL`** env değişkenini o adrese ayarlamak yeterli (en yüksek öncelik). Örn. `NEXT_PUBLIC_SITE_URL=https://claviscor.com`.
- `/sitemap.xml` yalnızca indekslenebilir sayfaları listeler; `/katalog` ve `/koleksiyon` coming-soon stub'ları `noindex`.

## Diller

- Türkçe `https://claviscor.com/`, İngilizce `https://claviscor.com/en`. Yönlendirme `proxy.ts` ile.
- Yeni ortam değişkeni gerekmez; i18n tamamen kod içinde.

## Doğrulama (deploy sonrası)

- `https://claviscor.com/` (TR) ve `/en` (EN) açılıyor mu, nav'daki TR/EN geçişi çalışıyor mu.
- `https://claviscor.com/robots.txt` ve `/sitemap.xml` doğru domaini gösteriyor mu.
- `/en` sayfasında `<link rel="canonical">` → `https://claviscor.com/en`.
