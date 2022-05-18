import { createRouter } from '@utils/context';
import { z } from 'zod';

const usersController = createRouter().mutation('create', {
  input: z
    .object({
      name: z.string().max(50, 'Name must be less than 50 characters long.'),
      username: z
        .string()
        .max(20, 'Username must be less than 20 characters long.'),
      email: z
        .string()
        .email()
        .max(50, 'Email must be less than 50 characters long.'),
      password: z
        .string()
        .min(8, 'Password must be greater than 8 characters long'),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }),

  async resolve(req) {
    console.log(req);

    return {
      test: 2,
    };
  },
});

export { usersController };
