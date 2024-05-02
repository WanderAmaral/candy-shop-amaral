"use server";

import { z } from "zod";

import { prisma } from "@/app/_modules/services/database/prisma";
import * as bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { formData } from "./type-action";

export async function createAccount(data: z.infer<typeof formData>) {
  const hasPassword = await bcrypt.hash(data.password, 10);

  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hasPassword,
      role: data.role,
    },
  });
  redirect("/auth");
}
