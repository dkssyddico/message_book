import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import useMutation from '@libs/client/useMutation';
import ReplyContainer from './reply/replyContainer';
import Comment from '@components/UI/comment';
import { BookDetailResponse, CommentWithReply } from '@libs/client/types';

interface CommentCardProps {
  comment: CommentWithReply;
}

interface ToggleLikeMutation {
  success: boolean;
}

export default function CommentCard({
  comment: { id, userId, likes, content, createdAt, _count: count, replies },
}: CommentCardProps) {
  const router = useRouter();
  const [openReply, setOpenReply] = useState(false);

  const [toggleLike, { data: toggleLikeData }] =
    useMutation<ToggleLikeMutation>(`/api/comments/${id}/like`);

  const { mutate } = useSWR<BookDetailResponse>(
    `/api/books/${router.query.id}`
  );

  const handleClickLike = () => {
    toggleLike({ bookId: router.query.id });
  };

  const handleReplyOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpenReply((prev) => !prev);
  };

  const deleteComment = async () => {
    const result = await axios.delete(`/api/comments/${id}`);
    if (result.data.success) {
      mutate();
    }
  };

  const handleCommentDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    deleteComment();
  };

  useEffect(() => {
    if (toggleLikeData && toggleLikeData.success) {
      mutate();
    }
  }, [toggleLikeData, mutate]);

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
