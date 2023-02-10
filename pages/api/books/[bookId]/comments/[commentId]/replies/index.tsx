import withHandler, { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import getSession from '@libs/server/getSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'POST') {
    const session = await getSession(req, res);

    if (!session) {
      return res
        .status(404)
        .send({ success: false, message: 'user not found' });
    }

    const {
      body: { content },
      query: { bookId, commentId },
    } = req;

    const reply = await client.reply.create({
      data: {
        userId: session.user.id,
        content,
        bookId: bookId + '',
        commentId: commentId + '',
      },
    });

    return res.status(201).send({ success: true, reply });
  }
}

export default withHandler({ methods: ['POST'], handler });
