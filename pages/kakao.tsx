import useMutation from '@libs/client/useMutation';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

const Kakao: NextPage = () => {
  const router = useRouter();
  const { code, error } = router.query;

  const [kakaoLogin, { loading, data }] = useMutation('/api/users/kakao/login');

  const handleLogin = useCallback(async (code: string | string[]) => {
    kakaoLogin({ code });
  }, []);

  useEffect(() => {
    if (code) {
      handleLogin(code);
    } else if (error) {
      router.push('/');
    }
  }, [handleLogin, code, error, router]);

  useEffect(() => {
    if (data && data.success) {
      router.push('/');
    }
  }, [data, router]);

  return <div>Kakao login...</div>;
};

export default Kakao;
