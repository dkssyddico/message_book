import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Input from '@components/UI/input';
import { hashtagsState } from 'state/form';

const MAX_HASHTAGS = 5;

interface HashtagContainerProps {
  submitSuccess: boolean | undefined;
}

function HashtagContainer({ submitSuccess }: HashtagContainerProps) {
  const [hashtag, setHashtag] = useState('');
  const [hashtags, setHashtags] = useRecoilState(hashtagsState);

  const handleHashtagDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const changedHashtags = [...hashtags].filter((hashtag) => hashtag !== e.currentTarget.value);
    setHashtags(changedHashtags);
  };

  const handleHashtagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(e.currentTarget.value.trim());
  };

  const handleAddHashtag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (hashtag === '') return;
    if (hashtags.includes(hashtag)) return;
    if (hashtags.length > MAX_HASHTAGS) return;
    setHashtags((prev) => [...prev, hashtag]);
    setHashtag('');
  };

  useEffect(() => {
    if (submitSuccess) setHashtag('');
  }, [submitSuccess]);

  return (
    <div className='flex w-full flex-col space-y-4'>
      <label className='font-semibold' htmlFor='hashtag'>
        해시태그 {hashtags.length}/5
      </label>
      {hashtags.length > 0 && (
        <div className='flex flex-wrap items-center gap-4'>
          {hashtags.map((hashtag) => (
            <div className='flex items-center rounded-full bg-gray-100 py-2 px-4' key={hashtag}>
              <span>#{hashtag}</span>
              <button value={hashtag} type='button' onClick={handleHashtagDelete}>
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
                  className='feather feather-x ml-2 font-bold text-red-600'
                >
                  <line x1='18' y1='6' x2='6' y2='18'></line>
                  <line x1='6' y1='6' x2='18' y2='18'></line>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
      <Input
        type='text'
        onChange={handleHashtagChange}
        id='hashtag'
        value={hashtag}
        placeholder='해시태그를 입력해주세요'
      />
      <button
        onClick={handleAddHashtag}
        className='self-end rounded-full bg-black px-4  py-2 font-semibold text-white'
      >
        추가하기
      </button>
    </div>
  );
}

export default HashtagContainer;
