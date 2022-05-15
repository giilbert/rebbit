import * as trpc from '@trpc/server';
import { usersController } from '@controllers/users-controller';

type Context = {};

export const appRouter = trpc
  .router<Context>()
  // Create procedure at path 'hello'
  .merge(usersController);

export type AppRouter = typeof appRouter;
export { PrismaClient } from '@prisma/client';
