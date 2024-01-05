import GithubSignIn from "@/actions/supabase/social-login/github-sign-in";
import { FaGithub } from "react-icons/fa6";

export default function OAuthSection() {
  const handleAction = async () => {
    await GithubSignIn();
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="flex items-center justify-center px-12 text-primary font-semibold text-md border-b text-zinc-200 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 backdrop-blur-2xl w-auto rounded-full border py-2"
        onClick={() => {
          handleAction();
        }}
      >
        <FaGithub size="1.5em" className="mr-2" /> Sign In
      </button>
    </div>
  );
}
