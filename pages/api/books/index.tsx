import withHandler, { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';

type Question = {
  content: string;
  required: boolean;
  index: number;
};

type DropInfo = {
  account: string;
  accountOwner: string;
  minAmount: string;
  bank: string;
};

type NewBookData = {
  thumbnail: string;
  targetMessage: string;
  receiveFanArt: boolean;
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  questions: Question[];
  hashtags: string[];
  dropStatus: boolean;
  dropInfo: DropInfo;
  dropEndDate: Date;
};

interface SearchWordData {
  searchWord: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const searchWord: string = req.query.searchWord as string;

    if (searchWord) {
      const searchedBooks = await client.book.findMany({
        where: {
          OR: [
            {
              title: {
                contains: searchWord,
              },
            },
            {
              hashtags: {
                some: {
                  name: searchWord,
                },
              },
            },
            {
              description: {
                contains: searchWord,
              },
            },
          ],
        },
        include: {
          favs: true,
        },
      });

      console.log(searchedBooks);

      return res.status(200).send({ success: true, books: searchedBooks });
    } else {
      const books = await client.book.findMany({
        include: {
          favs: true,
        },
      });
      return res.status(200).send({ success: true, books });
    }
  }

  if (req.method === 'POST') {
    const sessionToken = req.cookies['next-auth.session-token'];

    if (!sessionToken) {
      return res.status(401).send({ success: false, message: 'Please log in' });
    }

    const session = await client.session.findUnique({
      where: {
        sessionToken,
      },
      include: {
        user: true,
      },
    });

    if (!session) {
      return res
        .status(404)
        .send({ success: false, message: 'user not found' });
    }

    const {
      thumbnail,
      targetMessage,
      receiveFanArt,
      title,
      startDate,
      endDate,
      description,
      questions,
      hashtags,
      dropStatus,
      dropInfo: { account, accountOwner, minAmount, bank },
      dropEndDate,
    }: NewBookData = req.body;

    const titleExists = await client.book.findUnique({
      where: {
        title,
      },
    });

    if (!titleExists) {
      const book = await client.book.create({
        data: {
          thumbnail,
          title,
          targetMessage: +targetMessage,
          startDate,
          endDate,
          description,
          questions: {
            createMany: {
              data: questions,
            },
          },
          receiveFanArt,
          doesDrop: dropStatus,
          hashtags: {
            connectOrCreate: hashtags.map((tag: string) => ({
              create: { name: tag },
              where: { name: tag },
            })),
          },
          user: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });

      if (dropStatus) {
        await client.drop.create({
          data: {
            account,
            accountOwner,
            minAmount: +minAmount,
            bank,
            endDate: dropEndDate,
            book: {
              connect: {
                id: book.id,
              },
            },
          },
        });
      }
      return res.status(201).send({ success: true, book });
    } else {
      return res
        .status(400)
        .send({ success: false, message: 'Title already exists' });
    }
  }
}

export default withHandler({ methods: ['GET', 'POST'], handler });
