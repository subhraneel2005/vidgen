"use server"

import { toCaptions, transcribe } from "@remotion/install-whisper-cpp";
import path from "path";
import fs from "fs";

export async function getCaptions(audioPath: string) {
  const inputPath = path.isAbsolute(audioPath)
    ? audioPath
    : path.join(process.cwd(), audioPath);

  const whisperCppOutput = await transcribe({
    inputPath,
    whisperPath: path.join(process.cwd(), "whisper.cpp"),
    whisperCppVersion: "1.5.5",
    model: "medium.en",
    tokenLevelTimestamps: true,
  });

  const { captions } = toCaptions({ whisperCppOutput });

  const fileName = `captions-${Date.now()}.json`;
  
  const captionsDir = path.join(process.cwd(), "remotion/captions");
  if (!fs.existsSync(captionsDir)) {
    fs.mkdirSync(captionsDir, { recursive: true });
  }

  const captionsPath = path.join(captionsDir, fileName);

  fs.writeFileSync(captionsPath, JSON.stringify(captions, null, 2));

  
  return {
    captionsPath: `remotion/captions/${fileName}`,
  };
}