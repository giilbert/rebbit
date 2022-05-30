import { Box, Heading, HStack, Image, Tab, TabList } from "@chakra-ui/react";
import { Community } from "@prisma/client";

const Banner: React.FC<{ community: Community }> = ({ community }) => {
  return (
    <>
      <Box mb="4" p="4" backgroundColor="blackAlpha.50">
        <HStack>
          <Image
            src={community.iconURL}
            height="16"
            borderRadius="999"
            mr="2"
          />

          <Box>
            <Heading>{community.name}</Heading>
            <Heading size="md" fontWeight="normal" color="gray.700">
              r/{community.slug}
            </Heading>
          </Box>
        </HStack>
      </Box>

      <TabList>
        <Tab>Posts</Tab>

        {/* TODO: add ability to customize tabs */}
      </TabList>
    </>
  );
};

export default Banner;
