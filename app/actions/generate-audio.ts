import { cleanText } from "../test/actions";
import { generateStory } from "./generate-script";
import { createElevenLabs, elevenlabs } from '@ai-sdk/elevenlabs';
import { experimental_generateSpeech as generateSpeech} from "ai"

export async function generateAudio(){
    const rawText = await generateStory("relationships")
    const cleanedStory = cleanText(rawText.story);

    try {
        const result = await generateSpeech({
            model: elevenlabs.speech('eleven_flash_v2'),
            text: cleanedStory,
            voice: "cgSgspJ2msm6clMCkdW9",
            providerOptions: {
                elevenlabs: {
                  voiceSettings: {
                    speed: 1.0,
                    stability: 0.5,
                    similarityBoost: 0.75,
                  },
                },
              }
        })

        return {
            audio: {
                base64: result.audio.base64,
                format: result.audio.format,
                mediaType: result.audio.mediaType,
                uint8Array: result.audio.uint8Array,
            },
            metadata: result.providerMetadata
        }
    } catch (error) {
        console.error('Error generating audio:', error);
        throw error;
    }
}