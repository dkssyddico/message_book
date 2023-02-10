import { CommentLike, ReplyLike } from '@prisma/client';
import { useRouter } from 'next/router';
import { CommentWithReply } from 'pages/books/[id]';
import Container from '../container';
import CommentForm from './commentForm';
import CommentsList from './commentsList';

export interface CommentsContainerProps {
  comments: CommentWithReply[] | undefined;
  likedReplies: ReplyLike[] | undefined;
}

export default function CommentsContainer({
  comments,
  likedReplies,
}: CommentsContainerProps) {
  const router = useRouter();
  const {
    query: { id: bookId },
  } = router;

  return (
    <Container title='댓글'>
      <div className='space-y-8'>
        <CommentsList likedReplies={likedReplies} comments={comments} />
        <CommentForm bookId={bookId + ''} />
      </div>
    </Container>
  );
}
