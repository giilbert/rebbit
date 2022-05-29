import { Box, Heading, Text } from '@chakra-ui/react';
import { Post } from '@prisma/client';

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <Box key={post.id} borderWidth="1px" p="4" my="2">
      <Heading size="lg">{post.title}</Heading>
      <Text>{post.content}</Text>
    </Box>
  );
};

export default PostCard;
