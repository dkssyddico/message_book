import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/router';
import { BookDetailResponse, CommentWithReply } from 'pages/books/[id]';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

interface Form {
  content: string;
}

interface SubmitReplyMutation {
  success: boolean;
  reply: Comment;
}

interface ReplyFormProps {
  commentId: string;
}

export default function ReplyForm({ commentId }: ReplyFormProps) {
  const router = useRouter();
  const {
    query: { id: bookId },
  } = router;

  const { register, handleSubmit, reset } = useForm<Form>();
  const [submitReply, { loading, data: replyData }] =
    useMutation<SubmitReplyMutation>(
      `/api/books/${bookId}/comments/${commentId}/replies`
    );

  const { mutate } = useSWR<BookDetailResponse>(`/api/books/${bookId}`);

  const onValid = async ({ content }: Form) => {
    if (content === '') return;
    submitReply({ content, bookId });
  };

  useEffect(() => {
    if (replyData && replyData.success) {
      mutate();
      reset();
    }
  }, [replyData, reset, mutate]);

  return (
    <form onSubmit={handleSubmit(onValid)} className='flex flex-col pl-10'>
      <div className='relative'>
        <input
          {...register('content')}
          className='w-full origin-center rounded-lg border-2 border-gray-200 py-2 px-3 outline-none transition duration-300 ease-in-out focus:border-orange-300 focus:ring-0'
          type='text'
          placeholder='답글 쓰기'
        />
        <button
          className='absolute bottom-2 right-2 rounded-full bg-orange-500 p-1 transition duration-300 ease-in-out hover:bg-orange-600'
          type='submit'
        >
          {loading ? (
            <svg
              className='h-5 w-5 animate-spin text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='feather feather-arrow-up h-5 w-5 rounded-full text-white'
            >
              <line x1='12' y1='19' x2='12' y2='5'></line>
              <polyline points='5 12 12 5 19 12'></polyline>
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
