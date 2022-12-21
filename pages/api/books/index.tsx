import withHandler from '@libs/client/withHandler';
import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';

interface Q {
  content: string;
  required: boolean;
  first: boolean;
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === 'POST') {
    console.log(req.body);

    const {
      body: { title, start, end, description, questions },
    } = req;

    const book = await client.book.create({
      data: {
        title,
        start,
        end,
        description,
        questions: {
          createMany: {
            data: questions.map((q: Q) => ({
              content: q.content,
              required: q.required,
              first: true,
            })),
          },
        },
      },
    });
    console.log(book);
  }
}

export default withHandler({ methods: ['POST'], handler });
