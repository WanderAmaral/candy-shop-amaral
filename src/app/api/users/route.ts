import { prisma } from "@/app/_modules/services/database/prisma";

// Mantenha apenas os dados do usuário logado
export async function GET() {
  const user = await prisma.user.findMany();

  return Response.json({ user });
}
