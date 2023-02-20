import { NextPage } from 'next';
import Layout from '@components/layout';
import MainBookCard from '@components/mainBookCard';

// TODO: 검색된 결과만 보여주는 것으로 활용
const Books: NextPage = () => {
  return (
    <Layout title='Books'>
      <div>Searched book</div>
    </Layout>
  );
};

export default Books;
