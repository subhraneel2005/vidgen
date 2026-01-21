import ChooseBGVideo from "@/components/screens/choose-stock-bg";
import ScriptGenerator from "@/components/screens/script-generator";


export default function Page() {
  return (
    <div className="flex-1 mt-6 ml-6 space-y-6">
      <ScriptGenerator />
      <ChooseBGVideo />
    </div>
  );
}
