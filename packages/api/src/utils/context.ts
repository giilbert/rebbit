import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  return {
    user: {
      name: 'Name',
      email: 'email@email.com',
    },
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export function createRouter() {
  return trpc.router<Context>();
}
