import withHandler, { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === 'GET') {
    const {
      query: { bookId, commentId },
    } = req;

    const replies = await client.reply.findMany({
      where: {
        bookId: bookId + '',
        commentId: commentId + '',
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    console.log(replies);

    return res.status(200).send({ success: true, replies });
  }

  if (req.method === 'POST') {
    const {
      body: { content },
      query: { bookId, commentId },
    } = req;

    const reply = await client.reply.create({
      data: {
        content,
        bookId: bookId + '',
        commentId: commentId + '',
      },
    });

    return res.status(201).send({ success: true, reply });
  }
}

export default withHandler({ methods: ['GET', 'POST'], handler });
