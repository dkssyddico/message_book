import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
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
  dropStatusState,
  dropInfoState,
  dropEndDateState,
} from 'state/form';
import ThumbnailContainer from '@components/form/thumbnailContainer';
import imageUpload from '@libs/client/imageUpload';
import HashtagContainer from '@components/form/hashtagContainer';
import QuestionsContainer from '@components/form/questionsContainer';
import DateContainer from '@components/form/dateContainer';
import SubmitButton from '@components/UI/submitButton';
import DropContainer from '@components/form/dropContainer';
import { useRouter } from 'next/router';

interface BookForm {
  title: string;
  targetMessage: number;
  description: string;
  firstQuestion: string;
  receiveFanArt: boolean;
}

interface UploadBookMutation {
  success: boolean;
  book: Book;
}

const NewBook: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<BookForm>({
    defaultValues: {
      targetMessage: 0,
    },
  });

  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const [thumbnail, setThumbnail] = useRecoilState(thumbnailState);
  // TODO: should register at least 1 hashtags
  const [hashtags, setHashtags] = useRecoilState(hashtagsState);
  const [questions, setQuestions] = useRecoilState(questionsState);
  const [dropStatus, setDropStatus] = useRecoilState(dropStatusState);
  const [dropInfo, setDropInfo] = useRecoilState(dropInfoState);
  const [dropEndDate, setDropEndDate] = useRecoilState(dropEndDateState);
  const [uploadNewBook, { loading, data }] = useMutation<UploadBookMutation>('/api/books');

  const onValid = async ({
    title,
    targetMessage,
    description,
    firstQuestion,
    receiveFanArt,
  }: BookForm) => {
    // TODO: title이 이미 있을 때, 성공했을 때 메세지 보여줄 방법.
    uploadNewBook({
      thumbnail: thumbnail ? await imageUpload(thumbnail) : 'no-thumbnail',
      targetMessage,
      receiveFanArt,
      title,
      startDate,
      endDate,
      description,
      questions: [{ content: firstQuestion, required: true, index: 0 }, ...questions],
      hashtags: [...hashtags],
      dropStatus,
      dropInfo,
      dropEndDate,
    });
  };

  useEffect(() => {
    if (data && data.success) {
      reset();
      setStartDate(new Date());
      setEndDate(new Date());
      setThumbnail(null);
      setHashtags([]);
      setQuestions([]);
      setDropStatus(false);
      setDropInfo({
        account: '',
        accountOwner: '',
        bank: '',
        minAmount: 0,
      });
      setDropEndDate(new Date());
      router.push('/');
    }
  }, [
    data,
    router,
    reset,
    setStartDate,
    setEndDate,
    setDropStatus,
    setThumbnail,
    setHashtags,
    setQuestions,
    setDropInfo,
    setDropEndDate,
  ]);

  return (
    <Layout title='New Book'>
      <div className='flex flex-col items-center p-8'>
        <h2 className='mb-8 text-2xl font-bold'>새로운 메세지북 제작하기!</h2>
        <div className='w-1/2'>
          <form
            onSubmit={handleSubmit(onValid)}
            className='flex w-full flex-col items-start space-y-6'
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
            <label className='font-semibold' htmlFor='targetMessage'>
              목표 메세지 수
            </label>
            <Input type='number' id='targetMessage' min='0' register={register('targetMessage')} />
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
            <HashtagContainer submitSuccess={data?.success} />
            <label className='font-semibold' htmlFor='firstQuestion'>
              필수 질문
            </label>
            <Input
              register={register('firstQuestion')}
              id='firstQuestion'
              placeholder='메세지북에 필요한 질문을 입력해주세요! (ex: 선수에게 응원메세지를 남겨주세요!)'
              type='text'
            />
            <QuestionsContainer submitSuccess={data?.success} />
            <DropContainer submitSuccess={data?.success} />
            <div className='space-y-2'>
              <h3 className='font-semibold'>추가 설정</h3>
              <div className='flex items-center'>
                <input
                  {...register('receiveFanArt')}
                  type='checkbox'
                  id='receiveFanArt'
                  className='h-5 w-5 rounded-lg border-2 border-indigo-200 text-indigo-300 focus:ring-0 focus:ring-offset-0'
                  name='receiveFanArt'
                />
                <label className='ml-2' htmlFor='receiveFanArt'>
                  팬아트를 받겠습니까?
                </label>
              </div>
            </div>
            <SubmitButton
              loading={loading}
              loadingMessage='메세지북 등록 중'
              submitMessage='새로운 메세지북 등록하기'
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewBook;
