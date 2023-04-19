import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '@components/layout';
import CommentsContainer from '@components/book/comments/commentsContainer';
import Loading from '@components/loading';
import DetailContainer from '@components/book/detailContainer';
import QuestionsContainer from '@components/book/questionsContainer';
import DropContainer from '@components/book/dropContainer';
import { BookDetailResponse } from '@libs/client/types';
import FanArtContainer from '@components/book/fanArtContainer';

const BookDetail: NextPage = () => {
  const router = useRouter();

  const { data, isLoading } = useSWR<BookDetailResponse>(
    router.query.id ? `/api/books/${router.query.id}` : null
  );

  if (!data) {
    // TODO: 에러처리 if(error) return <Error />
    return <Loading />;
  } else {
    return (
      <Layout title={data.book.title!}>
        <section className='flex flex-col items-center space-y-12 py-10 px-6 md:px-16'>
          <DetailContainer book={data.book} />
          <QuestionsContainer questions={data.book.questions} />
          {data.book.receiveFanArt && <FanArtContainer />}
          {data.book.doesDrop && <DropContainer drop={data.book.drop} />}
          <CommentsContainer comments={data.book.comments} />
        </section>
      </Layout>
    );
  }
};

export default BookDetail;
