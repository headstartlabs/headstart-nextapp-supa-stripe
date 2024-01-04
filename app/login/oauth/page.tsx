"use client";

import Link from "next/link";

import GithubSignIn from "@/actions/supabase/social-login/github-sign-in";

import { FaGithub } from "react-icons/fa6";

import PageLayout from "@/components/layouts/page-layout";

export default function Login() {
  const handleAction = async () => {
    await GithubSignIn();
  };

  return (
    <PageLayout>
      <Link href="/" className="inline-block">
        <button className="text-primary font-semibold text-md border-b text-blue-500 hover:bg-blue-500 hover:text-blue-50 focus:outline-none focus:ring focus:ring-blue-300 backdrop-blur-2xl w-auto rounded-md border border-blue-500 px-4 py-1">
          back
        </button>
      </Link>
      <h2 className="text-2xl font-semibold">OAuth Sign In</h2>
      <div className="flex flex-col sm:max-w-md justify-center">
        <button
          className="flex items-center justify-center text-primary font-semibold text-md border-b text-zinc-200 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 backdrop-blur-2xl w-auto rounded-full border py-2"
          onClick={() => {
            handleAction();
          }}
        >
          <FaGithub size="1.5em" className="mr-2" /> Sign In
        </button>
      </div>
    </PageLayout>
  );
}
