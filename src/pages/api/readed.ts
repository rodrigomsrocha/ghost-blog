import { query as q } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
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

    const postIsAlredyReaded = user.data.readingList.find(
      (item) => item.slug === slug
    ).isReaded;
    if (postIsAlredyReaded) {
      return;
    } else {
      const itemIndex = user.data.readingList.findIndex(
        (item) => item.slug === slug
      );
      const updatedReadingList = [...user.data.readingList];
      updatedReadingList[itemIndex].isReaded = true;
      await fauna.query(
        q.Update(q.Ref(q.Collection("users"), user.ref.id), {
          data: { readingList: updatedReadingList },
        })
      );
      return res.status(200).json({ readedSlug: slug });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};
