import { useEffect } from 'react';
import useMutation from '@libs/client/useMutation';
import { cls, formatAgo } from '@libs/client/utils';
import { useRouter } from 'next/router';
import { ReplyWithLikes } from 'pages/books/[id]';
import { BookDetailResponse } from 'pages/books/[id]';
import useSWR from 'swr';

interface ReplyCardProp {
  reply: ReplyWithLikes;
  isLiked: boolean;
}

interface toggleLikeMutation {
  success: boolean;
}

export default function ReplyCard({
  reply: {
    id,
    content,
    createdAt,
    _count: { likes: likesCount },
  },
  isLiked,
}: ReplyCardProp) {
  const router = useRouter();

  const { mutate } = useSWR<BookDetailResponse>(
    `/api/books/${router.query.id}`
  );

  const [toggleLike, { data }] = useMutation<toggleLikeMutation>(
    `/api/replies/${id}/like`
  );

  const handleClickLikes = () => {
    toggleLike({ bookId: router.query.id });
  };

  useEffect(() => {
    if (data && data.success) {
      mutate();
    }
  }, [data, mutate]);

  return (
    <div>
      <li key={id} className='space-y-3'>
        <div className='flex items-center gap-2'>
          <div className='h-8 w-8 rounded-full bg-teal-400' />
          <span className='font-semibold'>User</span>
          <span className='text-xs text-gray-400'>{formatAgo(createdAt)}</span>
        </div>
        <p className='pl-10'>{content}</p>
        <div className='flex gap-4 pl-10 text-gray-500'>
          <button
            className='flex items-center gap-1'
            onClick={handleClickLikes}
          >
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
        </div>
      </li>
    </div>
  );
}
