import withHandler, { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';

interface Question {
  content: string;
  required: boolean;
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === 'POST') {
    const {
      body: { thumbnail, title, startDate, endDate, description, questions, hashtags },
    } = req;

    const titleExists = await client.book.findUnique({
      where: {
        title,
      },
    });

    if (!titleExists) {
      // TODO: should include User data
      const book = await client.book.create({
        data: {
          thumbnail,
          title,
          startDate,
          endDate,
          description,
          questions: {
            createMany: {
              data: questions.map((question: Question) => ({
                content: question.content,
                required: question.required,
              })),
            },
          },
          hashtags: {
            connectOrCreate: hashtags.map((tag: string) => ({
              create: { name: tag },
              where: { name: tag },
            })),
          },
        },
      });
      return res.json({ success: true, book });
    } else {
      return res.json({ success: false, message: 'Title already exists' });
    }
  }
}

export default withHandler({ methods: ['POST'], handler });
