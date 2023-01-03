interface DateRangeProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export default function DateRange({ startDate, endDate }: DateRangeProps) {
  return (
    <div className='flex items-center'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='feather feather-calendar mr-1 text-red-500'
      >
        <rect x='3' y='4' width='18' height='18' rx='2' ry='2'></rect>
        <line x1='16' y1='2' x2='16' y2='6'></line>
        <line x1='8' y1='2' x2='8' y2='6'></line>
        <line x1='3' y1='10' x2='21' y2='10'></line>
      </svg>
      <p className=''>{`${startDate?.toString().slice(0, 10)} ~ ${endDate
        ?.toString()
        .slice(0, 10)}`}</p>

      <span className='ml-2 animate-bounce rounded-xl bg-gray-100 px-2 py-1 font-bold text-red-500'>
        D - 3
      </span>
    </div>
  );
}
