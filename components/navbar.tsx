import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRef } from 'react';
import LoginModal from './modal/loginModal';

export default function Navbar() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { data: session } = useSession();

  console.log(session);

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
        <div className='flex items-center gap-8'>
          <Link className='font-semibold' href='/books'>
            메세지북
          </Link>
          {session ? (
            <>
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
              <Link className='font-semibold' href='/my'>
                My Page
              </Link>
              <button
                onClick={() => signOut()}
                className='font-semibold outline-none transition duration-150 ease-linear hover:text-gray-500'
              >
                로그아웃
              </button>
            </>
          ) : (
            <button
              onClick={handleLoginClick}
              className='font-semibold outline-none transition duration-150 ease-linear hover:text-gray-500'
            >
              로그인
            </button>
          )}
        </div>
      </header>
      {!session && (
        <LoginModal dialogRef={dialogRef} signIn={signIn} handleDialogClose={handleDialogClose} />
      )}
    </>
  );
}
