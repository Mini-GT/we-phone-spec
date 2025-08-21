import { z } from "zod";

// Search Schema
const searchQuerySchema = z.object({
  q: z.string().min(1, "Search query must not be empty").max(100),
})

export type LoginInput = z.infer<typeof searchQuerySchema>;
