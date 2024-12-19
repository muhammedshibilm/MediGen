"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPassword(){

  const [newPassword,setNewPassword]= useState("");
  const [error, setError] = useState("");
  const [sucess, setSucess ] = useState(" ")

   const token = useSearchParams().get("token");
  
  useEffect(()=>{
    if (!token) {
       setError("Invalid token")
    }
  },[token]);

  const submissionHandler = async (e: React.FormEvent)=>{
    
    e.preventDefault();
    setError(" ");
     
     try {
      
      const res = await fetch("/api/auth/resetpassword",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"token": token,"newpassword": newPassword})
      });

      if (!res.ok) {
        const data  = await res.json();
        setError(data.error);
      }
       setSucess("Password is updated");

     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     } catch (error: any) {
        setError(error.message)
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

          <p className="text-green-500">{sucess}</p>
          <p className="text-red-500">{error}</p>
        </>
    );
}