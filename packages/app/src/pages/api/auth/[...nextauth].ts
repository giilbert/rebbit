import NextAuth from 'next-auth';
import CredentialsProvider from '@auth/provider';

export default NextAuth({
  providers: [CredentialsProvider],
  callbacks: {
    async jwt({ token, user, profile, account, isNewUser }) {
      // user has data when logging in
      // dont add data to jwt if not signing it (user will be undefined)
      if (user) {
        token.username = user?.username;
        token.name = user?.name;
        token.email = user?.email;
        token.id = token.sub;
      }

      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.username = token.username;
      }

      return Promise.resolve(session);
    },
  },
});
