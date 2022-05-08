import type { NextPage } from 'next';
import { trpc } from '../utils/trpc';

const IndexPage: NextPage = () => {
  const hello = trpc.useQuery(['hello']);

  return (
    <div>
      <h1>hi</h1>
      <p>{hello.data?.greeting}</p>
    </div>
  );
};

export default IndexPage;
