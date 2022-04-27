import Link from "next/link";

export default function Posts() {
  return (
    <main className="font-serif max-w-3xl mx-auto p-6 pt-12 mt-24">
      <div className="flex flex-col gap-5">
        <Link href="#">
          <a className="shadow-neu bg-transparent rounded-md p-4 group">
            <h1 className="transition text-2xl font-bold mb-4 group-hover:text-purple-500">
              Git: zero to hero part 1
            </h1>
            <p className="mb-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni,
              cum quas voluptatum necessitatibus quasi repellat aut quisquam
              culpa voluptatibus, unde suscipit rem, voluptates quod? Nobis nam
              similique illo voluptates vitae quod voluptas non repudiandae
              corrupti odio nulla fugit fugiat aut animi optio, culpa dolorem
              sed ullam repellat assumenda possimus molestiae!
            </p>
            <time className="text-gray-400 italic group-hover:text-purple-300">
              Apr 19, 2021
            </time>
          </a>
        </Link>
        <Link href="#">
          <a className="shadow-neu bg-transparent rounded-md p-4 group">
            <h1 className="transition text-2xl font-bold mb-4 group-hover:text-purple-500">
              Git: zero to hero part 1
            </h1>
            <p className="mb-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni,
              cum quas voluptatum necessitatibus quasi repellat aut quisquam
              culpa voluptatibus, unde suscipit rem, voluptates quod? Nobis nam
              similique illo voluptates vitae quod voluptas non repudiandae
              corrupti odio nulla fugit fugiat aut animi optio, culpa dolorem
              sed ullam repellat assumenda possimus molestiae!
            </p>
            <time className="text-gray-400 italic group-hover:text-purple-300">
              Apr 19, 2021
            </time>
          </a>
        </Link>
        <Link href="#">
          <a className="shadow-neu bg-transparent rounded-md p-4 group">
            <h1 className="transition text-2xl font-bold mb-4 group-hover:text-purple-500">
              Git: zero to hero part 1
            </h1>
            <p className="mb-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni,
              cum quas voluptatum necessitatibus quasi repellat aut quisquam
              culpa voluptatibus, unde suscipit rem, voluptates quod? Nobis nam
              similique illo voluptates vitae quod voluptas non repudiandae
              corrupti odio nulla fugit fugiat aut animi optio, culpa dolorem
              sed ullam repellat assumenda possimus molestiae!
            </p>
            <time className="text-gray-400 italic group-hover:text-purple-300">
              Apr 19, 2021
            </time>
          </a>
        </Link>
      </div>
    </main>
  );
}
