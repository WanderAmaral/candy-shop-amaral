"use server";

import { z } from "zod";

import { prisma } from "@/app/_modules/services/database/prisma";
import * as bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { loginData } from "@/app/register/_actions/type-action";

export async function loginUser(data: z.infer<typeof loginData>) {
  const user = await prisma.user.findFirst({ where: { email: data.email } });

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
    name: user.name,
    email: user.email,
  };
}
