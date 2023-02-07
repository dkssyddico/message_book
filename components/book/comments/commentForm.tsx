import useMutation from '@libs/client/useMutation';
import { Comment } from '@prisma/client';
import { BookDetailResponse } from 'pages/books/[id]';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

interface Form {
  content: string;
}

interface SubmitCommentMutation {
  success: boolean;
  comment: Comment;
}

interface CommentFormProps {
  bookId: string;
}

export default function CommentForm({ bookId }: CommentFormProps) {
  const { register, handleSubmit, reset } = useForm<Form>();
  const [submitComment, { loading, data: commentData }] =
    useMutation<SubmitCommentMutation>(`/api/books/${bookId}/comments`);

  const { mutate } = useSWR<BookDetailResponse>(`/api/books/${bookId}`);

  const onValid = async ({ content }: Form) => {
    if (content === '') return;
    submitComment({ content, bookId });
  };

  useEffect(() => {
    if (commentData && commentData.success) {
      mutate();
      reset();
    }
  }, [commentData, reset, mutate]);

  return (
    <form onSubmit={handleSubmit(onValid)} className='flex flex-col'>
      <div className='relative'>
        <input
          {...register('content')}
          className='w-full origin-center rounded-lg border-2 border-gray-200 bg-white pb-2 outline-none transition duration-300 ease-in-out focus:border-orange-300 focus:ring-0'
          type='text'
          placeholder='댓글 쓰기'
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
