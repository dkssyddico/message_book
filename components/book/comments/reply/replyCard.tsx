import { formatAgo } from '@libs/client/utils';
import React from 'react';

interface ReplyCardProp {
  replyId: string;
  time: Date;
  content: string;
}

export default function ReplyCard({ replyId, time, content }: ReplyCardProp) {
  const handleClickLikes = () => {};
  return (
    <li key={replyId} className='space-y-3'>
      <div className='flex items-center gap-2'>
        <div className='h-8 w-8 rounded-full bg-teal-400' />
        <span className='font-semibold'>User</span>
        <span className='text-xs text-gray-400'>{formatAgo(time)}</span>
      </div>
      <p className='pl-10'>{content}</p>
      <div className='flex gap-4 pl-10'>
        <button onClick={handleClickLikes}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='feather feather-thumbs-up h-4 w-4 text-gray-500'
          >
            <path d='M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3'></path>
          </svg>
        </button>
      </div>
    </li>
  );
}
