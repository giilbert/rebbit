import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { trpc } from '@lib/trpc';
import CreatePostCard from '@posts/components/CreatePostCard';
import PostCard from '@posts/components/PostCard';
import { Community } from '@prisma/client';

const CommunityFrontPage: React.FC<{
  community: Community;
}> = ({ community }) => {
  let end = false;
  const postsQuery = trpc.useInfiniteQuery(
    ['posts.hot', { communityId: community.id }],
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.nextCursor) return lastPage.nextCursor;
        end = true;
      },
    }
  );
  const posts = postsQuery.data?.pages
    .map((v) => v.posts)
    .reduce((curr, prev) => [...curr, ...prev]);

  return (
    <Box>
      <Heading>Welcome to {community.name}!</Heading>
      <Text>{community.description}</Text>
      <Text>Founded {community.createdAt.toDateString()}</Text>

      <CreatePostCard />

      {posts && posts.map((post) => <PostCard post={post} key={post.id} />)}

      {!end && (
        <Button onClick={() => postsQuery.fetchNextPage()}>load more</Button>
      )}
    </Box>
  );
};

export default CommunityFrontPage;
