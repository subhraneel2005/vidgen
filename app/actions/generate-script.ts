"use server";

import { Genre, genreSchema } from "@/types/storyGenre";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import z from "zod";
import { redditStorySystemPrompt } from "@/lib/prompts/reddit-story"

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
});

export async function generateStory(genre: Genre) {

  const validateGenre = genreSchema.parse(genre);
  const userPrompt = `Generate a viral Reddit story based on the genre: "${validateGenre}". Focus on making it dramatic, emotionally resonant, and highly shareable for short-form video content.`;

  const {output} = await generateText({
    model: google("gemini-2.5-flash"),
    system: redditStorySystemPrompt,
    output: Output.object({
      schema: z.object({
        hook: z.string().describe("One sentence hook. No commas if possible."),
        story: z.string().describe("6 to 8 paragraphs. 130 to 160 words total.")
      })
    }),
    prompt: userPrompt
  });

 
    return output;

}
