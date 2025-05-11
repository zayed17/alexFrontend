import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("admin-auth")?.value;
  const isLoggedIn = token === "true";
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin-auth" && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin-auth", request.url));
  }

  if (pathname === "/admin-auth" && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin-auth"],
};
