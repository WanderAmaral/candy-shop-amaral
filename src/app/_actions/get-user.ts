import { prisma } from "../_modules/services/database/prisma";

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({where: {id}});

  return user;
};
