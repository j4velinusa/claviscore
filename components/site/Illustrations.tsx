// Tasarımdaki el çizimi SVG'lerin birebir React karşılıkları.
// Kaynak: design/*.dc.html. Yollar (path d) değiştirilmedi; yalnız JSX'in gerektirdiği
// öznitelik adları (stroke-width -> strokeWidth) dönüştürüldü.
// Renkler tasarımdaki değerler: #1A1714 = ink, #A87C4F = bronze — ikisi de proje tokenı.

/** Belge + mühür + CE işareti. Kaynak: design/Sertifikalar.dc.html */
export function CertificateSketch({ className }: { className?: string }) {
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
export function GrowthSketch({ className }: { className?: string }) {
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
export function LocationSketch({ className }: { className?: string }) {
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
