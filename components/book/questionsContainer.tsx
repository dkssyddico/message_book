import useSWR from 'swr';
import { Answer, Question } from '@prisma/client';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import SubmitButton from '@components/UI/submitButton';
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

interface AnswerWithQuestion extends Answer {
  question: Question;
}

interface AnswersResponse {
  success: boolean;
  answers: AnswerWithQuestion[];
}

export default function QuestionsContainer({
  questions,
}: QuestionsContainerProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AnswersForm>();

  const { data: answersData, isLoading } =
    useSWR<AnswersResponse>('/api/answers');

  const [upload, { loading, data }] =
    useMutation<UploadAnswerMutation>('/api/answers');

  const onValid = (answers: AnswersForm) => {
    upload(answers);
  };

  const findAnswer = (questionId: string): string => {
    if (!answersData) {
      return '';
    }
    const answer = answersData.answers.find(
      (answer) => answer.questionId === questionId
    );
    if (!answer) {
      return '';
    } else {
      return answer.content;
    }
  };

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
                answer={findAnswer(question.id)}
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
