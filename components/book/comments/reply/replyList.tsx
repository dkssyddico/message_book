import { ReplyWithLikes } from 'pages/books/[id]';
import ReplyCard from './replyCard';

interface ReplyListProps {
  replies: ReplyWithLikes[] | null;
}

export default function ReplyList({ replies }: ReplyListProps) {
  console.log(replies);

  return (
    <ul className='space-y-2'>
      {replies &&
        replies.length > 0 &&
        replies.map((reply) => <ReplyCard reply={reply} key={reply.id} />)}
    </ul>
  );
}
