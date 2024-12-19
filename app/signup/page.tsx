"use client";

import { useRouter } from "next/navigation";
import React, {  useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    username: " ",
    email: " ",
    password: " ",
  });
  const [error, setError] = useState("");
  const router = useRouter();


  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(" ");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        setError("Failed to create account");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError(`An error occured. Please try again later. ${error}`);
    }
  };
  return (
    <>
      <div>
        <h1>Create Account</h1>
        {error && <p className="tex-red-500">{error}</p>}

        <form onSubmit={handlesubmit}>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />

          <label htmlFor="email">Email: </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button type="submit">Create Account</button>
        </form>
      </div>
    </>
  );
}
