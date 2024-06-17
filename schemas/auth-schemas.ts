import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "email is required" })
      .email({ message: "email not valid" }),
    password: z
      .string()
      .min(4, { message: "password should be at least 4 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password shouldn't be none" }),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords con't match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "email not valid" }),
  password: z
    .string()
    .min(4, { message: "password should be at least 4 characters" }),
});
