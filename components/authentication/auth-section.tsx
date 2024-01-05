"use client";
import { useState } from "react";
import Link from "next/link";

import PageLayout from "@/components/layouts/page-layout";
import MagicLinkSection from "@/components/authentication/magic-links";
import OAuthSection from "@/components/authentication/oauth";
import UserPassSection from "@/components/authentication/user-pass";

import { Session } from "@supabase/supabase-js";
import SignOutButton from "@/components/authentication/sign-out-button";

interface Props {
  session: Session | null;
}

export default function AuthSection({ session }: Props) {
  const [signInMethod, setSignInMethod] = useState<string>("magic links");

  return (
    <PageLayout>
      <div className="flex justify-between items-center">
        <Link href="/" className="flex">
          <button className="group text-primary font-semibold text-md border-b text-blue-500 hover:bg-blue-500 hover:text-blue-50 focus:outline-none focus:ring focus:ring-blue-300 backdrop-blur-2xl w-auto rounded-md border border-blue-500 px-4 py-1">
            back
          </button>
        </Link>

        {session ? <SignOutButton /> : <></>}
      </div>
      {session ? (
        <div className="flex flex-col items-center">
          <p className="text-2xl font-semibold">You are already logged in.</p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold">Sign In</h2>
          <div className="relative self-center mt-6 rounded-lg p-0.5 flex sm:mt-8 border-2 border-blue-300 bg-blue-100">
            {
              <button
                onClick={() => setSignInMethod("magic links")}
                className={`${
                  signInMethod === "magic links"
                    ? "relative w-1/2 bg-blue-700 border-blue-800 shadow-sm text-white"
                    : "ml-0.5 relative w-1/2 border border-transparent text-blue-400"
                } rounded-md m-1 py-2 text-sm font-bold whitespace-nowrap focus:outline-none focus:ring-2 focus:z-10 sm:w-auto sm:px-8 `}
              >
                Magic Links
              </button>
            }
            {
              <button
                onClick={() => setSignInMethod("oauth sign in")}
                type="button"
                className={`${
                  signInMethod === "oauth sign in"
                    ? "relative w-1/2 bg-blue-700 border-blue-800 shadow-sm text-white"
                    : "ml-0.5 relative w-1/2 border border-transparent text-blue-400"
                } rounded-md m-1 py-2 text-sm font-bold whitespace-nowrap focus:outline-none focus:ring-2 focus:z-10 sm:w-auto sm:px-8`}
              >
                OAuth Sign In
              </button>
            }
            {
              <button
                onClick={() => setSignInMethod("user pass sign in")}
                type="button"
                className={`${
                  signInMethod === "user pass sign in"
                    ? "relative w-1/2 bg-blue-700 border-blue-800 shadow-sm text-white"
                    : "ml-0.5 relative w-1/2 border border-transparent text-blue-400"
                } rounded-md m-1 py-2 text-sm font-bold whitespace-nowrap focus:outline-none focus:ring-2 focus:z-10 sm:w-auto sm:px-8`}
              >
                User Pass Sign In
              </button>
            }
          </div>

          {signInMethod === "magic links" ? (
            <MagicLinkSection />
          ) : signInMethod === "oauth sign in" ? (
            <OAuthSection />
          ) : (
            <UserPassSection />
          )}
        </>
      )}
    </PageLayout>
  );
}
