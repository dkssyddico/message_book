import { ReplyWithLikes } from '@libs/client/types';
import ReplyCard from './replyCard';

interface ReplyListProps {
  replies: ReplyWithLikes[] | null;
}

export default function ReplyList({ replies }: ReplyListProps) {
  return (
    <ul className='space-y-2'>
      {replies &&
        replies.length > 0 &&
        replies.map((reply) => <ReplyCard reply={reply} key={reply.id} />)}
    </ul>
  );
}
