import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"]; // Keep the default properties
  }

  interface User {
    role: string;
  }
}
