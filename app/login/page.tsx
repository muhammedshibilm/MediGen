"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

interface ApiResponse {
  error?: string;
  message?: string;
}

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!form.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
      isValid = false;
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (form.password.length < 3) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Login failed.");
        return;
      }

      toast.success(data.message || "Login successful!");
      router.replace("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundImage: 'url("/gridlayout.svg")', backgroundSize: "cover", height: "50vh"} }>
     <div className="flex flex-col items-center justify-center h-screen">
     <p className="text-2xl font-bold mb-4">Welcome Back</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block font-medium">Email:</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full p-2 border rounded ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block font-medium">Password:</label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className={`w-full p-2 border rounded ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <p className="leading-7 [&:not(:first-child)]:mt-6">Forgot Pasword  <Link href={"/login/forgotpassword" }>Click me</Link></p>
      
      <p className="leading-7 [&:not(:first-child)]:mt-6">New User <Link href={"/signup" }>Click me</Link></p>

     </div>
    </div>
  );
}
