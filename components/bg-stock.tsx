import {AbsoluteFill, staticFile} from "remotion";
import {OffthreadVideo} from "remotion";

export const MyBg = () => {
  return (
    <AbsoluteFill style={{zIndex: 0}}>
      <OffthreadVideo
        src={staticFile("bg.mp4")}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
        muted
      />
    </AbsoluteFill>
  );
};
