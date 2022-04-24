import Link from "next/link";
import { SignInButton } from "../SignInButton";

export function Header() {
  return (
    <div className="bg-purple-500">
      <header className="font-serif max-w-5xl mx-auto p-6 grid grid-cols-3 w-full items-center text-white">
        <h1 className="text-2xl font-bold">gBlog</h1>
        <nav className="flex gap-4 justify-self-center">
          <Link href="/">
            <a className="transition-colors bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700">
              Home
            </a>
          </Link>
          <Link href="/posts">
            <a className="transition-colors bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-700">
              Post
            </a>
          </Link>
        </nav>
        <SignInButton />
      </header>
    </div>
  );
}
