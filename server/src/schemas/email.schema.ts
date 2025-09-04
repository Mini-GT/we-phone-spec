import { z } from "zod";

export const email = z.email().min(5, "Email Too Short")

export type emailInput = z.infer<typeof email>