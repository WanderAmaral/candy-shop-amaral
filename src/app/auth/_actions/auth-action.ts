"use server";

import { z } from "zod";

import { prisma } from "@/app/_modules/services/database/prisma";
import * as bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { loginData } from "@/app/register/_actions/type-action";
import { createSessionToken } from "@/app/_modules/services/auth/auth-services";

export async function loginUser(data: z.infer<typeof loginData>) {
  const user = await prisma.user.findFirst({ where: { email: data.email } });

  if (!user) {
    // Pode usar optimistic update para atualizar tela
    redirect("/auth");
  }

  if (!user.password) {
    return null;
  }

  const isMatch = await bcrypt.compare(data.password, user?.password);
  if (!isMatch) {
    console.log("Usuário ou senha inválido");
    redirect("/auth");
  }

  //Se o usuário e a senha forem válidos
  //TODO: criar a sessão com JWT
  await createSessionToken({ sub: user.id, email: data.email });

  redirect("/");
}
