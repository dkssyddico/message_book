import { NextPage } from 'next';
import useSWR from 'swr';
import Image from 'next/image';
import Layout from '@components/layout';
import { Account, Answer, Book, BookFav, Question, User } from '@prisma/client';
import MainBookCard from '@components/mainBookCard';
import AnswerCard from '@components/answerCard';

interface BookWithFavs extends Book {
  favs: BookFav[];
}

export interface AnswerWithQuestionBooks extends Answer {
  question: Question;
  book: Book;
}

interface UserInfoWithAccounts extends User {
  accounts: Account[];
  books: BookWithFavs[];
  answers: AnswerWithQuestionBooks[];
}

export interface MyResponse {
  success: boolean;
  user: UserInfoWithAccounts;
}

const MyPage: NextPage = () => {
  const { data, mutate } = useSWR<MyResponse>('/api/me');

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
              <AnswerCard key={answer.id} answer={answer} />
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
