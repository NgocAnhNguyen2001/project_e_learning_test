import * as z from "zod";

import {
  Gender,
} from "schema/generated/graphql";

export const schemaEdit = z.object({
  email: z.string().email(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  gender: z.enum(Object.values(Gender) as any),
  nationality: z.string(),
  phoneNumber: z.string(),
  jobTitle: z.string(),
  // profilePicture: z.string(),
  introduction: z.string(),
});
