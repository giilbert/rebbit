import { usersController } from '@controllers/users';
import { communitiesController } from '@controllers/communities';
import { createRouter } from '@utils/context';
import { authenticated } from '@middleware/authenticated';

export const appRouter = createRouter()
  .middleware(authenticated)
  .merge('users.', usersController)
  .merge('communities.', communitiesController);

export type AppRouter = typeof appRouter;
export { PrismaClient } from '@prisma/client';
export { createContext } from '@utils/context';
