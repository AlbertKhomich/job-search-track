import { NextAuthConfig } from "next-auth";
import { revalidatePath } from "next/cache";

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
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
