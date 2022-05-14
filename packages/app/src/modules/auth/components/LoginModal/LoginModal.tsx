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
import LoginForm from './LoginForm';

const LoginModal: React.FC<{
  disclosure: UseDisclosureProps;
}> = ({ disclosure }) => {
  const { isOpen, onClose } = disclosure;

  return (
    <Modal size="md" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader fontWeight="bold" fontSize="3xl">
          Login
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <LoginForm />
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
