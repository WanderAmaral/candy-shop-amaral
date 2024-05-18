"use server";
import { prisma } from "@/app/_modules/services/database/prisma";
import { z } from "zod";
import { updateProductSchema } from "../action-type/form-action-types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/_lib/auth";

export const updateProduct = async (
  data: z.infer<typeof updateProductSchema>
) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      error: "Not authorized",
      data: null,
    };
  }

  if (data.id) {
    const todo = await prisma.product.findUnique({
      where: {
        id: data.id,
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
        id: data.id,
        userId: session?.user?.id,
      },
      data: {
        name: data.name,
        price: data.price,
      },
    });

    return {
      error: null,
      data: updatedTodo,
    };
  }

  if (!data.name) {
    return {
      error: "Title is required",
      data: null,
    };
  }

  const product = await prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      userId: session?.user?.id,
    },
  });

  return product;
};
