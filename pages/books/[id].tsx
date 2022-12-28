import { Book, Question } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '@components/layout';

interface BookDetailResponse {
  success: boolean;
  book: Book;
  questions: Question[];
}

const BookDetail: NextPage = () => {
  const router = useRouter();

  const { data, isLoading } = useSWR<BookDetailResponse>(
    router.query.id ? `/api/books/${router.query.id}` : null
  );

  return (
    <Layout title={isLoading ? 'Message Book' : data?.book?.title!}>
      <section className='flex flex-col items-center space-y-8 py-10 px-16'>
        <div className='flex w-full flex-col items-center space-y-4 rounded-lg border p-6 md:w-1/2'>
          <h2 className='text-2xl font-bold'>{data?.book?.title}</h2>
          <p>{data?.book?.description}</p>
          {/* TODO: maybe user info here */}
        </div>
        <div className='w-full rounded-lg border p-6 md:w-1/2'>
          <form className='flex w-full flex-col space-y-8'>
            {data?.questions?.map((question) => (
              <div key={question.id} className='space-y-4'>
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
                  className='w-full origin-center border-b-2 border-b-gray-200 pb-2 outline-none transition duration-300 ease-in-out focus:border-b-2 focus:border-teal-400'
                  type='text'
                  id={question.id + ''}
                  placeholder='내 답변'
                />
              </div>
            ))}
            <button className='flex-auto rounded bg-orange-400 py-2 px-4 font-bold text-white transition duration-300 ease-in-out hover:bg-orange-500'>
              등록하기
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default BookDetail;
