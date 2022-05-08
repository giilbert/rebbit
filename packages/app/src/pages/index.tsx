import type { NextPage } from 'next';
import { trpc } from '../utils/trpc';

const IndexPage: NextPage = () => {
  const hello = trpc.useQuery(['hello']);

  return (
    <div>
      <p>Adasd</p>
    </div>
  );
};

export default IndexPage;
