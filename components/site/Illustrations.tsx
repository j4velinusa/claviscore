// Tasarımdaki el çizimi SVG'lerin birebir React karşılıkları.
// Kaynak: design/*.dc.html. Yollar (path d) değiştirilmedi; yalnız JSX'in gerektirdiği
// öznitelik adları (stroke-width -> strokeWidth) dönüştürüldü.
// Renkler tasarımdaki değerler: #1A1714 = ink, #A87C4F = bronze — ikisi de proje tokenı.
// Çizim içindeki yazılar dilden bağımsız değil: sözlükten (dict.illustrations) geliyor.

import type { Dictionary } from "@/lib/dictionaries/tr";

type SketchProps = { className?: string };
type LabelledSketchProps = SketchProps & { dict: Dictionary };

/** Belge + mühür + CE işareti. Kaynak: design/Sertifikalar.dc.html */
export function CertificateSketch({ className }: SketchProps) {
  return (
    <svg
      viewBox="0 0 340 300"
      width="100%"
      className={className}
      fill="none"
      stroke="#1A1714"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* arka sayfa */}
      <path
        d="M52 34 H228 C234 34, 238 38, 238 44 V236 C238 242, 234 246, 228 246 H52 C46 246, 42 242, 42 236 V44 C42 38, 46 34, 52 34 Z"
        opacity=".35"
      />
      {/* ön sayfa */}
      <path d="M30 20 H206 C212 20, 216 24, 216 30 V222 C216 228, 212 232, 206 232 H30 C24 232, 20 228, 20 222 V30 C20 24, 24 20, 30 20 Z" />
      {/* başlık satırları */}
      <path d="M40 48 H120" strokeWidth={3} />
      <path d="M40 66 H88" stroke="#A87C4F" strokeWidth={2} />
      {/* gövde satırları */}
      <path
        d="M40 100 H196 M40 118 H196 M40 136 H170 M40 154 H196 M40 172 H150"
        strokeWidth={1.4}
        opacity=".45"
      />
      {/* imza */}
      <path d="M40 206 C52 196, 62 214, 76 202 C86 194, 94 208, 108 200" strokeWidth={1.7} opacity=".7" />
      {/* mühür */}
      <g transform="translate(196 158)" stroke="#A87C4F">
        <circle cx="52" cy="52" r="40" strokeWidth={2.2} />
        <circle cx="52" cy="52" r="30" strokeWidth={1.4} opacity=".7" />
        <path d="M38 52 L48 62 L68 42" strokeWidth={3} />
        <path d="M40 90 L34 116 L52 106 L70 116 L64 90" strokeWidth={2} />
      </g>
      {/* CE işareti eskizi */}
      <g transform="translate(238 40)" stroke="#1A1714" strokeWidth={2.2}>
        <path d="M40 14 C24 14, 14 26, 14 40 C14 54, 24 66, 40 66" />
        <path d="M74 14 C58 14, 48 26, 48 40 C48 54, 58 66, 74 66 M48 40 H68" />
      </g>
    </svg>
  );
}

/** Atölye → tesis → fabrika büyüme çizimi. Kaynak: design/Hakkımızda.dc.html */
export function GrowthSketch({ className }: SketchProps) {
  return (
    <svg
      viewBox="0 0 380 180"
      width="100%"
      className={className}
      fill="none"
      stroke="#1A1714"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* küçük atölye */}
      <g transform="translate(10 68)">
        <path d="M6 82 V34 L44 8 L82 34 V82 Z" />
        <path d="M32 82 V56 H56 V82" strokeWidth={1.5} />
        <path d="M20 44 H34 M54 44 H68" strokeWidth={1.3} opacity=".5" />
        <path d="M44 8 V0" stroke="#A87C4F" strokeWidth={1.6} />
      </g>
      {/* ok */}
      <path d="M104 118 H150" strokeDasharray="6 8" strokeWidth={1.6} opacity=".55" />
      <path d="M144 112 L152 118 L144 124" strokeWidth={1.6} opacity=".55" />
      {/* orta tesis */}
      <g transform="translate(158 76)">
        <path d="M4 74 V30 L28 12 V30 L52 12 V74 Z" />
        <path d="M14 40 L26 50 M34 40 L46 50" stroke="#A87C4F" strokeWidth={1.4} opacity=".7" />
        <path d="M4 74 H60" />
      </g>
      {/* büyük fabrika + baca */}
      <g transform="translate(238 46)">
        <path d="M6 104 V44 L34 22 V44 L62 22 V44 L90 22 V104 Z" />
        <path d="M6 104 H120" />
        <path d="M18 54 L30 64 M46 54 L58 64 M74 54 L86 64" stroke="#A87C4F" strokeWidth={1.4} opacity=".7" />
        <path d="M104 104 V56 H118 V104" strokeWidth={1.7} />
        <path d="M108 48 C114 40, 104 34, 110 26" strokeWidth={1.4} opacity=".45" />
      </g>
      {/* zemin */}
      <path d="M4 152 H376" strokeWidth={1.4} opacity=".3" />
    </svg>
  );
}

/**
 * Fabrika konum krokisi. Tasarımdaki İzmir haritasının (Alsancak Limanı + ADB
 * havalimanı + Ege kıyısı) Çerkezköy/Tekirdağ karşılığı — görsel dil aynı,
 * coğrafya düzeltildi. Mesafe/süre etiketi bilinçli olarak yok: tasarımdaki
 * "25 dk" gibi değerler doğrulanmadı.
 * Liman etiketi teyide açık — yükleme limanı Ambarlı ise değişir.
 */
