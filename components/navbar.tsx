import Link from 'next/link';

export default function Navbar() {
  return (
    <header className='fixed top-0 z-10 flex w-full items-center justify-between bg-white  p-4 px-8'>
      <h1 className='text-lg font-bold'>Message Book</h1>
      <div className='flex items-center space-x-4'>
        <div>
          <Link href='/books/new'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
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
        <button className='font-semibold transition duration-150 ease-linear hover:text-gray-500'>
          로그인
        </button>
      </div>
    </header>
  );
}
