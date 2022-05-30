import { Box, Heading, Text } from "@chakra-ui/react";
import { Community } from "@prisma/client";

const AboutCommunity: React.FC<{ community: Community }> = ({ community }) => {
  const { description, createdAt } = community;

  return (
    <>
      <Heading size="sm" color="white" backgroundColor="blackAlpha.700" p="4">
        About Community
      </Heading>
      <Box px="4">
        <Text mt="2">{description}</Text>
        <Text mt="2">Founded {createdAt.toLocaleDateString("en-US", {})}</Text>
      </Box>
    </>
  );
};

export default AboutCommunity;
