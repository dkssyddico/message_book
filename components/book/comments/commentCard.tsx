import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import useMutation from '@libs/client/useMutation';
import useUser from '@libs/client/useUser';
import { cls, formatAgo } from '@libs/client/utils';
import ReplyContainer from './reply/replyContainer';
import { CommentWithReply } from 'pages/books/[id]';
import { BookDetailResponse } from 'pages/books/[id]';
import { ReplyLike } from '@prisma/client';

interface CommentCardProps {
  comment: CommentWithReply;
}

interface toggleLikeMutation {
  success: boolean;
}

export default function CommentCard({
  comment: {
    id,
    content,
    createdAt,
    replies,
    userId,
    likes,
    _count: { replies: replyCount, likes: likesCount },
  },
}: CommentCardProps) {
  const router = useRouter();
  const loggedInUser = useUser();

  const likesArr = likes.map((like) => like.userId);

  const [openReply, setOpenReply] = useState(false);

  const [toggleLike, { data }] = useMutation<toggleLikeMutation>(
    `/api/comments/${id}/like`
  );

  const { mutate } = useSWR<BookDetailResponse>(
    `/api/books/${router.query.id}`
  );

  const handleClickLikes = () => {
    toggleLike({ bookId: router.query.id });
  };

  const handleReplyOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpenReply((prev) => !prev);
  };

  const handleCommentDelete = () => {};

  useEffect(() => {
    if (data && data.success) {
      mutate();
    }
  }, [data, mutate]);

  return (
    <li key={id} className='space-y-3'>
      <div className='flex items-center gap-2'>
        <div className='h-8 w-8 rounded-full bg-teal-400' />
        <span className='font-semibold'>User</span>
        <span className='text-xs text-gray-400'>{formatAgo(createdAt)}</span>
      </div>
      <p className='pl-10'>{content}</p>
      <div className='flex gap-4 pl-10 text-gray-500'>
        <button className='flex items-center gap-1' onClick={handleClickLikes}>
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
            className={cls(
              'feather feather-thumbs-up h-4 w-4',
              likesArr.includes(loggedInUser.userId)
                ? 'fill-orange-400 text-yellow-400'
                : ''
            )}
          >
            <path d='M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3'></path>
          </svg>
          <span>{likesCount}</span>
        </button>
        <button className='flex items-center gap-1' onClick={handleReplyOpen}>
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
            className='feather feather-message-circle h-4 w-4'
          >
            <path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'></path>
          </svg>
          <span>{replyCount}</span>
        </button>
        {userId === loggedInUser.userId && (
          <button>
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
              className='feather feather-trash-2 h-4 w-4'
            >
              <polyline points='3 6 5 6 21 6'></polyline>
              <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
              <line x1='10' y1='11' x2='10' y2='17'></line>
              <line x1='14' y1='11' x2='14' y2='17'></line>
            </svg>
          </button>
        )}
      </div>
      {/* re-comments sections */}
      {openReply && <ReplyContainer replies={replies} commentId={id} />}
    </li>
  );
}
