import { z } from "zod";

export const updateUserTypes = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
});
