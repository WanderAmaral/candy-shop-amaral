import { getUserById } from "@/app/_actions/get-user";
import { prisma } from "@/app/_modules/services/database/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Mantenha apenas os dados do usuário logado
export async function GET(req: NextRequest) {
 const cookiesStore = cookies()
 const token = cookiesStore.get('token')

 console.log(token)
}
