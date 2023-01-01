import { Comment } from '@prisma/client';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import CommentForm from './commentForm';
import CommentsList from './commentsList';

export interface CommentsResponse {
  success: boolean;
  comments: Comment[];
}

export default function CommentsContainer() {
  const router = useRouter();
  const {
    query: { id: bookId },
  } = router;

  const { data, isLoading } = useSWR<CommentsResponse>(`/api/books/${bookId}/comments`);

  return (
    <section className='w-full overflow-hidden md:w-3/4'>
      <div className='flex h-10 items-center justify-center rounded-tl-2xl rounded-tr-2xl bg-yellow-400 font-semibold'>
        <span>댓글</span>
      </div>
      <div className='space-y-8 rounded-bl-2xl rounded-br-2xl border-2 border-t-0 p-8 '>
        <CommentsList comments={isLoading ? null : data?.comments!} />
        <CommentForm bookId={bookId + ''} />
      </div>
    </section>
  );
}
