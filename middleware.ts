import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  API_AUTH_PREFIX,
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECTED,
  PUBLIC_ROUTES,
} from "@/routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // req.auth
  const { nextUrl } = req;

  const isLogedIn = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname!);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);

  // if it is api route
  if (isApiAuthRoute) {
    if (nextUrl.search.includes("error"))
      return NextResponse.redirect(new URL(`/login${nextUrl.search}`, nextUrl));
    return;
  }
  // check if it is auth routes
  // console.log({ isLogedIn, isProtectedRoute });
  if (isAuthRoute) {
    if (isLogedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECTED, nextUrl));
    }
    return;
  }
  // if it is protected route
  if (!isPublicRoute && !isLogedIn) {
    let callbackurl = nextUrl.pathname;
    if (nextUrl.search) callbackurl += nextUrl.search;
    const encodedCallbackUrl = encodeURIComponent(callbackurl);
    return NextResponse.redirect(
      new URL(`/login?callbackurl=${encodedCallbackUrl}`, nextUrl)
    );
  }
  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
