import withHandler, { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
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
      query: { id: commentId },
      body: { bookId },
    } = req;

    const alreadyLike = await client.commentLike.findFirst({
      where: {
        commentId: commentId + '',
        userId: session.user.id,
        bookId: bookId,
      },
    });

    if (alreadyLike) {
      await client.commentLike.delete({
        where: {
          id: alreadyLike.id,
        },
      });
    } else {
      await client.commentLike.create({
        data: {
          comment: {
            connect: {
              id: commentId + '',
            },
          },
          user: {
            connect: {
              id: session.user.id + '',
            },
          },
          book: {
            connect: {
              id: bookId,
            },
          },
        },
      });
    }

    return res.status(201).send({ success: true });
  }
}

export default withHandler({ methods: ['POST'], handler });
