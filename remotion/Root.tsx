import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import captions from "./captions.json";

const fps = 30;
const lastCaption = captions[captions.length - 1];
const durationInFrames = Math.ceil((lastCaption.endMs / 1000) * fps);

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MyVideo"
      component={MyComposition}
      durationInFrames={durationInFrames}
      fps={fps}
      width={1080}
      height={1920}
      defaultProps={{ captions }}
    />
  );
};
