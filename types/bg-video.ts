import { z } from "zod"

export const backgroundVideoSchema = z.object({
  id: z.number(),
  url: z.url(),
  title: z.string(),
})

export type BackgroundVideo = z.infer<typeof backgroundVideoSchema>
