import {
  Box,
  DarkMode,
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import * as React from "react";

import DashboardImage from 'public/images/dashboard/dashboard-dark.png';

export const LoginCover = (): React.ReactElement => (
  <Box flex="1" display={{ base: "none", md: "block" }}>
    <Box
      position={"absolute"}
      left={0}
      width={"50vw"}
      height={"100vh"}
    >
      <Box
        position={"absolute"}
        left={0}
        zIndex={1}
        width={"50vw"}
        height={"100vh"}
        background={"#000"}
        opacity={.5}
      />
      <Image
        layout={"fill"}
        src={DashboardImage}
        objectFit={"cover"}
        alt="Login Image"
      />
    </Box>
    <DarkMode>
      <Flex
        direction="column"
        px={{ base: "4", md: "8" }}
        height="full"
        color="on-accent"
      >
        <Flex flex="1" align="center" zIndex={1}>
          <Stack spacing="8">
            <Stack spacing="6">
              <Heading size={useBreakpointValue({ md: "lg", xl: "xl" })}>
                Novalearn Admin Panel
              </Heading>
              <Text fontSize="lg" maxW="md" fontWeight="medium">
                A place for you to manage all the users
                {/* Create an account and discover the worlds{`'`} best UI component
                framework. */}
              </Text>
            </Stack>
            {/* <HStack spacing="4">
              <AvatarGroup
                size="md"
                max={useBreakpointValue({ base: 2, lg: 5 })}
                borderColor="on-accent"
              >
                <Avatar
                  name="Ryan Florence"
                  src="https://bit.ly/ryan-florence"
                />
                <Avatar
                  name="Segun Adebayo"
                  src="https://bit.ly/sage-adebayo"
                />
                <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
                <Avatar
                  name="Prosper Otemuyiwa"
                  src="https://bit.ly/prosper-baba"
                />
                <Avatar
                  name="Christian Nwamba"
                  src="https://bit.ly/code-beast"
                />
              </AvatarGroup>
              <Text fontWeight="medium">Join 10.000+ users</Text>
            </HStack> */}
          </Stack>
        </Flex>
        {/* <Flex align="center" h="24" zIndex={1}>
          <Text color="on-accent-subtle" fontSize="sm">
            © 2022 Chakra UI. All rights reserved.
          </Text>
        </Flex> */}
      </Flex>
    </DarkMode>
  </Box>
);
