import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { Book } from '@prisma/client';
import Layout from '@components/layout';
import Input from '@components/UI/input';
import useMutation from '@libs/client/useMutation';
import {
  startDateState,
  endDateState,
  hashtagsState,
  questionsState,
  thumbnailState,
} from 'state/form';
import ThumbnailContainer from '@components/form/thumbnailContainer';
import imageUpload from '@libs/client/imageUpload';
import HashtagContainer from '@components/form/hashtagContainer';
import QuestionsContainer from '@components/form/questionsContainer';
import DateContainer from '@components/form/dateContainer';

interface BookForm {
  title: string;
  description: string;
  firstQuestion: string;
}

interface UploadBookMutation {
  success: boolean;
  book: Book;
}

const NewBook: NextPage = () => {
  const { register, handleSubmit } = useForm<BookForm>();

  const startDate = useRecoilValue(startDateState);
  const endDate = useRecoilValue(endDateState);

  const thumbnail = useRecoilValue(thumbnailState);

  // TODO: should register at least 1 hashtags
  const hashtags = useRecoilValue(hashtagsState);
  const questions = useRecoilValue(questionsState);

  const [upload, { loading }] = useMutation<UploadBookMutation>('/api/books');

  const onValid = async ({ title, description, firstQuestion }: BookForm) => {
    // TODO: title이 이미 있을 때, 성공했을 때 메세지 보여줄 방법.
    upload({
      thumbnail: thumbnail ? await imageUpload(thumbnail) : 'no-thumbnail',
      title,
      startDate,
      endDate,
      description,
      questions: [{ content: firstQuestion, required: true }, ...questions],
      hashtags: [...hashtags],
    });
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
            <ThumbnailContainer />
            <label className='font-semibold' htmlFor='title'>
              메세지북 제목
            </label>
            <Input
              id='title'
              register={register('title')}
              type='text'
              placeholder='메세지북 제목을 입력해주세요.'
            />
            <div className='w-full'>
              <h3 className='mb-4 font-semibold'>메세지북 기간</h3>
              <DateContainer />
            </div>
            <label className='font-semibold' htmlFor='description'>
              상세 설명
            </label>
            <textarea
              {...register('description')}
              className='w-full rounded-lg border-2 border-gray-300 px-4 py-2'
              placeholder='메세지북에 대한 상세설명을 입력해주세요.'
            />
            <HashtagContainer />
            <label className='font-semibold' htmlFor='firstQuestion'>
              필수 질문
            </label>
            <Input
              register={register('firstQuestion')}
              id='firstQuestion'
              placeholder='메세지북에 필요한 질문을 입력해주세요! (ex: 선수에게 응원메세지를 남겨주세요!)'
              type='text'
            />
            <QuestionsContainer />
            <button className='flex w-full justify-center rounded-lg bg-orange-400 py-3 font-semibold text-white transition duration-150 ease-linear hover:bg-orange-500'>
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
                  메세지북 등록 중...
                </span>
              ) : (
                <span className='flex items-center'>새로운 메세지북 등록하기</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewBook;
