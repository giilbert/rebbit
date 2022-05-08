import * as trpc from '@trpc/server';

type Context = {};

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
