import { destroySession } from "@/app/_modules/services/auth/auth-services";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  destroySession();
  return NextResponse.redirect(new URL("/auth", req.url));
}
