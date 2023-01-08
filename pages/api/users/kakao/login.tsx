import withHandler, { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === 'POST') {
    console.log(req.body);
    return res.status(201).send({ success: true });
  }
}

export default withHandler({ methods: ['POST'], handler });
