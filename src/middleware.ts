import { NextRequest, NextResponse } from "next/server";
import { getUrl } from "./lib/get-url";
import { isSessionValid } from "./app/_modules/services/auth/auth-services";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("authjs.session-token");
//   const pathname = request.nextUrl.pathname;

//   if (pathname === "/auth" && token) {
//     return NextResponse.redirect(new URL(getUrl("/")));
//   }

//   if (pathname.includes("/") && !token) {
//     return NextResponse.redirect(new URL(getUrl("/auth")));
//   }
// }

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

const publicRoutes = ["/", "/auth", "/register"];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const session = await isSessionValid();

  if (!session) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}
