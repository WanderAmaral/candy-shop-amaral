import { getUserById } from "@/app/_actions/get-user";
import { prisma } from "@/app/_modules/services/database/prisma";
import { getSession } from "next-auth/react";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Mantenha apenas os dados do usuário logado
export async function GET(req: any, res: any) {
  const session = await getSession({ req });

  if(session) {
  }
}
