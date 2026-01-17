import { generateStory } from "../actions/generate-script";

export async function testScriptGenerator(){
    await generateStory("revenge")
}