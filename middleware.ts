import { NextRequest, NextResponse } from "next/server";
import { verifyjwttoken } from "./lib/jwt";

const publicRoutes = [ "/login", "/signup","/login/forgotpassword"];
const protectedRoutes = ["/chat", "/document-upload", "/doctor-contact","/settings"];



export async function middleware(req: NextRequest) {

  const token = req.cookies.get("authToken")?.value;
  const { pathname } = req.nextUrl;

  if (publicRoutes.includes(pathname)) {
    if (token) {
      if (verifyjwttoken(token)) {
        return NextResponse.redirect(new URL("/", req.url));
      }    
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
    "/login/:path*",
    "/signup",
    "/login/forgotpassword/:path*",
    "/chat/:path*",
    "/document-upload/:path*",
    "/doctor-contact/:path*",
    "/settings/:path*"
  ],
};
