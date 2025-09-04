import { z } from "zod";

export const passwordSchema = z.object({
  password: z.string().trim().min(6, "Password Too Short"),
  confirmPassword: z.string().trim().min(6, "Confirm password Too Short")
})

export type passwordInput = z.infer<typeof passwordSchema>