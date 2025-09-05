import { z } from "zod";

export const resetPasswordSchema = z.object({
  password: z.string().trim().min(6, "Password Too Short"),
  confirmPassword: z.string().trim().min(6, "Confirm password Too Short"),
  email: z.email().trim().min(5, "Email too short"),
  resetToken: z.uuidv4()
})

export type resetPasswordInput = z.infer<typeof resetPasswordSchema>