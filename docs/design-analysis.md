# Claviscor — Tasarım Analizi ve Mimari Brief

> Kaynak: `/Users/dogan/claviscore/design/` altındaki 14 mockup dosyasının (.dc.html) konsolide analizi.
> Tarih: 2026-07-15 · Durum: Taslak v1

Claviscor, Türkiye merkezli bir kapı kilidi / kapı donanımı **ihracat** şirketidir. Tasarım seti iki dünyadan oluşur:

1. **Halka açık vitrin (storefront):** Apple-vari sade pazarlama + katalog + konfigüratör sayfaları. Fiyat gösterilmez; tüm CTA'lar teklif (RFQ), numune ve kartela taleplerine çıkar.
2. **Admin back-office:** Çok posta kutulu, çok dilli bir e-posta operasyon merkezi (gelen kutusu, şablonlar, gönderilenler, kişiler/CRM, KPI paneli) + proforma fatura hazırlayıcı.

---

## 1. Site Haritası

### 1.1 Halka açık (public) ekranlar — tasarımı mevcut

| Ekran | Dosya | Not |
|---|---|---|
| Ana Sayfa | `Ana Sayfa - Apple.dc.html` | Hero, istatistikler, ürün aileleri, tavan sistemleri, ihracat kartı, sertifikalar, footer |
| Katalog (varyant A) | `Katalog - Apple.dc.html` | 16 ürün, 7 kategori (Tavan dahil), yumuşak kartlı stil |
| Katalog (varyant B) | `Katalog.dc.html` | 10 ürün, 6 kategori (Tavan yok), keskin köşeli/grotesk stil — **iki katalog varyantından biri seçilmeli** |
| Koleksiyon (keşif) | `Koleksiyon - Keşif.dc.html` | 3 tasarım yönü: A seri vitrini / B kaplama koleksiyonu / C lookbook — **yön kararı bekliyor** |
| Koleksiyon (final aday) | `Koleksiyon.dc.html` | Yön B'nin işlenmiş hali: 4 kaplama, interaktif seçim, kartela CTA |
| Ürün Konfigüratörü | `Ürünler.dc.html` | Silindir barel konfigüratörü (tip/ölçü/kaplama/anahtarlama → SKU) |
| Marka Kılavuzu | `Marka Kılavuzu.dc.html` | Dahili tasarım sistemi referansı — canlı sayfa değil, doküman |

### 1.2 Admin ekranlar — tasarımı mevcut

| Ekran | Dosya | Sidebar konumu |
|---|---|---|
| Panel (dashboard) | `Admin - Panel.dc.html` | POSTA › Panel |
| Gelen Kutusu | `Admin - Gelen Kutusu.dc.html` | POSTA › Gelen Kutusu (rozet: okunmamış) |
| E-posta Oluşturucu (şablonla gönderim) | `Admin - E-posta.dc.html` | POSTA › Şablonlar (compose görünümü) |
| Şablon Düzenleyici | `Admin - Şablon Düzenleyici.dc.html` | POSTA › Şablonlar › Düzenle |
| Gönderilenler | `Admin - Gönderilenler.dc.html` | POSTA › Gönderilenler (rozet: 128) |
| Kişiler (CRM/rehber) | `Admin - Kişiler.dc.html` | POSTA › Kişiler |
| Proforma Hazırlayıcı | `Admin - Proforma.dc.html` | BELGELER › Proforma |

### 1.3 Navigasyonda geçen ama TASARIMI OLMAYAN ekranlar (eksik ekranlar)

