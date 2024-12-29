"use client";
import { Button } from "@/components/ui/button";
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
       <div className=" h-screen flex flex-col justify-center items-center gap-4">
      <p className="text-xl">  Rest password page</p>
        
        <form onSubmit={submissionHandler} className="flex flex-col gap-1">
          <label htmlFor="newpassword"  className="text-sm text-gray-400">New Password </label>
          <input type="text" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} placeholder="Enter new password" className="bg-white border-2 border-[#194185]  rounded-md text-black p-1 placeholder:text-gray-600  mb-5 placeholder:text-sm" />
          <Button type="submit" className="bg-blue-600">Update Password</Button>
        </form>

       </div>
    );
}