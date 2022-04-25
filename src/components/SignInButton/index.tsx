import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineClose, AiOutlineGoogle } from "react-icons/ai";

export function SignInButton() {
  const { data: session } = useSession();

  return session ? (
    <button
      onClick={() => signOut()}
      className="justify-self-end flex gap-4 items-center bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700"
    >
      <AiOutlineGoogle size="24" />
      {session.user.name}
      <AiOutlineClose />
    </button>
  ) : (
    <button
      onClick={() => signIn()}
      className="justify-self-end flex gap-4 items-center bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700"
    >
      <AiOutlineGoogle size="24" />
      Sign in with Google
    </button>
  );
}
