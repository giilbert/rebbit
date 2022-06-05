import { Box, Button, Grid, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { trpc } from "@lib/trpc";
import CreatePostCard from "@posts/components/CreatePostCard";
import PostCard from "@posts/components/PostCard";
import { Community } from "@prisma/client";
import AboutCommunity from "./AboutCommunity";
import Banner from "./Banner";

const CommunityFrontPage: React.FC<{
  community: Community;
}> = ({ community }) => {
  let end = false;
  const postsQuery = trpc.useInfiniteQuery(
    ["posts.hot", { communityId: community.id }],
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
    <Grid templateColumns={{ base: "1fr", lg: "3fr 1fr" }} gridGap="2">
      <Tabs>
        <Banner community={community} />

        <TabPanels>
          <TabPanel px="0">
            <CreatePostCard />

            {posts &&
              posts.map((post) => <PostCard post={post} key={post.id} />)}

            {!end && (
              <Button onClick={() => postsQuery.fetchNextPage()}>
                load more
              </Button>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Box bgColor="blackAlpha.50">
        <AboutCommunity community={community} />
      </Box>
    </Grid>
  );
};

export default CommunityFrontPage;
