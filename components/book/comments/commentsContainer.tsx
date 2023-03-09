import { CommentWithReply } from '@libs/client/types';
import { useRouter } from 'next/router';
import Container from '../container';
import CommentForm from './commentForm';
import CommentsList from './commentsList';

export interface CommentsContainerProps {
  comments: CommentWithReply[];
}

export default function CommentsContainer({
  comments,
}: CommentsContainerProps) {
  const router = useRouter();
  const {
    query: { id: bookId },
  } = router;

  return (
    <Container title='댓글'>
      <div className='space-y-8'>
        <CommentsList comments={comments} />
        <CommentForm bookId={bookId + ''} />
      </div>
    </Container>
  );
}
