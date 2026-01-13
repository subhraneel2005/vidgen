import { createTikTokStyleCaptions } from "@remotion/captions";
import { loadFont } from "@remotion/google-fonts/TikTokSans";
import type { Caption } from "@remotion/captions";

export default function TiktokCaptions({ captions }: { captions: Caption[] }) {
  const { pages } = createTikTokStyleCaptions({
    captions,
    combineTokensWithinMilliseconds: 1200,
  });

  const { fontFamily } = loadFont();

  return (
    <div>
      {pages.map((page, i) => (
        <span
          style={{ fontFamily, fontWeight: 900 }}
          className="p-3 text-[80px] tracking-[-1.1px] max-w-4xl w-full text-center text-white rounded-4xl flex-wrap text-shadow-2xs uppercase absolute bottom-[20%]"
          key={i}
        >
          {page.text}
        </span>
      ))}
    </div>
  );
}
