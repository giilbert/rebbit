import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Navbar } from './Navbar';

export const Layout: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container mt="16" maxW="800px">
        {children}
      </Container>
    </>
  );
};
