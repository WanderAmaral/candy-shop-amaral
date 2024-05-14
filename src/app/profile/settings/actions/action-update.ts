"use server";

import { prisma } from "@/app/_modules/services/database/prisma";
import { z } from "zod";
import { updateUserTypes } from "./action-type";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/auth";

export const updateUser = async (data: z.infer<typeof updateUserTypes>) => {
  const session = await getServerSession(authOptions);

  // PEGAR ID DO USUARIO LOGADO
  console.log(session?.user.id);

  if (!session?.user?.id) {
    return {
      error: "Not Autorized",
      data: null,
    };
  }

  const updateUser = await prisma.user.update({
    where: { id: session?.user?.id },
    data: {
      name: data.name,
      email: data.email,
    },
  });

  return updateUser;
};
