import * as trpc from '@trpc/server';
import { createRouter } from '@utils/context';
import * as z from 'zod';

export const usersController = createRouter().mutation('createUser', {
  input: z.object({
    username: z
      .string()
      .max(20, 'Username must be less than 20 characters long.'),
    password: z
      .string()
      .min(8, 'Password must be greater than 8 characters long'),
  }),
  resolve: ({ input }) => {
    console.log(input);
  },
});
