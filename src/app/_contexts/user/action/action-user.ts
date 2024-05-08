import { prisma } from "@/app/_modules/services/database/prisma";

export const user = async (id: any) => {
  const getUser = await prisma.user.findUnique({
    where: { id },
  });
  return getUser;
};
