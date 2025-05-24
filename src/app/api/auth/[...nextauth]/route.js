import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "@/lib/auth";

// Mark this route as dynamic
export const dynamic = 'force-dynamic';

const handler = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider(authConfig.providers[0]),
  ],
});

export { handler as GET, handler as POST }; 