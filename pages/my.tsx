import { NextPage } from 'next';
import useSWR from 'swr';
import Image from 'next/image';
import Layout from '@components/layout';
import MainBookCard from '@components/mainBookCard';
import AnswerCard from '@components/answerCard';
import FanArtCard from '@components/fanArtCard';
import {
  AnswerWithQuestionBooks,
  CommentWithBook,
  FanArtWithBook,
  MyResponse,
} from '@libs/client/types';
import CommentCard from '@components/my/commentCard';

const MyPage: NextPage = () => {
  const { data } = useSWR<MyResponse>('/api/me');
  console.log(data);

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
        <section className='w-full'>
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
        <section className='w-full'>
          <h2 className='mb-8 text-2xl font-bold'>
            내가 참여한 메세지북(팬아트)
          </h2>
          {/* TODO: 팬아트 프리뷰 */}
          <section className='grid w-full grid-cols-3 gap-x-5'>
            {data?.user.fanArts.map((fanArt: FanArtWithBook) => (
              <FanArtCard key={fanArt.id} fanArt={fanArt} />
            ))}
          </section>
        </section>
        <section className='w-full'>
          <h2 className='mb-8 text-2xl font-bold'>내가 쓴 댓글</h2>
          <section className=''>
            <div className='grid grid-cols-3 rounded-lg bg-lime p-4 text-center font-semibold'>
              <h4>메세지북</h4>
              <h4>댓글</h4>
              <h4>수정 / 삭제</h4>
            </div>
          </section>
          <div>
            {data?.user.comments.map((comment: CommentWithBook) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default MyPage;
