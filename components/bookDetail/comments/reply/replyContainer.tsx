import React from 'react';
import useSWR from 'swr';
import { Reply } from '@prisma/client';
import { useRouter } from 'next/router';
import ReplyForm from './replyForm';
import ReplyList from './replyList';

interface ReplyContainerProps {
  commentId: string;
}

export interface CommentsResponse {
  success: boolean;
  replies: Reply[];
}

export default function ReplyContainer({ commentId }: ReplyContainerProps) {
  const router = useRouter();
  const {
    query: { id: bookId },
  } = router;

  const { data, isLoading } = useSWR<CommentsResponse>(
    `/api/books/${bookId}/comments/${commentId}/replies`
  );

  return (
    <div className='space-y-4 pl-10'>
      <ReplyList replies={isLoading ? null : data?.replies!} />
      <ReplyForm commentId={commentId} />
    </div>
  );
}
