'use server'
import { prisma } from "@/app/_modules/services/database/prisma";

export const deleteProduct = async (id: string) => {
  await prisma.product.delete({
    where: { id },
  });
};
