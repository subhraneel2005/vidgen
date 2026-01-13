import path from 'path';
import {transcribe} from '@remotion/install-whisper-cpp';
 
const {transcription} = await transcribe({
  inputPath: path.join(process.cwd(), 'public/audios/audio_16k.wav'),
  whisperPath: path.join(process.cwd(), 'whisper.cpp'),
  whisperCppVersion: '1.5.5',
  model: 'medium.en',
  tokenLevelTimestamps: true,
});
 
for (const token of transcription) {
  console.log(token.timestamps.from, token.timestamps.to, token.text);
}