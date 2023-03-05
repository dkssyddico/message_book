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

  if (req.method === 'DELETE') {
    const {
      query: { id },
    } = req;

    const fanArt = await client.fanArt.findUnique({
      where: {
        id: id + '',
      },
    });

    if (!fanArt) {
      return res
        .status(404)
        .send({ success: false, message: 'Fanart not Found' });
    }

    if (fanArt.userId === session.userId) {
      await client.fanArt.delete({
        where: {
          id: id + '',
        },
      });
      return res.status(201).send({ success: true });
    }
  }
}

export default withHandler({ methods: ['DELETE'], handler });
