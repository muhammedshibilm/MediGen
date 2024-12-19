"use client";
import { useRouter } from "next/navigation";

export default function Dashboard(){
    const router = useRouter();
    const Logouthandler = async () =>{
          const res = await fetch("api/auth/logout",{
            method: "GET"
          });

          if (!res.ok) {
            
             throw new Error("something error is ocuured")
          }
          router.replace("/login");
    }
    return<>its a dashboard page   <button onClick={Logouthandler}>Logout</button></>
}