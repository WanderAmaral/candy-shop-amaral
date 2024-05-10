import { AuthOptions } from "next-auth";
import { db } from "@/_lib/prisma";
import { loginUser } from "@/app/auth/_actions/auth-action";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth",
    signOut: "/auth",
    error: "/auth",
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
        role: { type: "role" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const user = await loginUser(credentials);

        if (user) {
          // Se as credenciais forem válidas, retorna os dados do usuário

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ session, user, token, trigger }) {
      // Adiciona o ID do usuário à sessão
      console.log("jwt callbacks", { token, session, user });

      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }

      return token;
    },
    async session({ session, user, token }) {
      console.log("session callbacks", { token, session, user });

      if (user) {
        return {
          ...session,
          user: {
            ...session,
            id: user.id,
            name: user.name,
            email: user.email,
          },
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTHAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};
