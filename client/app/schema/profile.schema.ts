import { z } from "zod";

export const changeName = z.string().trim().min(3, "Name must be at least 3 characters")

export const changePassword = z.object({
  currentPassword: z.string().trim().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().trim().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().trim().min(6, "Password must be at least 6 characters"),
});

export type changeNameInput = z.infer<typeof changeName>;
export type changePasswordInput = z.infer<typeof changePassword>;