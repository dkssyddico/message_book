import withHandler, { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // 특정 유저가 제출한 것 조회
  // 특정 메세지북에서 제출된 것 조회
  if (req.method === 'GET') {
    const fanArts = await client.fanArt.findMany();
    return res.status(200).send({ success: true, fanArts });
  }

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

    const { fanArt: image, bookId, fanArtId } = req.body;

    if (fanArtId) {
      const updatedFanArt = await client.fanArt.update({
        where: {
          id: fanArtId,
        },
        data: {
          image,
        },
      });
      return res.status(201).send({ success: true });
    }

    const fanArt = await client.fanArt.create({
      data: {
        image,
        bookId: bookId,
        userId: session.user.id,
      },
    });

    return res.status(201).send({ success: true });
  }
}

export default withHandler({ methods: ['GET', 'POST'], handler });
