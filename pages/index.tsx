import type { NextPage } from 'next';
import useSWR from 'swr';
import Banner from '@components/banner';
import Layout from '@components/layout';
import { Book, BookFav } from '@prisma/client';
import MainBookCard from '@components/mainBookCard';
import { useCallback, useEffect, useState } from 'react';

interface BookWithFavs extends Book {
  favs: BookFav[];
}

export interface BookResponse {
  success: boolean;
  books: BookWithFavs[];
}

const Home: NextPage = () => {
  const [dueCloseBooks, setDueCloseBooks] = useState<BookWithFavs[]>([]);

  const { data } = useSWR<BookResponse>('/api/books');

  const sortBooksByDueDate = useCallback(() => {
    const now = new Date();
    const today = new Date();
    const sevenDaysAfterToday = new Date(today.setDate(today.getDate() + 7));
    if (data) {
      const matchedBooks = data?.books.filter((book) => {
        const endDate = new Date(book.endDate);
        if (endDate < sevenDaysAfterToday && endDate > now) {
          return book;
        }
      });
      setDueCloseBooks(matchedBooks);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      sortBooksByDueDate();
    }
  }, [data, sortBooksByDueDate]);

  return (
    <Layout title='Home'>
      <Banner />
      <main className='mt-10 flex items-center justify-center p-8'>
        <section className='w-full space-y-16'>
          <section className='flex flex-col items-center'>
            <h2 className='mb-8 self-start text-2xl font-bold'>
              마감 임박 메세지북
            </h2>
            <section className='grid w-full grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-4'>
              {dueCloseBooks.map((book) => (
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
          <section className='flex flex-col items-center'>
            <h2 className='mb-8 self-start text-2xl font-bold'>
              진행 중인 메세지북
            </h2>
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
