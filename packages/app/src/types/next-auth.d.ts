import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      // `/u/[username]`
      username: string;
      // display name
      name: string;
      id: number;
      email: string;
    };
  }
}
