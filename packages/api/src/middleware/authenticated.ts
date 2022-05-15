import { Context } from '@utils/context';
import { TRPCError } from '@trpc/server';
import type { MiddlewareFunction } from '@trpc/server/src/internals/middlewares';

export const authenticated: MiddlewareFunction<Context, unknown, {}> = async ({
  ctx,
  next,
}) => {
  if (!ctx.user)
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });

  return next();
};
