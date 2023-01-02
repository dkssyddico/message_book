import withHandler, { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === 'GET') {
    const {
      query: { bookId },
    } = req;

    const comments = await client.comment.findMany({
      where: {
        bookId: bookId + '',
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return res.status(200).send({ success: true, comments });
  }

  if (req.method === 'POST') {
    const {
      body: { content, bookId },
    } = req;

    const comment = await client.comment.create({
      data: {
        content,
        bookId: bookId + '',
      },
    });

    return res.status(201).send({ success: true, comment });
  }
}

export default withHandler({ methods: ['GET', 'POST'], handler });
