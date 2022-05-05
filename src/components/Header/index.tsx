import { getSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { SignInButton } from "../SignInButton";

export function Header() {
  async function handleReadingList() {
    const session = await getSession();
    if (!session) {
      toast.error("you must be logged in");
      return;
    }
    return;
  }
  return (
    <div className="bg-purple-500 fixed mb-24 top-0 left-0 right-0 z-20">
      <header className="h-24 font-serif max-w-5xl mx-auto p-6 grid grid-cols-3 w-full items-center text-white">
        <h1 className="text-2xl font-bold">gBlog</h1>
        <nav className="flex gap-4 justify-self-center">
          <Link href="/">
            <a className="transition-colors bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700">
              Home
            </a>
          </Link>
          <Link href="/posts">
            <a className="transition-colors bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700">
              Posts
            </a>
          </Link>
          <Link href="/reading-list">
            <a
              onClick={handleReadingList}
              className="transition-colors bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700"
            >
              Reading List
            </a>
          </Link>
        </nav>
        <SignInButton />
      </header>
    </div>
  );
}
