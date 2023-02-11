import { cls, formatAgo } from '@libs/client/utils';
import { CommentLike, ReplyLike } from '@prisma/client';
import useUser from '@libs/client/useUser';

interface CommentProps {
  id: string;
  userId: string;
  likes: CommentLike[] | ReplyLike[];
  content: string;
  type: 'comment' | 'reply';
  createdAt: Date;
  children?: React.ReactNode;
  handleClickLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleReplyOpen?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCommentDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  count: {
    replies?: number;
    likes: number;
  };
  openReply?: boolean;
}

export default function Comment({
  id,
  type,
  userId,
  likes,
  content,
  createdAt,
  children,
  handleClickLike,
  handleReplyOpen,
  handleCommentDelete,
  openReply,
  count: { replies: repliesCount, likes: likesCount },
}: CommentProps) {
  const loggedInUser = useUser();
  const likesArr = likes.map((like) => like.userId);

  return (
    <li className='space-y-3'>
      <div className='flex items-center gap-2'>
        <div className='h-8 w-8 rounded-full bg-teal-400' />
        <span className='font-semibold'>User</span>
        <span className='text-xs text-gray-400'>{formatAgo(createdAt)}</span>
      </div>
      <p className='pl-10'>{content}</p>
      <div className='flex gap-4 pl-10 text-gray-500'>
        <button className='flex items-center gap-1' onClick={handleClickLike}>
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
            className={cls(
              'feather feather-thumbs-up h-4 w-4',
              likesArr.includes(loggedInUser.userId)
                ? 'fill-orange-400 text-yellow-400'
                : ''
            )}
          >
            <path d='M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3'></path>
          </svg>
          <span>{likesCount}</span>
        </button>
        {type === 'comment' && (
          <button className='flex items-center gap-1' onClick={handleReplyOpen}>
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
              className='feather feather-message-circle h-4 w-4'
            >
              <path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'></path>
            </svg>
            <span>{repliesCount}</span>
          </button>
        )}
        {userId === loggedInUser.userId && (
          <button onClick={handleCommentDelete}>
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
              className='feather feather-trash-2 h-4 w-4'
            >
              <polyline points='3 6 5 6 21 6'></polyline>
              <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
              <line x1='10' y1='11' x2='10' y2='17'></line>
              <line x1='14' y1='11' x2='14' y2='17'></line>
            </svg>
          </button>
        )}
      </div>
      {/* reply sections */}
      {openReply && children}
    </li>
  );
}
