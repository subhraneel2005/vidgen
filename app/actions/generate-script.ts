"use server";

import { genreSchema } from "@/types/storyGenre";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import z from "zod";
import { redditStorySystemPrompt } from "@/lib/prompts/reddit-story"

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
});

export async function generateStory(genre: z.infer<typeof genreSchema>) {

  const validateGenre = genreSchema.parse(genre);
  const userPrompt = `Generate a viral Reddit story based on the genre: "${validateGenre}". Focus on making it dramatic, emotionally resonant, and highly shareable for short-form video content.`;

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: redditStorySystemPrompt,
    prompt: userPrompt
  });

  for await (const part of result.textStream){
    console.log(part);
  };
}
