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
  about: {
    kicker: "Hakkımızda",
    title: { pre: "Kapı donanımını", em: "ihracata", post: "göre kurduk." },
    subtitle:
      "2019'da tek bir işle kurulduk: Türkiye'de üretilen kapı donanımını ve tavan sistemlerini, dünyanın herhangi bir limanına sorunsuz teslim etmek. Üretim bizde, dokümantasyon bizde, sorumluluk bizde.",
    statsLabel: "RAKAMLARLA",
    stats: [
      { value: "2019", label: "Kuruluş" },
      { value: "6.400 m²", label: "Kapalı alan" },
      { value: "50+", label: "Çalışan" },
      { value: "40+", label: "Ülkeye ihracat" },
      { value: "50+", label: "Aktif ürün" },
    ],
    storyTitle: { pre: "Söylediğimizi", em: "ölçeriz.", post: "" },
    story: [
      "Kapı donanımı, katalogda birbirine çok benzeyen bir üründür. Farkı yaratan, kesitteki milimetre ve raporda duran rakamdır. Bu yüzden ürettiğimiz her şeyi ölçer, ölçtüğümüzü belgeleriz.",
      "İhracatı sonradan eklenen bir departman olarak değil, işin kurulduğu eksen olarak ele aldık. Teslim şekli, ödeme koşulu, paketleme ve gümrük evrakı ilk günden itibaren aynı masada çözülüyor.",
      "Kapı donanımıyla başladık, tavan sistemleriyle devam ettik. Aynı mühendislik disiplinini bir mekânın hem kapısına hem tavanına taşımak, tek tedarikçiyle çalışmak isteyen projeler için fark yaratıyor.",
    ],
    ctaTitle: { pre: "Birlikte çalışmayı", em: "konuşalım.", post: "" },
    ctaBody: "Distribütörlük, proje tedariki veya özel üretim — hangi başlıkta olursa olsun aynı masadan yanıt alırsınız.",
    ctaContact: "İletişime geç",
    ctaExport: "İhracat operasyonu",
  },
  koleksiyonPage: {
    kicker: "Koleksiyon",
    title: { pre: "Bir mekânın", em: "tek", post: "yüzey dili." },
    subtitle:
      "Kapı kolundan tavan paneline kadar aynı kaplama ailesi. Bir yüzey seçin, o kaplamayla üretilen tüm ürünleri görün.",
    finishesLabel: "Kaplamayı seçin",
    productsLabel: "Bu kaplamayla üretilenler",
    countSuffix: "ürün",
    swatchTitle: { pre: "Kaplama kartelasını", em: "elinizde", post: "görün." },
    swatchBody: "Ekranda renk yanıltır. Kartela talebinizi iletin, numune setini kargoyla gönderelim.",
    swatchCta: "Kartela iste",
    catalogCta: "Tüm kataloğu gör",
    finishes: {
      brass: { name: "Fırçalı Pirinç", note: "Sıcak metal tonu; otel ve konut projelerinde tercih edilir." },
      nickel: { name: "Mat Nikel", note: "En yaygın seçim; parmak izi göstermez." },
      black: { name: "Mat Siyah", note: "Koyu donanım; çelik kapı ve koyu doğramayla eşleşir." },
      satin: { name: "Saten Paslanmaz", note: "Nötr metal; yoğun kullanımda çizik gizler." },
      panel: { name: "Kemik Beyaz", note: "Tavan panelleri ve alçı yüzeylerle sürekli devam eder." },
      wood: { name: "Ahşap Tonu", note: "Kartonpiyer ve dekoratif profillerde sıcak geçiş." },
    },
  },
  exportPage: {
    kicker: "İhracat",
    title: { pre: "Tezgâhtan", em: "limana", post: "kadar tek elden." },
    subtitle:
      "Gümrük dokümantasyonu, etiketleme ve paletleme dahil anahtar teslim ihracat operasyonu. Teslim şeklini ve ödeme koşulunu birlikte belirliyoruz.",
    regionsTitle: "Sevk ettiğimiz bölgeler",
    packagingTitle: "Paketleme zinciri",
    packaging: [
      { title: "Birim kutu", desc: "Ürün, anahtar ve montaj vidası bir arada; kutu üzerinde barkod ve SKU etiketi." },
      { title: "Koli", desc: "Nem bariyerli oluklu mukavva; koli içi adet ve brüt ağırlık dış yüzeyde yazılı." },
      { title: "Palet", desc: "ISPM 15 damgalı ahşap palet, streç ve köşebent; 1200 × 800 mm standart ölçü." },
      { title: "Konteyner", desc: "Ağırlık dağılımı dengelenir, yük kayışla sabitlenir; mühür numarası dosyaya işlenir." },
    ],
    incotermsTitle: "Çalıştığımız teslim şekilleri",
    incotermsNote: "Incoterms® 2020. Hangisinin size uygun olduğundan emin değilseniz Bilgi Merkezi'ndeki karşılaştırmaya bakabilirsiniz.",
    paymentTitle: "Ödeme koşulları",
    ctaTitle: { pre: "Teslim şeklinizi", em: "birlikte", post: "belirleyelim." },
    ctaBody: "SKU listenizi ve varış limanınızı paylaşın; proformayı teslim şekli ve ödeme koşuluyla birlikte çıkaralım.",
    ctaQuote: "Teklif iste",
    ctaDistributor: "Distribütör başvurusu",
  },
  certificatesPage: {
    kicker: "Sertifika & standart",
    title: { pre: "Belge,", em: "iddianın", post: "kanıtıdır." },
    subtitle:
      "Ürünlerimiz bağımsız laboratuvar testlerinden geçer. Aşağıdaki belgelerin güncel kopyalarını ihracat ekibimizden isteyebilirsiniz.",
    columns: { standard: "STANDART", issuer: "VEREN KURULUŞ", documentNo: "BELGE NO", valid: "GEÇERLİLİK" },
    requestCta: "Belgeyi iste",
    requestNote: "Belge numarası ve geçerlilik bilgisi talep üzerine güncel kopyayla paylaşılır.",
    groups: { system: "Sistem & Kurumsal", hardware: "Kilit & Donanım", ceiling: "Tavan Sistemleri" },
    items: {
      iso9001: { title: "Kalite Yönetim Sistemi", desc: "Tasarım, üretim ve satış süreçlerini kapsayan kalite yönetim sistemi belgesi." },
      tse: { title: "Türk Standardına Uygunluk", desc: "Yurt içi satış ve kamu ihalelerinde talep edilen TSE uygunluk belgesi." },
      ce: { title: "Performans Beyanı (DoP)", desc: "Yapı Malzemeleri Yönetmeliği kapsamındaki ürünler için kalem bazlı performans beyanı." },
    },
    explainer: {
      title: { pre: "CE bir logo değil,", em: "bir beyandır.", post: "" },
      body: "CE işareti üreticinin ilgili yönetmeliğe uygunluk beyanıdır; tek başına bir kalite ödülü değildir. Anlamlı olan, beyanın dayandığı harmonize standart ve test raporudur. Bu yüzden belge isterken yalnız işareti değil, arkasındaki performans beyanını ve raporu isteyin.",
    },
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
    hakkimizda: {
      title: "Hakkımızda — CLAVISCOR",
      description:
        "2019'da kurulan Claviscor, kapı güvenlik donanımı ve tavan sistemlerini 40+ ülkeye ihraç ediyor. 6.400 m² kapalı alan, 50+ çalışan.",
    },
    ihracat: {
      title: "İhracat — CLAVISCOR",
      description:
        "Gümrük dokümantasyonu, etiketleme ve paletleme dahil anahtar teslim ihracat. Incoterms 2020 teslim şekilleri ve ödeme koşullarıyla Claviscor ihracat operasyonu.",
    },
    sertifikalar: {
      title: "Sertifikalar — CLAVISCOR",
      description:
        "Claviscor kalite ve uygunluk belgeleri: ISO 9001, TSE ve CE performans beyanı. Güncel kopyalar talep üzerine.",
    },
    iletisim: {
      title: "İletişim — CLAVISCOR",
      description:
        "Teklif, numune ve teknik sorularınız için Claviscor ihracat ekibi. Çerkezköy / Tekirdağ merkez, 48 saat içinde dönüş.",
    },
    koleksiyon: {
      title: "Koleksiyon — CLAVISCOR",
      description: "Fırçalı pirinç, mat nikel, mat siyah ve saten paslanmaz — Claviscor kaplama koleksiyonu. Kapı donanımından tavan paneline tek yüzey dili.",
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
