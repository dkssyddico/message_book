import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import useMutation from '@libs/client/useMutation';
import imageUpload from '@libs/client/imageUpload';
import Container from './container';
import SubmitButton from '@components/UI/submitButton';

interface FanArtForm {
  fanArt: File;
}

interface UploadFanArtMutation {
  success: boolean;
}

export default function FanArtSubmitContainer() {
  const router = useRouter();
  const [fanArt, setFanArt] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FanArtForm>();

  const [uploadFanArt, { loading, data }] =
    useMutation<UploadFanArtMutation>('/api/fanArts');

  const onValid = async () => {
    if (fanArt) {
      uploadFanArt({
        fanArt: fanArt && (await imageUpload(fanArt)),
        bookId: router.query.id,
      });
    }
  };

  const handleFanArtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setFanArt(files ? files[0] : null);
  };

  return (
    <Container title='팬아트 제출'>
      {/* TODO: JPEG, PNG 이런 형식만 받는다고 써놓기 */}
      <form className='space-y-8' onSubmit={handleSubmit(onValid)}>
        <input
          {...register('fanArt')}
          type='file'
          accept='image/*'
          name='fanArt'
          onChange={handleFanArtChange}
        />
        {/* <SubmitButton
          disabled={isSubmitting || !fanArt}
          loading={loading}
          submitMessage='팬아트 제출하기'
          loadingMessage='팬아트 제출 중'
        /> */}
        <button
          disabled={isSubmitting || !fanArt}
          className='flex w-full justify-center rounded-lg bg-orange-400 py-2 font-semibold text-white transition duration-150 ease-linear hover:bg-orange-500 disabled:bg-gray-400'
        >
          {loading ? (
            <span className='flex items-center'>
              <svg
                className='-ml-1 mr-3 h-5 w-5 animate-spin text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              팬아트 제출 중
            </span>
          ) : (
            <span className='flex items-center'>팬아트 제출하기</span>
          )}
        </button>
      </form>
    </Container>
  );
}
