import "server-only";
import matter from "gray-matter";
import type { Locale } from "@/lib/i18n";
import type { PostFrontmatter } from "@/lib/blog-config";
import {
  mediaDir,
  slotFile,
  versionStamp,
  type MediaGroup,
  type MediaKind,
  type MediaManifest,
} from "@/lib/media-config";

// Admin panelin içerik katmanı: GitHub Contents API. Public site içeriği build anında
// dosyadan okur (lib/blog.ts); admin ise repo'nun ANLIK halini görsün diye doğrudan
// GitHub'a sorar. Böylece yeni commit sonrası panel deploy beklemeden güncel olur ve
// serverless'ta çalışma anında dosya sistemine bağımlılık kalmaz.
//
// Token yalnız sunucuda kullanılır; hiçbir değeri istemciye sızmaz.

const API = "https://api.github.com";

type RepoConfig = { owner: string; repo: string; branch: string; token: string };

function config(): RepoConfig {
  const token = process.env.GITHUB_TOKEN;
  const slug = process.env.GITHUB_REPO;
  if (!token) throw new Error("GITHUB_TOKEN tanımlı değil");
  if (!slug || !slug.includes("/")) throw new Error("GITHUB_REPO 'sahip/repo' biçiminde olmalı");
  const [owner, repo] = slug.split("/");
  return { owner, repo, branch: process.env.GITHUB_BRANCH || "main", token };
}

async function gh(path: string, init?: RequestInit) {
  const { token } = config();
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.headers ?? {}),
    },
    // Panel her zaman güncel repo durumunu göstermeli.
    cache: "no-store",
  });
  return res;
}

function contentPath(locale: Locale, slug: string): string {
  return `content/blog/${locale}/${slug}.md`;
}

export type AdminPost = PostFrontmatter & {
  slug: string;
  locale: Locale;
  body: string;
  /** GitHub blob SHA — güncellemede zorunlu, aynı zamanda çakışma koruması. */
  sha: string;
};

export type AdminPostSummary = Omit<AdminPost, "body" | "sha"> & { sha: string };

