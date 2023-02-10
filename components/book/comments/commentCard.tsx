import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import useMutation from '@libs/client/useMutation';
import ReplyContainer from './reply/replyContainer';
import { CommentWithReply } from 'pages/books/[id]';
import { BookDetailResponse } from 'pages/books/[id]';
import Comment from '@components/UI/comment';

interface CommentCardProps {
  comment: CommentWithReply;
}

interface toggleLikeMutation {
  success: boolean;
}

export default function CommentCard({
  comment: { id, content, createdAt, replies, userId, likes, _count: count },
}: CommentCardProps) {
  const router = useRouter();
  const [openReply, setOpenReply] = useState(false);

  const [toggleLike, { data }] = useMutation<toggleLikeMutation>(
    `/api/comments/${id}/like`
  );

  const { mutate } = useSWR<BookDetailResponse>(
    `/api/books/${router.query.id}`
  );

  const handleClickLike = () => {
    toggleLike({ bookId: router.query.id });
  };

  const handleReplyOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpenReply((prev) => !prev);
  };

  const handleCommentDelete = (e: React.MouseEvent<HTMLButtonElement>) => {};

  useEffect(() => {
    if (data && data.success) {
      mutate();
    }
  }, [data, mutate]);

  return (
    <Comment
      type='comment'
      id={id}
      userId={userId}
      likes={likes}
      content={content}
      createdAt={createdAt}
      handleClickLike={handleClickLike}
      handleReplyOpen={handleReplyOpen}
      handleCommentDelete={handleCommentDelete}
      openReply={openReply}
      count={count}
    >
      <ReplyContainer replies={replies} commentId={id} />
    </Comment>
  );
}
