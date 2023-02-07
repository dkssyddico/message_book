import { useRouter } from 'next/router';
import { CommentWithReply } from 'pages/books/[id]';
import Container from '../container';
import CommentForm from './commentForm';
import CommentsList from './commentsList';

export interface CommentsContainerProps {
  comments: CommentWithReply[] | undefined;
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
      <div className='space-y-8 rounded-bl-2xl rounded-br-2xl border-2 border-t-0 p-8 '>
        <CommentsList comments={comments} />
        <CommentForm bookId={bookId + ''} />
      </div>
    </Container>
  );
}
