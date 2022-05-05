import { query as q } from "faunadb";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { ReadingListItem } from "../components/ReadingListItem";
import { getPost } from "../lib/posts";
import { api } from "../services/api";
import { fauna } from "../services/fauna";

type RaeadingList = {
  slug: string;
  isReaded: boolean;
};

type User = {
  ref: {
    id: string;
  };
  data: {
    readingList: RaeadingList[];
  };
};

type Post = {
  id: string;
  title: string;
  excerpt: string;
  updatedAt: string;
  slug: string;
  readingTime: string;
  isReaded: boolean;
};

interface PostsProps {
  readed: Post[];
  toRead: Post[];
}

export default function ReadingList({ readed, toRead }: PostsProps) {
  const [updatedToRead, setUpdatedToRead] = useState([...toRead]);
  const [updatedReaded, setUpdatedReaded] = useState([...readed]);

  async function handleRemoveFromReadingList(slug: string) {
    try {
      await api.post("/savePost", { slug });
      const newToReadList = updatedToRead.filter((post) => post.slug !== slug);
      setUpdatedToRead(newToReadList);
      const newReadedList = updatedReaded.filter((post) => post.slug !== slug);
      setUpdatedReaded(newReadedList);
      toast("removed from your reading list", { icon: "🗑️" });
    } catch (err) {
      if (err.response.status === 401) {
        toast.error(err.response.data.error);
      } else {
        toast.error("something went wrong");
      }
    }
  }

  async function handleReadedPost(slug: string) {
    try {
      const { data } = await api.post("/readed", { slug });
      const newReadedList = updatedToRead.find(
        (post) => post.slug === data.readedSlug
      );
      setUpdatedReaded([
        ...updatedReaded,
        { ...newReadedList, isReaded: true },
      ]);
      const newToReadList = updatedToRead.filter(
        (post) => post.slug !== data.readedSlug
      );
      console.log(newToReadList);

      setUpdatedToRead(newToReadList);
      toast("congratulations you read it", { icon: "👏" });
    } catch (err) {
      toast.error("something went wrong");
    }
  }

  return (
    <main className="font-serif max-w-3xl mx-auto p-6 pt-12 mt-24">
      <h1 className="text-2xl font-bold text-purple-500 mb-4">
        To read ({updatedToRead.length})
      </h1>
      {updatedToRead.length === 0 ? (
        <div className="w-full p-6 text-center shadow-neu mb-12 grayscale">
          <span className="opacity-80">So empty here🎈</span>
        </div>
      ) : (
        <div className="flex flex-col gap-5 mb-12">
          {updatedToRead.map((post) => (
            <ReadingListItem
              key={post.id}
              post={post}
              markAsRead={handleReadedPost}
              removeFromReadingList={handleRemoveFromReadingList}
            />
          ))}
        </div>
      )}
      <h1 className="text-2xl font-bold text-purple-500 mb-4">
        Readed ({updatedReaded.length})
      </h1>
      {updatedReaded.length === 0 ? (
        <div className="w-full p-6 text-center shadow-neu mb-12 grayscale">
          <span className="opacity-80">You haven't read anything yet😒</span>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {updatedReaded.map((post) => (
            <ReadingListItem
              key={post.id}
              post={post}
              markAsRead={handleReadedPost}
              removeFromReadingList={handleRemoveFromReadingList}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = await fauna.query<User>(
    q.Get(q.Match(q.Index("user_by_email"), q.Casefold(session.user.email)))
  );

  const response = await Promise.all(
    user.data.readingList.map(async (item) => {
      return (await getPost(item.slug)) || [];
    })
  );

  const posts = response.map((post) => {
    return {
      ...post,
      updatedAt: new Date(post.updated_at).toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      readingTime:
        post.reading_time < 1 ? "< 1 min" : `${post.reading_time} min`,
      isReaded: user.data.readingList.find((item) => item.slug === post.slug)
        .isReaded,
    };
  });

  const toRead = posts.filter((post) => post.isReaded === false);
  const readed = posts.filter((post) => post.isReaded === true);

  return {
    props: { toRead, readed },
  };
};
