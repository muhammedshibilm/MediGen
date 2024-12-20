import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const  bcrypt = require("bcrypt")

const prisma = new PrismaClient();

export async function POST(
    req: NextRequest
){
    const {email,password} = await req.json()
    if ( !email || !password) {
        return  NextResponse.json({"error":"Missing required values"},{
            status: 400
        });
    }

    try{


        // Check user is exisit 
        const user = await prisma.user.findUnique({
            where: {email}
        });

        if(!user){
            return NextResponse.json({
                error : "Invalid mail or password"
            },{status: 401})
        }

        // check the password is vlaid 
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if (!isPasswordValid) {
               
        return NextResponse.json({
            error : "Invalid email or password"
        },{status: 401})
        }

        // generate jwt token

        const token = jwt.sign({userId: user.id,email: user.email},process.env.JWT_SECRET!,{
            expiresIn: "1h",
            algorithm: "HS256"
        });

        const response = NextResponse.json({"message":"Logged in successfully"});

        response.cookies.set("authToken",token,{
            httpOnly: true,
            secure:  process.env.NODE_ENV === "production",
            maxAge:3600, // 1 hour 
        })

        return  response;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(error){
        return NextResponse.json({
            error : "something went wrong"
        },{status: 500})
    }
    
  
}