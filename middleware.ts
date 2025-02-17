import { NextRequest, NextResponse } from "next/server";
import { verifyjwttoken } from "./lib/jwt";
import { PrismaClient } from "@prisma/client";

const publicRoutes = [ "/login", "/signup","/login/forgotpassword"];
const protectedRoutes = ["/chat", "/document-upload", "/doctor-contact","/settings"];



export async function middleware(req: NextRequest) {
  const prisma = new  PrismaClient();
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
    }else{
      const email = verifyjwttoken(token)?.email;
    
      if (email) {
        const user = await prisma.user.findUnique({where:{
          email: email
        }});

        if (!user?.isVerified) {
          return NextResponse.redirect(new URL("/verify-email", req.url));
        }
      } else {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    
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
