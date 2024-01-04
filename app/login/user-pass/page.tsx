"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

import SignIn from "@/actions/supabase/user-pass-login/sign-in";
import SignUp from "@/actions/supabase/user-pass-login/sign-up";

import PageLayout from "@/components/layouts/page-layout";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
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
        await SignIn(email, password);
      } else if (action === "signUp") {
        await SignUp(email, password);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <Link href="/" className="inline-block">
        <button className="text-primary font-semibold text-md border-b text-blue-500 hover:bg-blue-500 hover:text-blue-50 focus:outline-none focus:ring focus:ring-blue-300 backdrop-blur-2xl w-auto rounded-md border border-blue-500 px-4 py-1">
          back
        </button>
      </Link>
      <h2 className="text-2xl font-semibold">Username & Password Sign In</h2>
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

          <label htmlFor="password" className="text-primary font-semibold">
            Password
          </label>
          <input
            id="password"
            name="password"
            color="primary"
            placeholder="••••••••"
            required
            className="rounded border px-4 py-2 focus:outline-none focus:border-primary transition-colors duration-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={isVisible ? "text" : "password"}
          />

          <button
            onClick={() => handleAction("signIn")}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-full px-4 py-2 transition-colors duration-300 focus:outline-none"
          >
            Sign In
          </button>

          <button
            onClick={() => handleAction("signUp")}
            disabled={isLoading}
            className="border border-blue-500 hover:bg-blue-500 hover:text-blue-50  focus:ring focus:ring-blue-300 active:border-blue-700 text-blue-500 rounded-full px-4 py-2 transition-colors duration-300 focus:outline-none"
          >
            Sign Up
          </button>

          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
