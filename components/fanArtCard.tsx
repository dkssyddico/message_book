import useSWR from 'swr';
import { useSetRecoilState } from 'recoil';
import { FanArtWithBook, MyResponse } from 'pages/my';
import { modalState } from 'state/modal';
import Image from 'next/image';
import Link from 'next/link';

interface FanArtProps {
  fanArt: FanArtWithBook;
}

export default function FanArtCard({ fanArt }: FanArtProps) {
  const { mutate } = useSWR<MyResponse>('/api/me');
  const setModal = useSetRecoilState(modalState);

  return (
    <div
      key={fanArt.id}
      className='flex h-80 w-full flex-col items-center overflow-hidden rounded-lg border shadow-md'
    >
      <div className='h-60 w-full overflow-hidden'>
        <Link href={`/books/${fanArt.bookId}`}>
          <Image
            width={100}
            height={100}
            src={fanArt.image}
            alt='fanArt'
            className='h-60 w-full overflow-hidden transition duration-300 ease-in-out hover:scale-110'
          />
        </Link>
      </div>
      <div className='flex h-20 flex-col items-center justify-center gap-y-2'>
        <h4 className='text-lg font-semibold'> {fanArt.book.title}</h4>
        <button>
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
