import { formatAgo } from '@libs/client/time';
import { Comment } from '@prisma/client';
import CommentCard from './commentCard';
import ReplyCard from './replyCard';

interface CommentsListProps {
  comments: Comment[] | null;
}

export default function CommentsList({ comments }: CommentsListProps) {
  return (
    <ul className='space-y-2'>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            id={comment.id}
            time={comment.createdAt}
            content={comment.content}
          />
        ))
      ) : (
        <p>아직 등록된 댓글이 없습니다!</p>
      )}
    </ul>
  );
}
