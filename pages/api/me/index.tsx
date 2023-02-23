import withHandler, { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import getSession from '@libs/server/getSession';
import { NextApiRequest, NextApiResponse } from 'next';

type Question = {
  content: string;
  required: boolean;
  index: number;
};

type DropInfo = {
  account: string;
  accountOwner: string;
  minAmount: string;
  bank: string;
};

type NewBookData = {
  thumbnail: string;
  targetMessage: string;
  receiveFanArt: boolean;
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  questions: Question[];
  hashtags: string[];
  dropStatus: boolean;
  dropInfo: DropInfo;
  dropEndDate: Date;
};

interface SearchWordData {
  searchWord: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const session = await getSession(req, res);

    if (!session) {
      return res
        .status(404)
        .send({ success: false, message: 'user not found' });
    }

    console.log(session);
    const user = await client.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        accounts: true,
      },
    });

    console.log(user);
  }

  if (req.method === 'POST') {
  }
}

export default withHandler({ methods: ['GET', 'POST'], handler });
