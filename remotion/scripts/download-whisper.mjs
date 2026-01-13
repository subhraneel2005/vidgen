import path from 'path';
import {downloadWhisperModel} from '@remotion/install-whisper-cpp';
 
const {alreadyExisted} = await downloadWhisperModel({
  model: 'medium.en',
  folder: path.join(process.cwd(), 'whisper.cpp'),
});