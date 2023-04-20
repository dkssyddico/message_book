import { useRouter } from 'next/router';

interface HashtagProps {
  id: string;
  name: string;
}

export default function Hashtag({ id, name }: HashtagProps) {
  const router = useRouter();

  const handleHashtagClick = () => {
    router.push(`/books?searchWord=${name}`);
  };

  return (
    <button
      onClick={handleHashtagClick}
      className='rounded bg-gray-200 px-2 py-1 font-semibold text-blue-600'
      key={id}
    >
      #{name}
    </button>
  );
}