**Admin:**
- **Ayarlar** — her sidebar'da var, hiçbir tasarım dosyası yok. (Posta kutusu bağlama, IBAN/banka, imza, kullanıcı yönetimi buraya düşecek — kritik.)
- **Sipariş Formları** — Proforma ekranının BELGELER grubunda ikinci öğe; tasarımı yok.
- **Zamanlanmış** — E-posta ve Şablon Düzenleyici sidebar'larında rozetle (3) görünüyor; diğer ekranların sidebar'ında yok. Ekranı yok. *(Sidebar nav öğeleri ekranlar arasında tutarsız: Panel/Gelen Kutusu/Gönderilenler/Kişiler sayfaları "Panel, Gelen Kutusu, Şablonlar, Gönderilenler, Kişiler, Ayarlar" gösterirken E-posta/Şablon ekranları "Zamanlanmış"ı içeriyor — birleştirilmeli.)*
- **Arşiv** — Gelen Kutusu'nda "Arşivle" aksiyonu var ama arşiv görünümü/nav öğesi yok.
- **Etkinlik günlüğü** — Panel'deki "Tümünü gör ›" hedefi tanımsız.
- **Serbest e-posta compose / yanıt / iletme penceresi** — "Yanıtla", "İlet", "Şablonla yanıtla" ve "Yeniden gönder" hep toast'la mock'lanmış; gerçek compose ekranı (şablonsuz) tasarlanmamış.
- **Yeni kişi / kişi düzenleme formu** — Kişiler'de butonları var, formu yok.
- **Yeni şablon oluşturma / şablon silme** — butonu var, akışı yok.
- **Dosya kitaplığı yönetimi** — Şablon Düzenleyici 11 dosyalık kitaplık kullanıyor; yükleme/yönetim ekranı yok.
- **Rapor indirme çıktısı** — Panel'de buton var, format/kapsam tanımsız.

**Public:**
- **Sertifikalar**, **İhracat**, **İletişim** — nav'da her sayfada var, dosyası yok.
- **Teklif Al / RFQ formu** — tüm sitenin ana CTA'sı; formu tasarlanmamış. *(Panel'deki "Yeni teklif talebi: 214" KPI'sı bu formun admin'e aktığını ima ediyor.)*
- **Numune talep formu**, **Kartela iste formu**, **Distribütör başvuru formu** — CTA'ları var, ekranları yok.
- **Ürün detay sayfası** — katalog kartları `cursor:pointer` + ok ile detaya gidişi ima ediyor; tasarımı yok.
- **EN dil sürümü** — TR/EN anahtarı her sayfada var, İngilizce içerik/sayfa yok.
- **Katalog PDF'leri** — "Kataloğu indir" / "İhracat kataloğu (PDF)" varlıkları yok.

### 1.4 Navigasyon ilişkileri (özet)

```
PUBLIC
Ana Sayfa ── nav ──> Ürünler(Katalog) · Koleksiyon · [Sertifikalar] · [İhracat] · [İletişim]
   │                        │                │
   ├─ "Teklif Al" ───────> [RFQ formu] <── her sayfanın pill CTA'sı
   ├─ "Kataloğu indir" ──> [PDF]
   └─ "Distribütör başvurusu" ─> [form]
Katalog ── ürün kartı ──> [Ürün detay] ── "teklif iste" ──> [RFQ]
Ürünler(Konfigüratör) ── SKU + yapılandırma ──> [RFQ] / [Numune]
Koleksiyon ── "Kartela iste" ──> [kartela formu]

ADMIN (sidebar: POSTA + BELGELER)
Panel ⇄ Gelen Kutusu ⇄ Şablonlar(E-posta Oluşturucu ⇄ Şablon Düzenleyici) ⇄ Gönderilenler ⇄ Kişiler ⇄ [Ayarlar]
Proforma ── "E-posta ile gönder" ──> E-posta Oluşturucu (PDF ekli)
Gönderilenler ── "Şablonu aç" ──> Şablon Düzenleyici
Kişiler ── "E-posta gönder" ──> E-posta Oluşturucu (alıcı dolu)
Gelen Kutusu ── "Şablonla yanıtla" ──> E-posta Oluşturucu
[RFQ formu (public)] ──> Panel KPI + muhtemelen Gelen Kutusu/lead kaydı
```
`[köşeli parantez]` = tasarımı olmayan ekran/varlık.

---

## 2. Konsolide Veri Modeli

### 2.1 Çekirdek varlıklar

#### Product (Ürün)
Üç sayfada üç farklı şema görünüyor — **birleştirilmesi gereken en kritik varlık**:

