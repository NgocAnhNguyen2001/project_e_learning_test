import * as z from "zod";

import { schemaEdit } from "./Edit";

export const schemaCreate = schemaEdit
  .extend({
    loginPattern: z
      .string()
      .length(4)
      .regex(/^[0-9]*$/),
    confirmPassword: z
      .string()
      .length(4)
      .regex(/^[0-9]*$/),
  })
  .refine((data) => data.loginPattern === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
