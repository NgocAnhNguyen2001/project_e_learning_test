import * as z from "zod";

export const schemaEdit = z.object({
  email: z.string().email(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  verified: z.boolean(),
});
