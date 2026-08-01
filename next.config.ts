import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 yalnız burada sayılan kalite değerlerine izin veriyor; listede
    // olmayan bir q ile gelen istek 400 döner. Panelden yüklenen görsel zaten
    // bir kez kayıplı WebP'ye çevriliyor, optimizasyon ikinci kayıplı geçiş —
    // varsayılan 75 üst üste binince detay eriyor, o yüzden 90 kullanılıyor.
    // 75 listede kalıyor: ileride kalitenin önemsiz olduğu bir yer çıkarsa.
    // 100: hero ve mühendislik görselleri için. Panel artık uygun içerikte
    // KAYIPSIZ WebP üretiyor; optimizasyonun varsayılan 75'i o kazancı geri
    // yakardı. Bu ikisi büyük gösterildiği ve sayıca az olduğu için pahalı değil.
    qualities: [75, 90, 100],
    // Görseller artık blob deposunda: her yükleme repoya iki commit atıyordu ve
    // her commit bir dağıtım demekti — günlük dağıtım kotası bu yüzden doluyordu.
    // next/image uzak adresi beyaz listede değilse reddediyor.
    remotePatterns: [
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
