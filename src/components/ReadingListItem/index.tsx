import Link from "next/link";
import { AiOutlineCheckCircle, AiOutlineDelete } from "react-icons/ai";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
  readingTime: string;
  isReaded: boolean;
};

interface ReadingListItemProps {
  post: Post;
  removeFromReadingList: (slug: string) => void;
  markAsRead: (slug: string) => void;
}

export function ReadingListItem({
  post,
  markAsRead,
  removeFromReadingList,
}: ReadingListItemProps) {
  return post.isReaded ? (
    <div
      key={post.id}
      className="shadow-neu bg-transparent rounded-md p-4 relative"
    >
      <div className="absolute right-4 flex gap-4">
        <button
          onClick={() => removeFromReadingList(post.slug)}
          className="transition px-2 py-1 bg-gray-200 rounded-sm hover:bg-purple-200 hover:text-purple-500"
          title="delete"
        >
          <AiOutlineDelete size={24} />
        </button>
        <button
          className="transition px-2 py-1 bg-purple-200 rounded-sm text-purple-500"
          disabled
          title="readed"
        >
          <AiOutlineCheckCircle size={24} />
        </button>
      </div>

      <Link href={`/posts/${post.slug}`}>
        <a className="group">
          <h1 className="transition text-2xl font-bold mb-4 text-gray-400">
            {post.title}
          </h1>
          <p className="mb-2 line-clamp-3 overflow-hidden text-gray-300">
            {post.excerpt}
          </p>
          <div className="flex transition gap-2 items-center text-gray-400">
            <time className="italic">{post.updatedAt}</time>
            <div className="w-1 h-1 transition bg-gray-400 rounded-full" />
            <span>{post.readingTime}</span>
          </div>
        </a>
      </Link>
    </div>
  ) : (
    <div
      key={post.id}
      className="shadow-neu bg-transparent rounded-md p-4 relative"
    >
      <div className="absolute right-4 flex gap-4">
        <button
          onClick={() => removeFromReadingList(post.slug)}
          className="transition px-2 py-1 bg-gray-200 rounded-sm hover:bg-purple-200 hover:text-purple-500"
          title="delete"
        >
          <AiOutlineDelete size={24} />
        </button>
        <button
          onClick={() => markAsRead(post.slug)}
          className="transition px-2 py-1 bg-gray-200 rounded-sm hover:bg-purple-200 hover:text-purple-500"
          title="readed"
        >
          <AiOutlineCheckCircle size={24} />
        </button>
      </div>

      <Link href={`/posts/${post.slug}`}>
        <a className="group">
          <h1 className="transition text-2xl font-bold mb-4 group-hover:text-purple-500">
            {post.title}
          </h1>
          <p className="mb-2 line-clamp-3 overflow-hidden">{post.excerpt}</p>
          <div className="flex transition gap-2 items-center text-gray-400 group-hover:text-purple-300">
            <time className="italic">{post.updatedAt}</time>
            <div className="w-1 h-1 transition bg-gray-400 group-hover:bg-purple-500 rounded-full" />
            <span>{post.readingTime}</span>
          </div>
        </a>
      </Link>
    </div>
  );
}
