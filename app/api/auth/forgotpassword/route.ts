import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest){
    const { email } = await req.json();

    const prisma = new  PrismaClient();
    if (!email) {
        return NextResponse.json({"error":"Email is required"},{
            status: 400
        });
    }

    try {

        const user = await prisma.user.findUnique({
            where: {email}
        });

        if (!user) {
            return NextResponse.json({
                error : "User not found"
            },{status: 404});
        }

        const token = jwt.sign({"userId": user.id,"email": user.email},process.env.JWT_SECRET!,{
            expiresIn: "1h",
            algorithm: "HS256"
        });

        const  resetUrl = `${process.env.BASE_URL}/login/resetpassword?token=${token}`;

        console.log(resetUrl);

        return NextResponse.json({"message":"Password reset link is sended"},{
            status: 200
        });

        
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error : "something went wrong"
        },{status: 500})
    }

}