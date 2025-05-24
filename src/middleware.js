import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/home/:path*",
    "/budget/:path*",
    "/settings/:path*",
    "/contact/:path*",
    "/help/:path*",
    "/terms/:path*",
  ],
}; 