"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword(){
   
    const [email, setEmail] = useState("");
    const [ message , setMessage] = useState("");
    const router = useRouter();

    const submissionHandler = async (e: React.FormEvent) =>{

        e.preventDefault();
        
         setMessage(" ");

        const res = await fetch("/api/auth/forgotpassword",{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email})
        });

       if (!res.ok) {
          const error = await  res.json();
          setMessage(error)
       }

       router.push("/");
    }
    return(
        <><p>Forgottn password </p>
          <form onSubmit={submissionHandler}>
                <label htmlFor="email">Email: </label>
                <input type="email" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <button type="submit">Reset Password</button>
          </form>
          <p className="text-green-500">{message}</p>
        </>
    );
}