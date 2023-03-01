import { NextPage } from 'next';
import useSWR from 'swr';
import Layout from '@components/layout';
import { Account, Answer, Book, BookFav, Question, User } from '@prisma/client';
import Image from 'next/image';
import MainBookCard from '@components/mainBookCard';
import Link from 'next/link';
import axios from 'axios';

interface BookWithFavs extends Book {
  favs: BookFav[];
}

interface AnswerWithQuestionBooks extends Answer {
  question: Question;
  book: Book;
}

interface UserInfoWithAccounts extends User {
  accounts: Account[];
  books: BookWithFavs[];
  answers: AnswerWithQuestionBooks[];
}

interface MyResponse {
  success: boolean;
  user: UserInfoWithAccounts;
}

const MyPage: NextPage = () => {
  const { data, mutate } = useSWR<MyResponse>('/api/me');

  // TODO: Required 메세지인 경우 못 지우게 or 수정만 가능하도록 만들기
  const handleAnswerDelete = async (answerId: string) => {
    const result = await axios.delete(`/api/answers/${answerId}`);
    if (result.data.success) {
      mutate();
    }
  };

  return (
    <Layout title='My page'>
      <main className='mt-10 flex flex-col items-center justify-center space-y-20 p-8'>
        <section>
          <h2 className='text-2xl font-bold'>내 정보 관리</h2>
          <div className='flex flex-col items-center space-y-4'>
            <div>
              {data ? (
                <Image
                  width={60}
                  height={60}
                  src={data.user.image!}
                  alt='profile'
                  className='mt-4 rounded-full'
                />
              ) : (
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
                  className='feather feather-user'
                >
                  <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
                  <circle cx='12' cy='7' r='4'></circle>
                </svg>
              )}
            </div>
            <div>{data?.user.name}님</div>
            <div>접속 경로 {data?.user.accounts[0].provider}</div>
          </div>
        </section>
        <section>
          <h2 className='mb-8 text-2xl font-bold'>내가 만든 메세지북</h2>
          <div className='grid w-full grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-4'>
            {data?.user.books.map((book) => (
              <MainBookCard
                key={book.id}
                id={book.id}
                title={book.title}
                startDate={book.startDate}
                endDate={book.endDate}
                thumbnail={book.thumbnail}
                favs={book.favs}
              />
            ))}
          </div>
        </section>
        <section className='w-full'>
          <h2 className='mb-8 text-2xl font-bold'>
            내가 참여한 메세지북(메세지)
          </h2>
          <section className=''>
            <div className='grid grid-cols-4 rounded-lg bg-lime p-4 text-center font-semibold'>
              <h4>메세지북</h4>
              <h4>질문</h4>
              <h4>내 답변</h4>
              <h4>수정 / 삭제</h4>
            </div>
            {data?.user.answers.map((answer: AnswerWithQuestionBooks) => (
              <div
                className='grid grid-cols-4 items-center rounded-lg border-b p-4 text-center font-semibold'
                key={answer.id}
              >
                <h4>
                  <Link href={`/books/${answer.bookId}`}>
                    {answer.book.title}
                  </Link>
                </h4>
                <p>{answer.question.content}</p>
                <p>{answer.content}</p>
                <div className='flex justify-center gap-4'>
                  <button>
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
                      className='feather feather-edit text-gray-400 transition ease-linear hover:text-gray-500'
                    >
                      <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'></path>
                      <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'></path>
                    </svg>
                  </button>
                  <button onClick={() => handleAnswerDelete(answer.id)}>
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
            ))}
          </section>
        </section>
        <section>
          <h2 className='mb-8 text-2xl font-bold'>
            내가 참여한 메세지북(팬아트)
          </h2>
          <div className='grid w-full grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-4'></div>
        </section>
        <section>
          <h2 className='mb-8 text-2xl font-bold'>내가 쓴 댓글</h2>
          <div></div>
        </section>
      </main>
    </Layout>
  );
};

export default MyPage;
