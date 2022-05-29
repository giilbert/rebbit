import { withTRPC } from '@trpc/next';
import { AppType } from 'next/dist/shared/lib/utils';
import { AppRouter } from '@api';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

    return {
      url,
    };
  },
  ssr: true,
})(MyApp);