export function LocationSketch({ className }: SketchProps) {
  return (
    <svg
      viewBox="0 0 300 170"
      width="100%"
      className={className}
      fill="none"
      stroke="#1A1714"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Marmara kıyı şeridi — güneyde, iki katman */}
      <path
        d="M6 136 C44 128, 74 142, 108 134 C140 126, 166 140, 198 132 C226 125, 252 134, 294 128"
        strokeWidth={1.6}
        opacity=".45"
      />
      <path
        d="M6 150 C48 142, 80 155, 116 147 C150 140, 178 152, 210 145 C240 139, 264 147, 294 142"
        strokeWidth={1.4}
        opacity=".3"
      />
      {/* yollar: fabrikadan doğuya İstanbul, güneye limana */}
      <path d="M150 66 H244 M150 66 V120" strokeWidth={2} />
      <path d="M244 66 L276 44" strokeDasharray="6 8" strokeWidth={1.6} opacity=".6" />
      {/* fabrika bloğu — Çerkezköy */}
      <g transform="translate(120 48)" stroke="#A87C4F" strokeWidth={2.2}>
        <path d="M4 30 V8 L18 0 L18 30 M18 8 L32 0 V30 M4 30 H40" />
      </g>
      <text
        x="120"
        y="96"
        fontFamily="DM Mono, monospace"
        fontSize="10"
        fill="#8A6638"
        stroke="none"
        letterSpacing="1"
      >
        ÇERKEZKÖY
      </text>
      {/* havalimanı — doğuda, İstanbul */}
      <g transform="translate(244 20)">
        <path
          d="M4 16 C14 12, 26 9, 40 8 C44 8, 46 11, 44 14 C42 17, 36 19, 30 19 L14 22 C8 23, 5 20, 4 16 Z"
          stroke="#1A1714"
          strokeWidth={1.7}
        />
      </g>
      <text
        x="228"
        y="14"
        fontFamily="DM Mono, monospace"
        fontSize="10"
        fill="#78726B"
        stroke="none"
        letterSpacing="1"
      >
        İSTANBUL
      </text>
      {/* liman — güneyde, Marmara kıyısında */}
      <g transform="translate(128 118)">
        <path
          d="M6 22 C4 16, 6 14, 9 14 H40 C44 14, 45 17, 42 21 C38 25, 30 28, 22 28 H12 C8 27, 7 25, 6 22 Z"
          stroke="#1A1714"
          strokeWidth={1.7}
        />
        <path d="M22 14 V4" strokeWidth={1.5} />
      </g>
      <text
        x="118"
        y="164"
        fontFamily="DM Mono, monospace"
        fontSize="10"
        fill="#78726B"
        stroke="none"
        letterSpacing="1"
      >
        TEKİRDAĞ LİMANI
      </text>
    </svg>
  );
}

/**
 * Gemi + uçak + liman vinci. İhracat sayfası hero çizimi.
 * Kaynak: design/İhracat.dc.html. Uçağın iz çizgisi viewBox dışına taşar —
 * tasarımdaki gibi overflow açık bırakıldı.
 */
export function ExportHeroSketch({ className }: SketchProps) {
  return (
    <svg
      viewBox="0 0 460 340"
      width="100%"
      className={className}
      style={{ overflow: "visible" }}
      fill="none"
      stroke="#1A1714"
      strokeWidth={2.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* uçak */}
      <g transform="translate(250 34) rotate(-9)" stroke="#A87C4F" strokeWidth={2.2}>
        <path d="M6 30 C34 22, 74 16, 118 14 C126 13, 132 17, 130 22 C128 27, 120 30, 110 31 L34 38 C20 40, 10 36, 6 30 Z" />
        <path d="M44 34 C50 20, 62 8, 74 4 C78 3, 80 6, 78 10 C72 20, 66 28, 62 34" />
        <path d="M40 37 C44 47, 50 56, 58 62 C61 64, 64 62, 62 58 C58 50, 55 43, 54 37" />
        <path d="M112 20 C118 14, 124 10, 130 9" />
        <path d="M150 44 C176 40, 200 40, 218 44" strokeDasharray="5 9" strokeWidth={1.7} opacity=".6" />
      </g>
      {/* ufuk */}
      <path d="M8 214 C120 208, 250 210, 452 206" strokeWidth={1.5} opacity=".35" />
      {/* gemi gövdesi */}
      <g transform="translate(30 150)">
        <path d="M8 96 C4 74, 6 66, 12 64 L300 64 C312 64, 316 72, 310 84 C300 100, 280 112, 250 116 L64 116 C36 114, 16 108, 8 96 Z" />
        {/* konteynerler */}
        <rect x="46" y="26" width="52" height="38" rx="2" />
        <rect x="104" y="14" width="52" height="50" rx="2" stroke="#A87C4F" />
        <rect x="162" y="30" width="52" height="34" rx="2" />
        <rect x="220" y="20" width="46" height="44" rx="2" stroke="#A87C4F" />
        <path d="M46 46 H98 M104 34 H156 M162 48 H214 M220 40 H266" strokeWidth={1.3} opacity=".5" />
        {/* köprüüstü */}
        <path d="M272 64 V38 H300 V64" />
        <path d="M280 46 H292" strokeWidth={1.4} opacity=".6" />
        {/* su hattı */}
        <path
          d="M0 122 C40 116, 80 128, 122 122 C164 116, 206 128, 250 122 C292 116, 330 128, 372 122"
          strokeWidth={1.7}
          opacity=".55"
        />
        <path d="M20 138 C58 132, 96 144, 138 138 C180 132, 220 144, 262 138" strokeWidth={1.5} opacity=".35" />
      </g>
      {/* vinç */}
      <g transform="translate(352 96)" strokeWidth={2}>
        <path d="M14 118 V22 M14 22 H86 M60 22 V54" />
        <path d="M2 118 H30" />
        <rect x="50" y="54" width="22" height="18" rx="2" stroke="#A87C4F" />
      </g>
    </svg>
  );
}

