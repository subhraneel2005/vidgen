import {
  AbsoluteFill,
  Audio,
  Html5Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/TikTokSans";
import { createTikTokStyleCaptions } from "@remotion/captions";
import type { Caption } from "@remotion/captions";
import CaptionText from "./CaptionText";

type Props = {
  captions: Caption[];
};

export const MyComposition: React.FC<Props> = ({ captions }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { fontFamily } = loadFont();

  const { pages } = createTikTokStyleCaptions({
    captions,
    combineTokensWithinMilliseconds: 1200,
  });

  return (
    <AbsoluteFill className="flex w-full h-full justify-center items-center bg-black">
      <Html5Audio src={staticFile("/audios/audio_16k.wav")} />

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
