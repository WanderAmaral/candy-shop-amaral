import { prisma } from "@/app/_modules/services/database/prisma";

export async function GET() {
    const users = await prisma.user.findMany()

    return Response.json({ users })
}