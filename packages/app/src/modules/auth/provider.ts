import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@api';

const prisma = new PrismaClient();

export default CredentialsProvider({
  credentials: {},
  async authorize(credentials) {
    await prisma.$connect();

    const users = await prisma.user.findMany();

    console.log(credentials);

    await prisma.$disconnect();

    return {
      id: 'asdas',
    };
  },
});
