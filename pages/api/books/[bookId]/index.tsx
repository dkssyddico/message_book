import withHandler, { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
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
      query: { bookId },
    } = req;

    const book = await client.book.findUnique({
      where: {
        id: bookId + '',
      },
      include: {
        questions: true,
        hashtags: true,
        drop: true,
        favs: true,
        comments: {
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            _count: {
              select: {
                replies: true,
                likes: true,
              },
            },
            replies: {
              orderBy: {
                createdAt: 'asc',
              },
              include: {
                likes: true,
                _count: {
                  select: {
                    likes: true,
                  },
                },
              },
            },
            likes: true,
          },
        },
      },
    });

    return res.status(200).send({ success: true, book });
  }
}

export default withHandler({ methods: ['GET'], handler });
