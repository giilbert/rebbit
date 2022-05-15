import * as trpc from '@trpc/server';
import { usersController } from '@controllers/users-controller';
import { createRouter } from '@utils/context';
import { authenticated } from '@middleware/authenticated';

export const appRouter = createRouter()
  .middleware(authenticated)
  .merge(usersController)
  .query('hello', {
    async resolve() {
      return {
        message: 'hello',
      };
    },
  });

export type AppRouter = typeof appRouter;
export { PrismaClient } from '@prisma/client';
export { createContext } from '@utils/context';
