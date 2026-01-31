// app/api/render-video/route.ts
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import type { Caption } from "@remotion/captions";
import { cleanOldCache, getCachedVideo } from "@/lib/video-cache";

export async function POST(request: Request) {
  const renderData = await request.json();

  // load captions
  let captions: Caption[] = [];
  if (renderData.captionsPath) {
    try {
      const captionsFullPath = path.join(process.cwd(), renderData.captionsPath);
      const captionsContent = fs.readFileSync(captionsFullPath, "utf-8");
      captions = JSON.parse(captionsContent);
    } catch (error) {
      console.error("Error loading captions:", error);
      return Response.json(
        { success: false, error: "Failed to load captions" },
        { status: 500 }
      );
    }
  }

  // Download and cache background video if it's from Cloudinary
  let videoUrl = renderData.videoUrl;
  if (videoUrl && videoUrl.includes("cloudinary.com")) {
    try {
      videoUrl = await getCachedVideo(videoUrl);
      console.log("Using cached video:", videoUrl);
    } catch (error) {
      console.error("Failed to cache video:", error);
      return Response.json(
        { success: false, error: "Failed to download background video" },
        { status: 500 }
      );
    }
  }

  // Create the final input props
  const inputProps = {
    hook: renderData.hook,
    story: renderData.story,
    audioUrl: renderData.audioUrl,
    videoUrl: videoUrl, // Use cached local path
    highlightColor: renderData.highlightColor,
    captions: captions,
  };

const bundleLocation = path.join(process.cwd(), "build");
  const outputDir = path.join(process.cwd(), "public", "videos");
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: "MyVideo",
      inputProps: inputProps,
      timeoutInMilliseconds: 60000,
    });

    const lastCaptionEndMs = captions.length
  ? Math.max(...captions.map(c => c.endMs))
  : 2000;

const durationInFrames = Math.ceil((lastCaptionEndMs / 1000) * 30);

// override duration
composition.durationInFrames = durationInFrames;


    const outputPath = path.join(outputDir, `story-${Date.now()}.mp4`);

    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation: outputPath,
      inputProps: inputProps,
      timeoutInMilliseconds: 300000,
    });

    // Clean old cache after successful render
    cleanOldCache(7);

    return Response.json({
      success: true,
      videoPath: `/videos/${path.basename(outputPath)}`,
    });
  } catch (error) {
    console.error("Rendering error:", error);
    return Response.json(
      { success: false, error: "Failed to render video" },
      { status: 500 }
    );
  }
}