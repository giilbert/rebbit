import LoginModal from '@auth/components/LoginModal';
import {
  Button,
  ButtonGroup,
  Flex,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import SignUpModal from '@auth/components/SignUpModal';

export const Navbar: React.FC = () => {
  const login = useDisclosure();
  const signUp = useDisclosure();
  const { data: session, status } = useSession();

  return (
    <>
      {login.isOpen && <LoginModal disclosure={login} />}
      {signUp.isOpen && <SignUpModal disclosure={signUp} />}

      <Flex
        width="100vw"
        height="2.75rem"
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
          {status !== 'loading' &&
            (session === null ? (
              <>
                <Button
                  colorScheme="blue"
                  height="min-content"
                  px="6"
                  py="2"
                  onClick={login.onOpen}
                >
                  Login
                </Button>

                <Button
                  colorScheme="blue"
                  variant="outline"
                  height="min-content"
                  px="6"
                  py="2"
                  onClick={signUp.onOpen}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <Text>Logged in as {JSON.stringify(session?.user)}</Text>
            ))}
        </ButtonGroup>
      </Flex>
    </>
  );
};
