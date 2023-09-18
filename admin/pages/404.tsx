import { Heading, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ErrorPage: NextPage = () => {
  const [countDown, setCountDown] = useState(5);
  const router = useRouter();

  useEffect((): void => {
    if(countDown <= 0) router.push('/')
    setTimeout(() => setCountDown(countDown - 1), 1000);
  }, [countDown]);
  
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
            404
          </Heading>
          <Text color="muted">Your requested page was not found</Text>
          <Text color="muted">
            Redirecting you to our home page in {`${countDown}s...`}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ErrorPage;
