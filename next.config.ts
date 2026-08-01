import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 yalnız burada sayılan kalite değerlerine izin veriyor; listede
    // olmayan bir q ile gelen istek 400 döner. Panelden yüklenen görsel zaten
    // bir kez kayıplı WebP'ye çevriliyor, optimizasyon ikinci kayıplı geçiş —
    // varsayılan 75 üst üste binince detay eriyor, o yüzden 90 kullanılıyor.
    // 75 listede kalıyor: ileride kalitenin önemsiz olduğu bir yer çıkarsa.
    qualities: [75, 90],
  },
};

export default nextConfig;
