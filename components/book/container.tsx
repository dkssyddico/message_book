import ContainerHeader from './containerHeader';

interface ContainerProps {
  children: React.ReactNode;
  title: string;
}

export default function Container({ children, title }: ContainerProps) {
  return (
    <section className='w-full overflow-hidden md:w-3/4'>
      <ContainerHeader title={title} />
      <div className='flex flex-col rounded-bl-2xl rounded-br-2xl border-2 border-t-0 p-8 '>
        {children}
      </div>
    </section>
  );
}
