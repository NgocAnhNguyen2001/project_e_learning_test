import * as z from "zod";

import { schemaEdit } from "./Edit";

export const schemaCreate = schemaEdit.extend({
  password: z.string().min(8).max(32),
  confirmPassword: z.string().min(8).max(32),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});
