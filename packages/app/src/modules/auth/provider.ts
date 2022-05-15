import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@api';
import { hash, verify } from 'argon2';

const prisma = new PrismaClient();

export default CredentialsProvider({
  credentials: {},
  async authorize(credentials: { email?: string; password?: string }) {
    await prisma.$connect();

    const user = await prisma.user.findUnique({
      where: {
        email: credentials.email,
      },
    });

    await prisma.$disconnect();

    if (!user) return null;

    if (!(await verify(user.password, credentials.password))) {
      return null;
    }

    return user;
  },
});
