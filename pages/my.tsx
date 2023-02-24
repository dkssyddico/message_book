import { NextPage } from 'next';
import useSWR from 'swr';
import Layout from '@components/layout';

// TODO: 내가 참여한 메세지북 내가 만든 메세지북..
// TODO: 내가 쓴 댓글..
// TODO: 마이페이지 내일 완성할 것
const MyPage: NextPage = () => {
  const { data } = useSWR('/api/me');

  return (
    <Layout title='My page'>
      <main className='mt-10 flex items-center justify-center p-8'>
        <section>
          <h2 className='text-2xl font-bold'>내 정보 관리</h2>
        </section>
      </main>
    </Layout>
  );
};

export default MyPage;
