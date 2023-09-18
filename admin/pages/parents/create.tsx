// chakra imports
import { Button, Flex , useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";

import {
  Role,
  useSignupMutation,
} from "schema/generated/graphql";
import { useResultCallback } from "utils/hooks/useResultCallback";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import { SignupForm } from "@/features/Signup/Form";
import { schemaSignup } from "@/features/Signup/Schema";


const Element: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const [signup, signedup] = useSignupMutation();
  useResultCallback(signedup, user => {
    toast({
      title: `Parent ${user.user.firstName} ${user.user.lastName} has been created`,
      status: 'success',
    });
    router.push(`./${user.user.id}`);
  }, error => {
    toast({
      title: 'Failed to create Parent',
      description: error.graphQLErrors[0]?.extensions?.exception?.meta?.cause ?? error.graphQLErrors[0]?.message ?? error.message,
      status: 'error',
    });
  });
  
  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm({
    resolver: zodResolver(schemaSignup),
  });
  const handleSubmitRequest = async (data: any): Promise<void> => {
    signup({
      variables: {
        data: {
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          role: Role.Parent,
        }
      }
    }).catch(err => err);
  }
  
  return (
    <SignupForm {...{
      title: 'Create',
      description: 'Information about this user',
      inputProps: {
        firstName: register('firstName'),
        lastName: register('lastName'),
        email: register('email'),
        password: register('password'),
        confirmPassword: register('confirmPassword'),
      },
      errors,
      onSubmit: handleSubmit(handleSubmitRequest),
      buttons: (
        <Flex direction="row" py="4" px={{ base: '4', md: '6' }} justifyContent="right">
          <Button type="submit" variant="primary">
            Create
          </Button>
        </Flex>
      ),
    }}/>
  );
};

export default withAuthenticated(withApollo(Element));
