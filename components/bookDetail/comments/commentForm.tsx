export default function CommentForm() {
  return (
    <form className='flex flex-col'>
      <div className='relative'>
        <input
          className='w-full origin-center border-b-2 border-b-gray-200 pb-2 outline-none transition duration-300 ease-in-out focus:border-b-2 focus:border-orange-300'
          type='text'
          placeholder='댓글 쓰기'
        />
        <button
          className='absolute bottom-2 -right-1 rounded-full bg-orange-500 p-2 transition duration-300 ease-in-out hover:bg-orange-600'
          type='button'
        >
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
            className='feather feather-arrow-up h-5 w-5 rounded-full text-white'
          >
            <line x1='12' y1='19' x2='12' y2='5'></line>
            <polyline points='5 12 12 5 19 12'></polyline>
          </svg>
        </button>
      </div>
    </form>
  );
}
