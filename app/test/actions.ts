import { generateStory } from "../actions/generate-script";

function cleanText(input: string) {
    return input
      .replace(/'\s*\+\s*'/g, '')   
      .replace(/\\n\s*/g, '\n\n')   
      .trim();
  }
  

export async function testScriptGenerator(){
    const rawText = await generateStory("revenge")
    const cleanedStory = cleanText(rawText.story);

    console.log(cleanedStory);


    return cleanedStory;
}