import path from 'path';
import {installWhisperCpp} from '@remotion/install-whisper-cpp';
 
const {alreadyExisted} = await installWhisperCpp({
  to: path.join(process.cwd(), 'whisper.cpp'),
  version: '1.5.5', 
});