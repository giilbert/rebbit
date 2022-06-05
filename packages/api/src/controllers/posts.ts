import { createRouter } from "@utils/context";
import { prisma } from "@utils/prisma";
import { generatePostSlug } from "@utils/slug";
import { z } from "zod";
import { DootType } from "@prisma/client";

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
  .mutation("doot", {
    meta: { auth: true },
    input: z.object({
      postId: z.string(),
      type: z.enum([DootType.UP, DootType.DOWN]),
    }),
    async resolve({ input, ctx }) {
      await prisma.postDoot.create({
        data: {
          authorId: ctx.session?.user.id!,
          postId: input.postId,
          value: input.type,
        },
      });
      // count doots
      const upDoots = await prisma.postDoot.count({
        where: { postId: input.postId, value: DootType.UP },
      });
      const downDoots = await prisma.postDoot.count({
        where: { postId: input.postId, value: DootType.DOWN },
      });

      await prisma.post.update({
        where: { id: input.postId },
        data: { upDoots, downDoots },
      });
    },
  })

  .query("hot", {
    input: z.object({
      communityId: z.string(),
      limit: z.number().min(1).max(50).default(20),
      cursor: z.any().nullish(),
    }),
    async resolve({ input, ctx }) {
      const { cursor, communityId, limit } = input;

      const posts = await prisma.post.findMany({
        where: {
          communityId: communityId,
        },
        include: {
          author: true,
          doots: {
            where: { authorId: ctx.session?.user.id },
          },
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
  });

export { postsController };
