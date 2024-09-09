"use server";
import { prisma } from "@/app/_modules/services/database/prisma";

export async function deleteUserAndProducts(id: string, idUser: string) {
  await prisma.product.deleteMany({
    where: { userId: idUser },
  });

  await prisma.user.delete({
    where: { id: id },
  });
}
