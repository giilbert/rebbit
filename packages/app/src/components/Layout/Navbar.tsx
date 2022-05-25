import SignInModal from '@auth/components/SignInModal';
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
import { signOut } from 'next-auth/react';

export const Navbar: React.FC = () => {
  const signIn = useDisclosure();
  const signUp = useDisclosure();
  const { data: session, status } = useSession();

  return (
    <>
      {signIn.isOpen && <SignInModal disclosure={signIn} />}
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

        <ButtonGroup alignItems="center">
          {status !== 'loading' &&
            (session === null ? (
              <>
                <Button
                  colorScheme="blue"
                  height="min-content"
                  px="6"
                  py="2"
                  onClick={signIn.onOpen}
                >
                  Sign In
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
              <>
                <Text>
                  Signed in as <b>{session?.user.name}</b>
                </Text>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  height="min-content"
                  px="6"
                  py="2"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </>
            ))}
        </ButtonGroup>
      </Flex>
    </>
  );
};
