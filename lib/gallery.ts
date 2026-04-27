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

function titleFromFilename(filename: string): string {
  const base = path.basename(filename, path.extname(filename));
  // Strip leading YYYY-MM-DD prefix if present.
  const stripped = base.replace(/^\d{4}-\d{2}-\d{2}[-_\s]*/, "");
  const cleaned = stripped.replace(/[-_]+/g, " ").trim();
  if (!cleaned) return "Crystal Coat detailing photo";
  return (
    cleaned.charAt(0).toUpperCase() +
    cleaned.slice(1) +
    " — Crystal Coat Mobile detailing"
  );
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
