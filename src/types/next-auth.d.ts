import nextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | undefined;
      name: string | undefined;
      email: string | undefined;
      role: string | undefined;
    };
  }
  interface User {
    name: string | undefined;
    email: string | undefined;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string | undefined;
  }
}
