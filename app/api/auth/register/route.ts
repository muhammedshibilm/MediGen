import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const bcrypt = require("bcrypt")


const prisma = new PrismaClient()

const SALT_ROUND = parseInt(process.env.SALT_ROUND!);

export async function POST(
    req: NextRequest,
){
   
        const {username,email,password} = await req.json();
        if (!username || !email || !password) {
            return new Response("Missing required values",{
                status: 400
            });
        }

        try{
          
            const hashPassword = await bcrypt.hash(password,SALT_ROUND);

            console.log(username,email,hashPassword);
            //  store the username and password
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const user = await prisma.user.create({
                data: {
                    username: username.trum(),
                    email: email.trim(),
                    password: hashPassword,
                    updatedAt: new Date()
                }
            });

               
        return NextResponse.json({
            "message": "account created sucessfull"
        },{status: 201})
            
        }catch(error){
            console.error(error);
            return NextResponse.json({
                error: "Failded to create user"
            },{status: 500})
            
        }  
}