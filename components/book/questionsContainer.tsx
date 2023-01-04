import useMutation from '@libs/client/useMutation';
import { Question } from '@prisma/client';
import { useForm } from 'react-hook-form';

interface QuestionsContainerProps {
  questions: Question[] | undefined;
}

interface AnswersForm {
  [questionId: string]: string;
}

export default function QuestionsContainer({ questions }: QuestionsContainerProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<AnswersForm>();

  const [upload, { loading }] = useMutation('/api/answers');

  const onValid = (answers: AnswersForm) => {
    upload(answers);
    reset();
  };

  return (
    <section className='w-full overflow-hidden md:w-3/4'>
      <div className='flex h-10 items-center justify-center rounded-tl-2xl rounded-tr-2xl bg-yellow-400 font-semibold'>
        <span>질문 목록</span>
      </div>
      <form
        onSubmit={handleSubmit(onValid)}
        className='flex flex-col space-y-8 rounded-bl-2xl rounded-br-2xl  border-2 border-t-0 p-8 '
      >
        {questions?.map((question) => (
          <div key={question.id} className='space-y-2'>
            <label htmlFor={question.id + ''} className='flex items-center font-semibold'>
              {question.required && (
                <svg
                  className='mr-1 h-4 w-4 fill-red-600 text-red-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
                  ></path>
                </svg>
              )}
              {question.content}
            </label>
            <input
              {...register(`${question.id + ''}`, {
                required: question.required,
                validate: {
                  checkRequiredEmpty: (value) => {
                    if (question.required) return value.trim().length !== 0;
                  },
                },
              })}
              className='w-full origin-center border-b-2 border-b-gray-200 p-2 outline-none transition duration-300 ease-in-out  focus:border-b-2 focus:border-orange-300'
              type='text'
              id={question.id + ''}
              placeholder='내 답변'
            />
          </div>
        ))}
        <button
          disabled={isSubmitting}
          className='flex-auto rounded bg-orange-400 py-2 px-4 font-semibold text-white transition duration-300 ease-in-out hover:bg-orange-500'
        >
          제출하기
        </button>
      </form>
    </section>
  );
}
