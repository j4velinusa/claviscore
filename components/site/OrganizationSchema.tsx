import { site } from "@/lib/site";
import { siteUrl } from "@/lib/site-url";

// schema.org Organization — Google'ın marka aramasında bilgi panelini kurabilmesi için.
// Yalnız doğrulanmış veri: uydurma kuruluş bilgisi buraya girmez.
// Vergi no / IBAN gibi alanlar kasıtlı yok; yapısal veri halka açık bilgidir.
export function OrganizationSchema() {
  const base = siteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: base,
    logo: new URL("/icon.svg", base).toString(),
    foundingDate: String(site.founded),
    email: site.email,
    telephone: site.phone.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Akbaba Sk. No: 6/C, Gazi Osmanpaşa",
      addressLocality: "Çerkezköy",
      addressRegion: "Tekirdağ",
      addressCountry: "TR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      telephone: site.phone.replace(/\s/g, ""),
      availableLanguage: ["tr", "en"],
    },
  };

  return (
    <script
      type="application/ld+json"
      // Veri tamamen kendi sabitlerimizden geliyor, kullanıcı girdisi yok.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
