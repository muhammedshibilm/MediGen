"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const route = useRouter()

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: "", email: "", password: "" };

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
      toast.error(newErrors.username);
      isValid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      toast.error(newErrors.email);
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
      toast.error(newErrors.email);
      isValid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
      toast.error(newErrors.password);
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      toast.error(newErrors.password);
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const resMessage = await res.json();

      if (res.ok) {
        toast.success(resMessage.message || "Account created successfully!");
        route.replace("/verify-email")

      } else {
        toast.error(resMessage.error || "Failed to create account");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: 'url("/images/gridlayout.svg")',
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col p-10 rounded-lg justify-center items-center space-y-4 px-16">
          <h1 className="text-white text-2xl font-bold" style={{ letterSpacing: 4 }}>
            CREATE ACCOUNT
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-2 mt-4">
            <label htmlFor="username" className="text-sm text-gray-400">
              Username
            </label>
            <input
              className={`text-white border-2 bg-[#232839] rounded-md p-1 placeholder:text-sm ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="Enter your username"
            />

            <label htmlFor="email" className="text-sm text-gray-400">
              Email
            </label>
            <input
              className={`bg-[#232839] text-white border-2 rounded-md p-1 placeholder:text-sm ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
            />

            <label htmlFor="password" className="text-sm text-gray-400">
              Password
            </label>
            <input
              className={`bg-[#232839] text-white border-2 rounded-md p-1 mb-5 placeholder:text-sm ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
            />

            <Button
              disabled={loading}
              type="submit"
              className="bg-custom-yellow text-custom-gray hover:text-white"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <Button className="bg-[#26272B] text-gray-300 py-4 px-3">
            Continue with Google
          </Button>

          <p className="text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-gray-400">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
