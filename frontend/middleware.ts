import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Extract the JWT from the cookie
  const token = req.cookies.get("jwt");

  // If there's no token, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: "/dashboard/:path*", // Applies to /dashboard and any subpaths
};
