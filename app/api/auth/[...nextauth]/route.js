import NextAuth from "next-auth";
import { compare } from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

import { prisma } from "@/lib/db";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });
        if (user && (await compare(credentials.password, user.password))) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        return {
          ...token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            image: user.image ?? `https://avatar.vercel.sh/${user.username}`,
            account,
          },
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = token.user;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
