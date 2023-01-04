import { CommentWithReply } from 'pages/books/[id]';
import CommentCard from './commentCard';

interface CommentsListProps {
  comments: CommentWithReply[] | undefined;
}

export default function CommentsList({ comments }: CommentsListProps) {
  return (
    <ul className='space-y-4'>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            commentId={comment.id}
            time={comment.createdAt}
            content={comment.content}
            replies={comment.replies}
            replyCount={comment._count.replies}
          />
        ))
      ) : (
        <p>아직 등록된 댓글이 없습니다!</p>
      )}
    </ul>
  );
}