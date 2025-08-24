import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findFirst({
          where: { email: user.email! },
        });
        

        if (dbUser) {
          token.userId = dbUser.id;
          token.role = "user";
        } else {
          const newUser = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name!,
              city: "Unknown", 
              state: "Unknown",
            },
          });
          token.userId = newUser.id;
          token.role = "user";
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/Login",
    error: "/Login",
  },
});
