import useSWR from 'swr';
import { Question } from '@prisma/client';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import SubmitButton from '@components/UI/submitButton';
import QuestionCard from '@components/question/questionCard';
import Container from './container';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AnswersResponse, UploadAnswerMutation } from '@libs/client/types';

interface QuestionsContainerProps {
  questions: Question[] | undefined;
}

export interface AnswersForm {
  [questionId: string]: string;
}

interface DefaultValues {
  [questionId: string]: string;
}

export default function QuestionsContainer({
  questions,
}: QuestionsContainerProps) {
  const router = useRouter();

  const { data: answersData, isLoading } =
    useSWR<AnswersResponse>('/api/answers');

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<AnswersForm>();

  const [upload, { loading }] =
    useMutation<UploadAnswerMutation>('/api/answers');

  const onValid = (answers: AnswersForm) => {
    if (answers) {
      upload({ answers, bookId: router.query.id });
    }
  };

  useEffect(() => {
    let defaultValues: DefaultValues = {};
    if (answersData) {
      answersData.answers.forEach(
        (answer) => (defaultValues[answer.questionId] = answer.content)
      );
      reset({ ...defaultValues });
    }
  }, [answersData, reset]);

  return (
    <Container title='질문 목록'>
      {/* TODO: Loading bar 예쁘게.. 회색 처리 */}
      {isLoading ? (
        <div>loading</div>
      ) : (
        <form onSubmit={handleSubmit(onValid)} className='space-y-8'>
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
      )}
    </Container>
  );
}
