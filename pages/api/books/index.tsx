import withHandler, { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === 'GET') {
    const books = await client.book.findMany();
    return res.status(200).send({ success: true, books });
  }

  if (req.method === 'POST') {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).send({ success: false, message: 'Please log in' });
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
      // TODO: should include User data
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
              email: session.user?.email!,
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
