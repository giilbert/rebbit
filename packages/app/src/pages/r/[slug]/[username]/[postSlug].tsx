import PostCard from "@posts/components/PostCard";
import { GetServerSideProps, NextPage } from "next";
import { Post, Author, PostDoot } from "@prisma/client";
import { prisma } from "@utils/prisma";
import { Layout } from "@components/Layout";
import { getSession } from "next-auth/react";

interface PageProps {
  post: Post & { author: Author | null; doots: PostDoot[] };
}

const PostPage: NextPage<PageProps> = ({ post }) => {
  // idk what's happening, SSR is weird
  if (!post) return null;
  return (
    <Layout
      meta={{
        title: post.title,
        description: post.content,
      }}
    >
      <PostCard post={post} clickable={false} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  query,
  req,
}) => {
  const session = await getSession({ req });

  const post = await prisma.post.findFirst({
    where: {
      slug: query.postSlug as string,
      author: {
        username: query.username as string,
      },
    },
    include: {
      author: true,
      doots: {
        where: {
          authorId: session?.user.id,
        },
      },
    },
  });

  if (!post)
    return {
      notFound: true,
    };

  return {
    props: {
      post,
    },
  };
};

export default PostPage;
