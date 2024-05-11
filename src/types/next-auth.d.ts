import nextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string | undefined;
      email: string | undefined;
      role: string | undefined;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string | undefined;
  }
}
