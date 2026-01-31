import path from 'path';
import { downloadWhisperModel } from '@remotion/install-whisper-cpp';

const { alreadyExisted } = await downloadWhisperModel({
  model: 'tiny.en',
  folder: path.join(process.cwd(), 'whisper.cpp'),
});