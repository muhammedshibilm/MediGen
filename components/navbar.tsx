"use client";
import Image from "next/image";
import logo from "@/app/favicon.ico";
import Link from "next/link";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { checkAuth } from "@/utils/auth";
import { Button } from "./ui/button";


const logout = async () => {
    try {
        const res = await fetch("/api/auth/logout", {
            method: "GET",
        });

        const data = await res.json();
        if (!res.ok) {
            return toast.error(data.error || "Something went wrong");
        }
        toast.success(data.message || "Logout successful");
        document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload(); // Reload to update navbar
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        toast.error("Failed to log out");
    }
};



export const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
         checkAuth().then(setIsAuthenticated);
    }, []);

    return (
        <nav className=" w-[90%] flex  h-16 bg-custom-gradient opacity-90 rounded-lg shadow-md shadow-white fixed top-0 left-20    z-50">
            <div className="logo flex-1 flex items-center">
                <Image src={logo} alt="logo"  className="mx-5 w-12 h-8" />
                <h4 className="font-bold text-white text-opacity-50" style={{letterSpacing: 5}}>MEDiGEN</h4>
            </div>
            <div className="links flex-auto pt-4">
                <ul className="flex justify-around items-center font-semibold text-white">
                    <li><Link href={"/"}>Home</Link></li>
                    <li><Link href={"/chat"}>Chat with AI</Link></li>
                    <li><Link href={"/doctor-contact"}>Doctor Contact</Link></li>
                    <li><Link href={"/document-upload"}>Document Upload</Link></li>
                </ul>
            </div>
            <div className="user flex-1 flex justify-around items-center">
                {isAuthenticated ? (
                    <button onClick={logout}>Logout</button>
                ) : (
                    <>
                 <Button className="bg-violet-800 hover:bg-violet-900"><Link href={"/signup"}>Create Account</Link></Button>
                 <Button  className="bg-violet-800  hover:bg-violet-900"><Link href={"/login"}>Login</Link></Button>
                    </>
                )}
            </div>
        </nav>
    );
};
