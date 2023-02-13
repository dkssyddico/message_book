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
      body: { bookId },
    } = req;

    const alreadyFav = await client.bookFav.findFirst({
      where: {
        userId: session.user.id,
        bookId: bookId + '',
      },
    });

    if (!alreadyFav) {
      await client.bookFav.create({
        data: {
          userId: session.user.id,
          bookId: bookId + '',
        },
      });
      return res.status(201).send({ success: true });
    } else {
      if (session.user.id === alreadyFav.userId) {
        await client.bookFav.delete({
          where: {
            id: alreadyFav.id,
          },
        });
        return res.status(200).send({ success: true });
      } else {
        return res.status(400).send({ success: false });
      }
    }
  }
}

export default withHandler({ methods: ['POST'], handler });
