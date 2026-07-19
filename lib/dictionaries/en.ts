import type { Dictionary } from "./tr";

// İngilizce sözlük — tr.ts ile aynı yapı, farklı metinler. Tip zorlaması: eksik/fazla anahtar hata verir.
export const en: Dictionary = {
  nav: {
    products: "Products",
    collection: "Collection",
    certificates: "Certificates",
    export: "Export",
    contact: "Contact",
    quote: "Get a Quote",
    menu: "Menu",
  },
  hero: {
    kicker: "Door hardware & ceiling systems · 40+ countries",
    title: { pre: "The", em: "flawless", post: "language of the mechanism." },
    subtitle:
      "From door security hardware to ceiling systems — cylinders, hinges, handles and suspended/plaster ceiling solutions. Millimetric tolerance, certified durability.",
    ctaCatalog: "Download catalog",
    ctaTeam: "Talk to the export team",
    imageCaption: "[ PRODUCT IMAGE — cylinder barrel ]",
    specLines: ["Ø17 mm", "brass body", "5 pins · 15 combinations"],
  },
  stats: {
    countries: "countries served",
    sku: "active SKUs",
    certified: "certified production",
    founded: "founded",
  },
  families: {
    kicker: "Product families",
    title: { pre: "One language,", em: "six", post: "families." },
    items: {
      cylinder: { title: "Cylinder Barrels", desc: "Single/double, anti-snap, master key systems" },
      padlock: { title: "Padlocks", desc: "Brass & laminated body, 20–80 mm" },
      hinge: { title: "Hinges", desc: "Ball-bearing, concealed & adjustable types" },
      handle: { title: "Door Handles", desc: "Rose & backplate, matte/polished finish" },
      hotel: { title: "Hotel Lock Systems", desc: "RFID & keypad, management software included" },
    },
    accent: {
      title: "Accessories & Spares",
      desc: "Key blanks, door stops, mounting kits",
      cta: "See the whole family",
    },
  },
  ceiling: {
    kicker: "Ceiling systems",
    title: { pre: "From door to", em: "ceiling.", post: "" },
    subtitle:
      "The same engineering discipline, now overhead — suspended ceilings, lighting and plaster ceiling systems to outfit the space end to end.",
    items: {
      suspended: { title: "Suspended Ceiling", desc: "Load-bearing T-profile, mineral & metal panels" },
      lighting: { title: "Ceiling Lighting", desc: "Recessed spots, linear LED and luminaire systems" },
      gypsum: { title: "Plaster Ceiling", desc: "Drywall cornices, decorative steps and borders" },
    },
  },
  engineering: {
    kicker: "Engineering",
    title: { pre: "Trust begins within the", em: "millimeter.", post: "" },
    body: "Every barrel is machined on our own lathes; every pin, every spring to the same tolerance discipline. From salt-spray testing to cycle life, it passes through the lab.",
    stats: [
      { value: "100%", label: "domestic production" },
      { value: "14 days", label: "sample delivery" },
      { value: "OEM", label: "custom manufacturing" },
    ],
    imageCaption: "[ SECTION VIEW — pin & spring ]",
    specLines: ["tol. ±0.02 mm", "nickel plating", "200,000 cycles"],
  },
  exportPanel: {
    kicker: "Export",
    title: { pre: "Doors opening on six", em: "continents.", post: "" },
    body: "Customs documentation, labeling and palletizing included — a turnkey export operation. Distributor and project-based pricing.",
    ctaCatalog: "Export catalog (PDF)",
    ctaDistributor: "Become a distributor",
    regions: [
      { name: "Europe", codes: "DE · FR · NL · UK · PL" },
      { name: "Middle East", codes: "SA · AE · QA · IQ · JO" },
      { name: "Africa", codes: "EG · MA · DZ · NG · KE" },
      { name: "Asia & Pacific", codes: "IN · ID · MY · AU · VN" },
      { name: "Americas", codes: "US · MX · BR · CL · CA" },
    ],
  },
  certificates: {
    kicker: "Certification & standards",
  },
  closing: {
    title: { pre: "Get your sample and price", em: "quote.", post: "" },
    body: "Share your SKU list and we'll come back within 48 hours with pricing and a sampling plan.",
    cta: "Request a quote",
  },
  footer: {
    tagline:
      "Manufacturer of door security hardware and ceiling systems. Designing, machining and exporting worldwide since 1976.",
    products: "Products",
    corporate: "Company",
    contact: "Contact",
    productLinks: ["Cylinder Barrels", "Padlocks", "Hinges", "Door Handles", "Hotel Systems", "Ceiling Systems"],
    corporateLinks: ["About", "Manufacturing", "Certificates", "Export", "Contact"],
    rights: "CE · TSE · ISO 9001",
  },
  comingSoon: {
    katalog: {
      kicker: "Catalog",
      title: "Catalog coming",
      accent: "soon.",
      description:
        "We're building our digital catalog. Until then, you can request the current product catalog and price list by email — we reply within 48 hours.",
    },
    koleksiyon: {
      kicker: "Collection",
      title: "Collection coming",
      accent: "soon.",
      description:
        "We're building the page that showcases our finish and series collections. For samples and swatch requests, write to our export team.",
    },
    ctaEmail: "Request by email",
    back: "Back to home",
  },
  meta: {
    home: {
      title: "CLAVISCOR — Door Hardware & Ceiling Systems",
      description:
        "From door security hardware to ceiling systems — cylinders, hinges, handles and suspended/plaster ceiling solutions. Millimetric tolerance, certified durability, exporting to 40+ countries.",
    },
    katalog: {
      title: "Catalog — CLAVISCOR",
      description: "The Claviscor product catalog is coming soon. Until then you can request it by email.",
    },
    koleksiyon: {
      title: "Collection — CLAVISCOR",
      description: "Claviscor finish and series collections are coming soon.",
    },
  },
  mailSubject: {
    quote: "Quote Request",
    distributor: "Distributor Application",
    catalog: "Catalog Request",
    sample: "Sample / Swatch Request",
  },
};
