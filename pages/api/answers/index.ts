import withHandler, { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import getSession from '@libs/server/getSession';
import { NextApiRequest, NextApiResponse } from 'next';

interface Answer {
  [questionId: string]: string;
}

interface AnswerData {
  questionId: string;
  content: string;
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

    const answers = await client.answer.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        question: true,
      },
    });

    return res.status(200).send({ success: true, answers });
  }

  if (req.method === 'POST') {
    const session = await getSession(req, res);

    if (!session) {
      return res
        .status(404)
        .send({ success: false, message: 'user not found' });
    }

    const answers: Answer = req.body;
    const answersKeysArr: string[] = Object.keys(answers);

    answersKeysArr.forEach(async (questionId) => {
      const actualAnswer = answers[questionId].trim();
      if (actualAnswer) {
        const alreadyAnswered = await client.answer.findFirst({
          where: {
            userId: session.user.id,
            questionId: questionId,
          },
        });
        if (alreadyAnswered) {
          await client.answer.update({
            where: {
              id: alreadyAnswered.id,
            },
            data: {
              content: actualAnswer,
            },
          });
          return res.status(201).send({ success: true });
        } else {
          await client.answer.create({
            data: {
              userId: session.user.id,
              questionId,
              content: actualAnswer,
            },
          });
          return res.status(201).send({ success: true });
        }
      }
    });
  }
}

export default withHandler({ methods: ['GET', 'POST'], handler });
