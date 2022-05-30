import { createRouter } from "@utils/context";
import { prisma } from "@utils/prisma";
import { generatePostSlug } from "@utils/slug";
import { z } from "zod";

const postsController = createRouter()
  .mutation("create", {
    input: z.object({
      title: z.string(),
      content: z.string(),
      communityId: z.string(),
    }),
    meta: {
      auth: true,
    },
    async resolve({ input, ctx }) {
      await prisma.post.create({
        data: {
          ...input,
          authorId: ctx.session?.user?.id,
          slug: generatePostSlug(input.title),
        },
      });
    },
  })
  .query("hot", {
    input: z.object({
      communityId: z.string(),
      limit: z.number().min(1).max(50).default(20),
      cursor: z.any().nullish(),
    }),
    async resolve({ input }) {
      const { cursor, communityId, limit } = input;

      const posts = await prisma.post.findMany({
        where: {
          communityId: communityId,
        },
        include: {
          author: true,
        },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
      });

      let nextCursor: typeof cursor | null = null;
      if (posts.length > limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem!.id;
      }

      return {
        posts,
        nextCursor,
      };
    },
  })
  .mutation("doot", {
    input: z.object({
      postId: z.string(),
      doot: z.enum(["up", "down"]),
    }),
    async resolve() {
      console.log("TODO: dooting");
    },
  });

export { postsController };
