import * as z from "zod";

export const schemaSignup = z.object({
  email: z.string().email(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  password: z.string().min(8).max(32),
  confirmPassword: z.string().min(8).max(32),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});
