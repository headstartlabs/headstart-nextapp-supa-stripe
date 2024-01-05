import AuthSection from "@/components/authentication/auth-section";

import { getSession } from "@/actions/supabase/server-get";

export default async function SignInPage() {
  const session = await getSession();

  return <AuthSection session={session} />;
}
