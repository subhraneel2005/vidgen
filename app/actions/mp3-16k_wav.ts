"use server"

import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export async function mp3ToWav(mp3Path: string, wavPath: string) {
  await execFileAsync("ffmpeg", [
    "-y",
    "-i", mp3Path,
    "-ac", "1",
    "-ar", "16000",
    "-c:a", "pcm_s16le",
    wavPath,
  ]);
}