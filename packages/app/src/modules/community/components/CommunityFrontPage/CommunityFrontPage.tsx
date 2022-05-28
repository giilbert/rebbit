import { Box, Heading, Text } from '@chakra-ui/react';
import CreatePostCard from '@posts/components/CreatePostCard';
import { Community } from '@prisma/client';

const CommunityFrontPage: React.FC<{
  community: Community;
}> = ({ community }) => {
  return (
    <Box>
      <Heading>Welcome to {community.name}!</Heading>
      <Text>{community.description}</Text>
      <Text>Founded {community.createdAt.toDateString()}</Text>

      <CreatePostCard />
    </Box>
  );
};

export default CommunityFrontPage;
