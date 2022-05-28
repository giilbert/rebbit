import { createRouter } from '@utils/context';
import { prisma } from '@utils/prisma';
import { z } from 'zod';
import { hash } from 'argon2';
import { TRPCError } from '@trpc/server';

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
      confirmPassword: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }),

  async resolve({ input }) {
    // check if user with same username or email already exists
    const user = await prisma.user.findFirst({
      where: {
        email: input.email,
        profile: {
          username: input.username,
        },
      },
    });

    if (user)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'User with same Email or username already exists.',
      });

    const hashedPassword = await hash(input.password);

    delete input.confirmPassword;

    await prisma.user.create({
      data: {
        email: input.email,
        profile: {
          create: {
            name: input.name,
            username: input.username,
          },
        },
        password: hashedPassword,
      },
    });
  },
});

export { usersController };
