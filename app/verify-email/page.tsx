"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      fetch(`/api/auth/verify-email?token=${token}`)
        .then(res => res.json())
        .then(data => setMessage(data.message || "Verification failed."))
        .catch(() => setMessage("An error occurred."));
    } else {
      setMessage("Invalid request.");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 bg-white shadow-md rounded-md">
        <h1 className="text-xl font-semibold">{message}</h1>
      </div>
    </div>
  );
}
