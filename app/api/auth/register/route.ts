import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendVerificationEmail } from "@/lib/mail";
import crypto from "crypto";
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
          
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
              return NextResponse.json({ error: "Email already exists" }, { status: 400 });
            }

            
            const hashPassword = await bcrypt.hash(password,SALT_ROUND);
            const verificationToken = crypto.randomBytes(32).toString("hex");
            //  store the username and password
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const user = await prisma.user.create({
                data: {
                    username: username.trim(),
                    email: email.trim(),
                    password: hashPassword,
                    updatedAt: new Date()
                }
            });

            await sendVerificationEmail(email, verificationToken);

            return NextResponse.json({ message: "User registered. Please verify your email." }, { status: 201 });
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
          }
        }