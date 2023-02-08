import { CommentLike, ReplyLike } from '@prisma/client';
import { CommentWithReply } from 'pages/books/[id]';
import CommentCard from './commentCard';

interface CommentsListProps {
  comments: CommentWithReply[] | undefined;
  likedComments: CommentLike[] | undefined;
  likedReplies: ReplyLike[] | undefined;
}

export default function CommentsList({
  comments,
  likedComments,
  likedReplies,
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
            likedReplies={likedReplies}
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
