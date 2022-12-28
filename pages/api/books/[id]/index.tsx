import withHandler, { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === 'GET') {
    const {
      query: { id },
    } = req;

    const book = await client.book.findUnique({
      where: {
        id: id + '',
      },
    });

    const questions = await client.question.findMany({
      where: {
        bookId: book?.id,
      },
    });

    return res.status(200).send({ success: true, book, questions });
  }
}

export default withHandler({ methods: ['GET'], handler });
