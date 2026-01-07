import {
  AbsoluteFill,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/TikTokSans";

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();

  const opacity = Math.min(1, frame / 60);
  const scale = spring({
    fps,
    frame,
  });
  const { fontFamily } = loadFont();

  return (
    <AbsoluteFill className="flex w-full h-full justify-center items-center bg-black">
      <span
        style={{ scale: scale, fontFamily, fontWeight: 900 }}
        className="p-3 text-[80px] tracking-[-1.1px] max-w-4xl w-full text-center text-white rounded-4xl flex-wrap text-shadow-2xs uppercase absolute bottom-[20%]"
      >
        That most people <span className="text-green-400">will use</span>
      </span>
    </AbsoluteFill>
  );
};
