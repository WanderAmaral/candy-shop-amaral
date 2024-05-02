import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  // pages: {
  //   signIn: "/auth",
  // },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        if(credentials.email === 'wander@gmail.com', credentials.password === '123456') {
          return {
            id: '1',
            name: 'wander',
            email: 'wander@gmail.com'
          }
        }

        return null
      },
    }),
  ],
});

export { handler as GET, handler as POST };
