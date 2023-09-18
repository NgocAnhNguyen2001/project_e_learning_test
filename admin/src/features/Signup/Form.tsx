import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Container,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import * as React from "react";

import { Email } from "../parent/components/FormControl/Email";
import { FirstName } from "../parent/components/FormControl/FirstName";
import { LastName } from "../parent/components/FormControl/LastName";

import { FieldWrapper } from "@/components/Form/FieldWrapper";

type ComponentProps = {
  title: string;
  description: string;
  onSubmit?: any;
  errors?: any;
  buttons?: any;
  inputProps?: {
    firstName?: any;
    lastName?: any;
    email?: any;
    password?: any;
    confirmPassword?: any;
  };
};

export const SignupForm = (props: ComponentProps): React.ReactElement => {
  const {
    title,
    description,
    onSubmit,
    errors,
    buttons,
    inputProps,
  } = props;
  return (
    <Container py={{ base: "4", md: "8" }}>
      <Stack spacing="5" divider={<StackDivider />}>
        <Stack
          direction={{ base: "column", lg: "row" }}
          spacing={{ base: "5", lg: "8" }}
          justify="space-between"
        >
          <Box flexShrink={0}>
            <Text fontSize="lg" fontWeight="medium">
              {title}
            </Text>
            <Text color="muted" fontSize="sm">
              {description}
            </Text>
          </Box>
          <Box
            as="form"
            bg="bg-surface"
            boxShadow={useColorModeValue("sm", "sm-dark")}
            borderRadius="lg"
            onSubmit={onSubmit}
          >
            <Stack
              spacing="5"
              px={{ base: "4", md: "6" }}
              py={{ base: "5", md: "6" }}
            >
              <Stack spacing="6" direction={{ base: "column", md: "row" }}>
                <FirstName
                  {...{
                    inputProps: inputProps?.firstName,
                    fieldWrapperProps: {
                      error: errors?.firstName,
                    },
                  }}
                />
                <LastName
                  {...{
                    inputProps: inputProps?.lastName,
                    fieldWrapperProps: {
                      error: errors?.lastName,
                    },
                  }}
                />
              </Stack>
              <Email
                {...{
                  inputProps: inputProps?.email,
                  fieldWrapperProps: {
                    error: errors?.email,
                  },
                }}
              />
              <Stack spacing="6" direction={{ base: "column", md: "row" }}>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <FieldWrapper error={errors.password}>
                    <Input type="password" {...inputProps?.password} />
                  </FieldWrapper>
                </FormControl>
                <FormControl id="confirmPassword">
                  <FormLabel>Confirm Password</FormLabel>
                  <FieldWrapper error={errors.confirmPassword}>
                    <Input type="password" {...inputProps?.confirmPassword} />
                  </FieldWrapper>
                </FormControl>
              </Stack>
            </Stack>
            {buttons && (
              <>
                <Divider />
                {buttons}
              </>
            )}
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};
