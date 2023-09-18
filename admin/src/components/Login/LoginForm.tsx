import {
  Button,
  Checkbox,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  StackProps,
  useBreakpointValue,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Role,
  useLoginMutation,
  useMeLazyQuery,
} from "schema/generated/graphql";
import { useStore } from "utils/hooks/zustand";

import { LogoIcon } from "@/components/General/Logo";


type LoginInputs = {
  email: string;
  password: string;
};

type ExtraProps = {
  loginLabels: any;
  validation: any;
};

type Props = ExtraProps & StackProps;

export const LoginForm = (props: Props): React.ReactElement => {
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const { loginLabels, validation } = props as ExtraProps;
  const stackProps: StackProps = {
    px: props.px,
    py: props.py,
    width: props.width,
    maxW: props.maxW,
  };

  const [loginError, setLoginError] = useState<string>("");

  const loginSchema = z
    .object({
      email: z
        .string()
        .nonempty(validation.email_required)
        .email(`${validation.invalid_email}`),
      password: z.string().nonempty(validation.pass1_required),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });


  const setLogin = useStore((state) => state.login);
  const setUser = useStore((state) => state.setMe);
  const user = useStore((state) => state.user);
  useEffect(() => {
    if(!user) return;
    router.push('/');
  }, [user]);
  const [getMe, meResponse] = useMeLazyQuery();
  const [login, loggedIn] = useLoginMutation();
  React.useEffect((): void => {
    if(!loggedIn.data) return;
    setLogin(loggedIn.data.login);
    getMe();
  }, [loggedIn.data?.login]);
  const onSubmit = async ({ email, password }: any): Promise<void> => {
    await login({
      variables: {
        data: {
          email,
          password,
          role: Role.Admin,
        },
      },
    }).catch(err => setLoginError(err.message));
  };

  useEffect((): void => {
    if (!meResponse.data) return;
    setUser(meResponse.data.me);
  }, [setUser, meResponse, router]);

  return (
    <Stack spacing="8" {...stackProps}>
      <Stack spacing="6">
        {isMobile && <LogoIcon />}
        <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
          <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
            Log in to your account
          </Heading>
        </Stack>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">{loginLabels.email}</FormLabel>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                {...register("email")}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">{loginLabels.password}</FormLabel>
              <Input
                id="password"
                placeholder="********"
                type="password"
                {...register("password")}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          <HStack justify="space-between">
            <Checkbox defaultIsChecked>Remember me</Checkbox>
            <Button variant="link" colorScheme="blue" size="sm">
              Forgot password
            </Button>
          </HStack>
          <Stack spacing="4">
            <Button variant="primary" type="submit" isLoading={isSubmitting}>
              Sign in
            </Button>

            {loginError && (
              <FormControl isInvalid>
                <FormErrorMessage>
                  <FormErrorIcon />
                  {loginError}
                </FormErrorMessage>
              </FormControl>
            )}
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};
