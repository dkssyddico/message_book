interface InfoBoxProps {
  title: string;
  answer: string | number | undefined;
}

export default function InfoBox({ title, answer }: InfoBoxProps) {
  return (
    <div className='flex flex-col items-center space-y-2'>
      <span className='font-bold'>{title}</span>
      <span>{answer}</span>
    </div>
  );
}
