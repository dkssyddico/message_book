import CommentForm from './commentForm';
import CommentsList from './commentsList';

export default function CommentsContainer() {
  return (
    <section className='w-full overflow-hidden md:w-3/4'>
      <div className='flex h-10 items-center justify-center rounded-tl-2xl rounded-tr-2xl bg-yellow-400 font-semibold'>
        <span>댓글</span>
      </div>
      <div className='space-y-8 rounded-bl-2xl rounded-br-2xl border-2 border-t-0 p-8 '>
        <CommentsList />
        <CommentForm />
      </div>
    </section>
  );
}
