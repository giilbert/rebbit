import { usersController } from '@controllers/users';
import { communitiesController } from '@controllers/communities';
import { createRouter } from '@utils/context';
import { authenticated } from '@middleware/authenticated';
import { postsController } from '@controllers/posts';

export const appRouter = createRouter()
  .middleware(authenticated)
  .merge('users.', usersController)
  .merge('posts.', postsController)
  .merge('communities.', communitiesController);

export type AppRouter = typeof appRouter;
export { PrismaClient } from '@prisma/client';
export { createContext } from '@utils/context';
