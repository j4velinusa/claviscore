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

// Büyük belgeler (katalog, dergi) için doğrudan yükleme uç noktası.
//
// Neden ayrı bir yol: /api/admin/media dosyayı base64 olarak İSTEK GÖVDESİNDE
// taşıyor ve Vercel'in sunucusuz fonksiyonlarında gövde sınırı 4,5 MB — base64
// şişmesiyle pratik tavan ~3 MB. 60 MB'lık bir katalog oradan geçemez.
//
// Burada dosya fonksiyondan HİÇ geçmiyor: tarayıcı doğrudan blob deposuna
// yüklüyor, bu uç nokta yalnız kısa ömürlü bir yükleme jetonu üretiyor.
// Depoya yazma yetkisi (BLOB_READ_WRITE_TOKEN) sunucuda kalıyor.

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
        if (!slot || slotKind(slot) !== "pdf") {
          throw new Error("Bu yuvaya belge yüklenemez");
        }
        return {
          allowedContentTypes: ["application/pdf"],
          // 100 MB: 60 MB'lık katalog rahat sığsın, sınırsız da olmasın.
          maximumSizeInBytes: 100 * 1024 * 1024,
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
