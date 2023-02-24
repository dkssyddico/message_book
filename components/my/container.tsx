interface ContainerProps {
  title: string;
}

export default function Container({ title }: ContainerProps) {
  return (
    <section>
      <h2 className='text-2xl font-bold'>{title}</h2>
    </section>
  );
}
