import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useMutation from '@libs/client/useMutation';
import { BookDetailResponse } from 'pages/books/[id]';
import { cls } from '@libs/client/utils';
import { BookFav } from '@prisma/client';
import useUser from '@libs/client/useUser';
import Share from '@components/share';

interface ToggleFavMutation {
  success: boolean;
}

interface LikeAndShareProps {
  title: string;
  favs: BookFav[];
}

export default function LikeAndShare({ title, favs }: LikeAndShareProps) {
  const router = useRouter();
  const user = useUser();
  const favsUserArr = favs?.map((fav) => fav.userId);

  const [openShare, setOpenShare] = useState(false);

  const { mutate } = useSWR<BookDetailResponse>(
    `/api/books/${router.query.id}`
  );

  const [toggleFav, { data }] = useMutation<ToggleFavMutation>(`
  /api/books/${router.query.id}/favs
`);

  const handleFavClick = () => {
    toggleFav({ bookId: router.query.id });
  };

  const handleShareOpen = () => {
    setOpenShare((prev) => !prev);
  };

  useEffect(() => {
    if (data && data.success) {
      mutate();
    }
  }, [data, mutate]);

  return (
    <div className='flex items-center gap-4'>
      <button
        className={cls(
          'rounded-full border border-red-500 p-2 transition ease-in-out',
          favsUserArr?.includes(user.userId) ? '' : 'bg-red-500'
        )}
        onClick={handleFavClick}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className={cls(
            'feather feather-heart ',
            favsUserArr?.includes(user.userId)
              ? 'fill-red-500 text-red-500'
              : 'fill-white text-white'
          )}
        >
          <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'></path>
        </svg>
      </button>
      <button
        onClick={handleShareOpen}
        className='rounded-full bg-blue-500 p-2 transition ease-in-out hover:bg-blue-600'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='feather feather-share-2  text-white'
        >
          <circle cx='18' cy='5' r='3'></circle>
          <circle cx='6' cy='12' r='3'></circle>
          <circle cx='18' cy='19' r='3'></circle>
          <line x1='8.59' y1='13.51' x2='15.42' y2='17.49'></line>
          <line x1='15.41' y1='6.51' x2='8.59' y2='10.49'></line>
        </svg>
      </button>
      {openShare && <Share title={title} />}
    </div>
  );
}
