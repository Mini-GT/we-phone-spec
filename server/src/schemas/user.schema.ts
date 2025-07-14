import { z } from "zod";

const roleEnum = ["ADMIN", "MODERATOR", "USER", "DEMO"] as const
const statusEnum = ["verified", "unverified", "banned", "pending", "suspended"] as const 

export const addUserSchema= z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email().min(6, "Email must be at least 6 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(roleEnum),
  status: z.enum(statusEnum),
});

export const changeNameSchema = z.string().trim().min(3, "Name must be at least 3 characters")

export const changePasswordSchema = z.object({
  currentPassword: z.string().trim().min(6, "Current password must be at least 6 characters"),
  newPassword: z.string().trim().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().trim().min(6, "Confirm password must be at least 6 characters"),
});

export type AddUserInput = z.infer<typeof addUserSchema>;
export type changeNameInput = z.infer<typeof changeNameSchema>;
export type changePasswordInput = z.infer<typeof changePasswordSchema>;