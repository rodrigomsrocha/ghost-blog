import { AiOutlineGoogle } from "react-icons/ai";

export function SignInButton() {
  return (
    <button className="justify-self-end flex gap-4 items-center bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700">
      <AiOutlineGoogle size="24" />
      Sign in with Google
    </button>
  );
}
