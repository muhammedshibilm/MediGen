"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function ForgotPassword(){
   
    const [email, setEmail] = useState("");
    const router = useRouter();

    const submissionHandler = async (e: React.FormEvent) =>{

        e.preventDefault();

        const res = await fetch("/api/auth/forgotpassword",{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email})
        });
        
        const data = await  res.json();
       if (!res.ok) {
          
          toast.error(data.error || "Someting went wrong")
       }
       toast.message(data.message || "sucess") 
       router.push("/");
    }
    return(
        <div className=" h-screen flex flex-col justify-center items-center gap-4">
            <p className="text-xl" style={{letterSpacing: 3}}>Forgottn password </p>
          <form onSubmit={submissionHandler} className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm text-gray-400">Email </label>
                <input type="email" required value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter your email" className="bg-white border-2 border-[#194185]  rounded-md text-black p-1 placeholder:text-gray-600  mb-5 placeholder:text-sm"/>
                <Button type="submit" className="bg-blue-600">Reset Password</Button>
          </form>
        </div>
    );
}