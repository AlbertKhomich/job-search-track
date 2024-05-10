import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnCreate = nextUrl.pathname.startsWith("/action");
      const isOnLogIn = nextUrl.pathname.startsWith("/login");

      if (isOnCreate) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn && isOnLogIn) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
