import { Container, Flex, useBreakpointValue } from "@chakra-ui/react";
import * as React from "react";

import { Navbar } from "@/chakra/PageShells/ShellWithSidebar/Navbar";
import { Sidebar } from "@/chakra/PageShells/ShellWithSidebar/Sidebar";
import { Footer } from "@/components/Footer/Footer";

interface AdminLayoutProps {
  path: string;
  children: React.ReactElement;
}

export const AdminLayout = (props: AdminLayoutProps): React.ReactElement => {
  const { path, children } = props;
  const showFooter = !["/", "/404"].includes(path);
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Flex
      as="section"
      direction={{ base: "column", lg: "row" }}
      height="100vh"
      bg="bg-canvas"
      overflowY="auto"
    >
      {isDesktop ? <Sidebar path={path} /> : <Navbar />}

      <Container
        w={{ base: "100%", lg: "50%" }}
        py="8"
        flex="1"
        display="flex"
        flexDir="column"
      >
        {children}
        {showFooter && <Footer />}
      </Container>
    </Flex>
  );
};
