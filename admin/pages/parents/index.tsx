// chakra imports
import {
  Button,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";

import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import { ParentLayout } from '@/layouts/ParentLayout/index';


const Element: NextPage = () => {
  const router = useRouter();
  return (
    <Stack spacing={{ base: "8", lg: "6" }}>
      <Stack
        spacing="4"
        direction={{ base: "column", lg: "row" }}
        justify="space-between"
        align={{ base: "start", lg: "center" }}
      >
        <Stack spacing="1">
          <Heading
            size={useBreakpointValue({ base: "xs", lg: "sm" })}
            fontWeight="medium"
          >
            Parents
          </Heading>
          <Text color="muted">All important metrics at a glance</Text>
        </Stack>
        <HStack spacing="3">
          {/* <Button
            variant="secondary"
            leftIcon={<FiDownloadCloud fontSize="1.25rem" />}
          >
            Download
          </Button> */}
          <Button variant="primary" onClick={(): any => router.push(`${router.pathname}/create`)}>Create</Button>
        </HStack>
      </Stack>
      <ParentLayout></ParentLayout>
    </Stack>
  );
};

export default withAuthenticated(withApollo(Element));
