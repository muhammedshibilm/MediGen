import { verifyjwttoken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

 export async function POST(req: NextRequest){

    const prisma = new  PrismaClient();
   try {

    const token = req.cookies.get("authToken")?.value;
    if (!token) {
        return NextResponse.json({"error": "Unauthorized"})
    }
    const {userId } = verifyjwttoken(token)!;
    
    const {name, medicalcon, preferdate, doctor} = await req.json();

    const appoinment = await prisma.appoinment.create({
        data:{
            doctor,
            medicalcon,
            name,
            preferdate,
            userId: Number.parseInt(userId)
        }
    })
     
    return NextResponse.json({"message": "sucess"},{
        status: 200
    })
    
   } catch (error) {
      console.log(error)
   }
}