| Alan | Kaynak sayfa(lar) |
|---|---|
| `sku` (ör. BRL-110; kategori öneki: BRL/PAD/HNG/HDL/HTL/ACC/CLG/LGT/GYP) | Katalog ×2, Koleksiyon, Proforma |
| `name` (TR) / `nameEn` (EN) | Katalog (yalnız TR), Proforma (çift dilli) — **çakışma: katalog tek dilli** |
| `category` | Katalog (7 vs 6 kategori — iki varyant uyuşmuyor; Tavan yalnız Apple varyantında) |
| `desc`, `spec` (ör. "60–100 mm") | Katalog |
| `finishes: FinishCode[]` (PB/NK/SY/AN + satin/beyaz) | Katalog (hex olarak), Koleksiyon (kodlu) — **çakışma: katalog swatch'ları serbest hex, Koleksiyon 4 kodlu kaplama** |
| `badge` ("YENİ"/"ÇOK SATAN") | Katalog |
| `hs` (GTİP, ör. 8301.40) | Proforma — katalogda yok |
| `listPrice` (para birimi belirsiz) | Proforma — public'te bilinçli olarak fiyat yok |
| `series` (Heritage/Mimari/Otel & Proje) | Koleksiyon-Keşif |

Konfigüratör ayrıca **kompozit SKU** üretiyor: `BRL110·70·PB·MK` (tip·ölçü·kaplama·anahtarlama). Bu, düz katalog SKU'suyla (`BRL-110`) **aynı formatta değil** — varyantlı ürün modeli (base product + configuration axes) gerekiyor.

**İlişkiler:** Product ↔ Finish (N:N, "tüm kaplamalar her ailede mevcut" iddiası matris verisi ister) · Product ↔ Series (N:1) · Product ↔ LookbookScene (N:N hotspot) · Product ↔ ProformaLineItem (1:N).

**Okuyan/yazan:** Katalog, Koleksiyon, Konfigüratör, Lookbook (okur — public); Proforma ürün kataloğu (okur — admin); ürün CRUD ekranı **yok** (yazma yüzeyi eksik).

#### Contact / Buyer (Kişi + Firma)
Üç sayfada örtüşen ama farklı alanlı üç görünüm:

- **Kişiler (CRM):** id, name (unvanlı), company, email, phone, country+code, lang+langName, type (Distribütör/Proje/Perakende), tercih edilen `mailbox`, last, emails sayısı, notes, history[].
- **E-posta Oluşturucu:** id, name, company, email, region — alt küme.
- **Proforma Buyer:** id, company, attn (ilgili kişi), city, address, country — **adres yalnız burada var; Kişiler'de adres yok** (çakışma: proforma için adres zorunlu).

**Öneri:** `Company` (adres, ülke, tür) + `Contact` (kişi, e-posta, dil, unvan) ayrımı; şu an 1:1 varsayılmış. Buyer id dizisinde `c2` atlanmış — silinmiş/pasif kayıt davranışı tanımlanmalı.

**İlişkiler:** Contact ↔ SentEmail/InboundMessage (1:N), Contact ↔ Proforma (1:N buyer), Contact → Mailbox (tercih edilen gönderen).

**Okuyan/yazan:** Kişiler (okur+yazar — form eksik), E-posta Oluşturucu (okur), Proforma (okur), Gönderilenler/Gelen Kutusu (gönderen-firma eşleşmesi okur).

#### Mailbox (Paylaşımlı posta kutusu)
`export | sales | emea | latam | import | info` @claviscor.com — id, email, label, renk. Tüm admin ekranlarında filtre/kimlik olarak kullanılıyor. *(Not: `import` ve `info` bazı ekranlarda tanımlı ama hiç veri içermiyor.)* İlişkiler: Mailbox ↔ InboundMessage, ↔ SentEmail, ↔ Contact (tercih).

