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
      query: { id },
    } = req;

    const reply = await client.reply.findUnique({
      where: {
        id: id + '',
      },
    });

    if (!reply) {
      return res
        .status(400)
        .send({ success: false, message: '메세지가 없습니다. ' });
    } else {
      if (reply?.userId === session.userId) {
        await client.reply.delete({
          where: {
            id: reply.id,
          },
        });
        return res.status(200).send({ success: true });
      }
    }

    return res.status(201).send({ success: true });
  }
}

export default withHandler({ methods: ['POST'], handler });
