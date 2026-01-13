import { toCaptions, transcribe } from "@remotion/install-whisper-cpp";
import path from "path";

export async function getCaptions() {
  const whisperCppOutput = await transcribe({
    inputPath: path.join(process.cwd(), "public/audios/audio_16k.wav"),
    whisperPath: path.join(process.cwd(), "whisper.cpp"),
    whisperCppVersion: "1.5.5",
    model: "medium.en",
    tokenLevelTimestamps: true,
  });

  const { captions } = toCaptions({
    whisperCppOutput,
  });

  return captions;
}
