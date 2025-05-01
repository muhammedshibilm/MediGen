// File: app/api/auth/me/route.ts
import jwt from "jsonwebtoken";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("authToken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const { username, email, userId, isAdmin } = decoded as {
      username: string;
      email: string;
      userId: number;
      isAdmin: boolean;
    };
    return NextResponse.json({ username, email, userId, isAdmin, token });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
