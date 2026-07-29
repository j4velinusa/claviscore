// Türkçe sözlük — sözlük şeklinin kaynağı. Diğer diller bu şekle uymalıdır.
// Vurgu başlıkları { pre, em, post } üçlüsüyle modellenir; `em` serif italik render edilir.

export const tr = {
  nav: {
    products: "Ürünler",
    collection: "Koleksiyon",
    certificates: "Sertifikalar",
    export: "İhracat",
    blog: "Bilgi Merkezi",
    contact: "İletişim",
    quote: "Teklif Al",
    menu: "Menü",
  },
  hero: {
    kicker: "Kapı donanımı & tavan sistemleri · 40+ ülke",
    title: { pre: "Mekanizmanın", em: "kusursuz", post: "dili." },
    subtitle:
      "Kapı güvenlik donanımından tavan sistemlerine — kilit, menteşe, kol ve asma/alçı tavan çözümleri. Milimetrik tolerans, sertifikalı dayanım.",
    ctaCatalog: "Kataloğu indir",
    ctaTeam: "İhracat ekibiyle görüş",
    imageCaption: "[ ÜRÜN GÖRSELİ — silindir barel ]",
    specLines: ["Ø17 mm", "pirinç gövde", "5 pim · 15 kombinasyon"],
  },
  stats: {
    countries: "ülkeye ihracat",
    sku: "aktif SKU",
    certified: "sertifikalı üretim",
    founded: "kuruluş yılı",
  },
  families: {
    kicker: "Ürün aileleri",
    title: { pre: "Tek dilden,", em: "altı", post: "aile." },
    items: {
      cylinder: { title: "Silindir Bareller", desc: "Tek/çift taraf, anti-snap, master key sistemleri" },
      padlock: { title: "Asma Kilitler", desc: "Pirinç & lamine gövde, 20–80 mm" },
      hinge: { title: "Menteşeler", desc: "Rulmanlı, gizli & ayarlanabilir tipler" },
      handle: { title: "Kapı Kolları", desc: "Rozet & aynalı, mat/parlak kaplama" },
      hotel: { title: "Otel Kilit Sistemleri", desc: "RFID & şifreli, yönetim yazılımı dahil" },
    },
    accent: {
      title: "Aksesuar & Yedek",
      desc: "Anahtar kütükleri, kapı stoperleri, montaj kitleri",
      cta: "Tüm aileyi gör",
    },
  },
  ceiling: {
    kicker: "Tavan sistemleri",
    title: { pre: "Kapıdan", em: "tavana.", post: "" },
    subtitle:
      "Aynı mühendislik disiplini artık başınızın üstünde — asma tavan, aydınlatma ve alçı tavan sistemleriyle mekânı baştan sona donatıyoruz.",
    items: {
      suspended: { title: "Asma Tavan", desc: "Taşıyıcı T-profil, mineral & metal tavan panelleri" },
      lighting: { title: "Tavan Aydınlatma", desc: "Sıva altı spot, lineer LED ve armatür sistemleri" },
      gypsum: { title: "Alçı Tavan", desc: "Alçıpan kartonpiyer, dekoratif kademe ve bordür" },
    },
  },
  engineering: {
    kicker: "Mühendislik",
    title: { pre: "Güven,", em: "milimetrenin", post: "içinde başlar." },
    body: "Her barel kendi tezgâhımızda işlenir; her pim, her yay aynı tolerans disipliniyle. Tuzlu sis testinden çevrim ömrüne kadar laboratuvardan geçer.",
    stats: [
      { value: "%100", label: "yerli üretim" },
      { value: "14 gün", label: "numune teslim" },
      { value: "OEM", label: "özel üretim" },
    ],
    imageCaption: "[ KESİT GÖRSELİ — pim & yay ]",
    specLines: ["tol. ±0,02 mm", "nikel kaplama", "200.000 çevrim"],
  },
  exportPanel: {
    kicker: "İhracat",
    title: { pre: "Altı kıtada açılan", em: "kapılar.", post: "" },
    body: "Gümrük dokümantasyonu, etiketleme ve paletleme dahil — anahtar teslim ihracat operasyonu. Distribütör ve proje bazlı fiyatlandırma.",
    ctaCatalog: "İhracat kataloğu (PDF)",
    ctaDistributor: "Distribütör başvurusu",
    regions: [
      { name: "Avrupa", codes: "DE · FR · NL · UK · PL" },
      { name: "Orta Doğu", codes: "SA · AE · QA · IQ · JO" },
      { name: "Afrika", codes: "EG · MA · DZ · NG · KE" },
      { name: "Asya & Pasifik", codes: "IN · ID · MY · AU · VN" },
      { name: "Amerika", codes: "US · MX · BR · CL · CA" },
    ],
  },
  certificates: {
    kicker: "Sertifika & standart",
  },
  closing: {
    title: { pre: "Numune ve fiyat teklifinizi", em: "alın.", post: "" },
    body: "SKU listenizi paylaşın, 48 saat içinde fiyat ve numune planıyla dönelim.",
    cta: "Teklif iste",
  },
  footer: {
    tagline:
      "Kapı güvenlik donanımı ve tavan sistemleri üreticisi. 2019'dan beri tasarlıyor, işliyor ve dünyaya ihraç ediyoruz.",
    products: "Ürünler",
    corporate: "Kurumsal",
    contact: "İletişim",
    productLinks: ["Silindir Bareller", "Asma Kilitler", "Menteşeler", "Kapı Kolları", "Otel Sistemleri", "Tavan Sistemleri"],
    corporateLinks: ["Hakkımızda", "Üretim", "Sertifikalar", "İhracat", "İletişim"],
    rights: "CE · TSE · ISO 9001",
  },
  contact: {
    kicker: "İletişim",
    title: { pre: "Doğru kişiye", em: "tek", post: "mesajda ulaşın." },
    subtitle:
      "Teklif, numune ve teknik sorular için tek hat. Mesajınızı konu başlığıyla gönderin, ihracat ekibimiz 48 saat içinde dönsün.",
    form: {
      title: "Mesaj bırakın",
      topic: "KONU",
      company: "Firma",
      name: "Yetkili",
      email: "E-posta",
      country: "Ülke / şehir",
      lines: "Ürün hattı",
      message: "Mesaj",
      submit: "E-posta ile gönder",
      hint: "Firma, e-posta ve mesaj alanlarını doldurun.",
      ready: "E-posta uygulamanız hazır mesajla açılacak.",
      kvkk: "KVKK · VERİLERİNİZ YALNIZCA TEKLİF SÜRECİNDE KULLANILIR",
    },
    topics: {
      quote: { label: "Fiyat teklifi", tag: "TEKLİF", hint: "Ürün kodları, adet ve hedef teslim şeklinizi (FOB / CIF / DAP) yazın." },
      sample: { label: "Numune", tag: "NUMUNE", hint: "İlgilendiğiniz SKU ve kaplama tercihini yazın; kargo hesabınız varsa ekleyin." },
      tech: { label: "Teknik soru", tag: "TEKNİK", hint: "Ölçü, standart ya da montaj sorunuzu yazın." },
      partner: { label: "Distribütörlük", tag: "DİSTRİBÜTÖR", hint: "Faaliyet bölgeniz, mevcut ürün gruplarınız ve yıllık hacim beklentinizi paylaşın." },
    },
    lines: {
      lock: "Kilit & Barel",
      hinge: "Menteşe",
      handle: "Kapı Kolu",
      hotel: "Otel Sistemleri",
      ceiling: "Tavan Sistemleri",
      other: "Karma / Belirsiz",
    },
    info: {
      addressLabel: "FABRİKA & MERKEZ",
      linesLabel: "DOĞRUDAN HATLAR",
      emailLabel: "E-posta",
      phoneLabel: "Telefon",
      promiseLabel: "YANIT SÖZÜ",
      promise: "48 saat",
      promiseWhat: "içinde dönüş",
      promiseDesc: "Teklif ve numune taleplerine iki iş günü içinde fiyat ve planla yanıt veriyoruz.",
    },
  },
  blog: {
    kicker: "Bilgi Merkezi",
    title: { pre: "Donanımın", em: "arkasındaki", post: "bilgi." },
    subtitle:
      "Teknik notlar, standart okumaları, ihracat pratiği ve saha deneyimi. Satın alma ve proje ekipleri için yazıyoruz.",
    filterLabel: "Kategoriye göre filtrele",
    countSuffix: "YAZI",
    empty: "Bu kategoride henüz yazı yok.",
    featuredCta: "Yazıyı oku",
    cardCta: "Oku",
    readingSuffix: "dk okuma",
    minutes: "dk",
    categories: {
      all: "Tümü",
      teknik: "Teknik",
      standart: "Standartlar",
      ihracat: "İhracat",
      tavan: "Tavan Sistemleri",
      proje: "Proje",
    },
    toc: "İçindekiler",
    share: "Paylaş",
    copyLink: "Bağlantıyı kopyala",
    copied: "Kopyalandı",
    related: "İlgili yazılar",
    seeAll: "Tümünü gör",
    productCta: "Ürünü gör",
    newsletter: {
      kicker: "Teknik bülten",
      title: { pre: "Ayda bir,", em: "sadece", post: "işe yarar olan." },
      body: "Yeni standart revizyonları, ürün geliştirmeleri ve ihracat mevzuatı özetleri. Pazarlama maili yok.",
      cta: "Kayıt ol",
      note: "TEK TIKLA ÇIKIŞ · KVKK UYUMLU",
    },
  },
  katalog: {
    kicker: "2025 koleksiyonu",
    title: { pre: "Ürün", em: "kataloğu", post: "" },
    intro: "Tüm aileler, tek bir donanım dili.",
    // {count} ve {total} yer tutucu; {count} vurgulu render edilir. Dile göre
    // kelime sırası değiştiği için şablon olarak tutuluyor, parça parça değil.
    showing: "{count} / {total} ürün gösteriliyor.",
    filterLabel: "Kategoriye göre filtrele",
    finishesLabel: "Kaplama seçenekleri",
    empty: "Bu kategoride gösterilecek ürün yok.",
    categories: {
      all: "Tümü",
      barrel: "Bareller",
      padlock: "Asma Kilit",
      hinge: "Menteşe",
      handle: "Kol",
      hotel: "Otel",
      accessory: "Aksesuar",
      ceiling: "Tavan",
    },
    badges: {
      new: "YENİ",
      bestseller: "ÇOK SATAN",
    },
    oem: {
      text: "Aradığınız ürünü bulamadınız mı? Özel üretim (OEM) için listenizi paylaşın.",
      cta: "Numune talep formu",
    },
    products: {
      "BRL-110": { name: "Anti-Snap Barel", desc: "6 pim, kırılma korumalı çelik takviye", spec: "60–100 mm" },
      "BRL-120": { name: "Master Key Barel", desc: "Sistem anahtarlama, ana anahtar hiyerarşisi", spec: "60–110 mm" },
      "BRL-130": { name: "Yarım Silindir", desc: "Tek taraflı, dolap ve panel uygulamaları", spec: "30–50 mm" },
      "PAD-210": { name: "Pirinç Asma Kilit", desc: "Massif pirinç gövde, su geçirmez seçenek", spec: "20–60 mm" },
      "PAD-220": { name: "Lamine Asma Kilit", desc: "Sertleştirilmiş kanca, dış mekân dayanımı", spec: "30–70 mm" },
      "HNG-310": { name: "Rulmanlı Menteşe", desc: "2BB paslanmaz, ağır kapı taşıma", spec: "100–120 mm" },
      "HNG-320": { name: "Gizli Menteşe", desc: "Ayarlanabilir 3D, görünmez montaj", spec: "Ø14 mm" },
      "HDL-410": { name: "Aynalı Kol Takımı", desc: "Rozetli set — WC, anahtarlı, dilsiz", spec: "Set" },
      "HTL-510": { name: "RFID Otel Kilidi", desc: "Mifare kart, yönetim yazılımı dahil", spec: "Sistem" },
      "ACC-610": { name: "Manyetik Kapı Stoperi", desc: "Zemin & duvar tipi, paslanmaz", spec: "Adet" },
      "CLG-710": { name: "Asma Tavan Sistemi", desc: "Taşıyıcı T-profil + mineral/metal panel, 600×600", spec: "600×600 mm" },
      "CLG-720": { name: "Metal Baffle Tavan", desc: "Lineer alüminyum baffle, akustik dolgulu", spec: "Lineer" },
      "LGT-730": { name: "Sıva Altı Downlight", desc: "Yüksek verimli LED spot, ayarlanabilir açı", spec: "Ø90–150 mm" },
      "LGT-740": { name: "Lineer LED Profil", desc: "Magnetik ray, kesintisiz ışık hattı", spec: "1–3 m" },
      "GYP-750": { name: "Alçıpan Tavan Plakası", desc: "Standart / neme dayanıklı / yangın, 12.5 mm", spec: "1200×2000 mm" },
      "GYP-760": { name: "Kartonpiyer & Bordür", desc: "Dekoratif kademe, kaşe ve köşe profilleri", spec: "Profil" },
    },
  },
  comingSoon: {
    katalog: {
      kicker: "Katalog",
      title: "Katalog çok",
      accent: "yakında.",
      description:
        "Dijital katalogumuz üzerinde çalışıyoruz. O zamana dek güncel ürün kataloğunu ve fiyat listesini e-posta ile talep edebilirsiniz — 48 saat içinde dönüş yapıyoruz.",
    },
    koleksiyon: {
      kicker: "Koleksiyon",
      title: "Koleksiyon çok",
      accent: "yakında.",
      description:
        "Kaplama ve seri koleksiyonlarımızı sergileyeceğimiz sayfa üzerinde çalışıyoruz. Numune ve kartela talepleriniz için ihracat ekibimize yazabilirsiniz.",
    },
    ctaEmail: "E-posta ile talep et",
    back: "Ana sayfaya dön",
  },
  meta: {
    home: {
      title: "CLAVISCOR — Kapı Donanımı & Tavan Sistemleri",
      description:
        "Kapı güvenlik donanımından tavan sistemlerine — kilit, menteşe, kol ve asma/alçı tavan çözümleri. Milimetrik tolerans, sertifikalı dayanım, 40+ ülkeye ihracat.",
    },
    katalog: {
      title: "Ürün Kataloğu — CLAVISCOR",
      description:
        "Silindir barel, asma kilit, menteşe, kapı kolu, otel kilit sistemleri ve tavan çözümleriyle Claviscor ürün kataloğu. Numune ve teklif için ihracat ekibimize yazın.",
    },
    blog: {
      title: "Bilgi Merkezi — CLAVISCOR",
      description:
        "Kapı donanımı ve tavan sistemlerinde teknik notlar, standart okumaları ve ihracat pratiği. Satın alma ve proje ekipleri için Claviscor Bilgi Merkezi.",
    },
    iletisim: {
      title: "İletişim — CLAVISCOR",
      description:
        "Teklif, numune ve teknik sorularınız için Claviscor ihracat ekibi. Çerkezköy / Tekirdağ merkez, 48 saat içinde dönüş.",
    },
    koleksiyon: {
      title: "Koleksiyon — CLAVISCOR",
      description: "Claviscor kaplama ve seri koleksiyonları çok yakında.",
    },
  },
  mailSubject: {
    quote: "Teklif Talebi",
    distributor: "Distribütör Başvurusu",
    catalog: "Katalog Talebi",
    sample: "Numune / Kartela Talebi",
    newsletter: "Teknik Bülten Kaydı",
  },
};

// tr kanonik şekildir; string'ler bilinçli olarak genişletilir (literal değil) ki
// İngilizce sözlük aynı yapıya farklı metinlerle uyabilsin.
export type Dictionary = typeof tr;
