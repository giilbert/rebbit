import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter, createContext } from '@api';

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