/** Uçak + konteyner + tır + gemi: taşıma modları. Kaynak: design/İhracat.dc.html */
export function TransportSketch({ className }: SketchProps) {
  return (
    <svg
      viewBox="0 0 320 330"
      width="100%"
      className={className}
      fill="none"
      stroke="#1A1714"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* uçuştaki uçak */}
      <g transform="translate(24 18)">
        <path
          d="M4 42 C34 32, 78 24, 128 22 C138 21, 144 26, 141 32 C138 38, 128 41, 116 42 L38 52 C22 54, 10 50, 4 42 Z"
          stroke="#A87C4F"
          strokeWidth={2.2}
        />
        <path
          d="M48 46 C56 30, 70 16, 84 12 C89 10, 91 14, 88 19 C81 30, 74 40, 70 47"
          stroke="#A87C4F"
          strokeWidth={2.2}
        />
        <path
          d="M44 50 C48 62, 56 72, 66 78 C70 80, 72 77, 69 73 C63 64, 59 56, 58 50"
          stroke="#A87C4F"
          strokeWidth={2.2}
        />
        <path d="M158 32 C186 26, 214 26, 238 30" strokeDasharray="5 10" strokeWidth={1.6} opacity=".5" />
      </g>
      {/* konteyner */}
      <g transform="translate(88 116)">
        <path d="M8 26 H126 V96 H8 Z" />
        <path d="M8 26 L34 6 H152 L126 26" />
        <path d="M152 6 V76 L126 96" />
        <path d="M30 26 V96 M52 26 V96 M74 26 V96 M96 26 V96" strokeWidth={1.3} opacity=".45" />
        <path d="M136 20 V86" strokeWidth={1.3} opacity=".35" />
        <text
          x="18"
          y="66"
          fontFamily="DM Mono, monospace"
          fontSize="11"
          fill="#8A6638"
          stroke="none"
          letterSpacing="1.2"
        >
          40′ HC
        </text>
      </g>
      {/* tır */}
      <g transform="translate(20 232)">
        <path d="M4 60 H150 V22 H4 Z" />
        <path d="M150 60 H206 V38 L188 22 H150" />
        <circle cx="46" cy="70" r="11" />
        <circle cx="120" cy="70" r="11" />
        <circle cx="184" cy="70" r="11" stroke="#A87C4F" />
        <path d="M20 34 H60 M20 46 H60" strokeWidth={1.3} opacity=".45" />
        <path d="M232 60 C246 60, 252 54, 252 46" strokeDasharray="4 8" strokeWidth={1.5} opacity=".45" />
      </g>
      {/* küçük gemi */}
      <g transform="translate(200 168)" strokeWidth={1.8}>
        <path d="M4 46 C2 36, 4 32, 8 32 H92 C98 32, 100 37, 96 44 C90 52, 78 58, 62 60 H24 C14 58, 7 53, 4 46 Z" />
        <rect x="26" y="16" width="24" height="16" rx="2" stroke="#A87C4F" />
        <rect x="56" y="12" width="24" height="20" rx="2" />
        <path d="M0 66 C16 62, 32 70, 50 66 C68 62, 84 70, 102 66" strokeWidth={1.4} opacity=".45" />
      </g>
    </svg>
  );
}

/**
 * Kontrol listesi + büyüteç + tork anahtarı + tuz kabini.
 * KOYU zemin için çizilmiş (stroke #F4EEE2) — açık zemine koymayın.
 * Kaynak: design/İhracat.dc.html
 */
