import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "@/lib/auth";

const handler = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider(authConfig.providers[0]),
  ],
});

export { handler as GET, handler as POST }; 