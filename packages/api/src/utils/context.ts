import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions) {
  return {
    session: await getSession({ req }),
  };
}

export type Context = {
  session: Session;
};
export type Meta = {
  // whether to use authentication
  auth: boolean;
};

export function createRouter() {
  return trpc.router<Context, Meta>();
}
