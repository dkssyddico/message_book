import { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';

export default async function getSession(
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

    return session;
  }
}
