"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function signOut(): Promise<void> {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
  } catch (error) {
    console.error("Error signing out:", error);
  }

  return redirect("/");
}
