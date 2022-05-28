import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@api';
import { verify } from 'argon2';

const prisma = new PrismaClient();

export default CredentialsProvider({
  credentials: {},
  async authorize(credentials?: { email?: string; password?: string }) {
    if (!credentials || !credentials?.password) return null;

    await prisma.$connect();

    const user = await prisma.user.findUnique({
      where: {
        email: credentials?.email,
      },
      include: {
        profile: true,
      },
    });

    await prisma.$disconnect();

    if (!user) return null;

    if (!(await verify(user.password, credentials.password))) {
      return null;
    }

    return {
      ...user,
      ...user.profile,
    };
  },
});
