"use server"

import { elevenlabs } from '@ai-sdk/elevenlabs';
import { experimental_generateSpeech as generateSpeech} from "ai"
import { writeFile } from 'fs/promises';
import path from 'path';

export async function generateAudio(cleanedStory: string){
    // const rawText = await generateStory(genre)
    // const cleanedStory = cleanText(rawText.story);

    try {
        const result = await generateSpeech({
            model: elevenlabs.speech('eleven_flash_v2'),
            text: cleanedStory,
            voice: "cgSgspJ2msm6clMCkdW9",
            outputFormat: "pcm_16000",
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
        const fileName = `story-${Date.now()}.${result.audio.format}`;
        const filePath = path.join(process.cwd(), "public/audios", fileName);
    
        await writeFile(filePath, buffer);


        return {
            audio: {
                base64: result.audio.base64,
                format: result.audio.format,
                mediaType: result.audio.mediaType,
                uint8Array: result.audio.uint8Array,
                url: `/audios/${fileName}`
            },
            metadata: result.providerMetadata
        }
    } catch (error) {
        console.error('Error generating audio:', error);
        throw error;
    }
}