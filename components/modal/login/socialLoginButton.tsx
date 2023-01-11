import { signIn } from 'next-auth/react';

interface SocialLoginButtonProps {
  provider: 'naver' | 'google' | 'kakao';
}

export default function SocialLoginButton({ provider }: SocialLoginButtonProps) {
  return (
    <button
      onClick={() => signIn(provider)}
      className={`flex w-full items-center justify-center rounded-xl bg-${provider} p-2`}
    >
      <span className='font-semibold'>
        {provider === 'naver' ? '네이버' : provider === 'kakao' ? '카카오' : '구글'} 로그인
      </span>
    </button>
  );
}
