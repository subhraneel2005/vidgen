import {
  AbsoluteFill,
  Audio,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  OffthreadVideo,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/TikTokSans";
import { createTikTokStyleCaptions } from "@remotion/captions";
import type { Caption } from "@remotion/captions";
import CaptionText from "./CaptionText";
import RedditOverlay from "./RedditOverlay,";

type Props = {
  captions: Caption[];
  audioUrl: string;
  hook: string;
  highlightColor: string;
  videoUrl?: string | null;
};

// remotion/Composition.tsx
export const MyComposition: React.FC<Props> = ({
  captions,
  audioUrl,
  hook,
  highlightColor,
  videoUrl,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { fontFamily } = loadFont();

  const OVERLAY_DURATION = 15 * fps;

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
      {/* Background Video */}
      {videoUrl && (
        <AbsoluteFill>
          <OffthreadVideo
            src={staticFile(videoUrl)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            delayRenderTimeoutInMilliseconds={120000} // 2 minutes for Cloudinary
            delayRenderRetries={5} // Retry 5 times
          />
          <AbsoluteFill
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}
          />
        </AbsoluteFill>
      )}

      {/* Audio */}
      <Audio src={staticFile(audioUrl)} />

      {/* Reddit Overlay */}
      <Sequence from={0} durationInFrames={OVERLAY_DURATION}>
        <div
          style={{
            transform: `scale(${pop})`,
            opacity: pop,
            fontFamily,
          }}
          className="w-full flex justify-center items-center px-6"
        >
          <RedditOverlay hook={hook} />
        </div>
      </Sequence>

      {/* Captions */}
      {pages.map((page, i) => {
        const startFrame = Math.round((page.startMs / 1000) * fps);

        return (
          <Sequence
            key={i}
            from={startFrame}
            durationInFrames={Math.round((page.durationMs / 1000) * fps)}
          >
            <CaptionText
              page={page}
              fontFamily={fontFamily}
              highlightColor={highlightColor}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};