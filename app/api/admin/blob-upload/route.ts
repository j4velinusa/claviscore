import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { hasSession } from "@/lib/admin/auth";
import {
  ALL_SLOTS,
  blogCoverSlot,
  docSlot,
  isBlogSlotId,
  isDocSlotId,
  slotId,
  slotKind,
} from "@/lib/media-config";

// Görseller ve belgeler için doğrudan yükleme uç noktası.
//
// Dosya fonksiyondan HİÇ geçmiyor: tarayıcı doğrudan blob deposuna yüklüyor,
// bu uç nokta yalnız kısa ömürlü bir yükleme jetonu üretiyor. Depoya yazma
// yetkisi (BLOB_READ_WRITE_TOKEN) sunucuda kalıyor.
//
// İki sebep: (1) 60 MB'lık katalog sunucusuz fonksiyonun 4,5 MB'lık istek
// gövdesinden geçemiyor; (2) dosyayı repoya commit'lemek her yüklemede bir
// dağıtım harcıyordu ve günlük kota doluyordu.

export async function POST(request: Request): Promise<NextResponse> {
  // Jeton üretmeden ÖNCE oturum kontrolü: aksi hâlde herkes depoya yazabilirdi.
  if (!(await hasSession())) {
    return NextResponse.json({ error: "Oturum yok" }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // pathname istemciden geliyor; kayıtlı bir yuvaya ait olduğunu doğrula.
        const id = decodeURIComponent(pathname.split("/")[0] ?? "");
        const slot = isBlogSlotId(id)
          ? blogCoverSlot(id)
          : isDocSlotId(id)
            ? docSlot(id)
            : ALL_SLOTS.find((s) => slotId(s.group, s.key) === id);
        if (!slot) throw new Error("Bilinmeyen yuva");
        const isPdf = slotKind(slot) === "pdf";
        return {
          allowedContentTypes: isPdf ? ["application/pdf"] : ["image/webp"],
          // Belgede 100 MB (60 MB'lık katalog rahat sığsın), görselde 8 MB —
          // panel zaten 1,7 MB hedefiyle kodluyor, bu üst savunma.
          maximumSizeInBytes: isPdf ? 100 * 1024 * 1024 : 8 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      // Yükleme bitince blob bu callback'i çağırır. Kaydı istemci ayrıca
      // /api/admin/media'ya bildiriyor; burada ek bir iş yapmıyoruz çünkü
      // localhost'ta bu callback'e ulaşılamaz ve akış ona bağlı olmamalı.
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
