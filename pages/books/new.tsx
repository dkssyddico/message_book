import type { NextPage } from 'next';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '@components/layout';
import Input from '@components/UI/input';
import axios from 'axios';

const MAX_HASHTAGS = 5;
const MAX_QUESTIONS = 5;

interface QuestionData {
  id: number;
  content: string;
  required: boolean;
}

interface RegisterMBForm {
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  firstQuestion: string;
}

// TODO: useMutation 만들기
const NewBook: NextPage = () => {
  const { register, handleSubmit, watch } = useForm<RegisterMBForm>();

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setFile(files && files[0]);
  };

  const handleUpdateThumbnail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (thumbnailInputRef.current !== null) {
      thumbnailInputRef.current.click();
    }
  };

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
    if (hashtag === '') return;
    if (hashtags.includes(hashtag)) return;
    if (hashtags.length > MAX_HASHTAGS) return;
    setHashtags((prev) => [...prev, hashtag]);
    setHashtag('');
  };

  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  let questionID = 2;

  const [required, setRequired] = useState(false);

  const handleCheckRequired = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequired((prev) => !prev);
  };

  const handleQuestionDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const changedQuestions = [...questions].filter(
      (question) => question.content !== e.currentTarget.value
    );
    setQuestions(changedQuestions);
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value);
  };

  const handleAddQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (question === '') return;
    if (questions.filter((q) => q.content === question).length > 0) return;
    if (questions.length > MAX_QUESTIONS) return;
    setQuestions((prev) => [...prev, { id: questionID++, content: question, required }]);
    setQuestion('');
    setRequired(false);
  };

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const onValid = async ({
    title,
    startDate,
    endDate,
    description,
    firstQuestion,
  }: RegisterMBForm) => {
    axios.post(
      '/api/books',
      {
        title,
        start: new Date(startDate),
        end: new Date(endDate),
        description,
        questions: [
          {
            first: true,
            content: firstQuestion,
            required: true,
          },
        ],
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
  };

  return (
    <Layout title='New Book'>
      <div className='flex flex-col items-center p-8'>
        <h2 className='mb-8 text-2xl font-bold'>새로운 메세지북 제작하기!</h2>
        <div className='w-1/2'>
          <form
            onSubmit={handleSubmit(onValid)}
            className='flex w-full flex-col items-start space-y-4'
          >
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
                className={`absolute rounded-full bg-black px-4  py-2 font-semibold text-white ${
                  file ? 'right-5 bottom-5 ' : 'mx-auto'
                }`}
                onClick={handleUpdateThumbnail}
              >
                {file ? '썸네일 변경' : '썸네일 등록'}
              </button>
              <input
                type='file'
                accept='image/*'
                name='file'
                className='hidden'
                ref={thumbnailInputRef}
                onChange={handleThumbnailChange}
              />
            </div>
            <label className='font-semibold' htmlFor='title'>
              메세지북 제목
            </label>
            <Input
              id='title'
              register={register('title')}
              type='text'
              placeholder='메세지북 제목을 입력해주세요.'
            />
            <div className='w-full '>
              <h3 className='mb-4 font-semibold'>메세지북 기간</h3>
              <div className='flex w-full flex-col items-center justify-between space-x-2 md:flex-row'>
                <label className='font-semibold' htmlFor='start'>
                  시작일
                </label>
                <Input id='start' register={register('startDate')} type='date' />
                <label className='font-semibold' htmlFor='end'>
                  종료일
                </label>
                <Input register={register('endDate')} id='end' type='date' />
              </div>
            </div>
            <label className='font-semibold' htmlFor='description'>
              상세 설명
            </label>
            <textarea
              {...register('description')}
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
            <label className='font-semibold' htmlFor='mandatoryQ'>
              필수 질문
            </label>
            <Input
              register={register('firstQuestion')}
              id='mandatoryQ'
              placeholder='메세지북에 필요한 질문을 입력해주세요! (ex: 선수에게 응원메세지를 남겨주세요!)'
              type='text'
            />
            <div className='flex w-full flex-col space-y-4'>
              <label className='font-semibold' htmlFor='otherQuestion'>
                추가 질문(선택) {questions.length}/5
              </label>
              {questions.length > 0 && (
                <div className='flex flex-wrap items-center gap-4'>
                  {questions.map((question) => (
                    <div
                      className='flex items-center space-x-2 rounded-full bg-gray-100 py-2 px-4'
                      key={question.id}
                    >
                      {question.required && (
                        <span>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='feather feather-check text-green-500'
                          >
                            <polyline points='20 6 9 17 4 12'></polyline>
                          </svg>
                        </span>
                      )}
                      <span>{question.content}</span>
                      <button value={question.content} type='button' onClick={handleQuestionDelete}>
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
              <div className='flex items-center'>
                <input
                  onChange={handleCheckRequired}
                  type='checkbox'
                  checked={required}
                  name='checkRequired'
                  id='checkRequired'
                  className='rounded border-2 border-gray-300'
                />
                <label className='ml-2' htmlFor='checkRequired'>
                  답변을 필수로 받을까요?
                </label>
              </div>
              <Input
                type='text'
                onChange={handleQuestionChange}
                id='otherQuestion'
                value={question}
                placeholder='추가 질문을 입력해주세요'
              />
              <button
                onClick={handleAddQuestion}
                className='self-end rounded-full bg-black px-4  py-2 font-semibold text-white'
              >
                추가하기
              </button>
            </div>
            <button className='w-full rounded-lg bg-orange-400 py-3 font-semibold text-white transition duration-150 ease-linear hover:bg-orange-500'>
              새로운 메세지북 등록하기
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewBook;
