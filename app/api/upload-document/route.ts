import { verifyjwttoken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req: NextRequest){
    const token = req.cookies.get("authToken");
    const data = await req.json();

    const prisma = new PrismaClient();

    if (!token) {
        return NextResponse.json({error: "Unauthorized"},{ status: 401});
    }


    const { userId } = verifyjwttoken(token.value)!;

    if (!userId) {
        return NextResponse.json({error: "Unauthorized"},{ status: 401});
    }
    
    const upload = await prisma.upload.create({
        data: {
            name: data.file,
            userId: Number.parseInt(userId)
        }
    });

    return NextResponse.json({message: "File uploaded successfully"},{
        status: 200
    });

}