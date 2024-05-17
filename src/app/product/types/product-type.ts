import { Prisma } from "@prisma/client";

export type CompanyWithProducts = Prisma.CompanyGetPayload<{
  include: { products: true };
}>;