import { Container } from "@chakra-ui/react";
import Head from "next/head";
import { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface PageMeta {
  title: string;
  description: string;
}

export const Layout: React.FC<{
  children: ReactNode;
  meta?: PageMeta;
  maxW?: string;
}> = ({ children, meta, maxW }) => {
  return (
    <>
      <Head>
        <title>{meta?.title || "Rebbit"}</title>
        <meta
          name="description"
          content={meta?.description || "The homepage of the internet."}
        />
      </Head>

      <Navbar />
      <Container mt="16" maxW={maxW || "800px"}>
        {children}
      </Container>
    </>
  );
};
