import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRef } from 'react';
import LoginModal from './modal/login/loginModal';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchWordState } from 'state/search';
import { useRouter } from 'next/router';
import { modalState } from 'state/modal';
import Modal from './modal';

interface Form {
  word: string;
}

export default function Navbar() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalInfo = useRecoilValue(modalState);
  const router = useRouter();
  const { data: session } = useSession();
  const { register, handleSubmit, reset } = useForm<Form>();
  const [searchWord, setSearchWord] = useRecoilState(searchWordState);

  const handleLoginClick = () => {
    dialogRef.current?.showModal();
  };

  const handleDialogClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const onValid = ({ word }: Form) => {
    router.push(`/books?searchWord=${word}`);
  };

  return (
    <>
      <header className='fixed top-0 left-0 z-30 mx-auto grid h-16 w-full grid-cols-3 items-center bg-white px-8'>
        {modalInfo.open && <Modal />}
        <Link className='flex items-center' href='/'>
          <h1 className='text-lg font-bold'>Message Book</h1>
        </Link>
        <form onSubmit={handleSubmit(onValid)} className='relative'>
          <input
            {...register('word', {
              value: searchWord,
              onChange: (e) => setSearchWord(e.target.value),
            })}
            type='text'
            placeholder='메세지북을 검색해보세요!'
            className='w-full rounded-full border-2 border-gray-200 px-4 transition duration-300 ease-in-out focus:border-orange-300 focus:ring-0'
          />
          <button className='absolute top-3 right-3 bg-gray-500' type='submit'>
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
              className='feather feather-search h-5 w-5 bg-white text-gray-500'
            >
              <circle cx='11' cy='11' r='8'></circle>
              <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
            </svg>
          </button>
        </form>
        <div className='flex items-center justify-end gap-8'>
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
        <LoginModal ref={dialogRef} handleDialogClose={handleDialogClose} />
      )}
    </>
  );
}