export function InspectionSketch({ dict, className }: LabelledSketchProps) {
  const t = dict.illustrations;
  return (
    <svg
      viewBox="0 0 320 340"
      width="100%"
      className={className}
      fill="none"
      stroke="#F4EEE2"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* pano */}
      <g transform="translate(16 18)">
        <path d="M14 26 H106 C112 26, 116 30, 116 36 V162 C116 168, 112 172, 106 172 H14 C8 172, 4 168, 4 162 V36 C4 30, 8 26, 14 26 Z" />
        <path d="M44 26 V18 C44 12, 50 8, 60 8 C70 8, 76 12, 76 18 V26" stroke="#C2A06A" />
        <path d="M22 56 H96 M22 84 H96 M22 112 H96 M22 140 H70" strokeWidth={1.4} opacity=".45" />
        <g stroke="#C2A06A" strokeWidth={2.3}>
          <path d="M20 52 L26 58 L36 46" />
          <path d="M20 80 L26 86 L36 74" />
          <path d="M20 108 L26 114 L36 102" />
        </g>
      </g>
      {/* silindir üzerinde büyüteç */}
      <g transform="translate(150 46)">
        <rect x="10" y="60" width="112" height="52" rx="8" stroke="#C2A06A" />
        <path d="M28 72 V100 M46 72 V100 M64 72 V100" stroke="#C2A06A" strokeWidth={1.4} opacity=".7" />
        <circle cx="86" cy="52" r="34" />
        <path d="M110 76 L136 104" strokeWidth={3} />
        <path d="M70 44 C76 36, 92 34, 100 42" strokeWidth={1.5} opacity=".55" />
      </g>
      {/* tork anahtarı */}
      <g transform="translate(24 216)" stroke="#C2A06A">
        <path d="M6 46 H92 C100 46, 104 52, 100 58 L92 66" />
        <circle cx="110" cy="52" r="16" stroke="#F4EEE2" />
        <path d="M110 44 V52 L116 56" stroke="#F4EEE2" strokeWidth={1.6} />
        <path d="M18 46 V38 M30 46 V38" strokeWidth={1.4} opacity=".7" />
      </g>
      <text
        x="150"
        y="252"
        fontFamily="DM Mono, monospace"
        fontSize="12"
        fill="#C2A06A"
        stroke="none"
        letterSpacing="1.6"
      >
        {t.torque}
      </text>
      {/* tuz püskürtme kabini */}
      <g transform="translate(150 268)">
        <path d="M8 52 H120 V16 C120 10, 116 6, 110 6 H18 C12 6, 8 10, 8 16 Z" />
        <path d="M28 6 C28 -2, 40 -6, 46 0" strokeWidth={1.5} opacity=".5" />
        <path d="M24 22 C30 30, 40 30, 46 22 M62 22 C68 30, 78 30, 84 22" stroke="#C2A06A" strokeWidth={1.6} opacity=".8" />
      </g>
      <text
        x="150"
        y="336"
        fontFamily="DM Mono, monospace"
        fontSize="12"
        fill="#C2A06A"
        stroke="none"
        letterSpacing="1.6"
      >
        {t.saltSpray}
      </text>
    </svg>
  );
}

/** Testere dişli çatı, tezgâhlar, konveyör ve ziyaretçiler. Kaynak: design/İhracat.dc.html */
export function FactoryHallSketch({ className }: SketchProps) {
  return (
    <svg
      viewBox="0 0 380 200"
      width="100%"
      className={className}
      fill="none"
      stroke="#1A1714"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* testere dişli çatı */}
      <path d="M14 66 L48 34 V66 M48 34 L82 66 M82 40 L116 66 M82 40 V66 M116 40 L150 66 M116 40 V66" />
      <path d="M14 66 H366" />
      {/* çatı pencereleri */}
      <path d="M52 44 L74 60 M86 48 L108 62 M120 48 L142 62" stroke="#A87C4F" strokeWidth={1.4} opacity=".7" />
      {/* hol gövdesi */}
      <path d="M14 66 V162 H366 V66" />
      {/* tezgâhlar */}
      <path d="M40 162 V126 H92 V162" />
      <path d="M52 138 H80" strokeWidth={1.3} opacity=".5" />
      <path d="M112 162 V132 H160 V162" />
      <circle cx="136" cy="120" r="9" stroke="#A87C4F" />
      {/* konveyör */}
      <path d="M176 150 H286" strokeWidth={2.4} />
      <circle cx="186" cy="158" r="7" />
      <circle cx="216" cy="158" r="7" />
      <circle cx="246" cy="158" r="7" />
      <circle cx="276" cy="158" r="7" />
      <rect x="196" y="134" width="22" height="16" rx="2" stroke="#A87C4F" />
      <rect x="240" y="134" width="22" height="16" rx="2" stroke="#A87C4F" />
      {/* yükleme rampası */}
      <path d="M300 162 V116 H352 V162" />
      <path d="M310 128 H342 M310 140 H342" strokeWidth={1.3} opacity=".45" />
      {/* zemin */}
      <path d="M6 176 H374" strokeWidth={1.4} opacity=".35" />
      {/* ziyaretçiler */}
      <g stroke="#A87C4F" strokeWidth={1.8}>
        <circle cx="196" cy="104" r="5" />
        <path d="M196 110 V122 M190 128 L196 122 L202 128 M190 114 H202" />
        <circle cx="216" cy="106" r="5" />
        <path d="M216 112 V122 M211 128 L216 122 L221 128 M210 116 H222" />
      </g>
    </svg>
  );
}

