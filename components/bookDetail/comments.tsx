export default function Comments() {
  return (
    <section className='w-full overflow-hidden md:w-3/4'>
      <div className='flex h-10 items-center justify-center rounded-tl-2xl rounded-tr-2xl bg-yellow-400 font-semibold'>
        <span>댓글</span>
      </div>
      {/* show comments */}
      <form className='flex flex-col space-y-4 rounded-bl-2xl rounded-br-2xl  border-2 border-t-0 p-8 '>
        <input
          className='w-full origin-center border-b-2 border-b-gray-200 pb-2 outline-none transition duration-300 ease-in-out focus:border-b-2 focus:border-orange-300'
          type='text'
          placeholder='댓글 쓰기'
        />
        <button
          className='flex-shrink-0 rounded border-4 border-orange-400 bg-orange-400 py-1 px-2 font-semibold text-white hover:border-orange-500 hover:bg-orange-500'
          type='button'
        >
          댓글 등록
        </button>
      </form>
    </section>
  );
}
