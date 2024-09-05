import { Product } from "@prisma/client";

export interface CartType extends Product {
  description?: string;
  quantity?: number;
}
