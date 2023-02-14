import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'state/modal';

interface ShareProps {
  title: string;
}

export default function Share({ title }: ShareProps) {
  const router = useRouter();
  const setModal = useSetRecoilState(modalState);

  const handleClickTwitterShare = () => {
    const text = encodeURIComponent(title);
    const url = encodeURIComponent(
      `http://localhost:3000/books/${router.query.id}`
    );

    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
  };

  const handleClickKakaoShare = () => {};

  const handleClickLinkCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `http://localhost:3000/books/${router.query.id}`
      );
      setModal({
        open: true,
        message: '링크가 복사되었습니다!',
        status: 'success',
      });
    } catch (error) {}
  };

  return (
    <div className='flex items-center gap-4'>
      <button
        onClick={handleClickTwitterShare}
        className='rounded-full bg-blue-500 p-2'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='feather feather-twitter fill-white text-white'
        >
          <path d='M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z'></path>
        </svg>
      </button>
      <button className='rounded-full bg-kakao p-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          className='h-4 w-4 fill-black'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z'
          />
        </svg>
      </button>
      <button
        onClick={handleClickLinkCopy}
        className='rounded-full bg-lime p-2'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='feather feather-link '
        >
          <path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71'></path>
          <path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'></path>
        </svg>
      </button>
    </div>
  );
}
