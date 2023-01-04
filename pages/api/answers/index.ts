import withHandler, { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';

interface Answer {
  [questionId: string]: string;
}

interface AnswerData {
  questionId: string;
  content: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === 'POST') {
    const answers: Answer = req.body;
    const answersKeysArr: string[] = Object.keys(answers);
    let answersData: AnswerData[] = [];

    for (let i = 0; i < answersKeysArr.length; i++) {
      let actualAnswer = answers[answersKeysArr[i]].trim();
      if (actualAnswer) {
        answersData = [
          ...answersData,
          { questionId: answersKeysArr[i], content: answers[answersKeysArr[i]] },
        ];
      }
    }

    await client.answer.createMany({
      data: answersData,
    });

    return res.status(201).send({ success: true });
  }
}

export default withHandler({ methods: ['POST'], handler });
