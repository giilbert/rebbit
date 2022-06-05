import {
  Box,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { trpc } from "@lib/trpc";
import { Author, Post, PostDoot } from "@prisma/client";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { DootType } from "@prisma/client";
import { useSession } from "next-auth/react";

const PostCard: React.FC<{
  post: Post & { author: Author | null; doots: PostDoot[] };
  clickable?: boolean;
}> = ({ post, clickable = true }) => {
  const [currentDoot, setCurrentDoot] = useState(
    post.doots.length > 0 ? post.doots[0] : undefined
  );
  const trpcContext = trpc.useContext();
  const dootMutation = trpc.useMutation("posts.doot", {
    onSuccess() {
      // refetch post data on mutation
      trpcContext.invalidateQueries("posts.hot");
    },
  });
  const router = useRouter();
  const session = useSession();

  const goToPostPage = useCallback(() => {
    router.push(
      `/r/${router.query.slug as string}/${post.author?.username}/${post.slug}`
    );
  }, [router, post]);

  const postDoot = useCallback(
    (direction: DootType) =>
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        setCurrentDoot({
          value: direction,
          postId: post.id,
          id: "",
          authorId: session.data?.user.id || "",
        });

        dootMutation.mutate({
          type: direction,
          postId: post.id,
        });
      },
    [post, dootMutation, session]
  );

  console.log(post.doots);

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
              borderColor: "#999",
              cursor: "pointer",
            }
          : undefined
      }
    >
      <VStack mr="2">
        <IconButton
          aria-label="Updoot"
          icon={<FaAngleUp />}
          onClick={postDoot("UP")}
          backgroundColor={
            currentDoot?.value === DootType.UP ? "green.400" : undefined
          }
        />
        <Text>{post.upDoots - post.downDoots}</Text>
        <IconButton
          aria-label="Downdoot"
          icon={<FaAngleDown />}
          onClick={postDoot("DOWN")}
          backgroundColor={
            currentDoot?.value === DootType.DOWN ? "red.400" : undefined
          }
        />
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
