import fs from "fs/promises";
import path from "path";
import { defaultContent, type SiteContent } from "@/data/content";
import { hasGithub, commitFile } from "@/lib/github";

// ---------------------------------------------------------------
//  Obsah webu je uložený v souboru content/site.json v repozitáři.
//  Čtení: ze souboru (fallback = výchozí hodnoty z content.ts).
//  Ukládání: v produkci commit do GitHubu, lokálně zápis do souboru.
// ---------------------------------------------------------------

const CONTENT_PATH = path.join(process.cwd(), "content", "site.json");
const REPO_FILE = "content/site.json";

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(CONTENT_PATH, "utf8");
    const stored = JSON.parse(raw) as Partial<SiteContent>;
    return { ...defaultContent, ...stored };
  } catch {
    return defaultContent;
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  const json = JSON.stringify(content, null, 2);
  if (hasGithub()) {
    const base64 = Buffer.from(json, "utf8").toString("base64");
    await commitFile(
      REPO_FILE,
      base64,
      "Admin: úprava obsahu webu"
    );
  } else {
    // lokální vývoj bez GitHub tokenu — zápis přímo do souboru
    await fs.mkdir(path.dirname(CONTENT_PATH), { recursive: true });
    await fs.writeFile(CONTENT_PATH, json, "utf8");
  }
}

// Uloží fotku (base64) do public/kandidati/. Vrací veřejnou cestu.
export async function savePhoto(
  filename: string,
  dataBase64: string
): Promise<string> {
  const safe = sanitizeFilename(filename);
  const repoPath = `public/kandidati/${safe}`;
  if (hasGithub()) {
    await commitFile(repoPath, dataBase64, `Admin: nahrání fotky ${safe}`);
  } else {
    const localPath = path.join(process.cwd(), "public", "kandidati", safe);
    await fs.mkdir(path.dirname(localPath), { recursive: true });
    await fs.writeFile(localPath, Buffer.from(dataBase64, "base64"));
  }
  return `/kandidati/${safe}`;
}

function sanitizeFilename(name: string): string {
  const dot = name.lastIndexOf(".");
  let ext = dot >= 0 ? name.slice(dot + 1).toLowerCase() : "jpg";
  if (!/^(jpg|jpeg|png|webp|gif)$/.test(ext)) ext = "jpg";
  // NFD rozloží diakritiku na písmeno + značku; značky (ani jiné znaky)
  // neprojdou filtrem [a-z0-9], takže z "Macůrek" zbude "macurek".
  const base =
    (dot >= 0 ? name.slice(0, dot) : name)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "foto";
  return `${base}-${Date.now()}.${ext}`;
}
