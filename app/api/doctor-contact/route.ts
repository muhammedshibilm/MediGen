import { verifyjwttoken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("authToken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" });
    }
    const { userId } = verifyjwttoken(token)!;

    const { name, medicalcon, preferdate, doctor } = await req.json();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const appoinment = await prisma.appoinment.create({
      data: {
        doctor,
        medicalcon,
        name,
        preferdate,
        userId: Number.parseInt(userId),
      },
    });

    return NextResponse.json(
      { message: "sucess" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" });
  }
  try {
    const { userId } = verifyjwttoken(token)!;
    const appoinment = await prisma.appoinment.findMany({
      where: {
        userId: Number.parseInt(userId),
      },
    });

    console.log(appoinment);

    return NextResponse.json(appoinment, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Unauthorized" });
  }
}
