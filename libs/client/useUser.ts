import useSWR from 'swr';

interface UserResponse {
  success: boolean;
  userId: string;
}

// 나중에 로그인 확인이나 관리자 등 authorization에도 쓸 수 있을 듯!
export default function useUser() {
  const { data, error } = useSWR<UserResponse>('/api/users/me');

  return data ? { userId: data.userId } : { userId: '' };
}
