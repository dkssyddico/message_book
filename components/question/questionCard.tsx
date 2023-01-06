import { AnswersForm } from '@components/book/questionsContainer';
import { UseFormRegister } from 'react-hook-form';

interface QuestionCardProps {
  id: string;
  required: boolean;
  content: string;
  register: UseFormRegister<AnswersForm>;
}

export default function QuestionCard({ id, required, content, register }: QuestionCardProps) {
  return (
    <div key={id} className='space-y-2'>
      <label htmlFor={id + ''} className='flex items-center font-semibold'>
        {required && (
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
        {content}
      </label>
      <input
        {...register(`${id + ''}`, {
          required: required,
          validate: {
            checkRequiredEmpty: (value: string) => {
              if (required) return value.trim().length !== 0;
            },
          },
        })}
        className='w-full origin-center border-b-2 border-b-gray-200 p-2 outline-none transition duration-300 ease-in-out  focus:border-b-2 focus:border-orange-300'
        type='text'
        id={id + ''}
        placeholder='내 답변'
      />
    </div>
  );
}
