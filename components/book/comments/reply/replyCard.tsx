import { useEffect } from 'react';
import useSWR from 'swr';
import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/router';
import useUser from '@libs/client/useUser';
import { cls, formatAgo } from '@libs/client/utils';
import { ReplyWithLikes } from 'pages/books/[id]';
import { BookDetailResponse } from 'pages/books/[id]';
import Comment from '@components/UI/comment';

interface ReplyCardProp {
  reply: ReplyWithLikes;
}

interface toggleLikeMutation {
  success: boolean;
}

export default function ReplyCard({
  reply: { id, userId, content, createdAt, likes, _count: count },
}: ReplyCardProp) {
  const router = useRouter();

  const { mutate } = useSWR<BookDetailResponse>(
    `/api/books/${router.query.id}`
  );

  const [toggleLike, { data }] = useMutation<toggleLikeMutation>(
    `/api/replies/${id}/like`
  );

  const handleClickLike = () => {
    toggleLike({ bookId: router.query.id });
  };

  const handleCommentDelete = (e: React.MouseEvent<HTMLButtonElement>) => {};

  useEffect(() => {
    if (data && data.success) {
      mutate();
    }
  }, [data, mutate]);

  return (
    <Comment
      id={id}
      type='reply'
      userId={userId}
      likes={likes}
      content={content}
      createdAt={createdAt}
      handleClickLike={handleClickLike}
      handleCommentDelete={handleCommentDelete}
      count={count}
    />
  );
}
