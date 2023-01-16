import withHandler, { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === 'GET') {
    const books = await client.book.findMany();
    return res.status(200).send({ success: true, books });
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
      return res.status(404).send({ success: false, message: 'user not found' });
    }

    const {
      body: { thumbnail, title, startDate, endDate, description, questions, hashtags },
    } = req;

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
          startDate,
          endDate,
          description,
          questions: {
            createMany: {
              data: questions,
            },
          },
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
      return res.status(201).send({ success: true, book });
    } else {
      return res.status(400).send({ success: false, message: 'Title already exists' });
    }
  }
}

export default withHandler({ methods: ['GET', 'POST'], handler });
