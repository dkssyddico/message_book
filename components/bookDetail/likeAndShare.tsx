export default function LikeAndShare() {
  return (
    <div className='flex items-center gap-4'>
      <button className='rounded-full bg-red-400 p-2 transition ease-in-out hover:bg-red-500'>
        <svg
          className='h-4 w-4 text-white'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
          />
        </svg>
      </button>
      <button className='rounded-full  bg-blue-500 p-2 transition ease-in-out hover:bg-blue-600'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='feather feather-share-2  text-white'
        >
          <circle cx='18' cy='5' r='3'></circle>
          <circle cx='6' cy='12' r='3'></circle>
          <circle cx='18' cy='19' r='3'></circle>
          <line x1='8.59' y1='13.51' x2='15.42' y2='17.49'></line>
          <line x1='15.41' y1='6.51' x2='8.59' y2='10.49'></line>
        </svg>
      </button>
    </div>
  );
}
