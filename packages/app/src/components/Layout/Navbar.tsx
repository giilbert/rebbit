import LoginModal from '@auth/components/LoginModal';
import {
  Button,
  ButtonGroup,
  Flex,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

export const Navbar: React.FC = () => {
  const login = useDisclosure();

  return (
    <>
      {login.isOpen && <LoginModal disclosure={login} />}

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
          <Button
            colorScheme="blue"
            height="min-content"
            px="5"
            py="2"
            onClick={login.onOpen}
          >
            Login
          </Button>
        </ButtonGroup>
      </Flex>
    </>
  );
};
