// chakra imports
import { Button, Flex, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";

import {
  Role,
  useAdminAddChildMutation,
  useAdminFindManyUsersLazyQuery,
} from "schema/generated/graphql";
import { useResultCallback } from "utils/hooks/useResultCallback";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import { schemaCreate } from "@/features/student/components/FormControl/Schema/Create";
import { StudentForm } from "@/features/student/components/StudentForm";

const Element: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const [addChild, addedChild] = useAdminAddChildMutation();
  useResultCallback(
    addedChild,
    (user) => {
      toast({
        title: `Student ${user.user.firstName} ${user.user.lastName} has been created`,
        status: "success",
      });
      router.push(`./${user.id}`);
    },
    (error) => {
      toast({
        title: "Failed to create Student",
        description:
          error.graphQLErrors[0].extensions?.exception?.meta?.cause ??
          error.graphQLErrors[0]?.message ??
          error.message,
        status: "error",
      });
    },
  );
  const handleSubmitRequest = async (data: any): Promise<void> => {
    addChild({
      variables: {
        parentEmail: data.parentEmail || null,
        data: {
          username: data.username,
          bio: data.bio,
          loginPattern: data.loginPattern,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email || null,
        },
      },
    }).catch((err) => err);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    control,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(schemaCreate),
  });
  const [findManyUsers, parents] = useAdminFindManyUsersLazyQuery();
  React.useEffect(() => {
    const partialEmail = getValues("parentEmail");
    if (!partialEmail) return;
    findManyUsers({
      variables: {
        where: {
          role: { equals: Role.Parent },
          parent: {
            is: {
              email: {
                contains: partialEmail,
              },
            },
          },
        },
        take: 5,
      },
    });
  }, [watch("parentEmail")]);

  return (
    <StudentForm
      {...{
        showPassword: true,
        title: "Create",
        description: "Information about this user",
        inputProps: {
          firstName: register("firstName"),
          lastName: register("lastName"),
          email: register("email"),
          bio: register("bio"),
          parentEmail: register("parentEmail"),
          username: register("username"),
          loginPattern: register("loginPattern"),
          confirmPassword: register("confirmPassword"),
        },
        errors,
        onSubmit: handleSubmit(handleSubmitRequest),
        buttons: (
          <Flex
            direction="row"
            py="4"
            px={{ base: "4", md: "6" }}
            justifyContent="space-between"
          >
            <Button
              type="button"
              variant="ghost"
              onClick={(): any => (
                reset({ loginPattern: "" }), setValue("patternLock", [])
              )}
            >
              Reset
            </Button>
            <Button type="submit" variant="primary">
              Create
            </Button>
          </Flex>
        ),
        parentAutoComplete: parents.data?.adminFindManyUsers.map((user) => {
          return user.parent?.email as string;
        }),
        control,
        setValue,
      }}
    />
  );
};

export default withAuthenticated(withApollo(Element));
