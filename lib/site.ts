// Dilden bağımsız marka/iletişim bilgisi. Çevrilebilir metinler için bkz. lib/dictionaries/*.
export const site = {
  name: "CLAVISCOR",
  // Belge/proforma biçimi (düz yazım).
  legalName: "Claviscor Ltd. Şti.",
  // Footer için hazır versal biçim. toLocaleUpperCase("tr-TR") KULLANMA: Türkçe kuralı
  // markadaki i'yi İ'ye çevirip "CLAVİSCOR" üretiyor. Marka adı locale casing'ine sokulamaz.
  legalNameUpper: "CLAVISCOR LTD. ŞTİ.",
  email: "export@claviscor.com",
  // Uluslararası biçim: ihracat sitesi, yabancı alıcı ülke kodu olmadan arayamaz.
  // SiteFooter tel: linkini bu değerden boşlukları silerek üretir.
  phone: "+90 544 768 59 74",
  addressShort: "Çerkezköy · Tekirdağ",
  addressFull: "Akbaba Sk. No: 6/C, Gazi Osmanpaşa, Çerkezköy / Tekirdağ",
  founded: 2019,
} as const;
