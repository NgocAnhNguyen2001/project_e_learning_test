import * as z from "zod";

export const schemaEdit = z.object({
  email: z.string().email().or(z.literal("")),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  username: z.string().nonempty(),
  parentEmail: z.string().email().nonempty(),
  bio: z.string(),
});
