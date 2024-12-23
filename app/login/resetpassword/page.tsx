"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ResetPassword(){

  const [newPassword,setNewPassword]= useState("");

   const token = useSearchParams().get("token");
  
  useEffect(()=>{
    if (!token) {
       toast.error("Invalid Token");
    }
  },[token]);

  const submissionHandler = async (e: React.FormEvent)=>{
    
    e.preventDefault();
     
     try {
      
      const res = await fetch("/api/auth/resetpassword",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"token": token,"newpassword": newPassword})
      });

      if (!res.ok) {
        const data  = await res.json();
        toast.error(data.error || "Something went wrong")
      }
       toast.success("Password updated sucessfully");

     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     } catch (error: any) {
        toast.error(error.message || "Something went wrong");
     } 
  }
    return(
        <>
          rest password page
        
          <form onSubmit={submissionHandler}>
            <label htmlFor="newpassword">New Password: </label>
            <input type="text" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} />
            <button type="submit">Update Password</button>
          </form>

          
        </>
    );
}