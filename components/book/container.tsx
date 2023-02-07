import ContainerHeader from './containerHeader';

interface ContainerProps {
  children: React.ReactNode;
  title: string;
}

export default function Container({ children, title }: ContainerProps) {
  return (
    <section className='w-full overflow-hidden md:w-3/4'>
      <ContainerHeader title={title} />
      {children}
    </section>
  );
}
