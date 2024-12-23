import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const bcrypt = require("bcrypt")


interface DecodedToken {
  userId: number;
  email: string;
  iat?: number;
  exp?: number;
}


export async function POST(req: NextRequest) {
  const { token, newpassword } = await req.json();

  const prisma = new PrismaClient();

  const SALT_ROUND = parseInt(process.env.SALT_ROUND!) || 10;

  if (!token || !newpassword) {
    return NextResponse.json(
      { error: "email and password is required" },
      { status: 400 }
    );
  }

  try {
    const decodetoken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    const user = await prisma.user.findUnique({ where: { email: decodetoken.email }});
    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 404 }
      );
    }

    const hashpassword = await bcrypt.hash(newpassword,SALT_ROUND);

    await prisma.user.update({
        where: { email: decodetoken.email}, data: { password: hashpassword}
    });

    return NextResponse.json({"message": "password is updated sucessfully"})
    

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "something an error occured" },
      { status: 500 }
    );
  }
}
