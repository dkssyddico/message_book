import React from 'react';
import ReplyForm from './replyForm';
import ReplyList from './replyList';
import { ReplyWithLikes } from 'pages/books/[id]';
import { ReplyLike } from '@prisma/client';

interface ReplyContainerProps {
  commentId: string;
  replies: ReplyWithLikes[];
  likedReplies: ReplyLike[] | undefined;
}

export default function ReplyContainer({
  commentId,
  replies,
  likedReplies,
}: ReplyContainerProps) {
  return (
    <div className='space-y-4 pl-10'>
      <ReplyList likedReplies={likedReplies} replies={replies} />
      <ReplyForm commentId={commentId} />
    </div>
  );
}
