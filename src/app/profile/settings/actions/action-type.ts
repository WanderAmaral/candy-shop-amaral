import { z } from "zod";

export const updateUser = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
});
