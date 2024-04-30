import { z } from "zod";

export const formData = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.union([z.literal("company"), z.literal("client")]),
});


