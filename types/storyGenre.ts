import { z } from "zod";

export const genreSchema = z.enum([
    "drama",
    "family conflict",
    "relationships",
    "public embarrassment",
    "revenge",
    "coincidences",
]);

export type Genre = z.infer<typeof genreSchema> 