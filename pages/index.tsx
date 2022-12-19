import Banner from '@components/banner';
import Layout from '@components/layout';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Layout title='Home'>
      <Banner />
    </Layout>
  );
};

export default Home;
