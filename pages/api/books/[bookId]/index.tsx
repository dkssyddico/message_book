import withHandler, { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === 'GET') {
    const {
      query: { bookId },
    } = req;

    const book = await client.book.findUnique({
      where: {
        id: bookId + '',
      },
      include: {
        questions: true,
        hashtags: true,
        comments: {
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            _count: {
              select: {
                replies: true,
              },
            },
            replies: {
              orderBy: {
                createdAt: 'asc',
              },
            },
          },
        },
      },
    });

    const questions = await client.question.findMany({
      where: {
        bookId: book?.id,
      },
    });

    return res.status(200).send({ success: true, book, questions });
  }
}

export default withHandler({ methods: ['GET'], handler });
