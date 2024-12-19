import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/", "/login", "/signup"];
const protectedRoutes = ["/chat", "/dashboard", "/document-upload", "/doctor-contact"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  const { pathname } = req.nextUrl;

  if (publicRoutes.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/chat/:path*",
    "/dashboard/:path*",
    "/document-upload/:path*",
    "/doctor-contact/:path*",
  ],
};
