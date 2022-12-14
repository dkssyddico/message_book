import type { NextPage } from 'next';
import Banner from '../components/banner';
import Layout from '../components/layout';

const Home: NextPage = () => {
  return (
    <Layout title='Home'>
      <Banner />
    </Layout>
  );
};

export default Home;
