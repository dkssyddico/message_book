import React, { useRef } from 'react';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { thumbnailState } from 'state/form';
import { cls } from '@libs/client/utils';

export default function ThumbnailContainer() {
  // TODO: should warn when no image file exists
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useRecoilState(thumbnailState);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setFile(files ? files[0] : null);
  };

  const handleUpdateThumbnail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (thumbnailInputRef.current !== null) {
      thumbnailInputRef.current.click();
    }
  };

  return (
    <div className='relative flex h-72 w-full items-center justify-center bg-gray-100'>
      {file ? (
        <Image
          width={80}
          height={80}
          className='mx-auto mb-2 h-60 w-80'
          src={URL.createObjectURL(file)}
          alt='local file'
        />
      ) : (
        <div className='h-60 w-80 bg-orange-100'></div>
      )}
      <button
        className={cls(
          'absolute rounded-full bg-black px-4 py-2  text-sm font-semibold text-white',
          file ? 'right-5 bottom-5 ' : 'mx-auto'
        )}
        onClick={handleUpdateThumbnail}
      >
        {file ? '썸네일 변경' : '썸네일 등록'}
      </button>
      <input
        type='file'
        accept='image/*'
        name='file'
        className='hidden'
        // ref={thumbnailInputRef}
        onChange={handleThumbnailChange}
      />
    </div>
  );
}
