import type { NextPage } from 'next';
import CreateCommunity from '@community/components/CreateCommunity';
import { Layout } from '@components/Layout';

interface PageProps {}

const CommunityPage: NextPage<PageProps> = () => {
  return (
    <Layout>
      <CreateCommunity />
    </Layout>
  );
};

export default CommunityPage;
