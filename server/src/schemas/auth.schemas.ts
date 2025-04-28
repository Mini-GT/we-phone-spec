import { z } from "zod";

// User Registration Schema
export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email().min(6, "Email must be at least 6 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// User Login Schema
export const loginSchema = z.object({
  email: z.string().email().min(6),
  password: z.string().min(6),
});

// Type Inference for TypeScript
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;