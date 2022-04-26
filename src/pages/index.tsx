import Image from "next/image";

export default function Home() {
  return (
    <main className="font-serif max-w-5xl mx-auto p-6 grid grid-cols-home min-h-screen">
      <h1 className="text-7xl self-center leading-tight">
        Learn and Stay update about the{" "}
        <span className="text-white relative after:rounded-md after:flex after:w-80 after:h-20 after:bg-purple-500 after:absolute after:top-0 after:left-0 after:-z-10 after:-skew-x-12">
          dev world
        </span>
      </h1>
      <Image src="/hero.svg" width="100%" height="100%" />
    </main>
  );
}
