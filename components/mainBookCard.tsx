import { imageLoader } from '@libs/client/imageLoader';
import Image from 'next/image';
import Link from 'next/link';

interface MainBookCardProps {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  thumbnail: string;
}

// TODO: should make no-thumbnail image when thumbnail is 'no-thumbnail'
export default function MainBookCard({
  id,
  title,
  startDate,
  endDate,
  thumbnail,
}: MainBookCardProps) {
  return (
    <div
      className='relative flex w-full flex-col items-center overflow-hidden rounded-lg border shadow-md'
      key={id}
    >
      <button className='absolute top-3 right-3 z-10 rounded-full bg-teal-500 p-2'>
        <svg
          className='h-6 w-6 text-white'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
          />
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
