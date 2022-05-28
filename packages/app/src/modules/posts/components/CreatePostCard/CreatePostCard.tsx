import { Box, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const CreatePostCard: React.FC = () => {
  const router = useRouter();

  return (
    <Box>
      <Input
        onClick={() => router.push(`/r/${router.query.slug as string}/submit`)}
        placeholder="Create Post"
      />
    </Box>
  );
};

export default CreatePostCard;
