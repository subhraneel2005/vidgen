import { RenderButton } from "@/components/render-button";
import ChooseHighlightColor from "@/components/screens/choose-highlight-color";
import ChooseBGVideo from "@/components/screens/choose-stock-bg";
import GenerateAudio from "@/components/screens/generate-audio-screen";
import GenerateCaptions from "@/components/screens/generate-captions-screen";
import ScriptGenerator from "@/components/screens/script-generator";


export default function Page() {
  return (
    <div className="flex-1 mt-6 ml-6 space-y-6">

      {/* correct */}
      <ScriptGenerator />

      {/* correct */}
      <GenerateAudio />

      {/* incorrect, captions are getting generated manually r9*/}
      <GenerateCaptions />

      {/* correct */}
      <ChooseBGVideo />

      {/* correct */}
      <ChooseHighlightColor />

      <RenderButton />
    </div>
  );
}
