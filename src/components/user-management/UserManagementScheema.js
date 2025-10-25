import { z } from "zod";
const userFilterScheema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
});

const addRoleScheema = z.object({
  name: z.string().min(1, "Role name is required"),
  code_name: z.string().min(1, "Code name is required"),
  description: z.string().optional(),
  permissions: z
    .array(z.number())
    .min(1, "At least one permission is required"),
});
const addUserScheema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  username: z.email().min(1, "Email is required"),
  mobile: z
    .string()
    .regex(/^\+?[0-9\s\-()]+$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  role: z.coerce.number().min(1, "At least one role is required"),
});

export { userFilterScheema, addRoleScheema, addUserScheema };
