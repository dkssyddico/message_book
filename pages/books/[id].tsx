import { Book, Hashtag, Question } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '@components/layout';
import Image from 'next/image';
import UserInfo from '@components/bookDetail/userInfo';
import LikeAndShare from '@components/bookDetail/likeAndShare';
import DateRange from '@components/bookDetail/dateRange';
import Comments from '@components/bookDetail/comments/comments';
import Loading from '@components/loading';

interface BookWithHashtags extends Book {
  hashtags: Hashtag[];
}

interface BookDetailResponse {
  success: boolean;
  book: BookWithHashtags;
  questions: Question[];
}

const BookDetail: NextPage = () => {
  const router = useRouter();

  const { data, isLoading } = useSWR<BookDetailResponse>(
    router.query.id ? `/api/books/${router.query.id}` : null
  );

  // TODO: should make loading page
  if (isLoading) return <Loading />;

  return (
    <Layout title={data?.book?.title!}>
      <section className='flex flex-col items-center space-y-12 py-10 px-6 md:px-16'>
        <section className='flex min-h-[400px] flex-col items-center justify-center gap-8 md:w-3/4 lg:flex-row'>
          <div className='basis-1/2'>
            <Image
              className='h-[400px] w-full'
              src={data?.book.thumbnail!}
              alt='thumbnail'
              width={240}
              height={160}
            />
          </div>
          <div className='grid min-h-[400px] w-full basis-1/2 grid-flow-row gap-2 rounded-lg border-2 p-4'>
            <LikeAndShare />
            <div className='flex items-center'>
              <h2 className='text-xl font-bold'>{data?.book.title} 0/150</h2>
            </div>
            <DateRange startDate={data?.book?.startDate!} endDate={data?.book?.endDate!} />
            <div>
              <p className='flex items-center'>
                {data?.book?.description} Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Ratione illo aspernatur quasi architecto impedit qui doloremque eum aut eligendi.
                Unde!
              </p>
            </div>
            <UserInfo />
          </div>
        </section>
        <section className='w-full overflow-hidden md:w-3/4'>
          <div className='flex h-10 items-center justify-center rounded-tl-2xl rounded-tr-2xl bg-yellow-400 font-semibold'>
            <span>질문 목록</span>
          </div>
          <form className='flex flex-col space-y-8 rounded-bl-2xl rounded-br-2xl  border-2 border-t-0 p-8 '>
            {data?.questions?.map((question) => (
              <div key={question.id} className='space-y-2'>
                <label htmlFor={question.id + ''} className='flex items-center font-semibold'>
                  {question.required && (
                    <svg
                      className='mr-1 h-4 w-4 fill-red-600 text-red-500'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
                      ></path>
                    </svg>
                  )}
                  {question.content}
                </label>
                <input
                  className='w-full origin-center border-b-2 border-b-gray-200 pb-2 outline-none transition duration-300 ease-in-out focus:border-b-2 focus:border-orange-300'
                  type='text'
                  id={question.id + ''}
                  placeholder='내 답변'
                />
              </div>
            ))}
            <button className='flex-auto rounded bg-orange-400 py-2 px-4 font-semibold text-white transition duration-300 ease-in-out hover:bg-orange-500'>
              제출하기
            </button>
          </form>
        </section>
        <Comments />
      </section>
    </Layout>
  );
};

export default BookDetail;