/** Fabrika vaziyet planı (şematik). Kaynak: design/Üretim.dc.html */
export function FactoryPlanSketch({ dict, className }: LabelledSketchProps) {
  const t = dict.illustrations.plan;
  const label = {
    fontFamily: "DM Mono, monospace",
    fontSize: "11",
    fill: "#8A6638",
    stroke: "none",
    letterSpacing: "1",
  } as const;
  return (
    <svg
      viewBox="0 0 400 300"
      width="100%"
      className={className}
      fill="none"
      stroke="#1A1714"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* dış hol */}
      <path d="M14 26 H386 V274 H14 Z" />
      {/* bölmeler */}
      <path d="M112 26 V274 M232 26 V274 M14 156 H112 M232 156 H386" strokeWidth={1.5} opacity=".55" />
      <text x="26" y="52" {...label}>
        {t.cnc}
      </text>
      <text x="124" y="52" {...label}>
        {t.press}
      </text>
      <text x="244" y="52" {...label}>
        {t.coating}
      </text>
      <text x="26" y="182" {...label}>
        {t.assembly}
      </text>
      <text x="244" y="182" {...label}>
        {t.lab}
      </text>
      {/* CNC bölmesi */}
      <rect x="28" y="66" width="30" height="20" rx="2" />
      <rect x="66" y="66" width="30" height="20" rx="2" />
      <rect x="28" y="96" width="30" height="20" rx="2" />
      <rect x="66" y="96" width="30" height="20" rx="2" />
      <rect x="28" y="126" width="30" height="20" rx="2" stroke="#A87C4F" />
      <rect x="66" y="126" width="30" height="20" rx="2" stroke="#A87C4F" />
      {/* pres / kaynak */}
      <path d="M126 70 H214 M126 100 H214" strokeWidth={2.3} />
      <circle cx="150" cy="128" r="11" stroke="#A87C4F" />
      <circle cx="190" cy="128" r="11" stroke="#A87C4F" />
      {/* kaplama hattı */}
      <path d="M246 70 H366 V96 H246 V122 H366" stroke="#A87C4F" strokeWidth={2.3} />
      {/* montaj tezgâhları */}
      <rect x="28" y="196" width="70" height="16" rx="2" />
      <rect x="28" y="222" width="70" height="16" rx="2" />
      <rect x="28" y="248" width="70" height="16" rx="2" />
      {/* laboratuvar */}
      <rect x="248" y="196" width="40" height="30" rx="3" />
      <rect x="300" y="196" width="40" height="30" rx="3" stroke="#A87C4F" />
      <path d="M248 244 H340" strokeWidth={1.5} opacity=".5" />
      {/* akış omurgası */}
      <path d="M118 220 H228" strokeDasharray="7 8" strokeWidth={1.7} opacity=".6" />
      <path d="M222 214 L230 220 L222 226" strokeWidth={1.7} opacity=".6" />
      {/* rampa */}
      <path d="M340 274 V292 H386 V274" strokeWidth={1.7} />
      <text
        x="330"
        y="290"
        fontFamily="DM Mono, monospace"
        fontSize="10"
        fill="#78726B"
        stroke="none"
        letterSpacing="1"
      >
        {t.dock}
      </text>
    </svg>
  );
}

/** Torna + dişli + kumpas: kilit & donanım hattı. Kaynak: design/İhracat.dc.html */
export function LatheSketch({ dict, className }: LabelledSketchProps) {
  return (
    <svg
      viewBox="0 0 320 300"
      width="100%"
      className={className}
      fill="none"
      stroke="#1A1714"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* torna yatağı */}
      <path d="M20 214 H300 M32 214 V244 M288 214 V244 M20 244 H300" />
      {/* fener mili kutusu */}
      <path d="M40 214 V150 H116 V214" />
      <path d="M56 166 H100 M56 182 H100" strokeWidth={1.3} opacity=".5" />
      {/* mil + iş parçası */}
      <path d="M116 182 H196" strokeWidth={3} />
      <rect x="196" y="166" width="62" height="32" rx="4" stroke="#A87C4F" strokeWidth={2.2} />
      <path d="M206 174 V190 M216 174 V190 M226 174 V190" stroke="#A87C4F" strokeWidth={1.4} opacity=".7" />
      {/* gezer punta */}
      <path d="M258 182 H286 M270 182 V214 M254 214 H290" />
      {/* kesici takım */}
      <g stroke="#A87C4F" strokeWidth={2.2}>
        <path d="M228 132 V152 L222 160 H234 L228 152" />
        <path d="M228 118 V132" />
      </g>
      {/* talaş */}
      <path d="M242 158 C248 152, 252 156, 248 162" strokeWidth={1.5} opacity=".6" />
      <path d="M252 148 C258 142, 262 146, 258 152" strokeWidth={1.5} opacity=".45" />
      {/* dişli */}
      <g transform="translate(46 34)">
        <circle cx="40" cy="40" r="27" />
        <circle cx="40" cy="40" r="9" stroke="#A87C4F" />
        <path d="M40 4 V13 M40 67 V76 M4 40 H13 M67 40 H76 M14 14 L21 21 M59 59 L66 66 M66 14 L59 21 M21 59 L14 66" />
      </g>
      {/* kumpas */}
      <g transform="translate(160 30)" stroke="#A87C4F" strokeWidth={2}>
        <path d="M8 22 H128 M8 22 V44 M8 44 H30" />
        <path d="M92 22 V48 M92 48 H114 M114 48 V22" />
        <path d="M40 12 V22 M60 12 V22 M80 12 V22" strokeWidth={1.4} opacity=".65" />
      </g>
      <text
        x="160"
        y="86"
        fontFamily="DM Mono, monospace"
        fontSize="11"
        fill="#8A6638"
        stroke="none"
        letterSpacing="1.4"
      >
        {dict.illustrations.tolerance}
      </text>
    </svg>
  );
}

