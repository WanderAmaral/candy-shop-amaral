import {
  NextAuthMiddlewareOptions,
  NextRequestWithAuth,
  withAuth,
} from "next-auth/middleware";
import { NextResponse } from "next/server";

const middleware = (request: NextRequestWithAuth) => {
  console.log("[MIDDLEWARE_NEXTAUTH_TOKEN]", request.nextauth.token);
  const isPrivateRoutes =
    request.nextUrl.pathname.startsWith("/profile/settings");
  const isAdminUser = request.nextauth.token?.role === "client";

  if (isPrivateRoutes && !isAdminUser) {
    return NextResponse.rewrite(new URL("/about", request.url));
  }
};

const callbackOptions: NextAuthMiddlewareOptions = {};

export default withAuth(middleware, callbackOptions);

export const config = {
  matcher: "/profile/settings",
};

// Rever rotas e desgin de botoes na page settings