/** Bir dildeki tüm yazıların özetleri. Dosya yoksa boş liste döner (henüz yazı yok). */
export async function listPosts(locale: Locale): Promise<AdminPostSummary[]> {
  const { owner, repo, branch } = config();
  const res = await gh(`/repos/${owner}/${repo}/contents/content/blog/${locale}?ref=${branch}`);
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`GitHub listeleme hatası (${res.status})`);

  const entries = (await res.json()) as { name: string; type: string }[];
  const files = entries.filter((e) => e.type === "file" && e.name.endsWith(".md"));

  const posts = await Promise.all(
    files.map(async (f) => {
      const post = await getPost(locale, f.name.replace(/\.md$/, ""));
      if (!post) return null;
      // Liste görünümü gövdeyi taşımaz; yalnız çekmece açılınca ayrıca çekilir.
      const { body, ...summary } = post;
      void body;
      return summary;
    }),
  );
  return posts
    .filter((p): p is AdminPostSummary => p !== null)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export async function getPost(locale: Locale, slug: string): Promise<AdminPost | null> {
  const { owner, repo, branch } = config();
  const res = await gh(
    `/repos/${owner}/${repo}/contents/${contentPath(locale, slug)}?ref=${branch}`,
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub okuma hatası (${res.status})`);

  const file = (await res.json()) as { content: string; sha: string };
  const raw = Buffer.from(file.content, "base64").toString("utf8");
  const { data, content } = matter(raw);
  return { ...(data as PostFrontmatter), slug, locale, body: content, sha: file.sha };
}

/**
 * Yazıyı repoya commit'ler. `sha` verilirse güncelleme, verilmezse yeni dosya.
 * Güncellemede yanlış sha → GitHub 409 döner; bu, iki kişi aynı yazıyı düzenlerse
 * birinin diğerinin üstüne sessizce yazmasını engelleyen çakışma korumasıdır.
 */
export async function putPost(input: {
  locale: Locale;
  slug: string;
  frontmatter: PostFrontmatter;
  body: string;
  sha?: string;
  message: string;
}): Promise<{ sha: string; commitUrl: string }> {
  const { owner, repo, branch } = config();
  // gray-matter frontmatter'ı YAML olarak serialize eder; okuma yolu da aynı kütüphane.
  const file = matter.stringify(input.body.trim() + "\n", input.frontmatter);

  const res = await gh(`/repos/${owner}/${repo}/contents/${contentPath(input.locale, input.slug)}`, {
    method: "PUT",
    body: JSON.stringify({
      message: input.message,
      content: Buffer.from(file, "utf8").toString("base64"),
      branch,
      ...(input.sha ? { sha: input.sha } : {}),
    }),
  });

  if (res.status === 409 || res.status === 422) {
    throw new Error("Bu yazı başka bir yerden değiştirilmiş. Sayfayı yenileyip tekrar deneyin.");
  }
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`GitHub yazma hatası (${res.status}): ${detail.slice(0, 200)}`);
  }

  const out = (await res.json()) as { content: { sha: string }; commit: { html_url: string } };
  return { sha: out.content.sha, commitUrl: out.commit.html_url };
}

/** Türkçe karakterleri düşürerek dosya adı güvenli slug üretir. */
export function slugifyTitle(title: string): string {
  const map: Record<string, string> = {
    ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u",
  };
  return (
    title
      .toLocaleLowerCase("tr-TR")
      .split("")
      .map((ch) => map[ch] ?? ch)
      .join("")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 60) || "yeni-yazi"
  );
}

// ---------------------------------------------------------------------------
// Proforma kayıtları — content/proforma/<no>.json
// Blog ile aynı desen: GitHub tek gerçeklik kaynağı, veritabanı yok. Numara
// sayacı ayrı bir yerde tutulmuyor; mevcut dosya adlarından türetiliyor, böylece
// sayaç ile dosyalar arasında tutarsızlık oluşamıyor.
// ---------------------------------------------------------------------------

const PROFORMA_DIR = "content/proforma";

export type ProformaRecord = {
  no: string;
  date: string;
  validity: number;
  currency: string;
  buyer: { company: string; attn: string; address: string; country: string };
  items: { id: string; code: string; name: string; hs: string; qty: number; unitPrice: number }[];
  discountPct: number;
  freight: number;
  incoterm: string;
  portLoad: string;
  portDisch: string;
  payment: string;
  notes: string;
  status: "draft" | "final";
  updatedAt: string;
};

export type ProformaSummary = {
  no: string;
  date: string;
  company: string;
  currency: string;
  total: number;
  status: ProformaRecord["status"];
  sha: string;
};

function proformaTotal(r: ProformaRecord): number {
  const sub = r.items.reduce((a, it) => a + (Number(it.qty) || 0) * (Number(it.unitPrice) || 0), 0);
  return sub - sub * ((Number(r.discountPct) || 0) / 100) + (Number(r.freight) || 0);
}

/** Dizindeki dosya adları. Dizin yoksa boş (henüz proforma kesilmemiş). */
async function proformaFiles(): Promise<{ name: string; sha: string }[]> {
  const { owner, repo, branch } = config();
  const res = await gh(`/repos/${owner}/${repo}/contents/${PROFORMA_DIR}?ref=${branch}`);
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`GitHub listeleme hatası (${res.status})`);
  const entries = (await res.json()) as { name: string; type: string; sha: string }[];
  return entries
    .filter((e) => e.type === "file" && e.name.endsWith(".json"))
    .map((e) => ({ name: e.name, sha: e.sha }));
}

export async function listProformas(): Promise<ProformaSummary[]> {
  const files = await proformaFiles();
  const out = await Promise.all(
    files.map(async (f) => {
      const rec = await getProforma(f.name.replace(/\.json$/, ""));
      if (!rec) return null;
      return {
        no: rec.record.no,
        date: rec.record.date,
        company: rec.record.buyer.company,
        currency: rec.record.currency,
        total: proformaTotal(rec.record),
        status: rec.record.status,
        sha: rec.sha,
      };
    }),
  );
  return out
    .filter((p): p is ProformaSummary => p !== null)
    .sort((a, b) => b.no.localeCompare(a.no));
}

export async function getProforma(
  no: string,
): Promise<{ record: ProformaRecord; sha: string } | null> {
  const { owner, repo, branch } = config();
  const res = await gh(`/repos/${owner}/${repo}/contents/${PROFORMA_DIR}/${no}.json?ref=${branch}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub okuma hatası (${res.status})`);
  const file = (await res.json()) as { content: string; sha: string };
  const raw = Buffer.from(file.content, "base64").toString("utf8");
  return { record: JSON.parse(raw) as ProformaRecord, sha: file.sha };
}

/**
 * Yıl içindeki en büyük sırayı bulup bir artırır: PI-2026-0007 varsa PI-2026-0008.
 * Sayaç dosyada tutulmadığı için "sayaç ilerledi ama kayıt oluşmadı" durumu yok.
 * Yarış durumunda iki kullanıcı aynı numarayı alırsa ikincinin yazması reddedilir
 * (putProforma sha'sız PUT gönderir, var olan dosyada GitHub 422 döner).
 */
export async function nextProformaNo(year: number): Promise<string> {
  const files = await proformaFiles();
  const prefix = `PI-${year}-`;
  const max = files
    .map((f) => f.name.replace(/\.json$/, ""))
    .filter((n) => n.startsWith(prefix))
    .map((n) => Number(n.slice(prefix.length)))
    .filter((n) => Number.isFinite(n))
    .reduce((a, b) => Math.max(a, b), 0);
  return `${prefix}${String(max + 1).padStart(4, "0")}`;
}

export async function putProforma(
  record: ProformaRecord,
  sha?: string,
): Promise<{ sha: string; commitUrl: string }> {
  const { owner, repo, branch } = config();
  const body = JSON.stringify(record, null, 2) + "\n";

  const res = await gh(`/repos/${owner}/${repo}/contents/${PROFORMA_DIR}/${record.no}.json`, {
    method: "PUT",
    body: JSON.stringify({
      message: `${sha ? "proforma: güncelle" : "proforma: yeni"} ${record.no}`,
      content: Buffer.from(body, "utf8").toString("base64"),
      branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (res.status === 409 || res.status === 422) {
    throw new Error(
      `${record.no} zaten var veya başka bir yerden değiştirilmiş. Listeyi yenileyip tekrar deneyin.`,
    );
  }
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`GitHub yazma hatası (${res.status}): ${detail.slice(0, 200)}`);
  }
  const out = (await res.json()) as { content: { sha: string }; commit: { html_url: string } };
  return { sha: out.content.sha, commitUrl: out.commit.html_url };
}

// ---------------------------------------------------------------------------
// Görsel yuvaları — public/gorseller/<grup>-<yuva>.webp + content/media.json
//
// İkilinin kendisi repoya commit'leniyor; ayrı depolama servisi yok. Bir yükleme
// İKİ commit üretir (önce görsel, sonra kayıt dosyası) çünkü Contents API tek
// PUT'ta tek dosya yazar. Sıra bilinçli: görsel önce gider, kayıt sonra — kayıtta
// görünen her dosyanın repoda karşılığı olduğu garanti olsun, tersi değil.
// Yarıda kalırsa ortaya sahipsiz bir görsel çıkar (zararsız), kırık kayıt çıkmaz.
//
// Dosya adı yuvadan türetiliyor ve uzantı daima .webp: panel görseli yüklemeden
// önce tarayıcıda WebP'ye çeviriyor. Böylece uzantı takibi ve yetim dosya sorunu
// oluşmuyor — aynı yuvaya ikinci yükleme aynı yolu ezer.
// ---------------------------------------------------------------------------

const MEDIA_MANIFEST = "content/media.json";

/**
 * Dosyanın blob sha'sı — DİZİN listesinden okunuyor, dosyanın kendisinden değil.
 *
 * Contents API tek dosyayı JSON olarak isterken 1 MB üstü blob'larda 403 döner;
 * o yol kullanılsaydı 1 MB'ı aşan bir görsel yüklendikten sonra aynı yuva bir
 * daha değiştirilemez ve silinemez hale gelirdi. Dizin listesinde boyut sınırı
 * yok, her girdi sha'sıyla geliyor.
 */
async function fileSha(dir: string, name: string): Promise<string | undefined> {
  const { owner, repo, branch } = config();
  const res = await gh(`/repos/${owner}/${repo}/contents/${dir}?ref=${branch}`);
  if (res.status === 404) return undefined;
  if (!res.ok) throw new Error(`GitHub okuma hatası (${res.status})`);
  const entries = (await res.json()) as { name: string; type: string; sha: string }[];
  return entries.find((e) => e.type === "file" && e.name === name)?.sha;
}

export async function getMediaManifest(): Promise<{ manifest: MediaManifest; sha?: string }> {
  const { owner, repo, branch } = config();
  const res = await gh(`/repos/${owner}/${repo}/contents/${MEDIA_MANIFEST}?ref=${branch}`);
  if (res.status === 404) return { manifest: {} };
  if (!res.ok) throw new Error(`GitHub okuma hatası (${res.status})`);
  const file = (await res.json()) as { content: string; sha: string };
  const raw = Buffer.from(file.content, "base64").toString("utf8");
  let manifest: MediaManifest;
  try {
    manifest = JSON.parse(raw) as MediaManifest;
  } catch {
    // Kayıt dosyası elle bozulmuşsa panel açılmaya devam etsin; boş sayılır ve
    // ilk yazmada geçerli JSON'a dönüşür. Repodaki görseller kaybolmaz.
    return { manifest: {}, sha: file.sha };
  }
  return { manifest, sha: file.sha };
}

/**
 * Kayıt dosyasını oku-değiştir-yaz döngüsüyle günceller (compare-and-swap).
 *
 * Değişiklik DAİMA taze okunan nesneye uygulanır ve O OKUMANIN sha'sıyla yazılır.
 * Önceki sürüm içeriği çağıranın eski okumasından, sha'yı ise yazmadan hemen
 * önceki ikinci bir okumadan alıyordu; bu ikisi eşleşmediği için GitHub'ın
 * iyimser kilidi tamamen devre dışı kalıyor ve eşzamanlı iki yükleme
 * birbirinin kaydını SESSİZCE siliyordu (dosya repoda kalır, kaydı kaybolur).
 * Araya başka bir yazma girerse artık 409/422 gelir ve yeniden denenir.
 */
async function updateManifest(
  mutate: (m: MediaManifest) => void,
  message: string,
): Promise<void> {
  const { owner, repo, branch } = config();
  for (let attempt = 0; attempt < 3; attempt++) {
    const { manifest, sha } = await getMediaManifest();
    mutate(manifest);
    const body = JSON.stringify(manifest, null, 2) + "\n";

    const res = await gh(`/repos/${owner}/${repo}/contents/${MEDIA_MANIFEST}`, {
      method: "PUT",
      body: JSON.stringify({
        message,
        content: Buffer.from(body, "utf8").toString("base64"),
        branch,
        ...(sha ? { sha } : {}),
      }),
    });
    if (res.ok) return;
    // 409: bayat sha. 422: biz "dosya yok" sanarken başkası oluşturdu.
    // İkisi de "araya girildi" demek — taze okuyup tekrar dene.
    if (res.status === 409 || res.status === 422) continue;
    const detail = await res.text();
    throw new Error(`Kayıt dosyası yazılamadı (${res.status}): ${detail.slice(0, 200)}`);
  }
  throw new Error("Kayıt dosyası eşzamanlı değişiklik nedeniyle yazılamadı. Tekrar deneyin.");
}

/**
 * Görseli commit'ler ve kayıt dosyasına işler. base64 ham ikili (data URL öneki yok).
 *
 * Sıra: yeni dosya → kayıt → eski dosyanın silinmesi. Böylece kayıt hiçbir anda
 * var olmayan bir dosyayı göstermiyor; yarıda kalırsa en kötü ihtimalle repoda
 * kullanılmayan bir dosya kalır.
 */
export async function putMedia(input: {
  id: string;
  group: MediaGroup;
  key: string;
  kind: MediaKind;
  base64: string;
}): Promise<{ file: string; commitUrl: string }> {
  const { owner, repo, branch } = config();
  const dir = mediaDir(input.kind);

  // Önceki dosya adı sonda silinecek; okuma en başta, henüz hiçbir şey
  // commit'lenmemişken yapılıyor ki hata durumunda yetim dosya kalmasın.
  const { manifest } = await getMediaManifest();
  const previousFile = manifest[input.id]?.file;

  const updatedAt = new Date().toISOString();
  const file = slotFile(input.group, input.key, versionStamp(updatedAt), input.kind);
  const path = `${dir}/${file}`;

  const res = await gh(`/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    body: JSON.stringify({
      message: `görsel: ${input.id}`,
      content: input.base64,
      branch,
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Görsel yüklenemedi (${res.status}): ${detail.slice(0, 200)}`);
  }
  const out = (await res.json()) as { commit: { html_url: string } };

  await updateManifest((m) => {
    m[input.id] = { file, updatedAt };
  }, `görsel kaydı: ${input.id}`);

  // Eski sürüm artık hiçbir yerden gösterilmiyor. Silinemezse yalnızca repoda
  // kullanılmayan bir dosya kalır — yüklemeyi başarısız saymaya değmez.
  if (previousFile && previousFile !== file) {
    try {
      await deleteMediaFile(dir, previousFile, `eski dosya silindi: ${input.id}`);
    } catch {
      // yut: kullanıcının işlemi başarıyla tamamlandı
    }
  }

  return { file, commitUrl: out.commit.html_url };
}

async function deleteMediaFile(dir: string, file: string, message: string): Promise<void> {
  const { owner, repo, branch } = config();
  const sha = await fileSha(dir, file);
  if (!sha) return;
  const res = await gh(`/repos/${owner}/${repo}/contents/${dir}/${file}`, {
    method: "DELETE",
    body: JSON.stringify({ message, sha, branch }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Görsel silinemedi (${res.status}): ${detail.slice(0, 200)}`);
  }
}

/**
 * Kaydı ve görsel dosyasını siler. Kayıtta yoksa hiçbir şey yapmaz (false döner).
 *
 * Önce DOSYA, sonra kayıt. Ters sıra kurtarılamaz bir duruma düşürüyordu: kayıt
 * silinip dosya silme hata alırsa görsel yayında kalır ama panelde kaydı
 * olmadığı için "Kaldır" düğmesi bir daha hiç görünmezdi. Bu sırada ise arada
 * hata çıkarsa kayıt duruyor demektir; kullanıcı tekrar basar, dosya zaten
 * gitmiş olduğu için ikinci deneme temiz kapanır.
 */
export async function removeMedia(id: string, kind: MediaKind): Promise<boolean> {
  const { manifest } = await getMediaManifest();
  const entry = manifest[id];
  if (!entry) return false;

  await deleteMediaFile(mediaDir(kind), entry.file, `dosya silindi: ${id}`);
  await updateManifest((m) => {
    delete m[id];
  }, `görsel kaydı silindi: ${id}`);
  return true;
}
