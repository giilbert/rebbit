import type { GetServerSideProps, NextPage } from 'next';
import CreateCommunity from '@community/components/CreateCommunity';
import { Layout } from '@components/Layout';
import { Community } from '@prisma/client';
import { prisma } from '@utils/prisma';
import CommunityFrontPage from '@community/components/CommunityFrontPage';

interface PageProps {
  community: Community | null;
}

const CommunityPage: NextPage<PageProps> = ({ community }) => {
  return (
    <Layout>
      {!community && <CreateCommunity />}
      {community && <CommunityFrontPage community={community} />}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  query,
}) => {
  const community = await prisma.community.findFirst({
    where: { slug: query.slug as string },
  });

  return {
    props: {
      community,
    },
  };
};

export default CommunityPage;
