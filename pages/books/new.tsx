import type { NextPage } from 'next';
import { useState } from 'react';
import Layout from '../../components/layout';
import Input from '../../components/UI/input';

const MAX_HASHTAGS = 5;

const NewBook: NextPage = () => {
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtag, setHashtag] = useState('');

  const handleHashtagDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const changedHashtags = [...hashtags].filter((hashtag) => hashtag !== e.currentTarget.value);
    setHashtags(changedHashtags);
  };

  const handleHashtagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(e.currentTarget.value);
  };

  // 해시태그 중복없는지 살펴야함
  const handleAddHashtag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (hashtags.includes(hashtag)) return;
    if (hashtags.length > MAX_HASHTAGS) return;
    setHashtags((prev) => [...prev, hashtag]);
    setHashtag('');
  };

  return (
    <Layout title='New Book'>
      <div className='flex flex-col items-center p-8'>
        <h2 className='mb-8 text-2xl font-bold'>새로운 메세지북 제작하기!</h2>
        <div className='w-1/2'>
          <form className='flex w-full flex-col items-start space-y-4'>
            <input type='file' />
            <label className='font-semibold' htmlFor='title'>
              메세지북 제목
            </label>
            <Input id='title' type='text' placeholder='메세지북 제목을 입력해주세요.' />
            <div className='w-full '>
              <h3 className='mb-4 font-semibold'>메세지북 기간</h3>
              <div className='flex w-full flex-col items-center justify-between space-x-2 md:flex-row'>
                <label className='font-semibold' htmlFor='start'>
                  시작일
                </label>
                <Input id='start' type='date' />
                <label className='font-semibold' htmlFor='end'>
                  종료일
                </label>
                <Input id='end' type='date' />
              </div>
            </div>
            <label className='font-semibold' htmlFor='description'>
              상세 설명
            </label>
            <textarea
              className='w-full rounded-lg border-2 border-gray-300'
              placeholder='메세지북에 대한 상세설명을 입력해주세요.'
            />
            <div className='flex w-full flex-col space-y-4'>
              <label className='font-semibold' htmlFor='hashtag'>
                해시태그 {hashtags.length}/5
              </label>
              {hashtags.length > 0 && (
                <div className='flex flex-wrap items-center gap-4'>
                  {hashtags.map((hashtag) => (
                    <div
                      className='flex items-center rounded-full bg-gray-100 py-2 px-4'
                      key={hashtag}
                    >
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
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewBook;
