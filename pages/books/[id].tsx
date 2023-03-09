import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '@components/layout';
import CommentsContainer from '@components/book/comments/commentsContainer';
import Loading from '@components/loading';
import DetailContainer from '@components/book/detailContainer';
import QuestionsContainer from '@components/book/questionsContainer';
import FanArtSubmitContainer from '@components/book/fanArtSubmitContainer';
import DropContainer from '@components/book/dropContainer';
import { BookDetailResponse } from '@libs/client/types';

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
          {/* TODO: 1:1 문의 -> floating button으로 처리 */}
          <DetailContainer
            thumbnail={data.book.thumbnail}
            title={data.book.title}
            startDate={data.book.startDate}
            endDate={data.book.endDate}
            description={data.book.description}
            hashtags={data.book.hashtags}
            favs={data.book.favs}
          />
          <QuestionsContainer questions={data.book.questions} />
          {data.book.receiveFanArt && <FanArtSubmitContainer />}
          {data.book.doesDrop && <DropContainer drop={data.book.drop} />}
          <CommentsContainer comments={data.book.comments} />
        </section>
      </Layout>
    );
  }
};

export default BookDetail;