/** Çelik kapı kanadı + kesit + robot kaynak + toz boya. Kaynak: design/İhracat.dc.html */
export function SteelDoorSketch({ dict, className }: LabelledSketchProps) {
  const t = dict.illustrations;
  return (
    <svg
      viewBox="0 0 320 300"
      width="100%"
      className={className}
      fill="none"
      stroke="#1A1714"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* kasa + kanat */}
      <g transform="translate(28 18)">
        <path d="M6 12 H132 V254 H6 Z" />
        <path d="M18 24 H120 V242 H18 Z" strokeWidth={1.6} />
        <path d="M30 44 H108 M30 92 H108 M30 140 H108" strokeWidth={1.3} opacity=".4" />
        <path d="M96 130 C104 130, 108 136, 104 142 L92 142" stroke="#A87C4F" strokeWidth={2.4} />
        <circle cx="100" cy="122" r="5" stroke="#A87C4F" />
        {/* menteşeler */}
        <rect x="2" y="60" width="10" height="26" rx="3" stroke="#A87C4F" />
        <rect x="2" y="128" width="10" height="26" rx="3" stroke="#A87C4F" />
        <rect x="2" y="196" width="10" height="26" rx="3" stroke="#A87C4F" />
        {/* açılım yayı */}
        <path d="M132 254 C176 246, 196 216, 198 176" strokeDasharray="5 9" strokeWidth={1.5} opacity=".45" />
      </g>
      {/* kesit detayı */}
      <g transform="translate(196 30)">
        <path d="M6 10 H86 V64 H6 Z" />
        <path d="M6 20 H86 M6 54 H86" strokeWidth={1.4} />
        <path
          d="M14 28 C22 34, 30 26, 38 32 C46 38, 54 28, 62 34 C70 40, 78 30, 84 36"
          stroke="#A87C4F"
          strokeWidth={1.5}
          opacity=".8"
        />
        <text
          x="6"
          y="86"
          fontFamily="DM Mono, monospace"
          fontSize="10"
          fill="#8A6638"
          stroke="none"
          letterSpacing="1.1"
        >
          {t.doorLayers}
        </text>
      </g>
      {/* kaynak kıvılcımı */}
      <g transform="translate(196 140)" stroke="#A87C4F">
        <path d="M10 40 L40 40" strokeWidth={2.6} />
        <path d="M44 30 L52 22 M48 40 L60 40 M44 50 L52 58" strokeWidth={1.6} opacity=".8" />
        <text
          x="8"
          y="72"
          fontFamily="DM Mono, monospace"
          fontSize="10"
          fill="#8A6638"
          stroke="none"
          letterSpacing="1.1"
        >
          {t.robotWeld}
        </text>
      </g>
      {/* toz boya tabancası */}
      <g transform="translate(196 224)" stroke="#1A1714">
        <path d="M8 30 H36 L44 24 V40 L36 34 H8 Z" />
        <path d="M52 32 C60 26, 68 38, 76 30 M56 44 C64 38, 72 50, 80 42" stroke="#A87C4F" strokeWidth={1.5} opacity=".75" />
        <text
          x="8"
          y="62"
          fontFamily="DM Mono, monospace"
          fontSize="10"
          fill="#8A6638"
          stroke="none"
          letterSpacing="1.1"
        >
          {t.powderCoat}
        </text>
      </g>
    </svg>
  );
}

/** Cephe kaseti + V kanal + konsol/klips + panel istifi. Kaynak: design/İhracat.dc.html */
export function CladdingSketch({ dict, className }: LabelledSketchProps) {
  const t = dict.illustrations;
  return (
    <svg
      viewBox="0 0 320 300"
      width="100%"
      className={className}
      fill="none"
      stroke="#1A1714"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* cephe ızgarası */}
      <g transform="translate(22 20)">
        <path d="M6 8 H150 V190 H6 Z" />
        <path d="M54 8 V190 M102 8 V190" strokeWidth={1.5} opacity=".55" />
        <path d="M6 68 H150 M6 128 H150" strokeWidth={1.5} opacity=".55" />
        <rect x="58" y="72" width="40" height="52" rx="1.5" stroke="#A87C4F" strokeWidth={2.3} />
        <path d="M62 78 H94 M62 86 H94" stroke="#A87C4F" strokeWidth={1.2} opacity=".5" />
        {/* derinlik */}
        <path d="M150 8 L172 -4 M150 190 L172 178 M172 -4 V178" strokeWidth={1.4} opacity=".4" />
      </g>
      {/* kaset bükme detayı */}
      <g transform="translate(196 26)">
        <path d="M8 40 H80 L92 26" />
        <path d="M8 40 V62 M80 40 V22" />
        <path d="M32 40 L32 30" stroke="#A87C4F" strokeWidth={1.6} />
        <path d="M24 28 C30 22, 38 22, 44 28" stroke="#A87C4F" strokeWidth={1.5} opacity=".8" />
        <text
          x="8"
          y="84"
          fontFamily="DM Mono, monospace"
          fontSize="10"
          fill="#8A6638"
          stroke="none"
          letterSpacing="1.1"
        >
          {t.vGroove}
        </text>
      </g>
      {/* taşıyıcı ray + konsol */}
      <g transform="translate(196 118)">
        <path d="M14 6 V84 M14 20 H44 M44 20 V34 M14 56 H44 M44 56 V70" stroke="#A87C4F" strokeWidth={2.2} />
        <path d="M48 14 V40 M48 50 V76" strokeWidth={1.8} />
        <text
          x="8"
          y="104"
          fontFamily="DM Mono, monospace"
          fontSize="10"
          fill="#8A6638"
          stroke="none"
          letterSpacing="1.1"
        >
          {t.bracketClip}
        </text>
      </g>
      {/* köpük ara katmanlı panel istifi */}
      <g transform="translate(30 226)">
        <path d="M4 20 H140 M4 32 H140 M4 44 H140" strokeWidth={2.4} />
        <path d="M4 26 H140 M4 38 H140" stroke="#A87C4F" strokeWidth={1.3} strokeDasharray="4 5" opacity=".8" />
        <text
          x="4"
          y="66"
          fontFamily="DM Mono, monospace"
          fontSize="10"
          fill="#8A6638"
          stroke="none"
          letterSpacing="1.1"
        >
          {t.foamLayer}
        </text>
      </g>
    </svg>
  );
}

