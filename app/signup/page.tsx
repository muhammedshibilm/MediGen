"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Signup() {
  const [form, setForm] = useState({
    username: " ",
    email: " ",
    password: " ",
  });

  const router = useRouter();

  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        toast.error("Failed to create account");
      }
    } catch (error) {
      toast.error(`An error occured. Please try again later. ${error}`);
    }
  };
  return (
    <>
       <div style={{ backgroundImage: 'url("/images/gridlayout.svg")', backgroundSize: "cover", height: "100vh"} }>
      <div className="h-screen flex justify-center items-center">
        <div className=" flex flex-col p-10 rounded-lg justify-center items-center space-y-4 px-16 "> 
          <h1 className="text-white text-2xl font-bold" style={{letterSpacing: 4}}>CREATE ACCOUNT</h1>

          <form
            onSubmit={handlesubmit}
            className="flex flex-col space-y-2 mt-4 "
          >
            <label htmlFor="username" className="text-sm text-gray-400">
              Username{" "}
            </label>
            <input
              className="text-white border-2 border-[#194185] bg-[#232839]  rounded-md  p-1 placeholder:text-sm "
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              placeholder="Enter your username"
            />

            <label htmlFor="email" className="text-sm text-gray-400">
              Email{" "}
            </label>
            <input
              className="bg-[#232839] text-white border-2 border-[#194185]  rounded-md  p-1  placeholder:text-sm "
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              placeholder="Enter your email"
            />

            <label htmlFor="password" className="text-sm text-gray-400">
              Password
            </label>
            <input
              className="bg-[#232839] text-white border-2 border-[#194185]  rounded-md  p-1   mb-5 placeholder:text-sm "
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              placeholder="Enter your password"
            />

            <Button type="submit" className="bg-custom-yellow text-custom-gray hover:text-white ">Create Account</Button>
          </form>

          <Button className="bg-[#26272B] text-gray-300 text[#A0A0AB] py-4 px-3">Continue with Goolge</Button>

          <p className="text-gray-500">
            Already have an account ? <Link href={"/login"} className="text-gray-400">Login</Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
