import { GetStaticPaths, GetStaticProps } from "next";
import { getPost, getPosts } from "../../lib/posts";

type Post = {
  post: {
    bgImage: string;
    title: string;
    updatedAt: string;
    html: string;
    readingTime: string;
  };
};

export default function Post({ post }: Post) {
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
          <div className="flex gap-2 items-center text-gray-400 mb-10">
            <time className="italic">{post.updatedAt}</time>
            <div className="w-1 h-1 transition bg-gray-400 rounded-full" />
            <span>{post.readingTime}</span>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await getPost(params.slug);

  const post = {
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

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
    revalidate: 60 * 60 * 8,
  };
};
