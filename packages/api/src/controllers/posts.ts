import { createRouter } from '@utils/context';
import { prisma } from '@utils/prisma';
import { z } from 'zod';

const postsController = createRouter().mutation('create', {
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
      },
    });
  },
});

export { postsController };
