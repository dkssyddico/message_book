import { signIn } from 'next-auth/react';

interface SocialLoginButtonProps {
  provider: 'naver' | 'google' | 'kakao';
}

export default function SocialLoginButton({ provider }: SocialLoginButtonProps) {
  if (provider === 'kakao') {
    return (
      <button
        onClick={() => signIn(provider)}
        className={`flex w-full items-center justify-center rounded-xl bg-kakao p-2`}
      >
        <span className='font-semibold'>카카오 로그인</span>
      </button>
    );
  } else if (provider === 'naver') {
    return (
      <button
        onClick={() => signIn(provider)}
        className={`flex w-full items-center justify-center rounded-xl bg-naver p-2`}
      >
        <span className='font-semibold'>네이버 로그인</span>
      </button>
    );
  } else {
    return (
      <button
        onClick={() => signIn(provider)}
        className={`flex w-full items-center justify-center rounded-xl bg-google p-2`}
      >
        <span className='font-semibold'>구글 로그인</span>
      </button>
    );
  }
}
