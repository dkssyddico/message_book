import withHandler, { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import getSession from '@libs/server/getSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const session = await getSession(req, res);

    if (!session) {
      return res
        .status(404)
        .send({ success: false, message: 'user not found' });
    }

    const user = await client.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        accounts: true,
        books: true,
        answers: {
          include: {
            question: true,
            book: true,
          },
        },
      },
    });

    return res.status(200).send({ success: true, user });
  }

  if (req.method === 'POST') {
  }
}

export default withHandler({ methods: ['GET', 'POST'], handler });
