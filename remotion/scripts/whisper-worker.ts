// remotion/scripts/whisper-worker.ts
import { transcribe, toCaptions } from "@remotion/install-whisper-cpp";
import path from "path";
import fs from "fs";

const audioPath = path.join(process.cwd(), "public", process.argv[2]);
if (!fs.existsSync(audioPath)) {
  console.error("File not found:", audioPath);
  process.exit(1);
}

(async () => {
  const whisperCppOutput = await transcribe({
    inputPath: path.resolve(audioPath),
    whisperPath: path.resolve("whisper.cpp"),
    whisperCppVersion: "1.5.5",
    model: "tiny.en",
    tokenLevelTimestamps: true,
  });

  const { captions } = toCaptions({ whisperCppOutput });

  const captionsDir = path.resolve("remotion/captions");
  if (!fs.existsSync(captionsDir)) fs.mkdirSync(captionsDir, { recursive: true });

  const captionsFileName = path.basename(audioPath, path.extname(audioPath)) + "-captions.json";
  const captionsPath = path.join(captionsDir, captionsFileName);

  fs.writeFileSync(captionsPath, JSON.stringify(captions, null, 2));
  console.log(captionsPath); // only output path for Node parent to read
})();
