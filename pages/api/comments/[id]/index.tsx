import withHandler, { ResponseType } from '@libs/client/withHandler';
import client from '@libs/server/client';
import getSession from '@libs/server/getSession';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const session = await getSession(req, res);
  if (!session) {
    return res.status(404).send({ success: false, message: 'user not found' });
  }

  if (req.method === 'POST') {
    const {
      query: { id },
      body: { comment },
    } = req;

    const result = await client.comment.update({
      where: {
        id: id + '',
      },
      data: {
        content: comment,
      },
    });

    // 현재 접속 아이디랑 코멘트 유저가 같으면 삭제.
    if (!comment) {
      return res
        .status(400)
        .send({ success: false, message: '메세지가 없습니다. ' });
    } else {
      if (comment?.userId === session.userId) {
        await client.comment.delete({
          where: {
            id: comment.id,
          },
        });
        return res.status(200).send({ success: true });
      }
    }

    return res.status(201).send({ success: true });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;

    await client.comment.delete({
      where: {
        id: id + '',
      },
    });
    return res.status(201).send({ success: true });
  }
}

export default withHandler({ methods: ['POST', 'DELETE'], handler });
