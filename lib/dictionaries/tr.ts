// Türkçe sözlük — sözlük şeklinin kaynağı. Diğer diller bu şekle uymalıdır.
// Vurgu başlıkları { pre, em, post } üçlüsüyle modellenir; `em` serif italik render edilir.

export const tr = {
  nav: {
    products: "Ürünler",
    collection: "Koleksiyon",
    certificates: "Sertifikalar",
    export: "İhracat",
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
      "Kapı güvenlik donanımı ve tavan sistemleri üreticisi. 1976'dan beri tasarlıyor, işliyor ve dünyaya ihraç ediyoruz.",
    products: "Ürünler",
    corporate: "Kurumsal",
    contact: "İletişim",
    productLinks: ["Silindir Bareller", "Asma Kilitler", "Menteşeler", "Kapı Kolları", "Otel Sistemleri", "Tavan Sistemleri"],
    corporateLinks: ["Hakkımızda", "Üretim", "Sertifikalar", "İhracat", "İletişim"],
    rights: "CE · TSE · ISO 9001",
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
      title: "Katalog — CLAVISCOR",
      description: "Claviscor ürün kataloğu çok yakında. O zamana dek e-posta ile talep edebilirsiniz.",
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
  },
};

// tr kanonik şekildir; string'ler bilinçli olarak genişletilir (literal değil) ki
// İngilizce sözlük aynı yapıya farklı metinlerle uyabilsin.
export type Dictionary = typeof tr;
