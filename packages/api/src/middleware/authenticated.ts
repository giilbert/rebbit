import { Context, Meta } from "@utils/context";
import { TRPCError } from "@trpc/server";
import { MiddlewareFunction } from "@trpc/server/dist/declarations/src/internals/middlewares";

export const authenticated: MiddlewareFunction<
  Context,
  Context,
  Meta
> = async ({ ctx, next, meta }) => {
  if (!ctx.session && meta?.auth) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  return next({
    ctx,
  });
};
