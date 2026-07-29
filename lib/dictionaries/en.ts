import type { Dictionary } from "./tr";

// İngilizce sözlük — tr.ts ile aynı yapı, farklı metinler. Tip zorlaması: eksik/fazla anahtar hata verir.
export const en: Dictionary = {
  nav: {
    products: "Products",
    collection: "Collection",
    certificates: "Certificates",
    export: "Export",
    blog: "Knowledge Center",
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
      "Manufacturer of door security hardware and ceiling systems. Designing, machining and exporting worldwide since 2019.",
    products: "Products",
    corporate: "Company",
    contact: "Contact",
    productLinks: ["Cylinder Barrels", "Padlocks", "Hinges", "Door Handles", "Hotel Systems", "Ceiling Systems"],
    corporateLinks: ["About", "Manufacturing", "Certificates", "Export", "Contact"],
    rights: "CE · TSE · ISO 9001",
  },
  exportPage: {
    kicker: "Export",
    title: { pre: "From the lathe to the", em: "port", post: "— one operation." },
    subtitle:
      "A turnkey export operation including customs documentation, labeling and palletizing. We set the delivery term and payment condition together.",
    regionsTitle: "Regions we ship to",
    packagingTitle: "Packaging chain",
    packaging: [
      { title: "Unit box", desc: "Product, keys and mounting screws together; barcode and SKU label on the box." },
      { title: "Carton", desc: "Moisture-barrier corrugated board; unit count and gross weight printed on the outside." },
      { title: "Pallet", desc: "ISPM 15 stamped wooden pallet, stretch wrap and edge guards; 1200 × 800 mm standard." },
      { title: "Container", desc: "Weight distribution balanced, load strapped; seal number recorded in the file." },
    ],
    incotermsTitle: "Delivery terms we work with",
    incotermsNote: "Incoterms® 2020. If you are unsure which one suits you, see the comparison in the Knowledge Center.",
    paymentTitle: "Payment terms",
    ctaTitle: { pre: "Let's set your delivery term", em: "together.", post: "" },
    ctaBody: "Share your SKU list and port of discharge; we will issue the proforma with the delivery term and payment condition.",
    ctaQuote: "Request a quote",
    ctaDistributor: "Become a distributor",
  },
  certificatesPage: {
    kicker: "Certification & standards",
    title: { pre: "A certificate is the", em: "proof", post: "behind the claim." },
    subtitle:
      "Our products pass independent laboratory testing. You can request current copies of the documents below from our export team.",
    columns: { standard: "STANDARD", issuer: "ISSUING BODY", documentNo: "DOCUMENT NO", valid: "VALID UNTIL" },
    requestCta: "Request document",
    requestNote: "Document numbers and validity are shared on request together with the current copy.",
    groups: { system: "System & Corporate", hardware: "Locks & Hardware", ceiling: "Ceiling Systems" },
    items: {
      iso9001: { title: "Quality Management System", desc: "Quality management system certificate covering design, production and sales processes." },
      tse: { title: "Turkish Standard Conformity", desc: "TSE conformity certificate required for domestic sales and public tenders." },
      ce: { title: "Declaration of Performance (DoP)", desc: "Item-level declaration of performance for products under the Construction Products Regulation." },
    },
    explainer: {
      title: { pre: "CE is not a logo,", em: "it is a declaration.", post: "" },
      body: "The CE mark is the manufacturer's declaration of conformity with the relevant regulation; on its own it is not a quality award. What matters is the harmonised standard and test report the declaration rests on. So when you ask for documents, ask not for the mark but for the declaration of performance and the report behind it.",
    },
  },
  contact: {
    kicker: "Contact",
    title: { pre: "Reach the right desk in", em: "one", post: "message." },
    subtitle:
      "One line for quotes, samples and technical questions. Send your message with a subject and our export team will reply within 48 hours.",
    form: {
      title: "Leave a message",
      topic: "TOPIC",
      company: "Company",
      name: "Contact person",
      email: "Email",
      country: "Country / city",
      lines: "Product line",
      message: "Message",
      submit: "Send by email",
      hint: "Fill in company, email and message.",
      ready: "Your email app will open with the message ready.",
      kvkk: "GDPR · YOUR DATA IS USED ONLY FOR THE QUOTE PROCESS",
    },
    topics: {
      quote: { label: "Price quote", tag: "QUOTE", hint: "Write product codes, quantities and your target delivery term (FOB / CIF / DAP)." },
      sample: { label: "Sample", tag: "SAMPLE", hint: "Write the SKUs and finishes you want; add your courier account if you have one." },
      tech: { label: "Technical", tag: "TECHNICAL", hint: "Write your question on dimensions, standards or installation." },
      partner: { label: "Distribution", tag: "DISTRIBUTOR", hint: "Share your territory, current product groups and expected annual volume." },
    },
    lines: {
      lock: "Locks & Cylinders",
      hinge: "Hinges",
      handle: "Door Handles",
      hotel: "Hotel Systems",
      ceiling: "Ceiling Systems",
      other: "Mixed / Unsure",
    },
    info: {
      addressLabel: "FACTORY & HEAD OFFICE",
      linesLabel: "DIRECT LINES",
      emailLabel: "Email",
      phoneLabel: "Phone",
      promiseLabel: "RESPONSE PROMISE",
      promise: "48 hours",
      promiseWhat: "to reply",
      promiseDesc: "We answer quote and sample requests within two business days with pricing and a plan.",
    },
  },
  blog: {
    kicker: "Knowledge Center",
    title: { pre: "The knowledge", em: "behind", post: "the hardware." },
    subtitle:
      "Technical notes, standards explained, export practice and field experience. We write for purchasing and project teams.",
    filterLabel: "Filter by category",
    countSuffix: "ARTICLES",
    empty: "No articles in this category yet.",
    featuredCta: "Read the article",
    cardCta: "Read",
    readingSuffix: "min read",
    minutes: "min",
    categories: {
      all: "All",
      teknik: "Technical",
      standart: "Standards",
      ihracat: "Export",
      tavan: "Ceiling Systems",
      proje: "Projects",
    },
    toc: "Contents",
    share: "Share",
    copyLink: "Copy link",
    copied: "Copied",
    related: "Related articles",
    seeAll: "See all",
    productCta: "View product",
    newsletter: {
      kicker: "Technical newsletter",
      title: { pre: "Once a month,", em: "only", post: "what's useful." },
      body: "New standard revisions, product developments and export regulation summaries. No marketing email.",
      cta: "Sign up",
      note: "ONE-CLICK UNSUBSCRIBE · GDPR COMPLIANT",
    },
  },
  katalog: {
    kicker: "2025 collection",
    title: { pre: "Product", em: "catalog", post: "" },
    intro: "All families, one hardware language.",
    showing: "Showing {count} of {total} products.",
    filterLabel: "Filter by category",
    finishesLabel: "Finish options",
    empty: "No products to show in this category.",
    categories: {
      all: "All",
      barrel: "Cylinders",
      padlock: "Padlocks",
      hinge: "Hinges",
      handle: "Handles",
      hotel: "Hotel",
      accessory: "Accessories",
      ceiling: "Ceiling",
    },
    badges: {
      new: "NEW",
      bestseller: "BESTSELLER",
    },
    oem: {
      text: "Can't find what you're looking for? Share your list for custom (OEM) manufacturing.",
      cta: "Sample request form",
    },
    products: {
      "BRL-110": { name: "Anti-Snap Cylinder", desc: "6 pins, anti-snap steel reinforcement", spec: "60–100 mm" },
      "BRL-120": { name: "Master Key Cylinder", desc: "System keying, master key hierarchy", spec: "60–110 mm" },
      "BRL-130": { name: "Half Cylinder", desc: "Single-sided, cabinet and panel applications", spec: "30–50 mm" },
      "PAD-210": { name: "Brass Padlock", desc: "Solid brass body, weatherproof option", spec: "20–60 mm" },
      "PAD-220": { name: "Laminated Padlock", desc: "Hardened shackle, outdoor durability", spec: "30–70 mm" },
      "HNG-310": { name: "Ball-Bearing Hinge", desc: "2BB stainless, heavy door load", spec: "100–120 mm" },
      "HNG-320": { name: "Concealed Hinge", desc: "3D adjustable, invisible installation", spec: "Ø14 mm" },
      "HDL-410": { name: "Backplate Handle Set", desc: "Rose set — WC, keyed, passage", spec: "Set" },
      "HTL-510": { name: "RFID Hotel Lock", desc: "Mifare card, management software included", spec: "System" },
      "ACC-610": { name: "Magnetic Door Stop", desc: "Floor & wall type, stainless", spec: "Unit" },
      "CLG-710": { name: "Suspended Ceiling System", desc: "Load-bearing T-profile + mineral/metal panel, 600×600", spec: "600×600 mm" },
      "CLG-720": { name: "Metal Baffle Ceiling", desc: "Linear aluminium baffle, acoustic infill", spec: "Linear" },
      "LGT-730": { name: "Recessed Downlight", desc: "High-efficiency LED spot, adjustable angle", spec: "Ø90–150 mm" },
      "LGT-740": { name: "Linear LED Profile", desc: "Magnetic track, continuous light line", spec: "1–3 m" },
      "GYP-750": { name: "Plasterboard Ceiling Panel", desc: "Standard / moisture-resistant / fire, 12.5 mm", spec: "1200×2000 mm" },
      "GYP-760": { name: "Cornice & Border", desc: "Decorative steps, coving and corner profiles", spec: "Profile" },
    },
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
      title: "Product Catalog — CLAVISCOR",
      description:
        "The Claviscor product catalog — cylinders, padlocks, hinges, door handles, hotel lock systems and ceiling solutions. Write to our export team for samples and quotes.",
    },
    blog: {
      title: "Knowledge Center — CLAVISCOR",
      description:
        "Technical notes, standards explained and export practice in door hardware and ceiling systems. The Claviscor Knowledge Center for purchasing and project teams.",
    },
    ihracat: {
      title: "Export — CLAVISCOR",
      description:
        "Turnkey export including customs documentation, labeling and palletizing. The Claviscor export operation with Incoterms 2020 delivery terms and payment conditions.",
    },
    sertifikalar: {
      title: "Certificates — CLAVISCOR",
      description:
        "Claviscor quality and conformity documents: ISO 9001, TSE and CE declaration of performance. Current copies on request.",
    },
    iletisim: {
      title: "Contact — CLAVISCOR",
      description:
        "The Claviscor export team for quotes, samples and technical questions. Head office in Çerkezköy / Tekirdağ, reply within 48 hours.",
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
    newsletter: "Technical Newsletter Signup",
  },
};
