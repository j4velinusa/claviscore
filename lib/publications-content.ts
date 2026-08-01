import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import type { Publication } from "@/lib/publications";

// Yayın verisi: public site tarafı (build anında dosyadan okur).
// Panel tarafı repo'nun anlık halini GitHub API'den çeker — bkz. lib/admin/github.ts.
// Tipler ve kapak temaları lib/publications.ts'te; bu modül server-only olduğu
// için oradan içe aktarılamaz.

const FILE = path.join(process.cwd(), "content", "yayinlar.json");

export function readPublications(): Publication[] {
  try {
    const parsed = JSON.parse(readFileSync(FILE, "utf8"));
    // Dosya elle bozulursa site çökmesin; yayın listesi boş görünür.
    return Array.isArray(parsed) ? (parsed as Publication[]) : [];
  } catch {
    return [];
  }
}
