'use server'

import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition} from "@remotion/renderer"
import path from "path"
import fs from "fs"
import type { Caption } from '@remotion/captions';
import {webpackOverride} from "../../remotion/webpack-override.mjs"
// import { enableTailwind } from "@remotion/tailwind-v4"

export async function renderVideo(captions:Caption[]){
try {
    const compositionId = 'MyVideo';

    // const webpackOverridePath = path.resolve(process.cwd(), 'remotion/webpack-override.mjs');

    const bundleLocation = await bundle({
      entryPoint: path.resolve(process.cwd(), 'remotion/index.ts'),
       webpackOverride: webpackOverride, 
      onProgress: (progress) => {
        console.log(`Bundling: ${Math.round(progress*100)}%`);
      }
    });

    console.log("Bundle complete");

    const composition = await selectComposition({
        serveUrl: bundleLocation,
        id: compositionId,
        inputProps: { captions }
    })

    const videosDir = path.join(process.cwd(), 'public', 'videos');
    if (!fs.existsSync(videosDir)) {
      fs.mkdirSync(videosDir, { recursive: true });
    }

    const outputLocation = path.join(
      videosDir,
      `video-${Date.now()}.mp4`
    );

    await renderMedia({
        composition,
        serveUrl: bundleLocation,
        codec: 'h264',
        outputLocation,
        inputProps: { captions },
        onProgress: ({ progress, renderedFrames, encodedFrames}) => {
            console.log(
                `Rendering: ${Math.round(progress*100)}% |`+
                `Frames: ${renderedFrames}/${composition.durationInFrames} | ` +
                `Encoded: ${encodedFrames}`
            );
        }
    });

    console.log('Render complete!');

    const publicVideoUrl = `/videos/${path.basename(outputLocation)}`;
    
    return { success: true, url: publicVideoUrl };

} catch (error) {
    console.error('Render error:', error);
    return { success: false, error: String(error) };
}
}