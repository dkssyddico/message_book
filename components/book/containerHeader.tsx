interface ContainerHeaderProps {
  title: string;
}

export default function ContainerHeader({ title }: ContainerHeaderProps) {
  return (
    <div className='flex h-10 items-center justify-center rounded-tl-2xl rounded-tr-2xl bg-yellow-400 font-semibold'>
      <span>{title}</span>
    </div>
  );
}
