import { CommentWithReply } from '@libs/client/types';
import CommentCard from './commentCard';

interface CommentsListProps {
  comments: CommentWithReply[];
}

export default function CommentsList({ comments }: CommentsListProps) {
  return (
    <ul className='space-y-4'>
      {comments && comments.length > 0 ? (
        comments.map((comment: CommentWithReply) => (
          <CommentCard key={comment.id} comment={comment} />
        ))
      ) : (
        <p>아직 등록된 댓글이 없습니다!</p>
      )}
    </ul>
  );
}
