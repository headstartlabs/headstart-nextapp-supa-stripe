import signOut from "@/actions/supabase/sign-out";

export default async function SignOutButton() {
  const handleAction = async () => {
    await signOut();
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="group text-primary font-semibold text-md border-b text-blue-500 hover:bg-blue-500 hover:text-blue-50 focus:outline-none focus:ring focus:ring-blue-300 backdrop-blur-2xl w-auto rounded-md border border-blue-500 px-4 py-1"
        onClick={() => {
          handleAction();
        }}
      >
        sign out
      </button>
    </div>
  );
}
