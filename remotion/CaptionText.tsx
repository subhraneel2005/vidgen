"use client"

import { useVideoStoryStore } from "@/store/useVideoStoryStore";
import { TikTokPage } from "@remotion/captions";
import {
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";



export default function CaptionText({
  page,
  fontFamily,
}: {
  page: TikTokPage;
  fontFamily: string;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timeMs = (frame / fps) * 1000;

  const enter = spring({
    frame,
    fps,
    durationInFrames: 6,
    config: {
      damping: 200,
    },
  });

  const { highlightColor } = useVideoStoryStore();

  return (
    <div
      style={{ fontFamily, fontWeight: 900, transform: `scale(${enter})` }}
      className="px-6 text-[60px] tracking-[-1.1px] max-w-full w-full text-center text-white flex items-center justify-center flex-wrap text-shadow-2xs uppercase absolute bottom-[20%]"
    >
      {page.tokens.map((t) => {
        const active =
          timeMs >= t.fromMs - page.startMs && timeMs < t.toMs - page.startMs;

        return (
          <span
            key={t.fromMs}
            style={{
              backgroundColor: active ? highlightColor : "transparent",
              color: "white",
              padding: active ? "10px 16px" : "0px",
              borderRadius: active ? "20px" : "0px",
              whiteSpace: "pre",
              display: "inline-block",
              margin: "0 4px",
              textShadow: active
                ? `
                -3px -3px 0 #000,
                3px -3px 0 #000,
                -3px  3px 0 #000,
                3px  3px 0 #000,
                -3px  0px 0 #000,
                3px  0px 0 #000,
                0px -3px 0 #000,
                0px  3px 0 #000
              `
                : "none",
            }}
          >
            {t.text}
          </span>
        );
      })}
    </div>
  );
}
