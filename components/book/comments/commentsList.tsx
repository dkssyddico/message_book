import { CommentLike, ReplyLike } from '@prisma/client';
import { CommentWithReply } from 'pages/books/[id]';
import CommentCard from './commentCard';

interface CommentsListProps {
  comments: CommentWithReply[] | undefined;
  likedReplies: ReplyLike[] | undefined;
}

export default function CommentsList({
  comments,
  likedReplies,
}: CommentsListProps) {
  console.log(comments);

  return (
    <ul className='space-y-4'>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))
      ) : (
        <p>아직 등록된 댓글이 없습니다!</p>
      )}
    </ul>
  );
}
