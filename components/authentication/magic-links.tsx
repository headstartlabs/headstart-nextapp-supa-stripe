"use client";
import { useState, useMemo } from "react";

import signInWithOtp from "@/actions/supabase/magic-links/sign-in-with-otp";

export default function MagicLinkSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);

  const validateEmail = (email: any) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const handleAction = async (action: "signIn" | "signUp") => {
    setLoading(true);
    try {
      if (action === "signIn") {
        await signInWithOtp(email);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-56">
      <div className="flex flex-col w-full max-w-md px-8 gap-4">
        <label htmlFor="email" className="text-primary font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          className="rounded border px-4 py-2 focus:outline-none focus:border-primary transition-colors duration-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          color={isInvalid ? "danger" : "primary"}
        />

        <button
          onClick={() => handleAction("signIn")}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-full px-4 py-2 transition-colors duration-300 focus:outline-none"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
