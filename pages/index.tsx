import type { NextPage } from 'next';
import useSWR from 'swr';
import Banner from '@components/banner';
import Layout from '@components/layout';
import { Book, BookFav } from '@prisma/client';
import MainBookCard from '@components/mainBookCard';

interface BookWithFavs extends Book {
  favs: BookFav[];
}

export interface BookResponse {
  success: boolean;
  books: BookWithFavs[];
}

const Home: NextPage = () => {
  const { data } = useSWR<BookResponse>('/api/books');

  return (
    <Layout title='Home'>
      <Banner />
      <main className='mt-10 flex items-center justify-center py-8 px-16'>
        <section className='w-full'>
          <section className='flex flex-col items-center'>
            <h2 className='mb-8 text-2xl font-bold'>진행 중인 메세지북</h2>
            <section className='grid w-full grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-4'>
              {data?.books?.map((book) => (
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

export default Home;
