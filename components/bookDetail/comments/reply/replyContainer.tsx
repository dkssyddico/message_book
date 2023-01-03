import React from 'react';
import useSWR from 'swr';
import { Reply } from '@prisma/client';
import { useRouter } from 'next/router';
import ReplyForm from './replyForm';
import ReplyList from './replyList';

interface ReplyContainerProps {
  commentId: string;
  replies: Reply[];
}

export default function ReplyContainer({ commentId, replies }: ReplyContainerProps) {
  return (
    <div className='space-y-4 pl-10'>
      <ReplyList replies={replies} />
      <ReplyForm commentId={commentId} />
    </div>
  );
}