/** Asma tavan modülü + T-profil + lineer LED hattı. Kaynak: design/Üretim.dc.html */
export function CeilingLineSketch({ dict, className }: LabelledSketchProps) {
  const t = dict.illustrations;
  return (
    <svg
      viewBox="0 0 300 260"
      width="100%"
      className={className}
      fill="none"
      stroke="#1A1714"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* tavan ızgarası */}
      <g transform="translate(24 26)">
        <path d="M6 10 H150 V120 H6 Z" />
        <path d="M54 10 V120 M102 10 V120 M6 65 H150" strokeWidth={1.4} opacity=".5" />
        <circle cx="78" cy="38" r="14" stroke="#A87C4F" strokeWidth={2.2} />
        <circle cx="126" cy="92" r="14" stroke="#A87C4F" strokeWidth={2.2} />
        <path d="M6 10 L30 -8 H174 L150 10" strokeWidth={1.5} opacity=".5" />
      </g>
      {/* T-profil */}
      <g transform="translate(190 30)" stroke="#A87C4F">
        <path d="M10 10 V56 M10 24 H40 M40 24 V38" strokeWidth={2.2} />
        <text
          x="4"
          y="78"
          fontFamily="DM Mono, monospace"
          fontSize="10"
          fill="#8A6638"
          stroke="none"
          letterSpacing="1"
        >
          {t.tProfile}
        </text>
      </g>
      {/* lineer LED hattı */}
      <g transform="translate(30 176)">
        <path d="M6 30 H210" strokeWidth={2.6} />
        <path d="M24 30 V14 M60 30 V14 M96 30 V14 M132 30 V14 M168 30 V14" stroke="#A87C4F" strokeWidth={1.8} />
        <text
          x="6"
          y="58"
          fontFamily="DM Mono, monospace"
          fontSize="10"
          fill="#8A6638"
          stroke="none"
          letterSpacing="1"
        >
          {t.ledRun}
        </text>
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   Koleksiyon serilerinin aile çizimleri (Linea / Forte / Vela / Notte).
   Kaynak: design/Koleksiyon.dc.html. Seri bölümü henüz kodda yok; çizimler
   o bölüm eklendiğinde bağlanmak üzere hazır duruyor.
   --------------------------------------------------------------------------- */

/** Linea: kol + barel + menteşe + tavan modülü + LED hattı. */
export function LineaSketch({ className }: SketchProps) {
  return (
    <svg
      viewBox="0 0 320 300"
      width="100%"
      className={className}
      fill="none"
      stroke="#1A1714"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <g transform="translate(24 28)">
        <path d="M8 26 H132 C140 26, 144 32, 138 40 L120 60" strokeWidth={3} />
        <circle cx="20" cy="26" r="13" stroke="#A87C4F" strokeWidth={2.2} />
        <path d="M8 74 H120" strokeWidth={1.4} opacity=".35" />
      </g>
      <g transform="translate(196 30)">
        <rect x="6" y="10" width="34" height="88" rx="6" stroke="#A87C4F" strokeWidth={2.2} />
        <circle cx="23" cy="34" r="7" />
        <path d="M23 58 V78" strokeWidth={2.4} />
      </g>
      <g transform="translate(30 132)">
        <rect x="6" y="10" width="88" height="42" rx="4" />
        <path d="M20 26 H80 M20 36 H80" strokeWidth={1.3} opacity=".4" />
        <circle cx="112" cy="30" r="16" stroke="#A87C4F" strokeWidth={2.2} />
        <path d="M112 30 H126" stroke="#A87C4F" strokeWidth={2} />
      </g>
      <g transform="translate(196 148)">
        <path d="M6 24 H86 V72 H6 Z" />
        <path d="M28 24 V72 M50 24 V72 M68 24 V72" strokeWidth={1.3} opacity=".4" />
        <path d="M6 24 L20 12 H100 L86 24 M100 12 V60 L86 72" strokeWidth={1.5} opacity=".55" />
      </g>
      <g transform="translate(34 226)">
        <path d="M4 30 H214" strokeWidth={2.6} />
        <path d="M40 30 V16 M96 30 V16 M152 30 V16" stroke="#A87C4F" strokeWidth={1.9} />
      </g>
    </svg>
  );
}

/** Forte: çelik kapı + güvenlik/yangın sınıfı rozetleri. */
export function ForteSketch({ className }: SketchProps) {
  return (
    <svg
      viewBox="0 0 320 300"
      width="100%"
      className={className}
      fill="none"
      stroke="#1A1714"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <g transform="translate(28 26)">
        <path d="M6 10 H126 V184 H6 Z" />
        <path d="M18 22 H114 V172 H18 Z" strokeWidth={1.6} />
        <path d="M30 46 H102 M30 96 H102" strokeWidth={1.4} opacity=".4" />
        <path d="M92 118 H104 C110 118, 112 124, 108 128 H92" stroke="#A87C4F" strokeWidth={2.6} />
        <rect x="2" y="52" width="10" height="26" rx="3" stroke="#A87C4F" />
        <rect x="2" y="120" width="10" height="26" rx="3" stroke="#A87C4F" />
      </g>
      <g transform="translate(196 40)">
        <rect x="6" y="10" width="90" height="46" rx="3" />
        <path d="M6 24 H96 M6 42 H96" strokeWidth={1.3} opacity=".4" />
        <text
          x="8"
          y="78"
          fontFamily="DM Mono, monospace"
          fontSize="10"
          fill="#8A6638"
          stroke="none"
          letterSpacing="1"
        >
          RC2 / RC3
        </text>
      </g>
      <g transform="translate(196 130)">
        <circle cx="44" cy="44" r="34" stroke="#A87C4F" />
        <path d="M30 44 L40 54 L60 34" strokeWidth={3} />
        <text
          x="6"
          y="102"
          fontFamily="DM Mono, monospace"
          fontSize="10"
          fill="#8A6638"
          stroke="none"
          letterSpacing="1"
        >
          EI₂ 30 / 60
        </text>
      </g>
      <g transform="translate(34 232)">
        <path d="M4 26 H140" strokeWidth={2.6} />
        <path d="M4 26 C24 18, 44 34, 64 26 C84 18, 104 34, 124 26" stroke="#A87C4F" strokeWidth={1.6} opacity=".7" />
      </g>
    </svg>
  );
}

/** Vela: cephe kaseti + V kanal + akustik tavan + T-profil. */
export function VelaSketch({ dict, className }: LabelledSketchProps) {
  return (
    <svg
      viewBox="0 0 320 300"
      width="100%"
      className={className}
      fill="none"
      stroke="#1A1714"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <g transform="translate(26 26)">
        <path d="M6 10 H150 V132 H6 Z" />
        <path d="M54 10 V132 M102 10 V132 M6 71 H150" strokeWidth={1.4} opacity=".5" />
        <rect x="58" y="76" width="40" height="50" rx="2" stroke="#A87C4F" strokeWidth={2.3} />
        <path d="M150 10 L172 -2 M150 132 L172 120 M172 -2 V120" strokeWidth={1.4} opacity=".4" />
      </g>
      <g transform="translate(206 34)">
        <path d="M8 40 H72 L84 26" />
        <path d="M8 40 V62 M72 40 V22" />
        <path d="M30 40 V28" stroke="#A87C4F" strokeWidth={1.6} />
      </g>
      <g transform="translate(30 182)">
        <path d="M6 20 H150 V96 H6 Z" strokeWidth={1.8} />
        <path d="M6 44 H150 M6 68 H150" strokeWidth={1.3} opacity=".4" />
        <path d="M40 20 V96 M84 20 V96 M120 20 V96" strokeWidth={1.3} opacity=".4" />
        <circle cx="62" cy="56" r="11" stroke="#A87C4F" strokeWidth={2.2} />
      </g>
      <g transform="translate(206 178)">
        <path d="M10 10 V72 M10 26 H44 M44 26 V40 M10 56 H44" stroke="#A87C4F" strokeWidth={2.2} />
        <text
          x="4"
          y="96"
          fontFamily="DM Mono, monospace"
          fontSize="10"
          fill="#8A6638"
          stroke="none"
          letterSpacing="1"
        >
          {dict.illustrations.tProfile}
        </text>
      </g>
    </svg>
  );
}

/** Notte: otel oda kilidi + kol + kasa + barel. */
export function NotteSketch({ className }: SketchProps) {
  return (
    <svg
      viewBox="0 0 320 300"
      width="100%"
      className={className}
      fill="none"
      stroke="#1A1714"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <g transform="translate(28 30)">
        <rect x="6" y="10" width="46" height="106" rx="8" stroke="#A87C4F" strokeWidth={2.3} />
        <circle cx="29" cy="38" r="8" />
        <path d="M29 62 V88" strokeWidth={2.6} />
        <path d="M20 100 H38" strokeWidth={1.4} opacity=".5" />
      </g>
      <g transform="translate(112 34)">
        <path d="M6 30 H120 C128 30, 132 36, 126 44 L108 62" strokeWidth={3} />
        <circle cx="18" cy="30" r="12" stroke="#A87C4F" strokeWidth={2.2} />
      </g>
      <g transform="translate(40 168)">
        <path d="M6 26 H92 V78 H6 Z" />
        <path d="M22 44 H76 M22 58 H76" strokeWidth={1.3} opacity=".4" />
        <path d="M46 26 V14 C46 6, 56 6, 56 14 V26" stroke="#A87C4F" strokeWidth={2.2} />
      </g>
      <g transform="translate(184 168)">
        <circle cx="46" cy="46" r="36" />
        <circle cx="46" cy="46" r="12" stroke="#A87C4F" strokeWidth={2.3} />
        <path d="M46 4 V16 M46 76 V88 M4 46 H16 M76 46 H88" strokeWidth={1.6} opacity=".65" />
      </g>
    </svg>
  );
}
