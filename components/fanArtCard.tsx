import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import useMutation from '@libs/client/useMutation';
import { modalState } from 'state/modal';
import SubmitButton from '@components/common/submitButton';
import { useForm } from 'react-hook-form';
import imageUpload from '@libs/client/imageUpload';
import { FanArtWithBook, MyResponse } from '@libs/client/types';

interface FanArtProps {
  fanArt: FanArtWithBook;
}

interface FanArtForm {
  newFanArt: File;
}

interface UploadFanArtMutation {
  success: boolean;
}

export default function FanArtCard({ fanArt }: FanArtProps) {
  const { mutate } = useSWR<MyResponse>('/api/me');
  const setModal = useSetRecoilState(modalState);

  const [newFanArt, setNewFanArt] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FanArtForm>();

  const [openEdit, setOpenEdit] = useState(false);

  const handleFanArtDelete = async () => {
    const result = await axios.delete(`/api/fanArts/${fanArt.id}`);
    if (result.data.success) {
      mutate();
    }
  };

  const [uploadFanArt, { loading, data }] =
    useMutation<UploadFanArtMutation>('/api/fanArts');

  const onValid = async () => {
    if (newFanArt) {
      uploadFanArt({
        fanArt: newFanArt && (await imageUpload(newFanArt)),
        bookId: fanArt.bookId,
        fanArtId: fanArt.id,
      });
    }
  };

  useEffect(() => {
    if (data && data.success) {
      setNewFanArt(null);
    }
  }, [data, setNewFanArt]);

  const handleFanArtEditOpen = () => {
    setOpenEdit((prev) => !prev);
  };

  const handleFanArtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setNewFanArt(files ? files[0] : null);
  };

  return (
    <div
      key={fanArt.id}
      className='flex h-80 w-full flex-col items-center overflow-hidden rounded-lg border shadow-md'
    >
      <div className='h-60 w-full overflow-hidden'>
        {openEdit ? (
          <form
            className='flex h-full flex-col items-center justify-center gap-4 p-8'
            onSubmit={handleSubmit(onValid)}
          >
            <input
              {...register('newFanArt')}
              accept='image/*'
              name='newFanArt'
              type='file'
              onChange={handleFanArtChange}
            />
            <SubmitButton
              disabled={!newFanArt}
              loading={loading}
              submitMessage='팬아트 수정하기'
              loadingMessage='팬아트 수정 중'
            />
          </form>
        ) : (
          <Link href={`/books/${fanArt.bookId}`}>
            <Image
              width={100}
              height={100}
              src={fanArt.image}
              alt='fanArt'
              className='h-60 w-full overflow-hidden transition duration-300 ease-in-out hover:scale-110'
            />
          </Link>
        )}
      </div>
      <div className='flex h-20 flex-col items-center justify-center gap-y-2'>
        <h4 className='text-lg font-semibold'> {fanArt.book.title}</h4>
        <div className='flex items-center gap-2'>
          <button onClick={handleFanArtEditOpen}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='feather feather-edit-2 text-gray-400 transition ease-linear hover:text-gray-500'
            >
              <path d='M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z'></path>
            </svg>
          </button>
          <button onClick={handleFanArtDelete}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='feather feather-trash-2 text-gray-400 transition ease-linear hover:text-gray-500'
            >
              <polyline points='3 6 5 6 21 6'></polyline>
              <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
              <line x1='10' y1='11' x2='10' y2='17'></line>
              <line x1='14' y1='11' x2='14' y2='17'></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
