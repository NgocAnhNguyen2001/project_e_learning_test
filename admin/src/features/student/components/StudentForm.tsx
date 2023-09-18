import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Container,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverTrigger,
  PopoverHeader,
  PopoverContent,
  StackDivider,
  Text,
  FormControl,
} from "@chakra-ui/react";
import * as React from "react";

import { Bio } from "./FormControl/Component/Bio";
import { Email } from "./FormControl/Component/Email";
import { FirstName } from "./FormControl/Component/FirstName";
import { LastName } from "./FormControl/Component/LastName";
import { Username } from "./FormControl/Component/Username";

import { FieldWrapper } from "@/components/Form/FieldWrapper";

type StudentFormProps = {
  title: string;
  description: string;
  onSubmit?: any;
  showPassword?: boolean;
  errors?: any;
  buttons?: any;
  inputProps?: {
    firstName?: any;
    lastName?: any;
    username?: any;
    email?: any;
    parentEmail?: any;
    bio?: any;
    loginPattern?: any;
    confirmPassword?: any;
  };
  readonly?: boolean;
  parentAutoComplete?: string[];
  loginAsUser?: any;
  control?: any;
  setValue?: any;
};

export const StudentForm = (props: StudentFormProps): React.ReactElement => {
  const {
    title,
    description,
    onSubmit,
    errors,
    showPassword,
    buttons,
    inputProps,
    readonly,
    parentAutoComplete,
    loginAsUser,
    setValue,
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
                        Are you sure you want to login as this teacher?
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
              <Username
                {...{
                  readonly,
                  inputProps: inputProps?.username,
                  fieldWrapperProps: {
                    error: errors?.username,
                  },
                }}
              />
              <Email
                {...{
                  readonly,
                  inputProps: inputProps?.email,
                  fieldWrapperProps: {
                    error: errors?.email,
                  },
                }}
              />
              <FieldWrapper error={errors?.parentEmail}>
                <FormLabel>Parent Email</FormLabel>
                <Input
                  {...{
                    borderColor: readonly && "transparent",
                    readOnly: readonly,
                  }}
                  {...inputProps?.parentEmail}
                  type="text"
                  list="parentEmails"
                />
                <datalist id="parentEmails">
                  {parentAutoComplete?.map((email: string) => (
                    <option key={email}>{email}</option>
                  ))}
                </datalist>
              </FieldWrapper>
              <Bio
                {...{
                  readonly,
                  inputProps: inputProps?.bio,
                  fieldWrapperProps: {
                    error: errors?.bio,
                  },
                }}
              />
              {showPassword && (
                <>
                  <Stack spacing="6" direction={{ base: "column", md: "row" }}>
                    <FormControl>
                      <FormLabel>Password</FormLabel>
                      <FieldWrapper
                        error={errors.loginPattern}
                        parentProps={{ style: { flexDirection: "column" } }}
                      >
                        <Input
                          {...{
                            borderColor: readonly && "transparent",
                            readOnly: readonly,
                          }}
                          {...inputProps?.loginPattern}
                          fieldName="loginPattern"
                          setValue={setValue}
                          type="password"
                        />
                      </FieldWrapper>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Confirm Password</FormLabel>
                      <FieldWrapper
                        error={errors.confirmPassword}
                        parentProps={{ style: { flexDirection: "column" } }}
                      >
                        <Input
                          {...{
                            borderColor: readonly && "transparent",
                            readOnly: readonly,
                          }}
                          {...inputProps?.confirmPassword}
                          fieldName="confirmPassword"
                          setValue={setValue}
                          type="password"
                        />
                      </FieldWrapper>
                    </FormControl>
                  </Stack>
                </>
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
