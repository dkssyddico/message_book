import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import useMutation from '@libs/client/useMutation';
import imageUpload from '@libs/client/imageUpload';
import Container from './container';
import SubmitButton from '@components/common/submitButton';

interface FanArtForm {
  fanArt: File;
}

interface UploadFanArtMutation {
  success: boolean;
}

export default function FanArtContainer() {
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
      <form className='space-y-8' onSubmit={handleSubmit(onValid)}>
        <input
          {...register('fanArt')}
          type='file'
          accept='image/*'
          name='fanArt'
          onChange={handleFanArtChange}
        />
        <SubmitButton
          disabled={isSubmitting || !fanArt}
          loading={loading}
          submitMessage='팬아트 제출하기'
          loadingMessage='팬아트 제출 중'
        />
      </form>
    </Container>
  );
}
