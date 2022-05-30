import {
  Box,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { trpc } from '@lib/trpc';
import { Author, Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

const PostCard: React.FC<{
  post: Post & { author: Author | null };
  clickable?: boolean;
}> = ({ post, clickable = true }) => {
  const dootMutation = trpc.useMutation('posts.doot');
  const router = useRouter();

  const goToPostPage = useCallback(() => {
    router.push(
      `/r/${router.query.slug as string}/${post.author?.username}/${post.slug}`
    );
  }, [router, post]);

  const doot = useCallback(
    (direction: 'up' | 'down') =>
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        dootMutation.mutate({
          doot: direction,
          postId: post.id,
        });
      },
    [post, dootMutation]
  );

  return (
    <HStack
      key={post.id}
      borderWidth="1px"
      p="4"
      my="2"
      alignItems="start"
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
      <VStack mr="2">
        <IconButton
          aria-label="Updoot"
          icon={<FaAngleUp />}
          onClick={doot('up')}
        />
        <Text>22</Text>
        <IconButton
          aria-label="Downdoot"
          icon={<FaAngleDown />}
          onClick={doot('down')}
        />
      </VStack>
      <Box>
        <HStack
          mb="2"
          _hover={{
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={() => router.push(`/u/${post.author?.username}`)}
        >
          <Text>Posted by {post.author?.username}</Text>
          <Text color="#444">u/{post.author?.username}</Text>
        </HStack>

        <Heading size="md">{post.title}</Heading>
        <Text>{post.content}</Text>
      </Box>
    </HStack>
  );
};

export default PostCard;
