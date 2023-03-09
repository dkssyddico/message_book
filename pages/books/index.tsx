import { NextPage } from 'next';
import useSWR from 'swr';
import Layout from '@components/layout';
import { useRouter } from 'next/router';
import MainBookCard from '@components/mainBookCard';
import { BookResponse } from '@libs/client/types';

// TODO: 검색된 결과만 보여주는 것으로 활용
const Books: NextPage = () => {
  const router = useRouter();

  const { data } = useSWR<BookResponse>(
    `/api/books?searchWord=${router.query.searchWord}`
  );

  return (
    <Layout title='Books'>
      <main className='mt-10 flex items-center justify-center p-8'>
        <section className='w-full'>
          <section className='flex flex-col items-center'>
            <h2 className='mb-8 self-start text-2xl font-bold'>
              <span className='font-semibold text-orange-300'>
                {router.query.searchWord}
              </span>{' '}
              관련 메세지북
            </h2>
            <section className='grid w-full grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-4'>
              {data?.books.map((book) => (
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
            </section>
          </section>
        </section>
      </main>
    </Layout>
  );
};

export default Books;
