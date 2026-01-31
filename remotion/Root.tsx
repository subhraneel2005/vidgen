import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import type { Caption } from "@remotion/captions";

const fps = 30;

// matches the structure of Zustand store's getRenderData fnc
interface RenderInputProps {
  hook: string;
  story: string;
  audioUrl: string;
  videoUrl: string;
  highlightColor: string;
  captions: Caption[];
}

export const RemotionRoot: React.FC = () => {
  // These will come from inputProps when rendering
  // For now, set default values for preview
  const defaultProps: RenderInputProps = {
    hook: "What's your most embarrassing moment?",
    story: "",
    audioUrl: "audio.mp3",
    videoUrl: "bg-video.mp4",
    highlightColor: "#ff0000",
    captions: [
      {
        text: "Sample caption",
        startMs: 0,
        endMs: 2000,
        timestampMs: 0,
        confidence: 1,
      },
    ],
  };

  // Calculate duration based on last caption
  const lastCaption = defaultProps.captions[defaultProps.captions.length - 1];
  const durationInFrames = Math.ceil((lastCaption.endMs / 1000) * fps);

  return (
    <Composition
      id="MyVideo"
      component={MyComposition}
      durationInFrames={durationInFrames}
      fps={fps}
      width={1080}
      height={1920}
      defaultProps={{
        captions: defaultProps.captions,
        audioUrl: defaultProps.audioUrl,
        hook: defaultProps.hook,
        highlightColor: defaultProps.highlightColor,
        videoUrl: defaultProps.videoUrl,
      }}
    />
  );
};