import { RefObject } from 'react';

interface LoginModalProps {
  dialogRef: RefObject<HTMLDialogElement>;
  handleDialogClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  signIn: (provider: string) => void;
}

export default function LoginModal({ dialogRef, handleDialogClose, signIn }: LoginModalProps) {
  return (
    <dialog className='h-80 w-3/4 rounded-lg p-0 md:w-[420px]' ref={dialogRef}>
      <div className='flex h-1/6 w-full items-center justify-end bg-lime px-4'>
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
      <div className='flex h-5/6  flex-col items-center space-y-10 p-6'>
        <h3 className='text-2xl font-bold'>안녕하세요!</h3>
        <section className='flex w-full flex-col items-center gap-4'>
          <button
            onClick={() => signIn('kakao')}
            className='flex w-full items-center justify-center rounded-xl bg-kakao p-2'
          >
            <span className='font-semibold'>카카오톡 로그인</span>
          </button>
          <button
            onClick={() => signIn('naver')}
            className='flex w-full items-center justify-center rounded-xl bg-naver p-2'
          >
            <span className='font-semibold'>네이버 로그인</span>
          </button>
        </section>
      </div>
    </dialog>
  );
}
