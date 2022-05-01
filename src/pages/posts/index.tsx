import { query as q } from "faunadb";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { getPosts } from "../../lib/posts";
import { api } from "../../services/api";
import { fauna } from "../../services/fauna";

type User = {
  ref: {
    id: string;
  };
  data: {
    readingList: string[];
  };
};

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
  readingList: string[];
}

export default function Posts({ posts, readingList }: PostsProps) {
  const [updatedReadingList, setUpdatedReadingList] = useState([
    ...readingList,
  ]);

  async function handleAddToReadingList(slug: string) {
    try {
      const { data } = await api.post("/savePost", { slug });
      setUpdatedReadingList([...data.readingList]);
      if (data.readingList.includes(slug)) {
        toast.success("added to your reading list");
      } else {
        toast("removed from your reading list", { icon: "🗑️" });
      }
    } catch (err) {
      if (err.response.status === 401) {
        toast.error(err.response.data.error);
      } else {
        toast.error("something went wrong");
      }
    }
  }

  return (
    <main className="font-serif max-w-3xl mx-auto p-6 pt-12 mt-24">
      <div className="flex flex-col gap-5">
        {posts.map((post) => (
          <div
            key={post.id}
            className="shadow-neu bg-transparent rounded-md p-4 relative"
          >
            <button
              onClick={() => handleAddToReadingList(post.slug)}
              className="transition px-2 py-1 bg-gray-200 rounded-sm hover:bg-purple-200 absolute right-4"
            >
              {updatedReadingList.includes(post.slug) ? "Unsave" : "Save"}
            </button>
            <Link href={`/posts/${post.slug}`}>
              <a className="group">
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
          </div>
        ))}
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const response = (await getPosts()) || [];
  const session = await getSession({ req });

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

  if (session) {
    const user = await fauna.query<User>(
      q.Get(q.Match(q.Index("user_by_email"), q.Casefold(session?.user?.email)))
    );
    return {
      props: { posts, readingList: user.data.readingList },
    };
  }

  return {
    props: { posts, readingList: [] },
  };
};
