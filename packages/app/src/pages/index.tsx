import type { NextPage } from 'next';
import { Heading } from '@chakra-ui/react';
import { Layout } from '@components/Layout';
import { trpc } from '@lib/trpc';

const IndexPage: NextPage = () => {
  const query = trpc.useQuery(['hello']);

  return (
    <Layout>
      <Heading>hi</Heading>
    </Layout>
  );
};

export default IndexPage;
