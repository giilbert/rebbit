import * as trpc from '@trpc/server';
import { PrismaClient } from '@prisma/client';

type Context = {};

const prisma = new PrismaClient();

prisma.$connect().then(async () => {
  await prisma.user.create({
    data: {
      email: 'sdasdsa@email.com',
      name: 'name',
    },
  });

  await prisma.$disconnect();
});

export const appRouter = trpc
  .router<Context>()
  // Create procedure at path 'hello'
  .query('hello', {
    resolve({ ctx }) {
      return {
        greeting: `hello world`,
      };
    },
  });

export type AppRouter = typeof appRouter;
