"use server";

import { z } from "zod";

import { prisma } from "@/app/_modules/services/database/prisma";
import * as bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { loginData } from "./type-actions";

export async function loginUser(data: z.infer<typeof loginData>) {
  const user = await prisma.user.findFirst({
    where: { email: data.email },
    select: {
      id: true,
      password: true,
      email: true,
      name: true,
      role: true,
    },
  });

  if (!user) {
    // Se o usuário não for encontrado, retornar null
    return null;
  }

  if (!user.password) {
    // Se a senha do usuário não estiver definida, retornar null
    return null;
  }

  const isMatch = await bcrypt.compare(data.password, user?.password);
 
  if (!isMatch) {
    console.log("Usuário ou senha inválido");
    redirect("/auth");
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}
