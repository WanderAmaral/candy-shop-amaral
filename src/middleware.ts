import { NextRequest, NextResponse } from "next/server";
import { isSessionValid } from "./app/_modules/services/auth/auth-services";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

const publicRoutes = ["/", "/auth", "/register", "/profile"];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const session = await isSessionValid();

  if (!session) {
    const isAPIRoute = pathname.startsWith("/api");

    if (isAPIRoute) {
      return NextResponse.json(
        { message: "Not Authorization" },
        { status: 401 }
      );
    }

    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}
