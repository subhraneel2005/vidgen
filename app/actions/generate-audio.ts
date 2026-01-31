"use server"

import { elevenlabs } from '@ai-sdk/elevenlabs';
import { experimental_generateSpeech as generateSpeech} from "ai"
import { writeFile } from 'fs/promises';
import path from 'path';
import { mp3ToWav } from './mp3-16k_wav';

export async function generateAudio(cleanedStory: string){
    // const rawText = await generateStory(genre)
    // const cleanedStory = cleanText(rawText.story);

    try {
        const result = await generateSpeech({
            model: elevenlabs.speech('eleven_flash_v2'),
            text: cleanedStory,
            voice: "cgSgspJ2msm6clMCkdW9",
            outputFormat: "mp3",
            providerOptions: {
                elevenlabs: {
                  voiceSettings: {
                    speed: 1.0,
                    stability: 0.5,
                    similarityBoost: 0.75,
                  }
                },
              }
        })

        const buffer = Buffer.from(result.audio.base64, "base64");

        const baseName = `story-${Date.now()}`;
        const mp3Path = path.join(process.cwd(), "public/audios", `${baseName}.mp3`);
        const wavPath = path.join(process.cwd(), "public/audios", `${baseName}_16k.wav`);
    
        await writeFile(mp3Path, buffer);

        await mp3ToWav(mp3Path, wavPath);


        return {
            audio: {
                base64: result.audio.base64,
                format: result.audio.format,
                mediaType: result.audio.mediaType,
                uint8Array: result.audio.uint8Array,
                url: `/audios/${baseName}_16k.wav`,
            },
            metadata: result.providerMetadata
        }
    } catch (error) {
        console.error('Error generating audio:', error);
        throw error;
    }
}