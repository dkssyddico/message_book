import withHandler, { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import getSession from '@libs/server/getSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const session = await getSession(req, res);

  if (!session) {
    return res.status(404).send({ success: false, message: 'user not found' });
  }

  if (req.method === 'POST') {
    const {
      body: { content, bookId },
    } = req;

    const comment = await client.comment.create({
      data: {
        userId: session.user.id,
        content,
        bookId: bookId + '',
      },
    });

    return res.status(201).send({ success: true, comment });
  }
}

export default withHandler({ methods: ['GET', 'POST'], handler });
