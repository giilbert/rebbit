import {
  Box,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Author, Post } from "@prisma/client";
import { useRouter } from "next/router";
import { useCallback } from "react";

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
    <HStack
      key={post.id}
      borderWidth="1px"
      p="4"
      my="2"
      onClick={clickable ? () => goToPostPage() : undefined}
      _hover={
        clickable
          ? {
              borderColor: "#999",
              cursor: "pointer",
            }
          : undefined
      }
    >
      <VStack>
        <IconButton icon={} />
      </VStack>
      <Box>
        <HStack
          mb="2"
          _hover={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => router.push(`/u/${post.author?.username}`)}
        >
          <Text>{post.author?.username}</Text>
          <Text color="#444">u/{post.author?.username}</Text>
        </HStack>

        <Heading size="md">{post.title}</Heading>
        <Text>{post.content}</Text>
      </Box>
    </HStack>
  );
};

export default PostCard;
