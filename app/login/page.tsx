"use client";
import {  useState } from "react"
import { useRouter } from "next/navigation";


interface ApiResponse{
    error?: string;
    message?: string;
}

export default function Login(){
    const [form,setForm] = useState({email: " ",password: " "});
    const [error, setError ] = useState(" ");

    const router = useRouter();


    
//    for handling function
    const handlerSubmit = async (e: React.FormEvent) =>{

        e.preventDefault();
        setError(" ");

         try{
            const res = await fetch("api/auth/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            }) 
                  
            
            const data: ApiResponse = await res.json();
    
            if(!res.ok){
                setError(data.error || "Login failed")
                return;
            }
    
            
            router.replace("/dashboard")
            
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         }catch(error){
            setError("An unexpected error occured");
         }

        }
    return(
        <div>
            <p>Login page</p>
            <form onSubmit={handlerSubmit}>

                <label htmlFor="email">Email: </label>
                <input type="email" value={form.email} onChange={(e)=> setForm({...form,email: e.target.value})} />

                <label htmlFor="password">Password: </label>
                <input type="password" value={form.password} onChange={(e)=> setForm({...form,password: e.target.value})} />

                <button type="submit">Login</button>
            </form>

            {error &&  <p className="text-red-500">{error}</p>}
        </div>
    )
}