"use server";

import { prisma } from "@/app/_modules/services/database/prisma";
import { z } from "zod";
import { updateUser } from "./action-type";


export const update = async (data: z.infer<typeof updateUser>) => {
  
  // PEGAR ID DO USUARIO LOGADO

  const userUpdate = await prisma.user.update({
    where: { id: data.id },
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
  return userUpdate;
};
