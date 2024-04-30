"use server";

import { z } from "zod";

import { prisma } from "@/app/_modules/services/database/prisma";
import * as bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { loginData } from "./type-action";

export async function loginUser(data: z.infer<typeof loginData>) {
  const user = await prisma.user.findFirst({ where: { email: data.email } });

  if (!user) {
    // Pode usar optimistic update para atualizar tela
    redirect("/auth");
  }

  const isMatch = await bcrypt.compare(data.password, user?.password);
  if (!isMatch) {
    console.log("Usuário ou senha inválido");
    redirect("/auth");
  }

  //Se o usuário e a senha forem válidos
  //TODO: criar a sessão com JWT

  redirect("/");
}
