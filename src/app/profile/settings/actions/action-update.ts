"use server";

import { prisma } from "@/app/_modules/services/database/prisma";
import { z } from "zod";
import { updateUserTypes } from "./action-type";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/auth";

export const updateUser = async (
  data: z.infer<typeof updateUserTypes>,
  id: any
) => {
  const session = await getServerSession(authOptions);

  // PEGAR ID DO USUARIO LOGADO

  console.log((session?.user as any).id);

  const userUpdate = await prisma.user.update({
    where: { id: (session?.user as any).id },
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
  return userUpdate;
};
