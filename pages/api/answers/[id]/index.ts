import withHandler, { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import getSession from '@libs/server/getSession';
import { NextApiRequest, NextApiResponse } from 'next';

interface Answer {
  [questionId: string]: string;
}

interface ReqBody {
  bookId: string;
  answers: Answer;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const session = await getSession(req, res);
  if (!session) {
    return res.status(404).send({ success: false, message: 'user not found' });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;

    await client.answer.delete({
      where: {
        id: id + '',
      },
    });

    return res.status(200).send({ success: true });
  }
}

export default withHandler({ methods: ['GET', 'POST', 'DELETE'], handler });
