import { CommentLike } from '@prisma/client';
import { useRouter } from 'next/router';
import { CommentWithReply } from 'pages/books/[id]';
import Container from '../container';
import CommentForm from './commentForm';
import CommentsList from './commentsList';

export interface CommentsContainerProps {
  comments: CommentWithReply[] | undefined;
  likedComments: CommentLike[] | undefined;
}

export default function CommentsContainer({
  comments,
  likedComments,
}: CommentsContainerProps) {
  const router = useRouter();
  const {
    query: { id: bookId },
  } = router;

  return (
    <Container title='댓글'>
      <div className='space-y-8'>
        <CommentsList likedComments={likedComments} comments={comments} />
        <CommentForm bookId={bookId + ''} />
      </div>
    </Container>
  );
}
