import withHandler from '@libs/client/withHandler';
import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === 'POST') {
    const {
      body: { title },
    } = req;
    // TODO: 데이터 모두 채우기
    const book = await client.book.create({
      data: {
        title,
      },
    });
  }
}

export default withHandler({ methods: ['POST'], handler });
