"use client";
import Image from "next/image";
import logo from "@/app/favicon.ico";
import Link from "next/link";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { checkAuth } from "@/utils/auth";


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
        <nav className="container">
            <div className="logo">
                <Image src={logo} alt="logo" width={24} height={24} />
                <h4>MEDiGEN</h4>
            </div>
            <div className="links">
                <ul>
                    <li><Link href={"/"}>Home</Link></li>
                    <li><Link href={"/chat"}>Chat with AI</Link></li>
                    <li><Link href={"/doctor-contact"}>Doctor Contact</Link></li>
                    <li><Link href={"/document-upload"}>Document Upload</Link></li>
                </ul>
            </div>
            <div className="user">
                {isAuthenticated ? (
                    <button onClick={logout}>Logout</button>
                ) : (
                    <Link href={"/login"}>Login</Link>
                )}
            </div>
        </nav>
    );
};
