import { z } from "zod";

export const createCompanyTypes = z.object({
  name: z.string(),
  adress: z.string(),
  phone: z.string(),
});
