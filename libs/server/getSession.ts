import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseType } from '@libs/client/withHandler';
import client from './client';

export default async function getSession(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
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

  return session;
}
