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
import SignUpForm from './SignUpForm';

const SignUpModal: React.FC<{
  disclosure: UseDisclosureProps;
}> = ({ disclosure }) => {
  const { isOpen, onClose } = disclosure;

  return (
    <Modal size="md" isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader fontWeight="bold" fontSize="3xl">
          Sign Up
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <SignUpForm />
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SignUpModal;
