import { Box, Heading, Text } from '@chakra-ui/react';
import { Author, Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const PostCard: React.FC<{
  post: Post & { author: Author | null };
  clickable?: boolean;
}> = ({ post, clickable = true }) => {
  const router = useRouter();

  const goToPostPage = useCallback(() => {
    router.push(
      `/r/${router.query.slug as string}/${post.author?.username}/${post.slug}`
    );
  }, [router, post]);

  return (
    <Box
      key={post.id}
      borderWidth="1px"
      p="4"
      my="2"
      onClick={clickable ? () => goToPostPage() : undefined}
      _hover={
        clickable
          ? {
              borderColor: '#999',
              cursor: 'pointer',
            }
          : undefined
      }
    >
      <Text>{post.author?.name}</Text>
      <Text>@{post.author?.username}</Text>
      <Heading size="lg">{post.title}</Heading>
      <Text>{post.content}</Text>
    </Box>
  );
};

export default PostCard;
