import fs from "node:fs";
import path from "node:path";

export type GalleryImage = {
  filename: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

const ACCEPTED_EXT = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg"] as const;

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");

// Common automotive acronyms / model designations that should stay uppercase
// when generated from a lower-cased filename token. Matched as whole words.
const ACRONYMS = new Set([
  "bmw", "amg", "rs", "rs3", "rs5", "rs6", "rs7", "ls", "gt", "gts",
  "gti", "gtr", "gle", "glc", "gls", "glb", "ev", "phev", "suv",
  "m2", "m3", "m4", "m5", "m6", "m8",
  "x1", "x2", "x3", "x4", "x5", "x6", "x7",
  "q3", "q5", "q7", "q8",
  "a3", "a4", "a5", "a6", "a7", "a8",
  "f150", "f250", "f350",
  "lx", "gx", "rx", "nx", "is", "es",
  "amg", "stg", "uk", "usa", "ca",
]);

function smartCase(word: string): string {
  if (ACRONYMS.has(word.toLowerCase())) return word.toUpperCase();
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function titleFromFilename(filename: string): string {
  const base = path.basename(filename, path.extname(filename));
  // Strip a leading YYYY-MM-DD date prefix, OR a "placeholder-NN-" prefix,
  // OR a leading "NN-" sequence number. Keep the remaining descriptive part.
  let stripped = base.replace(/^\d{4}-\d{2}-\d{2}[-_\s]*/, "");
  stripped = stripped.replace(/^placeholder[-_]?\d+[-_]?/, "");
  stripped = stripped.replace(/^\d+[-_]/, "");
  const tokens = stripped
    .split(/[-_\s]+/)
    .map((t) => t.trim())
    .filter(Boolean);
  if (tokens.length === 0) {
    return "Mobile detailing photo — Crystal Coat in Port Coquitlam, BC";
  }
  const phrase = tokens.map(smartCase).join(" ");
  return `${phrase} — Crystal Coat Mobile detailing in Port Coquitlam, BC`;
}

export function getGalleryImages(): GalleryImage[] {
  if (!fs.existsSync(GALLERY_DIR)) return [];

  const files = fs
    .readdirSync(GALLERY_DIR)
    .filter((f) => !f.startsWith("."))
    .filter((f) =>
      ACCEPTED_EXT.includes(
        path.extname(f).toLowerCase() as (typeof ACCEPTED_EXT)[number],
      ),
    );

  files.sort((a, b) => {
    const aMatch = a.match(/^(\d{4}-\d{2}-\d{2})/);
    const bMatch = b.match(/^(\d{4}-\d{2}-\d{2})/);
    if (aMatch && bMatch) return bMatch[1].localeCompare(aMatch[1]); // newest first
    if (aMatch) return -1;
    if (bMatch) return 1;
    return a.localeCompare(b);
  });

  return files.map((f) => ({
    filename: f,
    src: `/gallery/${f}`,
    alt: titleFromFilename(f),
    width: 1200,
    height: 800,
  }));
}
