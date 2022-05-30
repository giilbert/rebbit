import { Box, Center, Heading } from "@chakra-ui/react";
import CreateCommunityForm from "./CreateCommunityForm";

const CreateCommunity: React.FC = () => {
  return (
    <Center>
      <Box mt="8">
        <Heading mb="4">Create a Rebbit Community</Heading>
        <CreateCommunityForm />
      </Box>
    </Center>
  );
};

export default CreateCommunity;
