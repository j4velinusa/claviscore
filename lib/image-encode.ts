"use client";

// Tarayıcı tarafı görsel kodlayıcı. Hem görsel panelinde (MediaManager) hem blog
// editöründe (BlogAdmin) kullanılıyor — iki yerde ayrı kopya tutmak, birinde
// yapılan kalite düzeltmesinin diğerine geçmemesi demekti.

// API 2 MB'ı reddediyor; base64 şişmesi öncesi hedef biraz altında tutuluyor.
const TARGET_BYTES = 1.7 * 1024 * 1024;

/**
 * Kalite merdiveni — ilk sığan kazanır.
 *
 * İLK BASAMAK 1 VE BU KAYIPSIZ DEMEK: tarayıcı canvas.toBlob(..., "image/webp", 1)
 * çağrısında kayıplı VP8 yerine kayıpsız VP8L üretiyor. Ürün render'ı, çizim,
 * üzerinde yazı olan görsel gibi keskin kenarlı ve düz renkli içerikte kayıplı
 * WebP gözle görülür "pixel pixel" bozulma bırakıyordu; kayıpsız hem bunu tamamen
 * ortadan kaldırıyor hem de bu tür içerikte DAHA KÜÇÜK dosya veriyor
 * (ölçüm: 400×300 çizgi deseni → kayıplı 0,92'de 3.528 b, kayıpsızda 1.656 b).
 *
 * Fotoğrafta kayıpsız birkaç MB'a çıkar, boyut sınırına takılır ve merdiven
 * kayıplı basamaklara düşer — yani seçim içeriğe göre kendiliğinden yapılıyor.
 */
const QUALITY_LADDER = [1, 0.95, 0.92, 0.88, 0.82, 0.75, 0.68];

function draw(source: CanvasImageSource, w: number, h: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Tarayıcı canvas desteklemiyor");
  // VARSAYILAN "low" — ayarlanmazsa tarayıcı hızlı (kutu) filtre kullanır ve
  // küçültmede takma desen üretir. Perfore tavan paneli gibi ince tekrarlı
  // dokularda fark çok belirgin.
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, 0, 0, w, h);
  return canvas;
}

/**
 * Seçilen dosyayı yuvanın en uzun kenarına küçültüp WebP'ye çevirir.
 *
 * Neden istemcide: telefon fotoğrafı 4–8 MB gelir. Ham hâliyle gönderilirse hem
 * Vercel'in istek gövdesi sınırına takılır hem de repoya her yüklemede megabaytlar
 * commit'lenir. Sunucuda dönüştürmek sharp bağımlılığı gerektirirdi.
 *
 * Küçültme KADEMELİ: 2 kattan fazla inişi tek adımda yapmak, yüksek kaliteli
 * filtrede bile detay atlatır. Yarılayarak inip son adımı tam ölçüye çekmek
 * (klasik "mipmap" yaklaşımı) belirgin biçimde daha temiz sonuç veriyor.
 */
export type Encoded = {
  base64: string;
  blob: Blob;
  /** Kaynağın ve çıktının ölçüleri — panel bunları kullanıcıya gösteriyor. */
  sourceEdge: number;
  width: number;
  height: number;
  lossless: boolean;
};

export async function toWebp(file: File, maxEdge: number): Promise<Encoded> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    // En sık sebep: iPhone'dan gelen HEIC. accept="image/*" seçilmesine izin verir
    // ama tarayıcıların çoğu çözemez — kullanıcıya ne yapacağını söyle.
    throw new Error("Bu görsel biçimi okunamadı. JPEG veya PNG olarak kaydedip tekrar deneyin.");
  }

  const sourceEdge = Math.max(bitmap.width, bitmap.height);
  const scale = Math.min(1, maxEdge / sourceEdge);
  const targetW = Math.max(1, Math.round(bitmap.width * scale));
  const targetH = Math.max(1, Math.round(bitmap.height * scale));

  let surface: CanvasImageSource = bitmap;
  let curW = bitmap.width;
  let curH = bitmap.height;
  while (curW > targetW * 2 && curH > targetH * 2) {
    curW = Math.max(targetW, Math.round(curW / 2));
    curH = Math.max(targetH, Math.round(curH / 2));
    surface = draw(surface, curW, curH);
  }
  const canvas = curW === targetW && curH === targetH && surface !== bitmap
    ? (surface as HTMLCanvasElement)
    : draw(surface, targetW, targetH);
  bitmap.close();

  let blob: Blob | null = null;
  let used = QUALITY_LADDER[QUALITY_LADDER.length - 1];
  for (const quality of QUALITY_LADDER) {
    blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", quality),
    );
    if (!blob) throw new Error("Görsel WebP'ye çevrilemedi");
    if (blob.type !== "image/webp") throw new Error("Tarayıcı WebP üretemedi");
    used = quality;
    if (blob.size <= TARGET_BYTES) break;
  }
  if (!blob) throw new Error("Görsel WebP'ye çevrilemedi");

  const buf = await blob.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buf);
  // Tek seferde String.fromCharCode(...bytes) büyük dosyada yığın taşırır; parça parça.
  for (let i = 0; i < bytes.length; i += 8192) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  }
  return { base64: btoa(binary), blob, sourceEdge, width: targetW, height: targetH, lossless: used === 1 };
}

/** Dosyayı olduğu gibi base64'e çevirir — PDF dönüştürülmüyor. */
export async function rawBase64(file: File): Promise<string> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let binary = "";
  for (let i = 0; i < bytes.length; i += 8192) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  }
  return btoa(binary);
}
