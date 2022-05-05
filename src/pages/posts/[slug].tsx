import { query as q } from "faunadb";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineBook } from "react-icons/ai";
import { getPost } from "../../lib/posts";
import { api } from "../../services/api";
import { fauna } from "../../services/fauna";

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
  post: {
    bgImage: string;
    title: string;
    updatedAt: string;
    html: string;
    readingTime: string;
    slug: string;
  };
  isOnReadingList: boolean;
};

export default function Post({ post, isOnReadingList }: Post) {
  const [isSaved, setIsSaved] = useState(isOnReadingList);

  async function handleAddToReadingList() {
    try {
      const { data } = await api.post("/savePost", { slug: post.slug });
      if (data.readingList.some((item) => item === post.slug)) {
        toast.success("added to your reading list");
        setIsSaved(true);
      } else {
        toast("removed from your reading list", { icon: "🗑️" });
        setIsSaved(false);
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
    <>
      {post.bgImage && (
        <div
          className="p-6 pt-12 mt-24 w-full h-80 bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${post.bgImage})` }}
        />
      )}
      <div className="font-serif max-w-3xl mx-auto mt-24 p-6 realtive">
        <article>
          <h1 className="text-6xl font-bold mb-4">{post.title}</h1>
          <div className="flex gap-2 items-center mb-10 text-gray-400">
            <time className="italic">{post.updatedAt}</time>
            <div className="w-1 h-1 transition bg-gray-400 rounded-full" />
            <time>{post.readingTime}</time>
            <button onClick={handleAddToReadingList} title="add to read list">
              <AiOutlineBook
                size={24}
                color={isSaved ? "#a855f7" : "#9ca3af"}
              />
            </button>
          </div>
          <div
            className="post"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </div>
    </>
  );
}

interface Params extends GetServerSidePropsContext {
  params: {
    slug: string;
  };
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}: Params) => {
  let post;
  const session = await getSession({ req });
  const response = await getPost(params.slug);

  if (response) {
    post = {
      ...response,
      bgImage: response.feature_image,
      updatedAt: new Date(response.updated_at).toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      readingTime:
        response.reading_time < 1 ? "< 1 min" : `${response.reading_time} min`,
    };
  }

  if (!post) {
    return {
      notFound: true,
    };
  }

  if (session) {
    const user = await fauna.query<User>(
      q.Get(q.Match(q.Index("user_by_email"), q.Casefold(session?.user?.email)))
    );

    const isOnReadingList = user.data.readingList.some(
      (item) => item.slug === params.slug
    );

    return {
      props: { post, isOnReadingList },
    };
  }

  return {
    props: { post, isOnReadingList: false },
  };
};
