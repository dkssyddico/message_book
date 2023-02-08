import { CommentLike } from '@prisma/client';
import { CommentWithReply } from 'pages/books/[id]';
import CommentCard from './commentCard';

interface CommentsListProps {
  comments: CommentWithReply[] | undefined;
  likedComments: CommentLike[] | undefined;
}

export default function CommentsList({
  comments,
  likedComments,
}: CommentsListProps) {
  const likedCommentsIDArray = likedComments?.map(
    (comment) => comment.commentId
  );

  return (
    <ul className='space-y-4'>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <CommentCard
            isLiked={
              likedCommentsIDArray
                ? likedCommentsIDArray?.includes(comment.id)
                : false
            }
            key={comment.id}
            comment={comment}
          />
        ))
      ) : (
        <p>아직 등록된 댓글이 없습니다!</p>
      )}
    </ul>
  );
}
