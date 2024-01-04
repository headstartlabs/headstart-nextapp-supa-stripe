"use server";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function signIn(email: any, password: any): Promise<void> {
  const origin = headers().get("origin");

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect("/login/user-pass?message=Could not authenticate user");
  }

  return redirect(
    "/login/user-pass?message=Check email to continue sign in process"
  );
}
