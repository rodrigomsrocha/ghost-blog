import { query as q } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { fauna } from "../../services/fauna";

type User = {
  ref: {
    id: string;
  };
  data: {
    readingList: string[];
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.body;

  if (req.method === "POST") {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: "you must be logged in" });
    }

    const user = await fauna.query<User>(
      q.Get(q.Match(q.Index("user_by_email"), q.Casefold(session.user.email)))
    );

    const postIsAlreadySaved = user.data?.readingList?.includes(slug);

    if (postIsAlreadySaved) {
      const updatedReadingList = user.data?.readingList?.filter(
        (item) => item !== slug
      );
      await fauna.query(
        q.Update(q.Ref(q.Collection("users"), user.ref.id), {
          data: { readingList: updatedReadingList },
        })
      );
      return res.status(200).json({ readingList: updatedReadingList });
    } else {
      const updatedReadingList = [...user?.data?.readingList, slug];
      await fauna.query(
        q.Update(q.Ref(q.Collection("users"), user.ref.id), {
          data: { readingList: updatedReadingList },
        })
      );
      return res.status(200).json({ readingList: updatedReadingList });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};
