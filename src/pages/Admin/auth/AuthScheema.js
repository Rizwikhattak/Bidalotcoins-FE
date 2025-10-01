import { z } from "zod";

const emailSchema = z.string().email({ message: "Invalid Email Format" });
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Must contain at least one special character");

const loginSchema = z.object({
  username: emailSchema,
  password: z.string().min(1, { message: "Password is required" }),
  // rememberMe: z.boolean().optional(),
});

export { loginSchema };
