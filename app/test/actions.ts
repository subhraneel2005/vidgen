import { generateAudio } from "../actions/generate-audio";
import { writeFile } from "fs/promises"
import path, { format } from "path";

export function cleanText(input: string) {
    return input
      .replace(/'\s*\+\s*'/g, '')   
      .replace(/\\n\s*/g, '\n\n')   
      .trim();
  }
  

export async function testAudioGenerator(){
    const res = await generateAudio();
    
    // base64 to buffer
    const audioBuffer = Buffer.from(res.audio.base64, 'base64');

    // creating filename
    const fileName = `story-${Date.now()}.${res.audio.format}`;
    const filePath = path.join(process.cwd(), 'public', 'audios', fileName);
    
    // save file to dir
    await writeFile(filePath, audioBuffer)

    console.log(`audio file saved to: /public/audios/${fileName} `);
    
    return {
      url: `/audios/${fileName}`,
      format: res.audio.format,
      mediaType: res.audio.mediaType
    }
}