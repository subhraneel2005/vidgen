"use client"
import { MyComposition } from "../remotion/Composition"
import captions from "../remotion/captions.json";
import { Player } from "@remotion/player"

export default function FinalVideo() {

    const fps = 30;
const lastCaption = captions[captions.length - 1];
const durationInFrames = Math.ceil((lastCaption.endMs / 1000) * fps);

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
    </div>
  )
}