import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "Shibil@1234";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json(
      { error: "Missing required values" },
      { status: 400 }
    );
  }

  try {
    // Check if user exists 
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      JWT_SECRET,
      {
        expiresIn: "10h",
        algorithm: "HS256",
      }
    );

    const response = NextResponse.json({ message: "Logged in successfully" });
    response.cookies.set({
      name: "authToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 3600,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  if (token) {
    // Optionally, you can decode and return additional user info
    return NextResponse.json({ token, message: "Authorized" });
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
