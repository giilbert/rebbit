import NextAuth from 'next-auth';
import CredentialsProvider from '@auth/provider';

export default NextAuth({
  providers: [CredentialsProvider],
});
