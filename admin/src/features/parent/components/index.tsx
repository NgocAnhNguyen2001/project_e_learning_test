import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Container,
  StackDivider,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import * as React from "react";

import { Email } from "./FormControl/Email";
import { FirstName } from "./FormControl/FirstName";
import { LastName } from "./FormControl/LastName";
import { Verified } from "./FormControl/Verified";

import { FieldWrapper } from "@/components/Form/FieldWrapper";

type ParentFormProps = {
  title: string;
  description: string;
  onSubmit?: any;
  showPassword?: boolean;
  errors?: any;
  buttons?: any;
  inputProps?: {
    firstName?: any;
    lastName?: any;
    email?: any;
    password?: any;
    confirmPassword?: any;
    verified?: any;
  };
  readonly?: boolean;
  loginAsUser?: any;
};

export const ParentForm = (props: ParentFormProps): React.ReactElement => {
  const {
    title,
    description,
    onSubmit,
    errors,
    showPassword,
    buttons,
    inputProps,
    readonly,
    loginAsUser,
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
            {loginAsUser ? (
              <>
                <Flex py={{ base: "5", md: "6" }}>
                  <Popover>
                    <PopoverTrigger>
                      <Button>Login As User</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Confirmation</PopoverHeader>
                      <PopoverBody>
                        Are you sure you want to login as this parent?
                        <Flex pt="4">
                          <Button
                            variant="primary"
                            w="full"
                            onClick={loginAsUser}
                          >
                            Confirm
                          </Button>
                        </Flex>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Flex>
              </>
            ) : null}
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
                    readonly,
                    inputProps: inputProps?.firstName,
                    fieldWrapperProps: {
                      error: errors?.firstName,
                    },
                  }}
                />
                <LastName
                  {...{
                    readonly,
                    inputProps: inputProps?.lastName,
                    fieldWrapperProps: {
                      error: errors?.lastName,
                    },
                  }}
                />
              </Stack>
              <Email
                {...{
                  readonly,
                  inputProps: inputProps?.email,
                  fieldWrapperProps: {
                    error: errors?.email,
                  },
                }}
              />
              <Verified
                {...{
                  readonly,
                  inputProps: inputProps?.verified,
                  fieldWrapperProps: {
                    error: errors?.verified,
                  },
                }}
              />
              {showPassword && (
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
              )}
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
