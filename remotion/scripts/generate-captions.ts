// import { toCaptions, transcribe } from "@remotion/install-whisper-cpp"
// import path from "path"

// const whisperCppOutput = await transcribe({
//     inputPath: path.join(process.cwd(), 'public/audios/audio_16k.wav'),
//     whisperPath: path.join(process.cwd(), 'whisper.cpp'),
//     whisperCppVersion: '1.5.5',
//     model: 'medium.en',
//     tokenLevelTimestamps: true,
// })

// const { captions } = toCaptions({
//     whisperCppOutput,
// });

// console.log(captions);

import { getCaptions } from "../../lib/getCaptions";
import fs from "fs";

(async () => {
  const captions = await getCaptions();
  fs.writeFileSync("remotion/captions.json", JSON.stringify(captions, null, 2));
})();
