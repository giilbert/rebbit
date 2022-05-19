import { usersController } from '@controllers/users-controller';
import { createRouter } from '@utils/context';
import { authenticated } from '@middleware/authenticated';
import { z } from 'zod';
import * as trpc from '@trpc/server';

export const appRouter = createRouter()
  .middleware(authenticated)
  .merge('users.', usersController);

export type AppRouter = typeof appRouter;
export { PrismaClient } from '@prisma/client';
export { createContext } from '@utils/context';
