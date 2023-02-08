import { ReplyLike } from '@prisma/client';
import { ReplyWithLikes } from 'pages/books/[id]';
import ReplyCard from './replyCard';

interface ReplyListProps {
  replies: ReplyWithLikes[] | null;
  likedReplies: ReplyLike[] | undefined;
}

export default function ReplyList({ replies, likedReplies }: ReplyListProps) {
  const likedRepliesIdArray = likedReplies?.map((reply) => reply.replyId);

  return (
    <ul className='space-y-2'>
      {replies &&
        replies.length > 0 &&
        replies.map((reply) => (
          <ReplyCard
            isLiked={
              likedRepliesIdArray
                ? likedRepliesIdArray?.includes(reply.id)
                : false
            }
            reply={reply}
            key={reply.id}
          />
        ))}
    </ul>
  );
}
