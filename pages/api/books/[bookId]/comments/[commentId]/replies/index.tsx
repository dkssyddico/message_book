import withHandler, { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
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

export default withHandler({ methods: ['POST'], handler });
