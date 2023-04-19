import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { useSetRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { modalState } from 'state/modal';
import { CommentWithBook, MyResponse } from '@libs/client/types';
import { Comment } from '@prisma/client';

interface Form {
  comment: string;
}

interface CommentCardProps {
  comment: CommentWithBook;
}

interface EditCommentMutation {
  success: boolean;
}

export default function CommentCard({ comment }: CommentCardProps) {
  const { mutate } = useSWR<MyResponse>('/api/me');
  const [OpenEdit, setOpenEdit] = useState(false);
  const setModal = useSetRecoilState(modalState);

  const handleAnswerDelete = async () => {
    const result = await axios.delete(`/api/comments/${comment.id}`);
    if (result.data.success) {
      mutate();
    }
  };

  const handleEditClick = () => {
    setOpenEdit((prev) => !prev);
  };

  const [editComment, { loading, data }] = useMutation<EditCommentMutation>(
    `/api/comments/${comment.id}`
  );

  const { register, handleSubmit } = useForm<Form>();

  const onValid = ({ comment }: Form) => {
    editComment({ comment });
  };

  useEffect(() => {
    if (data && data.success) {
      setModal({
        open: true,
        message: '댓글이 성공적으로 수정되었습니다.',
        status: 'success',
      });
    }
  }, [data, setModal]);

  return (
    <div
      className='grid h-20 grid-cols-3 items-center gap-3 rounded-lg border-b p-4 text-center font-semibold'
      key={comment.id}
    >
      <h4>
        <Link href={`/books/${comment.bookId}`}>{comment.book.title}</Link>
      </h4>
      {OpenEdit ? (
        <form className='relative' onSubmit={handleSubmit(onValid)}>
          <input
            {...register('comment', {
              value: comment.content,
            })}
            className='w-full rounded-lg text-center'
            type='text'
          />
          <button className='absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-mint p-1 transition duration-300 ease-in-out hover:bg-lime'>
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
              className='feather feather-arrow-up h-4 w-4'
            >
              <line x1='12' y1='19' x2='12' y2='5'></line>
              <polyline points='5 12 12 5 19 12'></polyline>
            </svg>
          </button>
        </form>
      ) : (
        <p>{comment.content}</p>
      )}
      <div className='flex justify-center gap-4'>
        <button onClick={handleEditClick}>
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
            className='feather feather-edit text-gray-400 transition ease-linear hover:text-gray-500'
          >
            <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'></path>
            <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'></path>
          </svg>
        </button>
        <button onClick={handleAnswerDelete}>
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
            className='feather feather-trash-2 text-gray-400 transition ease-linear hover:text-gray-500'
          >
            <polyline points='3 6 5 6 21 6'></polyline>
            <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
            <line x1='10' y1='11' x2='10' y2='17'></line>
            <line x1='14' y1='11' x2='14' y2='17'></line>
          </svg>
        </button>
      </div>
    </div>
  );
}
