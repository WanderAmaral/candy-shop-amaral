import { z } from "zod";

export const loginData = z.object({
  email: z.string(),
  password: z.string(),
});

