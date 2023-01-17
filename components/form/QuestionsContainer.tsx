import Input from '@components/UI/input';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { questionsState } from 'state/form';

const MAX_QUESTIONS = 5;

interface QuestionsContainerProps {
  submitSuccess: boolean | undefined;
}

export default function QuestionsContainer({ submitSuccess }: QuestionsContainerProps) {
  const [questions, setQuestions] = useRecoilState(questionsState);
  const [question, setQuestion] = useState('');
  const [required, setRequired] = useState(false);
  const [index, setIndex] = useState(1);

  const handleCheckRequired = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequired((prev) => !prev);
  };

  const handleQuestionDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const changedQuestions = [...questions].filter(
      (question) => question.content !== e.currentTarget.value
    );
    setQuestions(changedQuestions);
    setIndex((prev) => (prev === 1 ? 1 : prev - 1));
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value);
  };

  const handleAddQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (question.trim() === '') return;
    if (questions.filter((q) => q.content === question).length > 0) return;
    if (questions.length > MAX_QUESTIONS) return;
    setQuestions((prev) => [...prev, { content: question, required, index }]);
    setQuestion('');
    setIndex((prev) => prev + 1);
    setRequired(false);
  };

  useEffect(() => {
    if (submitSuccess) {
      setQuestion('');
      setIndex(1);
      setRequired(false);
    }
  }, [submitSuccess]);

  return (
    <div className='flex w-full flex-col space-y-2'>
      <label className='font-semibold' htmlFor='otherQuestion'>
        추가 질문(선택) {questions.length}/5
      </label>
      {questions.length > 0 && (
        <div className='flex flex-wrap items-center gap-4'>
          {questions.map((question, index) => (
            <div
              className='flex items-center space-x-2 rounded-full bg-gray-100 py-2 px-4'
              key={index}
            >
              {question.required && (
                <span>
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
                    className='feather feather-check text-green-500'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                </span>
              )}
              <span>{question.content}</span>
              <button value={question.content} type='button' onClick={handleQuestionDelete}>
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
                  className='feather feather-x ml-2 font-bold text-red-600'
                >
                  <line x1='18' y1='6' x2='6' y2='18'></line>
                  <line x1='6' y1='6' x2='18' y2='18'></line>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
      <div className='flex items-center'>
        <input
          onChange={handleCheckRequired}
          type='checkbox'
          checked={required}
          name='checkRequired'
          id='checkRequired'
          className='h-4 w-4 rounded border-2 border-indigo-200 text-indigo-300 focus:ring-0 focus:ring-offset-0'
        />
        <label className='ml-2 text-sm' htmlFor='checkRequired'>
          답변을 필수로 받을까요?
        </label>
      </div>
      <Input
        type='text'
        onChange={handleQuestionChange}
        id='otherQuestion'
        value={question}
        placeholder='추가 질문을 입력해주세요'
      />
      <button
        onClick={handleAddQuestion}
        className='self-end rounded-full bg-black px-4 py-2 text-sm font-semibold text-white'
      >
        추가하기
      </button>
    </div>
  );
}
