import { LoadingImage } from '@libs/client/imageLoader';
import { Hashtag } from '@prisma/client';
import Image from 'next/image';
import DateRange from './dateRange';
import LikeAndShare from './likeAndShare';
import UserInfo from './userInfo';

interface DetailProps {
  thumbnail: string | undefined;
  title: string | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  description: string | undefined;
  hashtags: Hashtag[] | undefined;
}

export default function DetailContainer({
  thumbnail,
  title,
  startDate,
  endDate,
  description,
  hashtags,
}: DetailProps) {
  return (
    <section className='flex min-h-fit flex-col items-center justify-center gap-8 md:w-3/4 lg:flex-row'>
      <div className='basis-1/2'>
        <Image
          className='h-[400px] w-full'
          src={thumbnail ? (thumbnail === 'no-thumbnail' ? LoadingImage : thumbnail) : LoadingImage}
          alt='thumbnail'
          width={240}
          height={160}
          priority={true}
        />
      </div>
      <div className='grid min-h-[400px] w-full basis-1/2 grid-flow-row gap-4 rounded-lg border-2 p-4'>
        <LikeAndShare />
        <div className='flex items-center'>
          <h2 className='text-xl font-bold'>{title} 0/150</h2>
        </div>
        <DateRange startDate={startDate} endDate={endDate} />
        <div>
          <p className='flex items-center'>
            {description} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione illo
            aspernatur quasi architecto impedit qui doloremque eum aut eligendi. Unde!
          </p>
        </div>
        <div className='flex flex-wrap items-center gap-3'>
          {hashtags?.map((hashtag) => (
            <span
              className='rounded bg-gray-200 px-2 py-1 font-semibold text-blue-600'
              key={hashtag.id}
            >
              #{hashtag.name}
            </span>
          ))}
        </div>
        <UserInfo />
      </div>
    </section>
  );
}
