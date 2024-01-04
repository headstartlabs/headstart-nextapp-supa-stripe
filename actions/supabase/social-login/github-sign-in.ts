import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default async function githubSignIn(): Promise<void> {
  try {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  } catch (error) {
    console.error("Error during GitHub sign-in:", error);
    return redirect("/login?message=Could not authenticate user");
  }
}
