import Link from 'next/link';
import { useRef } from 'react';

export default function Navbar() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleLoginClick = () => {
    dialogRef.current?.showModal();
  };

  const handleDialogClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <>
      <header className='fixed top-0 z-10 flex w-full items-center justify-between bg-white p-4 px-8'>
        <Link href='/'>
          <h1 className='text-lg font-bold'>Message Book</h1>
        </Link>
        <div className='flex items-center gap-4'>
          <div>
            <Link href='/books/new'>
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
                className='feather feather-book transition duration-150 ease-linear hover:scale-110'
              >
                <path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'></path>
                <path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'></path>
              </svg>
            </Link>
          </div>
          <button className='font-semibold transition duration-150 ease-linear hover:text-gray-500'>
            회원가입
          </button>
          <button
            onClick={handleLoginClick}
            className='font-semibold outline-none transition duration-150 ease-linear hover:text-gray-500'
          >
            로그인
          </button>
        </div>
      </header>
      {/* TODO: 카카오톡 로그인 연결 */}
      <dialog className='h-80 w-3/4 rounded-lg p-0 md:w-[420px]' ref={dialogRef}>
        <div className='flex h-1/6 w-full items-center justify-end bg-yellow-400 px-4'>
          <button onClick={handleDialogClose}>
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
              className='feather feather-x-circle text-white'
            >
              <circle cx='12' cy='12' r='10'></circle>
              <line x1='15' y1='9' x2='9' y2='15'></line>
              <line x1='9' y1='9' x2='15' y2='15'></line>
            </svg>
          </button>
        </div>
        <div className='flex h-5/6 flex-col items-center space-y-10 p-6'>
          <h3 className='text-2xl font-bold'>안녕하세요!</h3>
          <section className='flex items-center gap-4'>
            <div className='h-8 w-fit bg-teal-300'>Google</div>
            <div className='h-8 w-fit bg-teal-300'>Naver</div>
            <div className='h-8 w-fit bg-teal-300'>Kakao</div>
          </section>
        </div>
      </dialog>
    </>
  );
}
