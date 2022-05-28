import type { GetServerSideProps, NextPage } from 'next';
import { Layout } from '@components/Layout';
import { Community } from '@prisma/client';
import { prisma } from '@utils/prisma';
import CreatePost from '@posts/components/CreatePost';

interface PageProps {
  community: Community;
}

const SubmitPostPage: NextPage<PageProps> = ({ community }) => {
  return (
    <Layout>
      <CreatePost community={community} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  query,
}) => {
  const community = await prisma.community.findFirst({
    where: { slug: query.slug as string },
  });

  if (!community)
    return {
      notFound: true,
    };

  return {
    props: {
      community,
    },
  };
};

export default SubmitPostPage;
