import {
  Button,
  Flex,
  Text,
  HStack,
  Box,
  Container,
  Divider,
  useColorModeValue,
  Stack,
  useToast,
  FormLabel,
  Input,
  FormControl,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useAdminUpdateUserMutation } from "schema/generated/graphql";
import { useResultCallback } from "utils/hooks/useResultCallback";

import { FieldWrapper } from "@/components/Form/FieldWrapper";

const patternSchema = z
  .object({
    loginPattern: z
      .string()
      .length(4)
      .regex(/^[0-9]*$/),
    confirmPassword: z
      .string()
      .length(4)
      .regex(/^[0-9]*$/),
  })
  .refine((data) => data.loginPattern === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

interface ElementProps {
  id: string;
}

export const ChangePattern = (props: ElementProps): React.ReactElement => {
  const toast = useToast();
  const [showForm, setShowForm] = React.useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(patternSchema),
  });
  const resetAll = (): void => {
    reset();
    setShowForm(false);
  };
  const [updateUser, updatedUser] = useAdminUpdateUserMutation();
  useResultCallback(
    updatedUser,
    (user) => {
      toast({
        title: `User Pattern ${user.firstName} ${user.lastName} has been updated`,
        status: "success",
      });
      resetAll();
    },
    (error) => {
      console.log(error);
      toast({
        title: "Failed to update Pattern",
        description:
          error.graphQLErrors[0]?.extensions?.exception.meta.cause ??
          error.graphQLErrors[0]?.message ??
          error.message,
        status: "error",
      });
    },
  );
  const { id } = props;
  return (
    <>
      <Box>
        <Container py={{ base: "4", md: "8" }}>
          <HStack>
            <Divider />
            {/* <Text fontSize="lg" fontWeight="medium">
              Children
            </Text>
            <Divider /> */}
          </HStack>
        </Container>
      </Box>
      <Stack
        direction={{ base: "column", lg: "row" }}
        spacing={{ base: "5", lg: "8" }}
        px={{ base: "4", md: "6" }}
        py={{ base: "5", md: "6" }}
        justify="space-between"
      >
        <Box flexGrow={2}>
          <Text fontSize="lg" fontWeight="medium">
            User Password
          </Text>
        </Box>
        <Box
          flexGrow={1}
          as="form"
          bg="bg-surface"
          boxShadow={useColorModeValue("sm", "sm-dark")}
          borderRadius="lg"
          onSubmit={handleSubmit((data) => {
            updateUser({
              variables: {
                where: { id },
                data: {
                  student: {
                    update: {
                      loginPattern: { set: data.loginPattern },
                    },
                  },
                },
              },
            }).catch((err) => err);
          })}
        >
          <Stack
            spacing="5"
            px={{ base: "4", md: "6" }}
            py={{ base: "5", md: "6" }}
          >
            {showForm ? (
              <>
                <FormControl id="loginPattern">
                  <FieldWrapper error={errors.loginPattern}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" {...register("loginPattern")} />
                  </FieldWrapper>
                </FormControl>
                <FormControl id="confirmPassword">
                  <FieldWrapper error={errors.confirmPassword}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type="password" {...register("confirmPassword")} />
                  </FieldWrapper>
                </FormControl>
                <Flex direction="row">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={(): any => resetAll()}
                  >
                    Cancel
                  </Button>
                  <HStack justifyContent="right" flexGrow="1" spacing="5">
                    <Button
                      type="button"
                      variant="ghost"
                      disabled={!isDirty}
                      onClick={(): any => (
                        reset(), setValue("patternLock", [])
                      )}
                    >
                      Reset
                    </Button>
                    <Button type="submit" variant="primary" disabled={!isDirty}>
                      Save
                    </Button>
                  </HStack>
                </Flex>
              </>
            ) : (
              <Button type="button" onClick={(): any => setShowForm(true)}>
                Change Password
              </Button>
            )}
          </Stack>
        </Box>
      </Stack>
    </>
  );
};
