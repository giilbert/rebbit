import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UseDisclosureProps,
} from '@chakra-ui/react';
import SignInForm from './SignInForm';

const SignInModal: React.FC<{
  disclosure: UseDisclosureProps;
}> = ({ disclosure }) => {
  const { isOpen, onClose } = disclosure;

  return (
    <Modal size="md" isOpen={isOpen!} onClose={onClose!}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader fontWeight="bold" fontSize="3xl">
          Sign In
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <SignInForm />
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SignInModal;
