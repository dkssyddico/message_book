import { ReplyWithLikes } from '@libs/client/types';
import React from 'react';
import ReplyForm from './replyForm';
import ReplyList from './replyList';

interface ReplyContainerProps {
  commentId: string;
  replies: ReplyWithLikes[];
}

export default function ReplyContainer({
  commentId,
  replies,
}: ReplyContainerProps) {
  return (
    <div className='space-y-4 pl-10'>
      <ReplyList replies={replies} />
      <ReplyForm commentId={commentId} />
    </div>
  );
}
