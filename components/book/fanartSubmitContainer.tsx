import SubmitButton from '@components/UI/submitButton';
import useMutation from '@libs/client/useMutation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import imageUpload from '@libs/client/imageUpload';
import { useRouter } from 'next/router';

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
    uploadFanArt({
      fanArt: fanArt && (await imageUpload(fanArt)),
      bookId: router.query.id,
    });
  };

  const handleFanArtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setFanArt(files ? files[0] : null);
  };

  return (
    <section className='w-full overflow-hidden md:w-3/4'>
      <div className='flex h-10 items-center justify-center rounded-tl-2xl rounded-tr-2xl bg-yellow-400 font-semibold'>
        <span>팬아트 제출</span>
      </div>
      {/* TODO: JPEG, PNG 이런 형식만 받는다고 써놓기 */}
      <form
        onSubmit={handleSubmit(onValid)}
        className='flex flex-col space-y-8 rounded-bl-2xl rounded-br-2xl  border-2 border-t-0 p-8 '
      >
        <input
          {...register('fanArt')}
          type='file'
          accept='image/*'
          name='fanArt'
          onChange={handleFanArtChange}
        />
        <SubmitButton
          disabled={isSubmitting}
          loading={loading}
          submitMessage='팬아트 제출하기'
          loadingMessage='팬아트 제출 중'
        />
      </form>
    </section>
  );
}
