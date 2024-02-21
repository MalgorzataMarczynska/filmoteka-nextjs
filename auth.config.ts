import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLibrary = nextUrl.pathname.startsWith("/library");
      const isOnHomePage =
        nextUrl.pathname === "/" || nextUrl.pathname.startsWith("/home");
      if (isOnHomePage) return true;
      if (isOnLibrary) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/library", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
