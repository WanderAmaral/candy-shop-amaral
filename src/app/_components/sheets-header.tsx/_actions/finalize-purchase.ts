"use server";

import { prisma } from "@/app/_modules/services/database/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createOrder = async (data: Prisma.OrderCreateInput) => {
  await prisma.order.create({ data });
  //revalidatePath("/")
};
