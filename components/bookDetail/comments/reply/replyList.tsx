import { Reply } from '@prisma/client';
import ReplyCard from './replyCard';

interface ReplyListProps {
  replies: Reply[] | null;
}

export default function ReplyList({ replies }: ReplyListProps) {
  return (
    <ul className='space-y-2'>
      {replies &&
        replies.length > 0 &&
        replies.map((reply) => (
          <ReplyCard
            key={reply.id}
            replyId={reply.id}
            time={reply.createdAt}
            content={reply.content}
          />
        ))}
    </ul>
  );
}
