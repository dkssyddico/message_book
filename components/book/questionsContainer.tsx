import { Question } from '@prisma/client';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import SubmitButton from '@components/UI/submitButton';
import { useEffect } from 'react';
import QuestionCard from '@components/question/questionCard';
import Container from './container';

interface QuestionsContainerProps {
  questions: Question[] | undefined;
}

export interface AnswersForm {
  [questionId: string]: string;
}

interface UploadAnswerMutation {
  success: boolean;
}

export default function QuestionsContainer({
  questions,
}: QuestionsContainerProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<AnswersForm>();

  const [upload, { loading, data }] =
    useMutation<UploadAnswerMutation>('/api/answers');

  const onValid = (answers: AnswersForm) => {
    upload(answers);
  };

  useEffect(() => {
    if (data && data.success) reset();
  }, [data, reset]);

  return (
    <Container title='질문 목록'>
      <form
        onSubmit={handleSubmit(onValid)}
        className='flex flex-col space-y-8 rounded-bl-2xl rounded-br-2xl  border-2 border-t-0 p-8 '
      >
        {questions
          ?.sort((a, b) => a.index - b.index)
          .map((question) => (
            <QuestionCard
              key={question.id}
              id={question.id}
              content={question.content}
              required={question.required}
              register={register}
            />
          ))}
        <SubmitButton
          disabled={isSubmitting}
          loading={loading}
          submitMessage='답변 제출하기'
          loadingMessage='답변 제출 중'
        />
      </form>
    </Container>
  );
}
