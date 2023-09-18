import { Heading, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import type { NextPage } from "next";
import * as React from "react";

import withAuthenticated from "utils/hooks/withAuthenticated";

const Home: NextPage = () => {
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
            Home
          </Heading>
          <Text color="muted">All important metrics at a glance</Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default withAuthenticated(Home);