#### EmailTemplate (Şablon)
- Ortak: `id`, `code` (TK/NM/SP/SV/KT/FR), `name`, `subject`, `body` ({{token}}'lı, TR kaynak), `vars[]`.
- Şablon Düzenleyici ekler: `category` (Teklif/Sipariş/Lojistik/Pazarlama), `attachments: fileId[]` (varsayılan ekler).
- **Çakışma:** kod E-posta ekranında 2 harf, Düzenleyici'de maxlength=3; Panel/Gönderilenler 2 harfli kod rozetleri kullanıyor.
- Kullanım sayacı (Panel: "En çok kullanılan şablonlar") → SentEmail.templateId üzerinden agregasyon.

#### TemplateVariable
`key` (firma, ilgili, takip, siparisNo, konteyner, eta, yil, fuar, stand), `label`, `sample`. Sabit 9 token; gönderimde elle veya sipariş verisinden doldurulur (belirsiz).

#### InboundMessage (Gelen e-posta)
`id, from{name, company, email}, to(mailboxId), lang, langName, rtl, time, unread, subject, body, attachments[]`. + türetilmiş: çeviri cache'i (`subject_tr`, `body_tr`). Durum: okundu/okunmadı; arşiv. **Thread modeli yok** (RE:/AW: konular thread ihtiyacını ima ediyor).

#### SentEmail (Gönderilen e-posta)
`recipient(contactId), templateId, mailboxId, lang, subject, body (çevrilmiş), attachments[], sentAt, status: delivered|opened|replied|bounced` + teslim zaman çizelgesi event'leri (4 adım). Panel KPI'ları (açılma %62, yanıt %38) ve Kişiler'deki history[] bu event'lerden türer.

#### Translation
`key (messageId|templateId + lang), subject, body`. İki yönlü: giden (TR→NL/DE/FR/EN/ES/AR) ve gelen (AR/NL/…→TR). Mock'ta `window.claude.complete` ile LLM, oturum içi cache — kalıcılık kararı açık.

#### Proforma + LineItem
`Proforma: proformaNo (PI-YYYY-NNNN), date, validityDays, currency (EUR|USD|GBP), buyerId, items[], discountPct, freight, incoterm (EXW/FOB/CFR/CIF/DAP/DDP), portLoad, portDisch, paymentTerm (tt100/tt3070/lc/lc60), notes, status(taslak/…)`.
`LineItem: pid, qty, unitPrice, amount`. İlişkiler: → Buyer(Contact/Company), → Product, → SentEmail (PDF ek olarak).

#### Yapılandırma varlıkları
- **CurrencyMeta/BankAccount:** para birimi başına IBAN (İş Bankası, SWIFT ISBKTRISXXX) — Ayarlar'da yönetilmeli.
- **SellerInfo:** şirket ünvanı, vergi no, Mersis, adres, imza — proforma antetinde hardcoded.
- **PaymentTerm / Incoterm sözlükleri:** çift dilli (editör TR, belge EN).
- **FileLibraryItem:** id, name, type (PDF/XLS), size — 11 dosya (katalog, fiyat listesi, sertifikalar, konşimento...).

#### İçerik (CMS) varlıkları — public
Finish (key, code, label, gradient, desc, uses[]), Series, LookbookScene (+hotspot koordinatları, ProductRef[]), CompanyStats (40+ ülke, 1200+ SKU, 1976), ExportRegion (bölge + ISO-2 kodlar), Certificate (CE, TSE, ISO 9001, EN 1303, Anti-Snap).

#### AdminUser
name, initials, role ("İhracat · Satış"). Yetki modeli tanımsız (tüm posta kutularına erişim mi?).

### 2.2 Açık şema çakışmaları (özet)

1. **Ürün:** katalog (TR, fiyatsız, kategori) vs proforma (TR/EN, HS, fiyat) vs konfigüratör (varyant eksenli kompozit SKU) — tek PIM modeli gerekli.
2. **Kişi/Firma:** Kişiler'de adres yok, Proforma buyer'da var; type/lang alanları yalnız Kişiler'de.
3. **Kategori listeleri:** iki katalog varyantı farklı (Tavan var/yok); Ana Sayfa "aileler" farklı isimlerle.
4. **Şablon kodu:** 2 vs 3 karakter.
5. **Domain/marka:** UI "MARKA", e-posta imzası `export@marka.com`, posta kutuları `@claviscor.com`, proforma belgesi "CLAVISCOR".
6. **Panel çeviri toplamı** (9.840) gönderim sayısından (25.940) bağımsız — metrik tanımı (gönderim başına mı mesaj başına mı) net değil.

---

## 3. Özellik Envanteri

Etiketler: **[UI]** salt istemci · **[P]** kalıcılık gerekli · **[I]** dış entegrasyon gerekli

### 3.1 Admin

| Özellik | Etiket | Not |
|---|---|---|
| KPI panosu (gönderim/açılma/yanıt/RFQ, zaman aralığı) | [P][I] | E-posta event agregasyonu + tracking |
| Gönderim hacmi / dil / hesap / şablon grafikleri | [P] | Agregasyon endpoint'leri |
| Son etkinlik akışı | [P] | Audit/event feed |
| Rapor indir | [P][I] | PDF/Excel üretimi |
| Çoklu posta kutusu gelen kutusu (6 hesap, birleşik) | [I] | **IMAP/Graph/webhook inbound ingest — gerçek e-posta alımı** |
| Okundu/okunmadı + rozet sayaçları | [P] | Paylaşımlı mı kullanıcı bazlı mı: açık soru |
| Gelen e-postayı TR'ye çevir (RTL dahil) | [I] | LLM çeviri + cache |
| Yanıtla / İlet / Şablonla yanıtla | [P][I] | Compose ekranı eksik; SMTP gönderim |
| Arşivle | [P] | Arşiv görünümü eksik |
| E-posta arama | [P] | Kapsam (gövde? çeviri?) açık |
| Şablonla toplu gönderim (çok alıcı, dil seçimi) | [P][I] | ESP/SMTP + değişken doldurma |
| Giden e-postayı hedef dile AI çevirisi (6 dil, {{token}} korumalı) | [I] | LLM; insan onayı açık soru |
| Şablon CRUD + değişken paleti + varsayılan ekler | [P] | Yeni şablon/silme akışı eksik |
| Dosya kitaplığı (11 belge, şablon eki) | [P][I] | Dosya depolama; yükleme ekranı eksik |
| Taslak kaydetme (e-posta + proforma) | [P] | |
| Zamanlanmış gönderim | [P][I] | Ekranı yok, rozeti var |
| Gönderilenler listesi + durum filtresi + detay drawer | [P][I] | delivered/opened/replied/bounced event'leri → ESP webhook + açılma pikseli (KVKK/GDPR sorusu) |
| Yeniden gönder | [P][I] | Birebir mi düzenlenebilir mi: açık |
| Kişiler CRM (liste, arama, tür filtresi, detay, yazışma geçmişi) | [P] | Kişi formu eksik |
| Proforma hazırlayıcı (alıcı, kalemler, Incoterm, ödeme, döviz) | [P] | Numara serisi PI-YYYY-NNNN |
| Canlı A4 önizleme (ölçeklenen sheet) | [UI] | ResizeObserver + scale — saf istemci |
| Proforma PDF üretimi | [I] | Sunucu veya istemci PDF render |
| Proforma → e-posta oluşturucuya handoff (PDF ekli) | [P][I] | Modüller arası aktarım |
| Para birimi başına IBAN gösterimi | [P] | Ayarlar'da yönetim gerekli |
| Kimlik doğrulama + rol | [P][I] | Yetki modeli tanımsız |

### 3.2 Public

| Özellik | Etiket | Not |
|---|---|---|
| Pazarlama ana sayfası (reveal/sayaç animasyonları) | [UI] | İçerik CMS'e taşınırsa [P] |
| Katalog: kategori filtre + sayaç | [UI] | Veri API'den gelirse [P]; büyürse sunucu tarafı |
| Ürün rozetleri (YENİ/ÇOK SATAN) | [P] | Admin'den atama ima ediliyor |
| Koleksiyon kaplama seçici (reaktif detay bandı) | [UI] | Kaplama×ürün matrisi gerçek veriden gelirse [P] |
| Lookbook hotspot'ları | [P] | Koordinat + ürün ref saklama (CMS) |
| Barel konfigüratörü (SKU türetme, canlı önizleme) | [UI] | Konfigürasyon seçenekleri PIM'den gelirse [P]; MOQ/termin dinamikse [P] |
| Teklif Al / RFQ formu | [P][I] | Form yok; kayıt + admin bildirimi/e-posta |
| Numune / kartela / distribütör başvuru formları | [P][I] | Formlar yok |
| Katalog PDF indirme | [P] | Statik mi dinamik mi: açık |
| TR/EN i18n | [P] | Strateji tanımsız |
| Ürün görselleri | [I] | Tümü placeholder; medya depolama/CDN |

---

## 4. Kritik Entegrasyon İhtiyaçları

### 4.1 E-posta: GERÇEK alım (inbound) + gönderim (outbound) — en ağır entegrasyon

Mockup'lar yalnızca gönderim değil, **tam çift yönlü e-posta operasyonu** gösteriyor:

- **Gelen Kutusu** 6 gerçek görünümlü yabancı dilde (NL/DE/AR/FR/EN/ES) B2B e-postası içeriyor: gönderen kişi+firma+adres, hangi @claviscor.com kutusuna geldiği, okunmamış durumu, PDF ekleri (imzalı proforma), RE:/AW: konu önekleri. Bu, **IMAP/Google Workspace/MS Graph senkronu veya inbound webhook** ile gerçek posta alımını zorunlu kılar — salt-gönderim (ESP-only) mimarisi yetmez.
- **Yanıt akışları** mevcut: "Yanıtla", "Şablonla yanıtla", "İlet" (mock'ta toast). Panel'deki **"Yanıt oranı %38"** KPI'sı ve Gönderilenler'deki **"replied"** durumu, gelen yanıtların gönderilmiş e-postalarla **eşleştirilmesini** (reply detection / In-Reply-To takibi) gerektirir.
- **Gönderim:** 6 paylaşımlı hesaptan (SMTP/ESP), çok alıcılı, şablon+değişken+ek ile; taslak, zamanlanmış gönderim ve yeniden gönderme.
- **Teslimat takibi:** delivered/opened/bounced event'leri → ESP webhook + açılma pikseli. **KVKK/GDPR uyumu (tracking pixel) açık soru.**
- Okundu durumu ve mesaj sahiplenme paylaşımlı-inbox semantiği ister (birden çok temsilci aynı kutuda).

### 4.2 AI/LLM çeviri servisi
- **Gelen:** herhangi bir dilden TR'ye (konu+gövde, JSON dönüş, RTL farkındalığı).
- **Giden:** TR kaynak şablonun 5+ dile çevrilmesi, `{{token}}` placeholder'ları korunarak.
- Mock'larda `window.claude.complete` — üretimde sunucu taraflı LLM entegrasyonu + cache stratejisi (oturum içi mi kalıcı mı?) ve hata geri-düşüşü (mock TR'ye dönüyor).
- Panel bu çevirileri **metrikliyor** (dile göre donut) → çeviri olayları loglanmalı.

### 4.3 PDF üretimi
- **Proforma:** 680px A4 tasarımının PDF'e dönüştürülmesi ("PDF indir" + e-posta eki `PI-2026-0042.pdf`). Çok kalemde sayfalama çözülmeli.
- **Rapor indir** (Panel) ve muhtemelen **Sipariş Formları**.
- Public **katalog PDF'leri** (statik varlık mı, üretilen mi?).

### 4.4 Diğer
- **Dosya depolama:** dosya kitaplığı (PDF/XLSX), gelen ek saklama/indirme, ürün görselleri (CDN).
- **Arama:** e-posta (gelen+gönderilen), şablon, kişi araması — mock'larda kutular var, hiçbiri işlevsel değil.
- **Analytics/agregasyon:** zaman-bucket'lı (30g günlük / çeyrek haftalık / yıl aylık) gönderim-açılma-yanıt-çeviri metrikleri; hesap ve şablon kırılımı.
- **Public form kanalı → admin:** RFQ/numune/kartela/distribütör başvuruları admin tarafına lead olarak düşmeli (Panel'de "Yeni teklif talebi: 214").
- **i18n:** public TR/EN; ürün adları zaten çift dilli tutulmaya başlanmış (Proforma `nameEn`).
- **Kimlik doğrulama + rol/yetki:** admin girişi, posta kutusu erişim yetkileri.

---

## 5. Tasarım Sistemi (Marka Kılavuzu ile konsolide)

### 5.1 Tokenlar

**Fontlar**
- **Manrope** 400–800 — UI, gövde, başlık (başlıklarda −0.02/−0.03em tracking).
- **DM Mono** 400/500 — SKU, kod, etiket, breadcrumb, mikro-başlık (versal + 0.08–0.18em tracking).
- **Newsreader italic** — yalnız editoryal vurgu (başlıkta tek kelime); admin ekranlarında proforma belge başlığı hariç kullanılmıyor.
- Google Fonts'tan yükleniyor — self-hosting (KVKK/performans) kararı açık.

**Palet ("sıcak metal")**
| Token | Hex | Kullanım |
|---|---|---|
| Kağıt | `#FBF9F5` | Zemin (her iki dünya) |
| Kemik / Panel | `#F4EEE2` / `#F0ECE3` | İkincil yüzeyler |
| Mürekkep | `#1A1714` | Metin, koyu kartlar, dolu butonlar |
| Gunmetal | `#18120D` | Admin sidebar, koyu bantlar, footer |
| Pirinç / Bronz / Derin brass | `#C2A06A` / `#A87C4F` / `#8A6638` | Tek aksan; link, aktif durum, rozet (oran kuralı: ~%70 nötr / %22 mürekkep / %8 pirinç — "pirinç asla baskın değil") |
| Gri metin / Silik | `#5C564C`, `#78726B` / `#9A948A` | İkincil metin |
| Başarı / Hata / Bilgi | `#2E7D5B` / `#B4503F` / `#566A82` | Durum rozetleri (replied/bounced/delivered) |
| Mailbox kimlikleri | export `#A87C4F`, import `#5F7A6E`, latam `#B26B4A`, emea `#6B7A8F`, sales `#9A7B4F` | Admin genelinde tutarlı |
| Kaplama swatch'ları | PB `#B08D57`, NK `#C9C7C0`, SY `#2A2724`, AN `#6E5A3E` | Public koleksiyon/katalog |

**Radius:** 8 / 16 (kılavuz) — pratikte kartlar 10–24px arası, pill'ler **980px** (tam yuvarlak); form alanlarında radius yok, yalnız 1.5px alt çizgi (odakta pirinç).
**Gölge:** `0 1px 3px rgba(0,0,0,.06)` + `0 24px 50px -30px rgba(0,0,0,.35)` (yumuşak-uzun-düşük opaklık).
**Çizgiler:** hairline `rgba(26,23,20,.08/.12)`, 2px dolu başlık/antet çizgisi.
**Hareket:** `cubic-bezier(.16,.84,.44,1)` easing, fadeUp/spin/pulse keyframe'leri, scroll-reveal + sayaç animasyonları, `prefers-reduced-motion` desteği (public'te uygulanmış).

### 5.2 İki görsel dünya

- **Admin:** 238px koyu (#18120D) sidebar + krem içerik; backdrop-blur topbar; sağdan kayan 456px drawer'lar; alt-orta 2.6–2.8 sn otomatik kapanan toast; sticky tablo başlıkları; rozetli nav; DM Mono mikro-etiketler.
- **Public:** Apple-vari — sticky blur(14–18px) nav + 980px pill CTA, 1120–1280px konteyner, büyük negatif-tracking başlıklar + Newsreader vurgu kelimesi, hover'da kalkan kartlar. İki katalog varyantı ayrıca **iki alt-stil** deniyor: yumuşak kartlı (Apple) vs keskin köşeli 2px-radius grotesk (Schibsted Grotesk fontlu `Katalog.dc.html` — **kılavuz font setinden sapıyor**, karar gerekli).
- **Marka Kılavuzu** her ikisini tek sistemde bağlıyor; yalnız açık tema tanımlı — **dark mode yok**. Marka adı çoğu mockup'ta "MARKA" placeholder, kılavuzda CLAVISCOR wordmark + pirinç nokta.

### 5.3 Paylaşılan bileşen idiomları
Pill segment kontrolleri (para birimi, zaman aralığı, dil), chip filtre grupları, 2-harfli kod rozetleri, baş harf avatarları (+renk noktası), durum rozetleri (%14–16 opak zemin), alt-çizgili form inputları, sticky başlıklı tablolar, sağ drawer + overlay, toast, blur'lu çeviri overlay'i, conic-gradient donut ve saf-CSS bar grafikleri.

---

## 6. Sayfalar Arası Akışlar

1. **Proforma → PDF → E-posta → Takip:** Kişiler'den gelen alıcı + ürün kataloğu ile proforma hazırlanır → taslak kaydedilir → PDF üretilir → "E-posta ile gönder" ile PDF ekli olarak E-posta Oluşturucu'ya (Sipariş Onayı şablonu) aktarılır → gönderim Gönderilenler'e düşer → delivered/opened/replied event'leri Panel KPI'larını ve Kişiler yazışma geçmişini besler.
2. **Gelen e-posta → çeviri → şablonlu yanıt:** Yabancı dilde mail Gelen Kutusu'na düşer → tek tıkla TR'ye LLM çevirisi → "Şablonla yanıtla" ile E-posta Oluşturucu'ya handoff → şablon değişkenleri doldurulur → müşterinin diline AI çevirisi → gönderim.
3. **Şablon yaşam döngüsü:** Şablon Düzenleyici'de metin+değişken+varsayılan ek tanımlanır → E-posta Oluşturucu'da seçilip gönderilir → Gönderilenler drawer'ındaki "Şablonu aç" düzenleyiciye geri döner → Panel "en çok kullanılan şablonlar"ı sayar.
4. **Kişiler merkez (hub):** Kişiler ⇄ E-posta Oluşturucu (alıcı seçimi/handoff) ⇄ Proforma (buyer picker) ⇄ Gönderilenler/Gelen Kutusu (yazışma geçmişi, tercih edilen mailbox).
5. **Public lead → admin:** Konfigüratör/katalogdan "teklif iste" (SKU+yapılandırma taşıyarak) → [RFQ formu] → Panel "Yeni teklif talebi" KPI'sı + muhtemel Gelen Kutusu/lead kaydı. Numune/kartela/distribütör başvuruları aynı kanaldan.
6. **Public gezinme:** Ana Sayfa → Katalog → [Ürün detay] → Konfigüratör; Koleksiyon (kaplama/lookbook) → SKU bazlı katalog/detay; her sayfadan "Teklif Al".

---

## 7. Açık Sorular (mimariyi en çok etkileyenler, sıralı)

1. **E-posta altyapısı:** Hangi sağlayıcı (Google Workspace / MS365 / IMAP+ESP)? Gerçek inbound senkron zorunlu — senkron sıklığı, thread modeli, paylaşımlı-inbox semantiği (okundu durumu kullanıcı bazlı mı ekip geneli mi, mesaj atama/sahiplenme var mı?).
2. **Açılma/yanıt takibi:** Tracking pixel + ESP webhook'ları KVKK/GDPR açısından kabul edilebilir mi? Yanıt eşleştirme nasıl (In-Reply-To/Message-ID)? Panel KPI'ları ve "replied" durumu buna bağlı.
3. **Ürün veri modeli (PIM):** Katalog/proforma/konfigüratör şemaları nasıl birleşir — çift dilli ad, HS kodu, fiyat, kaplama×ürün matrisi, varyant eksenli kompozit SKU tek modelde mi? Ürün yönetim (CRUD) ekranı nerede?
4. **LLM çeviri operasyon modeli:** Gönderim öncesi insan onayı gerekli mi? Çeviri cache'i kalıcı mı (şablon başına dil sürümü)? Hata durumunda akış? Maliyet/gecikme bütçesi?
5. **Fiyatlandırma ve döviz:** Proforma'da para birimi değişince fiyat dönüşmüyor — kur dönüşümü mü, para birimi başına fiyat listesi mi? Public'te fiyatsızlık (yalnız RFQ) kesin karar mı?
6. **RFQ/lead kanalı:** "Teklif Al", numune, kartela, distribütör başvuruları tek form altyapısı mı, ayrı akışlar mı? Admin'e nasıl düşer (lead ekranı yok) — Gelen Kutusu'na e-posta olarak mı, ayrı modül mü?
7. **Eksik çekirdek ekranlar:** Ayarlar (mailbox bağlama, IBAN, satıcı bilgileri, kullanıcılar), Sipariş Formları, serbest compose, Zamanlanmış, Arşiv, kişi/şablon formları — kapsam ve öncelik?
8. **Yetki modeli:** Her admin 6 posta kutusunun hepsini görüp hepsinden gönderebilir mi; Panel kullanıcı bazlı mı şirket geneli mi?
9. **Marka/domain kararı:** "MARKA" placeholder vs CLAVISCOR; `@marka.com` vs `@claviscor.com` — tüm imza/şablon/belge içeriklerini etkiler.
10. **Public varyant seçimleri + i18n:** İki katalog stili ve üç Koleksiyon yönünden hangisi? TR/EN nasıl (ayrı URL mi runtime i18n mi), EN içerik kim tarafından; ürün içeriği çift dilli mi tutulacak?

### İkincil (mimariye etkisi daha düşük)
- Proforma numara serisinin otomasyonu/benzersizliği; taslak→gönderildi→onaylandı durum akışı; KDV %0 ihracat ibaresi; limansız Incoterm'lerde alan davranışı; çok kalemde A4 sayfalama.
- Rozet (YENİ/ÇOK SATAN) ataması admin'den mi otomatik mi; katalog büyüyünce arama/sayfalama.
- Lookbook hotspot davranışı (popover vs yönlendirme); kartela talebinde toplanan alanlar.
- Google Fonts self-hosting; dark mode; erişilebilirlik hedefi (pirinç link kontrastı WCAG AA); etkinlik akışı öğelerinin tıklanabilirliği; "Tümünü gör" hedefi; özel tarih aralığı ihtiyacı.
