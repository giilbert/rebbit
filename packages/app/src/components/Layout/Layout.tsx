import { Container } from '@chakra-ui/react';
import { Navbar } from './Navbar';

export const Layout: React.FC<{
  children: React.ReactElement[] | React.ReactElement;
}> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container mt="12" maxW="800px">
        {children}
      </Container>
    </>
  );
};
