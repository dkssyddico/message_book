import { useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import useMutation from '@libs/client/useMutation';
import Comment from '@components/common/comment';
import { BookDetailResponse, ReplyWithLikes } from '@libs/client/types';

interface ReplyCardProp {
  reply: ReplyWithLikes;
}

interface ToggleLikeMutation {
  success: boolean;
}

interface DeleteReplyMutation {
  success: boolean;
}

export default function ReplyCard({
  reply: { id, userId, content, createdAt, likes, _count: count },
}: ReplyCardProp) {
  const router = useRouter();

  const { mutate } = useSWR<BookDetailResponse>(
    `/api/books/${router.query.id}`
  );

  const [toggleLike, { data }] = useMutation<ToggleLikeMutation>(
    `/api/replies/${id}/like`
  );

  const [deleteReply, { data: deleteData }] = useMutation<DeleteReplyMutation>(`
  /api/replies/${id}
`);

  const handleClickLike = () => {
    toggleLike({ bookId: router.query.id });
  };

  const handleReplyDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    deleteReply({});
  };

  useEffect(() => {
    if (data && data.success) {
      mutate();
    }
  }, [data, mutate]);

  useEffect(() => {
    if (deleteData && deleteData.success) {
      mutate();
    }
  });

  return (
    <Comment
      id={id}
      type='reply'
      userId={userId}
      likes={likes}
      content={content}
      createdAt={createdAt}
      handleClickLike={handleClickLike}
      handleCommentDelete={handleReplyDelete}
      count={count}
    />
  );
}
