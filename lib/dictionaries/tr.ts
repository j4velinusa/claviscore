// Türkçe sözlük — sözlük şeklinin kaynağı. Diğer diller bu şekle uymalıdır.
// Vurgu başlıkları { pre, em, post } üçlüsüyle modellenir; `em` serif italik render edilir.

export const tr = {
  nav: {
    products: "Ürünler",
    collection: "Koleksiyon",
    publications: "Yayınlar",
    certificates: "Sertifikalar",
    export: "İhracat",
    blog: "Bilgi Merkezi",
    contact: "İletişim",
    quote: "Teklif Al",
    menu: "Menü",
  },
  hero: {
    kicker: "2019'dan beri üretiyor, 40'tan fazla ülkeye gönderiyoruz",
    title: { pre: "İyi bir kapı,", em: "yıllarca", post: "kendini hatırlatmaz." },
    subtitle:
      "Çelik kapı, iç mekân kapısı, kapı donanımı ve tavan sistemleri üretiyoruz. Modeli, ölçüyü ve yüzeyi projenize göre birlikte netleştiriyoruz.",
    ctaCatalog: "Kataloğu incele",
    ctaTeam: "Bize projenizi anlatın",
    imageCaption: "[ ÜRÜN GÖRSELİ ]",
  },
  stats: {
    countries: "ürün gönderdiğimiz ülke",
    sku: "üretimdeki model",
    certified: "ürün ve test belgeleri",
    founded: "yola çıktığımız yıl",
  },
  families: {
    kicker: "Kapı koleksiyonları",
    title: { pre: "Dış kapıdan", em: "iç mekâna,", post: "her proje için bir seri." },
    items: {
      steelDoor: { title: "Çelik Kapı", desc: "Apartman, villa ve müstakil ev girişleri için güçlü yüzey seçenekleri", count: "20 model" },
      flushEntrance: { title: "Hemyüz", desc: "Kanat ve dış pervazı aynı düzlemde buluşturan giriş sistemi", count: "13 model" },
      aluminumEntrance: { title: "Alüminyum Giriş", desc: "Modern profil yapısı, ahşap ve taş etkili yüzeylerle bir arada", count: "4 model + 2 mimari referans" },
      emergencyExit: { title: "Acil Çıkış", desc: "Panik barlı, hızlı tahliyeye uygun kapı çözümleri", count: "2 model" },
      premiumLacquer: { title: "Premium Lake", desc: "Derin profiller ve camlı seçeneklerle güçlü bir klasik yorum", count: "20 model" },
      deluxeLacquer: { title: "Deluxe Lake", desc: "Klasik panel çizgisini daha yalın bir görünümle buluşturur", count: "20 model" },
      classicLacquer: { title: "Classic Lake", desc: "Geometri ve sade yüzeylerle çağdaş iç mekânlara uyum sağlar", count: "20 model" },
      pvcSeries: { title: "PVC Serisi", desc: "Ev, ofis ve otel projeleri için zengin doku seçenekleri", count: "20 model" },
      melamineSeries: { title: "Melamin Serisi", desc: "Beyazdan doğal ahşap tonlarına uzanan yalın yüzeyler", count: "20 model" },
    },
  },
  doorCollections: {
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCatalog: "Kapı Koleksiyonları",
    collectionYear: "2026 koleksiyonu",
    modelLabel: "Modeller",
    referenceLabel: "Mimari referans",
    quoteTitle: "Aklınızdaki kapıyı birlikte netleştirelim.",
    quoteBody: "Beğendiğiniz model kodlarını, adedi ve kapı ölçülerini gönderin. Yüzey ve donanım seçenekleriyle size uygun bir teklif hazırlayalım.",
    quoteCta: "Projeyi konuşalım",
    categories: {
      steelDoor: {
        kicker: "Çelik Kapı Koleksiyonu",
        intro: "Bu seriyi apartman, villa ve müstakil ev girişleri için hazırladık. Her modeli farklı yüzey ve donanım seçenekleriyle üretebiliriz.",
        productLabel: "Çelik kapı modeli",
      },
      flushEntrance: {
        kicker: "Hemyüz Koleksiyonu",
        intro: "Kanadı ve dış pervazı aynı düzlemde buluşturan 13 giriş modeli. Yüzeyi, ölçüyü ve donanımı cephenin detaylarına göre birlikte belirliyoruz.",
        productLabel: "Hemyüz giriş kapısı",
      },
      aluminumEntrance: {
        kicker: "Alüminyum Giriş Sistemleri",
        intro: "Dört kodlu model ve malzeme yaklaşımını gösteren iki mimari referans. Profil, panel, cam ve kilit seçeneklerini açıklığa ve iklim koşullarına göre netleştiriyoruz.",
        productLabel: "Alüminyum giriş kapısı",
      },
      emergencyExit: {
        kicker: "Acil Çıkış Kapıları",
        intro: "Tahliye güzergâhları için panik barlı iki kapı modeli. Açılım yönünü, donanımı ve yangın performansını projenin belge kapsamıyla birlikte değerlendiriyoruz.",
        productLabel: "Acil çıkış kapısı",
      },
      premiumLacquer: {
        kicker: "Premium Lake Koleksiyonu",
        intro: "Derin profilleri, dengeli oranları ve camlı alternatifleri seven projeler için 20 model. Lake rengini RAL koduna, ölçüyü de mekâna göre birlikte belirliyoruz.",
        productLabel: "Premium lake kapı modeli",
      },
      deluxeLacquer: {
        kicker: "Deluxe Lake Koleksiyonu",
        intro: "Klasik panel çizgisini daha sade bir görünümle isteyen projeler için 20 model. Renk, cam ve donanım seçeneklerini projenin bütünüyle eşleştiriyoruz.",
        productLabel: "Deluxe lake kapı modeli",
      },
      classicLacquer: {
        kicker: "Classic Lake Koleksiyonu",
        intro: "Temiz çizgiler ve geometrik detaylarla çağdaş iç mekânlara uyum sağlayan 20 model. Her model RAL renkleri ve camlı alternatiflerle hazırlanabilir.",
        productLabel: "Classic lake kapı modeli",
      },
      pvcSeries: {
        kicker: "İç Mekân Kapı Koleksiyonu",
        intro: "İç mekânda sıcak bir ahşap görünümü isteyen projeler için 20 PVC kapı modeli. Renk, doku, cam ve ölçü seçeneklerini birlikte belirliyoruz.",
        productLabel: "PVC iç mekân kapısı",
      },
      melamineSeries: {
        kicker: "Melamin Kapı Koleksiyonu",
        intro: "Beyazdan doğal ahşap tonlarına uzanan 20 model; sade, dayanıklı ve kolay eşleşen bir iç mekân serisi. Doku ve ölçüyü fiziksel numuneyle netleştiriyoruz.",
        productLabel: "Melamin iç mekân kapısı",
      },
    },
  },
  ceiling: {
    kicker: "Tavan sistemleri",
    title: { pre: "Tavana karakteri,", em: "doğru sistem", post: "verir." },
    subtitle:
      "Kimi projede tesisata kolayca ulaşmak, kiminde sesi yumuşatmak, kiminde de tavana güçlü bir ritim vermek gerekir. Dokuz sistem ailesini, mekânın gerçekten neye ihtiyacı olduğuna göre seçiyoruz.",
    cardCta: "Sistemi incele",
    items: {
      layOn: { title: "Lay-On", desc: "Panele tek tek ulaşılan, servisi kolay görünür taşıyıcılı çözüm." },
      layIn: { title: "Lay-In", desc: "Taşıyıcıyı gölge çizgisine çeken daha derin, sakin bir yüzey." },
      clipIn: { title: "Clip-In", desc: "Taşıyıcısı geride kalan, kesintisiz ve temiz metal tavan." },
      openCell: { title: "Open Cell", desc: "Teknik hacmi kapatmadan ritim ve yön duygusu kurar." },
      mesh: { title: "Mesh", desc: "Işığı ve gölgeyi içeri alan 12 farklı genişletilmiş metal deseni." },
      hookOn: { title: "Hook-On", desc: "Koridor ve geniş açıklıklarda gizli taşıyıcılı panel düzeni." },
      baffleVectorial: { title: "Baffle & Vektörel", desc: "Dikey çizgiler, ahşap görünüm ve projeye özel RAL renkleri." },
      carrierSystems: { title: "T15 / T24", desc: "Standart ve kanallı görünür taşıyıcı seçenekleri." },
      acoustic: { title: "Akustik Tavanlar", desc: "Sesi yumuşatan dairesel adalar, paneller ve serbest biçimler." },
    },
  },
  ceilingCatalog: {
    breadcrumbHome: "Ana sayfa",
    breadcrumbCatalog: "Asma tavan sistemleri",
    kicker: "2026 asma tavan koleksiyonu",
    title: { pre: "Tavanı sadece kapatmayın;", em: "mekânın parçası", post: "yapın." },
    intro:
      "Görünür ya da gizli taşıyıcıdan akustik adalara kadar her sistem başka bir ihtiyeti çözüyor. Katalogdaki gerçek uygulama, sistem ve desen görsellerini bir araya getirdik; projenize uyan yönü birlikte seçebiliriz.",
    systemCount: "9 sistem ailesi · 47 gerçek katalog görseli",
    jumpLabel: "Sistemlere hızlı geçiş",
    galleryLabel: "Katalog görselleri",
    visualCount: "{count} görsel",
    quoteTitle: "Tavan planını birlikte netleştirelim.",
    quoteBody:
      "Mekânın ölçüsünü, teknik hacmini ve istediğiniz görünümü paylaşın. Taşıyıcıyı, paneli, rengi ve erişim detayını tek tek eşleştirip size uygulanabilir bir sistem önerelim.",
    quoteCta: "Projemi konuşalım",
    visualLabels: {
      application: "Uygulama görünümü",
      applicationTwo: "İkinci uygulama görünümü",
      systemDetail: "Sistem detayı",
      carrierDetail: "Taşıyıcı detayı",
      corridorApplication: "Koridor uygulaması",
      sectionDetail: "Kesit detayı",
      woodApplication: "Ahşap görünümlü uygulama",
      officeApplication: "Ofis uygulaması",
      woodProfileDetail: "Ahşap görünümlü profil detayı",
      vectorialDetail: "Vektörel sistem detayı",
      standardCarrier: "Standart taşıyıcı",
      groovedCarrier: "Kanallı taşıyıcı",
      circularIslands: "Dairesel akustik adalar",
      freeForms: "Serbest biçimler",
      panelApplication: "Akustik panel uygulaması",
      acousticBaffle: "Akustik baffle uygulaması",
      greenIslands: "Renkli akustik adalar",
      customGeometry: "Projeye özel geometri",
      turquoiseBaffle: "Renkli akustik baffle",
      aluminumPattern: "Alüminyum desen referansı",
      steelPattern: "Çelik desen referansı",
      stainlessPattern: "Paslanmaz desen referansı",
      patternReference: "Desen seçki referansı",
    },
    systems: {
      layOn: {
        title: "Lay-On",
        eyebrow: "01 / Metal panel",
        intro: "Paneller taşıyıcı ızgaraya üstten serbest oturur. Her modül bağımsız kaldırıldığı için tavandaki tesisata hızlıca ulaşılır.",
        features: ["T15 / T24 görünür taşıyıcı", "300×300–600×1200 mm modül", "Aletsiz ve bağımsız erişim"],
      },
      layIn: {
        title: "Lay-In",
        eyebrow: "02 / Metal panel",
        intro: "Sarkmalı panel kenarı taşıyıcıyı yüzeyden geriye çeker. Böylece düzenli grid korunurken daha derin ve sakin bir gölge çizgisi oluşur.",
        features: ["T15 / T24 yarı görünür taşıyıcı", "Gölgeli derz etkisi", "Aletsiz panel erişimi"],
      },
      clipIn: {
        title: "Clip-In",
        eyebrow: "03 / Gizli taşıyıcı",
        intro: "Paneller üçgen omega taşıyıcıya alttan kilitlenir. Taşıyıcı görünmez; tavan sade, yekpare ve kontrollü bir metal yüzey olarak okunur.",
        features: ["Üçgen omega gizli taşıyıcı", "300 mm ende 2400 mm'ye kadar", "Özel aparatla kontrollü söküm"],
      },
      openCell: {
        title: "Open Cell",
        eyebrow: "04 / Açık hücre",
        intro: "Hücreli alüminyum modüller teknik hacmi bütünüyle kapatmadan petek ritmi oluşturur; aydınlatma ve yönlendirme elemanları bu ritme kolayca katılır.",
        features: ["50–150 mm hücre ölçüsü", "0,4–0,8 mm alüminyum", "RAL 9006 / 9016"],
      },
      mesh: {
        title: "Mesh",
        eyebrow: "05 / Genişletilmiş metal",
        intro: "Genişletilmiş metal tavana derinlik ve teknik bir doku verir. Açıklık oranı sayesinde ışıkla ve gölgeyle birlikte değişen yarı geçirgen bir yüzey oluşur.",
        features: ["Alüminyum, DKP çelik, paslanmaz", "12 desen referansı", "RAL, doğal metal veya özel yüzey"],
      },
      hookOn: {
        title: "Hook-On",
        eyebrow: "06 / Gizli taşıyıcı",
        intro: "Gizli kancalı taşıyıcı, koridorlarda ve geniş panellerde sürekli bir tavan çizgisi kurar. Paneller ayrı ayrı aşağı alınabildiği için servis erişimi korunur.",
        features: ["300–600 mm en", "300–2400 mm boy", "TSE (EN 13964) · CE"],
      },
      baffleVectorial: {
        title: "Baffle & Vektörel",
        eyebrow: "07 / Doğrusal tavan",
        intro: "Dikey asılan baffle ve vektörel kanatlar, hacmi kapatmadan tavana güçlü bir yön verir. Ahşap görünüm, metal yüzey ve proje özel RAL renkleriyle ritim mekâna göre kurulabilir.",
        features: ["30–600 mm baffle yüksekliği", "100 / 150 / 200 mm vektörel kanat", "Ahşap görünüm ve tüm RAL renkleri"],
      },
      carrierSystems: {
        title: "T15 / T24",
        eyebrow: "08 / Taşıyıcı sistemler",
        intro: "T15 daha ince, T24 ise daha belirgin bir grid çizgisi kurar. Her iki taban genişliği standart ya da kanallı profillerle projenin yüzey diline uyarlanabilir.",
        features: ["T15 ve T24 görünür taban", "Standart ve kanallı seçenek", "3600 mm ana taşıyıcı"],
      },
      acoustic: {
        title: "Akustik Tavanlar",
        eyebrow: "09 / Akustik konfor",
        intro: "Dairesel adalar, paneller ve serbest biçimler yankıyı azaltırken tavana hafif bir katman ekler. Renk, geometri ve askı düzeni mekânın kullanımına göre seçilir.",
        features: ["1,00'a kadar ses yutma", "A2-s1,d0 yangına tepki", "RH %95 nem dayanımı"],
      },
    },
  },
  engineering: {
    kicker: "Nasıl üretiyoruz?",
    title: { pre: "İlk gün nasıl çalışıyorsa,", em: "yıllar sonra", post: "da öyle çalışmalı." },
    body: "Bu yüzden gövdeyi kendi tezgâhımızda işler, rulman ve yayları tek tek kontrol ederiz. Ürünleri sevk etmeden önce ölçü, kaplama ve dayanım testlerinden geçiririz.",
    stats: [
      { value: "%100", label: "yerli üretim" },
      { value: "14 gün", label: "ortalama numune süresi" },
      { value: "OEM", label: "markanıza özel üretim" },
    ],
    imageCaption: "[ KESİT GÖRSELİ — rulman & yay ]",
  },
  exportPanel: {
    kicker: "40'tan fazla ülkeye ihracat",
    title: { pre: "Ürünü üretmek kadar,", em: "sağlam", post: "ulaştırmak da önemli." },
    body: "Evrakı, etiketlemeyi ve paletlemeyi biz hazırlıyoruz. Siz hedef ülkeyi, teslim şeklini ve adedi söyleyin; süreci birlikte planlayalım.",
    ctaCatalog: "İhracat kataloğunu incele",
    ctaDistributor: "Distribütörlüğü konuşalım",
    regions: [
      { name: "Avrupa", codes: "DE · FR · NL · UK · PL" },
      { name: "Orta Doğu", codes: "SA · AE · QA · IQ · JO" },
      { name: "Afrika", codes: "EG · MA · DZ · NG · KE" },
      { name: "Asya & Pasifik", codes: "IN · ID · MY · AU · VN" },
      { name: "Amerika", codes: "US · MX · BR · CL · CA" },
    ],
  },
  certificates: {
    kicker: "Sözümüzü belgelerle destekliyoruz",
  },
  closing: {
    title: { pre: "Aklınızdaki projeyi", em: "konuşalım.", post: "" },
    body: "Birkaç model kodu, adet ve ölçü yeterli. Dört saat içinde sorularımız ve ilk teklif planıyla dönelim.",
    cta: "Projeyi konuşalım",
  },
  footer: {
    tagline:
      "Çelik kapıdan tavan sistemlerine kadar üretiyor, ölçülendiriyor ve 40'tan fazla ülkeye gönderiyoruz.",
    products: "Ürünler",
    corporate: "Kurumsal",
    contact: "İletişim",
    productLinks: ["Çelik Kapı", "PVC Serisi", "Tavan Sistemleri"],
    corporateLinks: ["Hakkımızda", "Üretim", "Sertifikalar", "İhracat", "İletişim"],
    rights: "CE · TSE · ISO 9001",
    // Yapımcı künyesi. Alan adı çevrilmez, SiteFooter'da link olarak eklenir.
    credit: "Tasarım ve kod:",
  },
  production: {
    kicker: "Üretim",
    title: { pre: "Kontrol edemediğimiz süreci", em: "satmayız.", post: "" },
    subtitle:
      "Menteşe gövdesinden tavan paneline kadar üretim kendi tesisimizde. Her adımda ölçülen bir değer, her partide kayda geçen bir sonuç var.",
    linesLabel: "ÜRETİM HATLARI",
    stepsLabel: "KAPI DONANIMI AKIŞI",
    qcLabel: "ÖLÇTÜĞÜMÜZ DEĞERLER",
    qcColumns: { name: "ÖLÇÜM", value: "DEĞER", method: "YÖNTEM" },
    planCaption: "6.400 m² · VAZİYET PLANI (ŞEMATİK)",
    lines: [
      {
        name: "Kapı Donanımı",
        desc: "Menteşe, kapı kolu, otel kilit sistemleri ve aksesuar.",
        caption: "CNC → ISIL İŞLEM → KAPLAMA → MONTAJ",
        machines: [
          { name: "CNC torna (çubuk beslemeli)", qty: "12", note: "Ø4–32 mm çubuk, tek operasyonda gövde" },
          { name: "CNC işleme merkezi", qty: "6", note: "Menteşe gövdesi, kol rozeti ve mil yuvası" },
          { name: "Isıl işlem fırını", qty: "2", note: "Menteşe mili ve yay çeliği" },
          { name: "Kaplama hattı (nikel / pirinç / siyah)", qty: "3", note: "XRF kontrollü kalınlık" },
          { name: "Montaj & kodlama masası", qty: "14", note: "Otel sistemi kart kodlaması dâhil" },
        ],
      },
      {
        name: "Tavan & Panel",
        desc: "Asma tavan modülleri, baffle profilleri ve alçı tavan plakaları.",
        caption: "T-PROFİL → PANEL → ARMATÜR MONTAJI",
        machines: [
          { name: "CNC panel freze (3 eksen)", qty: "3", note: "V kanal ve tahliye deliği" },
          { name: "Panel ebatlama testeresi", qty: "2", note: "Tam boy 6 m'ye kadar" },
        ],
      },
    ],
    steps: [
      { step: "01", title: "Hammadde kabulü", desc: "Pirinç çubuk, çinko alaşımı ve alüminyum profil partileri sertifikasıyla gelir; alaşım analizi ve sertlik ölçümü yapılmadan üretime girmez.", spec: "MALZEME SERTİFİKASI · SERTLİK HRB" },
      { step: "02", title: "CNC tornalama & işleme", desc: "Menteşe gövdesi, kol rozeti ve mil yuvası tek operasyonda işlenir. Takım aşınması vardiya içinde örneklenerek izlenir.", spec: "TOLERANS ± 0,05 mm" },
      { step: "03", title: "Isıl işlem", desc: "Sertleştirilmiş menteşe milleri ve yay çelikleri ısıl işlemden geçer; sertlik değeri parti bazında ölçülür.", spec: "MİL SERTLİĞİ ≥ 58 HRC" },
      { step: "04", title: "Kaplama", desc: "Nikel, pirinç ve siyah kaplama hatları. Kalınlık XRF ile ölçülür; renk kartelaya karşı ışık kabininde kontrol edilir.", spec: "KAPLAMA 8–12 µm" },
      { step: "05", title: "Montaj", desc: "Rulman, yay ve rozet setleri montaj planına göre dizilir; otel sistemlerinde kart kodlaması montaj hattında yapılır.", spec: "MONTAJ TORKU KAYIT ALTINDA" },
      { step: "06", title: "İşlev testi & paketleme", desc: "Her ürün hareketli parçalarıyla çalıştırılır; kutu içi vida seti ve aksesuar barkodla teyit edilir.", spec: "%100 İŞLEV TESTİ" },
    ],
    qc: [
      { name: "Kol tork dayanımı", value: "≥ 120 Nm", method: "EN 1906 referanslı tork tezgâhı" },
      { name: "Tuz püskürtme (korozyon)", value: "240 saat", method: "ISO 9227 NSS · kabin testi" },
      { name: "Kol çevrim ömrü", value: "200.000 çevrim", method: "EN 1906 referanslı çevrim tezgâhı" },
      { name: "Menteşe yük & çevrim", value: "80 kg / 200.000", method: "EN 1935 referanslı yük çerçevesi" },
      { name: "Kaplama kalınlığı", value: "8–12 µm", method: "XRF ölçüm, 5 nokta" },
      { name: "Kritik ölçüler", value: "± 0,05 mm", method: "Kumpas / komparatör, vardiya örneklemesi" },
    ],
    timelineLabel: "SİPARİŞ → TESLİM",
    timeline: [
      { days: "GÜN 0–2", title: "Sipariş teyidi", desc: "Proforma onayı, ödeme koşulu ve üretim slotu." },
      { days: "GÜN 3–18", title: "Üretim", desc: "İşleme, ısıl işlem, kaplama ve montaj." },
      { days: "GÜN 19–21", title: "Kalite & paketleme", desc: "Çıkış kontrolü, paletleme, etiketleme." },
      { days: "GÜN 22–24", title: "Gümrük & yükleme", desc: "Evrak, gümrükleme, konteyner yükleme." },
      { days: "GÜN 25–34", title: "Transit & teslim", desc: "Deniz transiti ve varış limanı teslimi." },
    ],
  },
  // El çizimi SVG'lerin içindeki etiketler. Çizimin kendisi dilden bağımsız,
  // üzerindeki yazı değil — bu yüzden metinler burada duruyor.
  // Kaynak: design/İhracat.dc.html, design/Üretim.dc.html, design/Koleksiyon.dc.html
  illustrations: {
    tolerance: "± 0,05 mm",
    torque: "≥ 25 Nm",
    saltSpray: "240 h tuz testi",
    doorLayers: "SAC · PU · SAC",
    robotWeld: "ROBOT KAYNAK",
    powderCoat: "60–80 µm",
    vGroove: "V KANAL · 90°",
    bracketClip: "KONSOL + KLİPS",
    foamLayer: "KÖPÜK ARA KATMAN",
    tProfile: "T-PROFİL",
    ledRun: "LİNEER LED HATTI",
    plan: {
      cnc: "CNC",
      press: "PRES / KAYNAK",
      coating: "KAPLAMA",
      assembly: "MONTAJ",
      lab: "LAB / OQC",
      dock: "RAMPA",
    },
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
    transportCaption: "PALETLEME → KONTEYNER → LİMAN",
    packaging: [
      { title: "Birim kutu", desc: "Ürün, montaj vidası ve aksesuarı bir arada; kutu üzerinde barkod ve SKU etiketi." },
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
  yayinlar: {
    kicker: "Yayınlar",
    title: { pre: "Katalog, dergi ve", em: "basılı", post: "her şey." },
    subtitle:
      "Ürün katalogları ve proje seçkileri. Ekranda okuyun, PDF indirin ya da basılı nüsha isteyin.",
    groups: {
      all: "Tümü",
      katalog: "Katalog",
      dergi: "Dergi",
      secki: "Proje seçkisi",
      teknik: "Teknik doküman",
    },
    countSuffix: "yayın",
    empty: "Bu kategoride yayın yok.",
    readCta: "Ekranda oku",
    downloadCta: "PDF indir",
    // Yayının PDF'i panele henüz yüklenmemişken indirme yerine bu görünür.
    soonLabel: "Yakında",
    featuredKicker: "ÖNE ÇIKAN",
    metaPages: "SAYFA",
    metaFormat: "ÖLÇÜ",
    metaLangs: "DİL",
    viewer: {
      back: "Tüm yayınlar",
      openNewTab: "Yeni sekmede aç",
      download: "PDF indir",
      // Tarayıcı gömülü PDF görüntüleyici sunmuyorsa (çoğu mobil tarayıcı)
      // çerçeve boş kalır; bu metin altında her zaman duruyor.
      fallback: "PDF görüntüleyici açılmadıysa yukarıdaki düğmelerden açabilir ya da indirebilirsiniz.",
      missing: "Bu yayının PDF'i henüz yüklenmedi.",
    },
    print: {
      kicker: "BASILI NÜSHA",
      title: "Ofisinize kargolayalım.",
      body: "Kataloğumuzu basılı olarak da gönderiyoruz. Mimarlık ofisleri ve distribütörler için kaplama kartelasıyla birlikte.",
      cta: "Nüsha isteyin",
      secondaryCta: "Numune süreci",
      notes: [
        { k: "01", d: "Firma adı, teslimat adresi ve kaç nüsha istediğinizi yazın." },
        { k: "02", d: "Yurt içi gönderim bize ait; yurt dışında kargo kendi hesabınızdan." },
        { k: "03", d: "Basılı nüsha bittiğinde PDF sürümü aynı gün e-postayla gider." },
      ],
    },
  },
  certificatesPage: {
    kicker: "Sertifika & standart",
    title: { pre: "Belge,", em: "iddianın", post: "kanıtıdır." },
    subtitle:
      "Ürünlerimiz bağımsız laboratuvar testlerinden geçer. Aşağıdaki belgelerin güncel kopyalarını ihracat ekibimizden isteyebilirsiniz.",
    columns: { standard: "STANDART", issuer: "VEREN KURULUŞ", documentNo: "BELGE NO", valid: "GEÇERLİLİK" },
    requestCta: "Belgeyi iste",
    requestNote: "Belge numarası ve geçerlilik bilgisi talep üzerine güncel kopyayla paylaşılır.",
    groups: { system: "Sistem & Kurumsal", hardware: "Kapı Donanımı", ceiling: "Tavan Sistemleri" },
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
      "Teklif, numune ve teknik sorular için tek hat. Mesajınızı konu başlığıyla gönderin, ihracat ekibimiz 4 saat içinde dönsün.",
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
      accessory: "Aksesuar & Yedek",
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
      promise: "4 saat",
      promiseWhat: "içinde dönüş",
      promiseDesc: "Teklif ve numune taleplerine mesai saatlerinde dört saat içinde fiyat ve planla yanıt veriyoruz.",
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
    kicker: "2026 koleksiyonu",
    title: { pre: "Ürün", em: "kataloğu", post: "" },
    intro: "Tüm aileler, tek bir donanım dili.",
    // {count} ve {total} yer tutucu; {count} vurgulu render edilir. Dile göre
    // kelime sırası değiştiği için şablon olarak tutuluyor, parça parça değil.
    showing: "{count} / {total} ürün gösteriliyor.",
    filterLabel: "Kategoriye göre filtrele",
    finishesLabel: "Kaplama seçenekleri",
    ceilingSystemLabel: "ASMA TAVAN SİSTEMİ",
    empty: "Bu kategoride gösterilecek ürün yok.",
    categories: {
      all: "Tümü",
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
      "HNG-310": { name: "Rulmanlı Menteşe", desc: "2BB paslanmaz, ağır kapı taşıma", spec: "100–120 mm" },
      "HNG-320": { name: "Gizli Menteşe", desc: "Ayarlanabilir 3D, görünmez montaj", spec: "Ø14 mm" },
      "HDL-410": { name: "Aynalı Kol Takımı", desc: "Rozetli set — WC, anahtarlı, dilsiz", spec: "Set" },
      "HTL-510": { name: "RFID Otel Kilidi", desc: "Mifare kart, yönetim yazılımı dahil", spec: "Sistem" },
      "ACC-610": { name: "Manyetik Kapı Stoperi", desc: "Zemin & duvar tipi, paslanmaz", spec: "Adet" },
      "LAY-ON": { name: "Lay-On", desc: "Bağımsız panel, görünür taşıyıcı ve aletsiz servis erişimi", spec: "T15 / T24" },
      "LAY-IN": { name: "Lay-In", desc: "Yarı görünür taşıyıcıyla daha derin bir gölge çizgisi", spec: "Metal panel" },
      "CLIP-IN": { name: "Clip-In", desc: "Taşıyıcısı görünmeyen temiz ve yekpare metal yüzey", spec: "Gizli taşıyıcı" },
      "OPEN-CELL": { name: "Open Cell", desc: "Teknik hacmi kapatmadan ritim kuran açık hücre sistemi", spec: "50–150 mm" },
      "MESH": { name: "Mesh", desc: "Işık ve gölgeyle değişen genişletilmiş metal tavan", spec: "12 desen" },
      "HOOK-ON": { name: "Hook-On", desc: "Koridor ve geniş paneller için gizli kancalı taşıyıcı", spec: "300–2400 mm" },
      "BAFFLE-VEKTOREL": { name: "Baffle & Vektörel", desc: "Ahşap görünüm ve RAL renkleriyle doğrusal tavan ritmi", spec: "30–600 mm" },
      "T15-T24": { name: "T15 / T24", desc: "Standart ve kanallı görünür taşıyıcı seçenekleri", spec: "Taşıyıcı" },
      "AKUSTIK-TAVAN": { name: "Akustik Tavanlar", desc: "Yankıyı azaltan adalar, paneller ve serbest biçimler", spec: "αw ≤ 1,00" },
    },
  },
  comingSoon: {
    katalog: {
      kicker: "Katalog",
      title: "Katalog çok",
      accent: "yakında.",
      description:
        "Dijital katalogumuz üzerinde çalışıyoruz. O zamana dek güncel ürün kataloğunu ve fiyat listesini e-posta ile talep edebilirsiniz — 4 saat içinde dönüş yapıyoruz.",
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
      title: "CLAVISCOR — Çelik Kapı, İç Mekân Kapısı & Tavan Sistemleri",
      description:
        "Çelik kapı, PVC iç mekân kapısı, kapı donanımı ve tavan sistemleri. Projeye özel ölçü, yüzey ve üretim; 40'tan fazla ülkeye ihracat.",
    },
    katalog: {
      title: "Ürün Kataloğu — CLAVISCOR",
      description:
        "Menteşe, kapı kolu, otel kilit sistemleri, aksesuar ve tavan çözümleriyle Claviscor ürün kataloğu. Numune ve teklif için ihracat ekibimize yazın.",
    },
    ceilingCatalog: {
      title: "Asma Tavan Sistemleri — CLAVISCOR",
      description:
        "Lay-On, Lay-In, Clip-In, Open Cell, Mesh, Hook-On, Baffle, T15/T24 ve akustik tavan sistemlerini gerçek uygulama ve detay görselleriyle inceleyin.",
    },
    doorCollections: {
      steelDoor: {
        title: "Çelik Kapı Koleksiyonu — CLAVISCOR",
        description: "Claviscor 2026 çelik kapı koleksiyonundaki 20 mimari giriş kapısı modelini inceleyin.",
      },
      flushEntrance: {
        title: "Hemyüz Giriş Kapıları — CLAVISCOR",
        description: "Claviscor 2026 koleksiyonundaki duvarla bütünleşen 13 Hemyüz giriş kapısı modelini inceleyin.",
      },
      aluminumEntrance: {
        title: "Alüminyum Giriş Kapıları — CLAVISCOR",
        description: "Claviscor 2026 koleksiyonundaki 4 alüminyum giriş kapısı modelini ve 2 mimari referansı inceleyin.",
      },
      emergencyExit: {
        title: "Acil Çıkış Kapıları — CLAVISCOR",
        description: "Claviscor panik barlı Y-003 ve Y-011 acil çıkış kapısı modellerini inceleyin.",
      },
      premiumLacquer: {
        title: "Premium Lake Kapılar — CLAVISCOR",
        description: "Claviscor 2026 iç mekân koleksiyonundaki 20 Premium Lake kapı modelini ve camlı alternatifleri inceleyin.",
      },
      deluxeLacquer: {
        title: "Deluxe Lake Kapılar — CLAVISCOR",
        description: "Claviscor 2026 iç mekân koleksiyonundaki 20 Deluxe Lake kapı modelini ve renk seçeneklerini inceleyin.",
      },
      classicLacquer: {
        title: "Classic Lake Kapılar — CLAVISCOR",
        description: "Claviscor 2026 iç mekân koleksiyonundaki 20 çağdaş Classic Lake kapı modelini inceleyin.",
      },
      pvcSeries: {
        title: "PVC İç Mekân Kapıları — CLAVISCOR",
        description: "Claviscor 2026 iç mekân koleksiyonundaki 20 PVC kapı modelini ve yüzey seçeneğini inceleyin.",
      },
      melamineSeries: {
        title: "Melamin İç Mekân Kapıları — CLAVISCOR",
        description: "Claviscor 2026 iç mekân koleksiyonundaki 20 melamin kapı modelini ve ahşap doku seçeneklerini inceleyin.",
      },
    },
    blog: {
      title: "Bilgi Merkezi — CLAVISCOR",
      description:
        "Kapı donanımı ve tavan sistemlerinde teknik notlar, standart okumaları ve ihracat pratiği. Satın alma ve proje ekipleri için Claviscor Bilgi Merkezi.",
    },
    uretim: {
      title: "Üretim — CLAVISCOR",
      description:
        "Kapı donanımı ve tavan sistemlerinde kendi tesisimizde üretim. CNC işleme, ısıl işlem, kaplama hatları ve parti bazında ölçüm.",
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
        "Teklif, numune ve teknik sorularınız için Claviscor ihracat ekibi. Çerkezköy / Tekirdağ merkez, 4 saat içinde dönüş.",
    },
    yayinlar: {
      title: "Yayınlar — CLAVISCOR",
      description:
        "Claviscor ürün katalogları ve proje seçkileri. Ekranda okuyun, PDF indirin ya da basılı nüsha isteyin.",
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
