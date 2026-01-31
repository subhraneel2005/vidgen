"use server";

import { getCaptions } from "@/lib/getCaptions";

export async function generateCaptions(audioUrl: string) {
  return await getCaptions(audioUrl); // { captionsPath }
}