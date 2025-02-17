import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
 

  if (!token) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { verificationToken: token } });

  if (!user) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      verificationToken: null,
      isVerified:  true
    }
  });

  return NextResponse.json({ message: "Email verified successfully!" }, { status: 200 });
}
