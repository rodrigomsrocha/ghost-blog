import { GetStaticProps } from "next";
import Link from "next/link";
import { getPosts } from "../../lib/posts";

type Post = {
  id: string;
  title: string;
  excerpt: string;
  updatedAt: string;
  slug: string;
  readingTime: string;
};

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <main className="font-serif max-w-3xl mx-auto p-6 pt-12 mt-24">
      <div className="flex flex-col gap-5">
        {posts.map((post) => (
          <Link href={`/posts/${post.slug}`} key={post.id}>
            <a className="shadow-neu bg-transparent rounded-md p-4 group">
              <h1 className="transition text-2xl font-bold mb-4 group-hover:text-purple-500">
                {post.title}
              </h1>
              <p className="mb-2 line-clamp-3 overflow-hidden">
                {post.excerpt}
              </p>
              <div className="flex transition gap-2 items-center text-gray-400 group-hover:text-purple-300">
                <time className="italic">{post.updatedAt}</time>
                <div className="w-1 h-1 transition bg-gray-400 group-hover:bg-purple-500 rounded-full" />
                <span>{post.readingTime}</span>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await getPosts();

  const posts = response.map((post) => {
    return {
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      updatedAt: new Date(post.updated_at).toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      slug: post.slug,
      readingTime:
        post.reading_time < 1 ? "< 1 min" : `${post.reading_time} min`,
    };
  });

  if (!posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: { posts },
    revalidate: 60 * 60 * 8,
  };
};
