import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { Book } from '@prisma/client';
import Layout from '@components/layout';
import Input from '@components/UI/input';
import useMutation from '@libs/client/useMutation';
import DateContainer from '@components/form/DateContainer';
import {
  startDateState,
  endDateState,
  hashtagsState,
  questionsState,
  thumbnailURLState,
} from 'state/form';
import HashtagContainer from '@components/form/HashtagContainer';
import QuestionsContainer from '@components/form/QuestionsContainer';
import ThumbnailContainer from '@components/form/thumbnailContainer';

interface BookForm {
  title: string;
  description: string;
  firstQuestion: string;
}

interface UploadBookMutation {
  success: boolean;
  book: Book;
}

// TODO: useMutation 만들기
const NewBook: NextPage = () => {
  const { register, handleSubmit } = useForm<BookForm>();

  const startDate = useRecoilValue(startDateState);
  const endDate = useRecoilValue(endDateState);

  // TODO: should register at least 1 hashtags
  const hashtags = useRecoilValue(hashtagsState);
  const questions = useRecoilValue(questionsState);

  const thumbnail = useRecoilValue(thumbnailURLState);

  const [upload, { loading }] = useMutation<UploadBookMutation>('/api/books');

  const onValid = async ({ title, description, firstQuestion }: BookForm) => {
    // TODO: title이 이미 있을 때, 성공했을 때 메세지 보여줄 방법.
    // TODO: 마치는 날이 시작일 보다 빠른지 워닝.
    upload({
      thumbnail,
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
              className='w-full rounded-lg border-2 border-gray-300'
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
            <button className='w-full rounded-lg bg-orange-400 py-3 font-semibold text-white transition duration-150 ease-linear hover:bg-orange-500'>
              {loading ? '메세지북 등록 중 ⏳' : '새로운 메세지북 등록하기 📘'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewBook;
