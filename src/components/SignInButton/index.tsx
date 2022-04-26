import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineClose, AiOutlineGoogle } from "react-icons/ai";

export function SignInButton() {
  const { data: session } = useSession();

  return session ? (
    <button
      onClick={() => signOut()}
      className="justify-self-end flex gap-4 items-center bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700"
      title={session.user.name}
    >
      <AiOutlineGoogle size="24" />
      <span className="w-20 text-ellipsis whitespace-nowrap overflow-hidden">
        {session.user.name}
      </span>
      <AiOutlineClose />
    </button>
  ) : (
    <button
      onClick={() => signIn()}
      className="justify-self-end flex gap-4 items-center bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700"
      title="Sign In"
    >
      <AiOutlineGoogle size="24" />
      Sign in with Google
    </button>
  );
}
