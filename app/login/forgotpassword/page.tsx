"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
        <><p>Forgottn password </p>
          <form onSubmit={submissionHandler}>
                <label htmlFor="email">Email: </label>
                <input type="email" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <button type="submit">Reset Password</button>
          </form>
        </>
    );
}