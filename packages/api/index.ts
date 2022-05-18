import { usersController } from '@controllers/users-controller';
import { createRouter } from '@utils/context';
import { authenticated } from '@middleware/authenticated';
import { z } from 'zod';

const appRouter = createRouter()
  .middleware(authenticated)
  .merge('users.', usersController);

export type AppRouter = typeof appRouter;
export { PrismaClient } from '@prisma/client';
export { createContext } from '@utils/context';
