import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSWRConfig } from 'swr';
import useMutation from '@libs/client/useMutation';
import { BookFav } from '@prisma/client';
import useUser from '@libs/client/useUser';
import { cls } from '@libs/client/utils';

interface MainBookCardProps {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  thumbnail: string;
  favs: BookFav[];
}

interface ToggleFavMutation {
  success: boolean;
}

// TODO: should make no-thumbnail image when thumbnail is 'no-thumbnail'
export default function MainBookCard({
  id,
  title,
  startDate,
  endDate,
  thumbnail,
  favs,
}: MainBookCardProps) {
  const { mutate } = useSWRConfig();
  const user = useUser();
  const favsUserArr = favs?.map((fav) => fav.userId);

  const [toggleFav, { data }] = useMutation<ToggleFavMutation>(`
  /api/books/${id}/favs
`);

  const handleFavClick = () => {
    toggleFav({ bookId: id });
  };

  useEffect(() => {
    if (data && data.success) {
      mutate('/api/books');
    }
  }, [data, mutate]);

  return (
    <div
      className='relative flex w-full flex-col items-center overflow-hidden rounded-lg border shadow-md'
      key={id}
    >
      <button
        className={cls(
          'absolute top-2 right-2 z-10 rounded-full  p-2 transition ease-in-out'
        )}
        onClick={handleFavClick}
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
            'feather feather-heart ',
            favsUserArr?.includes(user.userId)
              ? 'fill-red-500 text-white'
              : 'fill-white text-red-500'
          )}
        >
          <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'></path>
        </svg>
      </button>
      <Link className='w-full' href={`/books/${id}`}>
        <div className='h-60 w-full overflow-hidden'>
          {thumbnail === 'no-thumbnail' ? (
            <div className='h-60 w-full bg-teal-300'>{title}</div>
          ) : (
            <Image
              src={thumbnail}
              className='h-60 w-full overflow-hidden transition duration-300 ease-in-out hover:scale-110'
              width={100}
              height={100}
              alt='thumbnail'
              priority={true}
            />
          )}
        </div>
        <div className='flex flex-col items-center space-y-2 p-4'>
          <h3 className='text-lg font-semibold'>{title}</h3>
          <div>
            <div className='flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='feather feather-calendar mr-1 text-red-500'
              >
                <rect x='3' y='4' width='18' height='18' rx='2' ry='2'></rect>
                <line x1='16' y1='2' x2='16' y2='6'></line>
                <line x1='8' y1='2' x2='8' y2='6'></line>
                <line x1='3' y1='10' x2='21' y2='10'></line>
              </svg>
              <p className='text-sm text-gray-500'>{`${startDate
                .toString()
                .slice(0, 10)} ~ ${endDate.toString().slice(0, 10)}`}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
