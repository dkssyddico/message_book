import { LoadingImage } from '@libs/client/imageLoader';
import Image from 'next/image';
import { BookWithDetails } from '@libs/client/types';
import DateRange from './dateRange';
import LikeAndShare from './likeAndShare';
import UserInfo from './userInfo';
import Hashtag from './hashtag';

interface DetailProps {
  book: BookWithDetails;
}

export default function DetailContainer({
  book: {
    thumbnail,
    title,
    startDate,
    endDate,
    description,
    hashtags,
    favs,
    targetMessage,
    _count: { answers: answersCount },
  },
}: DetailProps) {
  return (
    <section className='flex min-h-fit flex-col items-center justify-center gap-8 md:w-3/4 lg:flex-row'>
      <div className='basis-1/2'>
        <Image
          className='h-[400px] w-full'
          src={
            thumbnail
              ? thumbnail === 'no-thumbnail'
                ? LoadingImage
                : thumbnail
              : LoadingImage
          }
          alt='thumbnail'
          width={240}
          height={160}
          priority={true}
        />
      </div>
      <div className='grid min-h-[400px] w-full basis-1/2 grid-flow-row gap-4 rounded-lg border-2 p-4'>
        <LikeAndShare title={title} favs={favs} />
        <h2 className='text-xl font-bold'>{title}</h2>
        <div className='flex items-center'>
          <p>
            <span className='mr-1 text-xl font-bold'>{answersCount}</span>명
            참여 / <span className='text-xl font-bold'>{targetMessage}</span>
          </p>
          <div className='ml-2 rounded-xl bg-gray-100 px-2 py-1 text-sm font-bold text-red-500'>
            {`${Math.floor(answersCount / targetMessage) * 100}% 달성 `}
          </div>
        </div>
        <DateRange startDate={startDate} endDate={endDate} />
        <div>
          <p className='flex items-center'>
            {description} Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Ratione illo aspernatur quasi architecto impedit qui
            doloremque eum aut eligendi. Unde!
          </p>
        </div>
        <div className='flex flex-wrap items-center gap-3'>
          {hashtags?.map((hashtag) => (
            <Hashtag name={hashtag.name} id={hashtag.id} key={hashtag.id} />
          ))}
        </div>
        <UserInfo />
      </div>
    </section>
  );
}
