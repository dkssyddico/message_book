import { useEffect, useState } from 'react';
import { cls, formatAgo } from '@libs/client/utils';
import ReplyContainer from './reply/replyContainer';
import { CommentWithReply } from 'pages/books/[id]';
import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/router';
import { BookDetailResponse } from 'pages/books/[id]';
import useSWR from 'swr';

interface CommentCardProps {
  comment: CommentWithReply;
  isLiked: boolean;
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
    _count: { replies: replyCount, likes: likesCount },
  },
  isLiked,
}: CommentCardProps) {
  const router = useRouter();
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
              isLiked ? 'fill-orange-400 text-yellow-400' : ''
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
      </div>
      {/* re-comments sections */}
      {openReply && <ReplyContainer replies={replies} commentId={id} />}
    </li>
  );
}
