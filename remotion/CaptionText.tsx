import { TikTokPage } from "@remotion/captions";
import React from "react";
import {
  AbsoluteFill,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const HIGHLIGHT = "#39E508"; // green

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
      stiffness: 50,
    },
  });

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
              color: active ? HIGHLIGHT : "white",
              whiteSpace: "pre",
            }}
          >
            {t.text}
          </span>
        );
      })}
    </div>
  );
}
