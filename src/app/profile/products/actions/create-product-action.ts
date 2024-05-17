"use server";

import { prisma } from "@/app/_modules/services/database/prisma";
import { z } from "zod";
import { createProductSchema } from "./form-action-types";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/auth";

export async function getProductsUser() {
  const session = await getServerSession(authOptions);

  const products = await prisma.product.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return products;
}

export async function createProduct(
  input: z.infer<typeof createProductSchema>
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      error: "Not authorized",
      data: null,
    };
  }

  if (input.id) {
    const todo = await prisma.product.findUnique({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      select: {
        id: true,
      },
    });

    if (!todo) {
      return {
        error: "Not found",
        data: null,
      };
    }

    const updatedTodo = await prisma.product.update({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      data: {
        name: input.name,
        price: input.price,
      },
    });

    return {
      error: null,
      data: updatedTodo,
    };
  }

  if (!input.name) {
    return {
      error: "Title is required",
      data: null,
    };
  }

  const todo = await prisma.product.create({
    data: {
      name: input.name,
      price: input.price,
      userId: session?.user?.id,
    },
  });

  return todo;
}
