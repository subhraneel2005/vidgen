import {
  AbsoluteFill,
  Audio,
  Html5Audio,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/TikTokSans";
import { createTikTokStyleCaptions } from "@remotion/captions";
import type { Caption } from "@remotion/captions";
import CaptionText from "./CaptionText";
import RedditOverlay from "./RedditOverlay,";

type Props = {
  captions: Caption[];
};

export const MyComposition: React.FC<Props> = ({ captions }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { fontFamily } = loadFont();

  const OVERLAY_DURATION = 15 * fps;

  // pop in animation
  const pop = spring({
    frame,
    fps,
    from: 0.8,
    to: 1,
    config: {
      mass: 0.6,
      damping: 12,
      stiffness: 100,
    },
  });

  const { pages } = createTikTokStyleCaptions({
    captions,
    combineTokensWithinMilliseconds: 1200,
  });

  return (
    <AbsoluteFill className="flex w-full h-full justify-center items-center bg-black">
      <Html5Audio src={staticFile("/audios/audio_16k.wav")} />

      <Sequence from={0} durationInFrames={OVERLAY_DURATION}>
        <div
          style={{
            transform: `scale(${pop})`,
            opacity: pop,
            fontFamily,
          }}
          className="w-full flex justify-center items-center px-6"
        >
          <RedditOverlay />
        </div>
      </Sequence>

      {pages.map((page, i) => {
        const startFrame = Math.round((page.startMs / 1000) * fps);

        return (
          <Sequence
            key={i}
            from={startFrame}
            durationInFrames={Math.round((page.durationMs / 1000) * fps)}
          >
            <CaptionText page={page} fontFamily={fontFamily} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
