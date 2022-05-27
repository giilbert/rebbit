import { createRouter } from '@utils/context';
import { prisma } from '@utils/prisma';
import { z } from 'zod';

const communitiesController = createRouter().mutation('create', {
  input: z.object({
    name: z.string(),
    description: z.string(),
    slug: z.string(),
  }),

  async resolve({ input }) {
    await prisma.community.create({
      data: {
        ...input,
      },
    });
  },
});

export { communitiesController };
