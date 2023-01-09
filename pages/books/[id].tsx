import { Book, Comment, Hashtag, Question, Reply } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '@components/layout';
import CommentsContainer from '@components/book/comments/commentsContainer';
import Loading from '@components/loading';
import DetailContainer from '@components/book/detailContainer';
import QuestionsContainer from '@components/book/questionsContainer';
import { useSession } from 'next-auth/react';

export interface CommentWithReply extends Comment {
  replies: Reply[];
  _count: {
    replies: number;
  };
}

interface BookWithDetails extends Book {
  hashtags: Hashtag[];
  comments: CommentWithReply[];
  questions: Question[];
}

export interface BookDetailResponse {
  success: boolean;
  book: BookWithDetails;
}

const BookDetail: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);

  const { data, isLoading } = useSWR<BookDetailResponse>(
    router.query.id ? `/api/books/${router.query.id}` : null
  );

  if (isLoading) return <Loading />;

  return (
    <Layout title={data?.book?.title!}>
      <section className='flex flex-col items-center space-y-12 py-10 px-6 md:px-16'>
        <DetailContainer
          thumbnail={data?.book?.thumbnail}
          title={data?.book?.title}
          startDate={data?.book?.startDate}
          endDate={data?.book?.endDate}
          description={data?.book?.description}
          hashtags={data?.book?.hashtags}
        />
        <QuestionsContainer questions={data?.book?.questions} />
        <CommentsContainer comments={data?.book?.comments} />
      </section>
    </Layout>
  );
};

export default BookDetail;
