import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../libs/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // await client.book.create({
  //   data: {
  //     title: 'New Message Book 46',
  //   },
  // });
  res.json({
    ok: true,
  });
}
