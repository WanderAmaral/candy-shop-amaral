import { z } from "zod";

export const productFormTypes = z.object({
  name: z.string(),
  // Processa strings com vírgulas e converte para número
  price: z.preprocess((val: any) => {
    if (typeof val === "string") {
      val = val.replace(",", ".");
      return parseFloat(val);
    }
    return val;
  }, z.number().positive("O preço deve ser um número positivo")),
});

export const createProductSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.preprocess((val: any) => {
    if (typeof val === "string") {
      val = val.replace(",", ".");
      return parseFloat(val);
    }
    return val;
  }, z.number().positive("O preço deve ser um número positivo")),
});

export const updateProductSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.preprocess((val: any) => {
    if (typeof val === "string") {
      val = val.replace(",", ".");
      return parseFloat(val);
    }
    return val;
  }, z.number().positive("O preço deve ser um número positivo")),
});
