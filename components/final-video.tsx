"use client"
import { useState } from "react";
import { MyComposition } from "../remotion/Composition"
import captions from "../remotion/captions.json";
import { Player } from "@remotion/player"
import { renderVideo } from "@/app/actions/render-video";
import { Button } from "./ui/button";

export default function FinalVideo() {

  const [isRendering, setIsRendering] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  const fps = 30;
  const lastCaption = captions[captions.length - 1];
  const durationInFrames = Math.ceil((lastCaption.endMs / 1000) * fps);

  const handleRenderVideo = async () => {
    setIsRendering(true)
    setError(null)
    try {
      const result = await renderVideo(captions);

      if (result.success) {
        setVideoUrl(result.url!)
      } else {
        setError(result.error || 'Rendering video failed')
      }
    } catch (error) {
      setError(String(error));
    } finally {
      setIsRendering(false);
    }
  }

  return (
    <div className="min-h-screen w-full justify-center items-center flex flex-col">
      <Player
        component={MyComposition}
        durationInFrames={durationInFrames}
        fps={fps}
        compositionWidth={1080}
        compositionHeight={1920}
        controls
        inputProps={{ captions }}
        style={{
          width: '360px',
        }}
      />
      <Button className="mt-4" disabled={isRendering} onClick={handleRenderVideo}>
        {isRendering ? "Rendering" : "Render & Download"}
      </Button>


    </div>
  )
}