import { loginUser } from "@/app/auth/_actions/auth-action";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/auth",
    signOut: "/auth",
    error: "/auth",
  },

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
          };
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
