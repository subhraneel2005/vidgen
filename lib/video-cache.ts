// lib/videoCache.ts
import fs from "fs";
import path from "path";
import crypto from "crypto";

const CACHE_DIR = path.join(process.cwd(), "public", "video-cache");

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

export async function getCachedVideo(cloudinaryUrl: string): Promise<string> {
  // Create a hash of the URL to use as filename
  const urlHash = crypto.createHash("md5").update(cloudinaryUrl).digest("hex");
  const cachedPath = path.join(CACHE_DIR, `${urlHash}.mp4`);
  const relativePath = `video-cache/${urlHash}.mp4`;

  // Check if already cached
  if (fs.existsSync(cachedPath)) {
    console.log("Video found in cache:", relativePath);
    return relativePath;
  }

  // Download from Cloudinary
  console.log("Downloading video from Cloudinary...");
  const response = await fetch(cloudinaryUrl);
  
  if (!response.ok) {
    throw new Error(`Failed to download video: ${response.statusText}`);
  }

  const buffer = await response.arrayBuffer();
  fs.writeFileSync(cachedPath, Buffer.from(buffer));

  console.log("Video cached successfully:", relativePath);
  return relativePath;
}

// Optional: Clean up old cache files (older than 7 days)
export function cleanOldCache(daysOld = 7) {
  const files = fs.readdirSync(CACHE_DIR);
  const now = Date.now();
  const maxAge = daysOld * 24 * 60 * 60 * 1000;

  files.forEach((file) => {
    const filePath = path.join(CACHE_DIR, file);
    const stats = fs.statSync(filePath);
    const age = now - stats.mtimeMs;

    if (age > maxAge) {
      fs.unlinkSync(filePath);
      console.log(`Deleted old cache: ${file}`);
    }
  });
}