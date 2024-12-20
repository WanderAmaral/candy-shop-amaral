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
      //console.log("jwt callbacks", { token, session, user });

      if (trigger === "update" && session?.name && session?.email) {
        token.name = session.name;
        token.email = session.email;
      }

      const customUser = user as unknown as any;
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          role: customUser.role,
        };
      }

      return token;
    },
    async session({ session, token }) {
      //console.log("session callbacks", { session });

      session.user.role = token.role;
      session.user.id = token.sub;

      return {
        ...session,
        user: {
          id: session.user.id,
          name: token.name,
          email: token.email,
          role: session.user.role,
        },
      };
    },
  },
  secret: process.env.NEXTHAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
