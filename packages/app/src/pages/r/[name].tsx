import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Text } from '@chakra-ui/react';

const CommunityPage: NextPage = () => {
  const router = useRouter();

  return <Text>{router.query.name}</Text>;
};

export default CommunityPage;
