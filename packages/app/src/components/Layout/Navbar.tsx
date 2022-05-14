import { Button, ButtonGroup, Flex, Spacer, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <Flex
      width="100vw"
      backgroundColor="blackAlpha.200"
      position="fixed"
      left="0"
      top="0"
      alignItems="center"
      px="4"
      py="1"
    >
      <Text>rebbit</Text>

      <Spacer />

      <ButtonGroup>
        <NextLink href="/login">
          <Button colorScheme="blue" height="min-content" px="5" py="2">
            Login
          </Button>
        </NextLink>
      </ButtonGroup>
    </Flex>
  );
};
