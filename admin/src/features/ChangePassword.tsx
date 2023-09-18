
import {
  Button,
  Flex,
  FormLabel,
  Input,
  FormControl,
  Text,
  HStack,
  Box,
  Container,
  Divider,
  useColorModeValue,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Role,
  useAdminChangePasswordMutation,
} from "schema/generated/graphql";
import { useResultCallback } from "utils/hooks/useResultCallback";

import { FieldWrapper } from '@/components/Form/FieldWrapper';

const passwordSchema = z.object({
  password: z.string().min(8).max(32),
  confirmPassword: z.string().min(8).max(32),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});

interface ElementProps {
  id: string;
  role: Role;
}

export const ChangePassword = (props: ElementProps): React.ReactElement => {
  const toast = useToast();
  const [showForm, setShowForm] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isDirty,
    },
    reset,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });
  const resetAll = (): void => {
    reset();
    setShowForm(false);
  }
  const [changePassword, changedPassword] = useAdminChangePasswordMutation();
  useResultCallback(changedPassword, (user) => {
    toast({
      title: `User Password ${user.firstName} ${user.lastName} has been updated`,
      status: 'success',
    });
    resetAll();
  }, error => {
    toast({
      title: 'Failed to update Password',
      description: error.graphQLErrors[0]?.extensions?.exception.meta.cause ?? error.graphQLErrors[0].message,
      status: 'error',
    });
  });
  const {
    id,
    role,
  } = props;
  return (
    <>
      <Box>
        <Container py={{ base: '4', md: '8' }}>
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
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: '5', lg: '8' }}
        px={{ base: '4', md: '6' }}
        py={{ base: '5', md: '6' }}
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
          boxShadow={useColorModeValue('sm', 'sm-dark')}
          borderRadius="lg"
          onSubmit={handleSubmit(data => {
            changePassword({
              variables: {
                data: {
                  id,
                  password: data.password,
                  role,
                },
              },
            }).catch(err => err);
          })}
        >
          <Stack spacing="5" px={{ base: '4', md: '6' }} py={{ base: '5', md: '6' }}>
            {showForm ? <>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <FieldWrapper error={errors.password}>
                  <Input type="password" {...register('password')}/>
                </FieldWrapper>
              </FormControl>
              <FormControl id="confirmPassword">
                <FormLabel>Confirm Password</FormLabel>
                <FieldWrapper error={errors.confirmPassword}>
                  <Input type="password" {...register('confirmPassword')}/>
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
                  <Button type="button" variant="ghost" disabled={!isDirty} onClick={(): any => reset()}>
                    Reset
                  </Button>
                  <Button type="submit" variant="primary" disabled={!isDirty}>
                    Save
                  </Button>
                </HStack>
              </Flex>
            </> : <Button type="button" onClick={():any => setShowForm(true)}>Change Password</Button>}
          </Stack>
        </Box>
      </Stack>
    </>
  );
};
