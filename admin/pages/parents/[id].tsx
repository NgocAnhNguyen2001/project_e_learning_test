// chakra imports
import {
  Button,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalHeader,
  FormControl,
  Text,
  HStack,
  Box,
  Container,
  Divider,
  Stack,
  useToast,
  Td,
  AspectRatio,
  Th,
  Tr,
  IconButton,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";
import { FiEye } from "react-icons/fi";
import { HiPencil } from "react-icons/hi";

import {
  ParentStatus,
  Role,
  useAdminCountUserLazyQuery,
  useAdminFindManyUsersLazyQuery,
  useAdminFindUniqueUserQuery,
  useAdminLoginAsMutation,
  useAdminUpdateUserMutation,
  useDeleteUserMutation,
  UserWhereInput,
} from "schema/generated/graphql";
import { hostname } from "utils/getFrontendHostname";
import { useResultCallback } from "utils/hooks/useResultCallback";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import { DataTable } from "@/components/DataTable";
import { ChangePassword } from "@/features/ChangePassword";
import { ParentForm } from "@/features/parent/components";
import { schemaEdit } from "@/features/parent/components/FormControl/Schema/Edit";


const Element: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const id = router.query.id as string;
  const changePasswordElement = ChangePassword({
    id,
    role: Role.Parent,
  });
  const [readonly, setReadonly] = React.useState(true);
  // Delete Stuff
  const [displayDelete, setDisplayDelete] = React.useState(false);
  const [confirmText, setConfirmText] = React.useState("");
  const [deleteUser, deletedUser] = useDeleteUserMutation();
  useResultCallback(
    deletedUser,
    (user) => {
      toast({
        title: `Parent ${user.firstName} ${user.lastName} has been deleted`,
        status: "success",
      });
      router.push(`.`);
    },
    (error) => {
      toast({
        title: "Failed to delete Parent",
        description:
          error.graphQLErrors[0].extensions?.exception.meta.cause ??
          error.graphQLErrors[0].message,
        status: "error",
      });
    },
  );

  const remoteUser = useAdminFindUniqueUserQuery({
    variables: {
      where: {
        id,
      },
    },
  });
  const user = remoteUser.data?.adminFindUniqueUser;
  const [tryLoginAs, loginAs] = useAdminLoginAsMutation();
  useResultCallback(
    loginAs,
    (token) => {
      window.open(
        `${hostname}/adult/auth/login?accessToken=${encodeURIComponent(
          token.accessToken,
        )}`,
      );
      toast({
        title: `Logged in as ${user?.firstName} ${user?.lastName}`,
        status: "success",
      });
    },
    (error) => {
      toast({
        title: "Failed to login as User",
        description:
          error.graphQLErrors[0].extensions?.exception.meta.cause ??
          error.graphQLErrors[0].message,
        status: "error",
      });
    },
  );
  const [updateUser, updatedUser] = useAdminUpdateUserMutation();

  useResultCallback(
    updatedUser,
    (user) => {
      remoteUser.refetch();
      setReadonly(true);
      toast({
        title: `Parent ${user.firstName} ${user.lastName} has been updated`,
        status: "success",
      });
    },
    (error) => {
      toast({
        title: "Failed to update Parent",
        description:
          error.graphQLErrors[0].extensions?.exception.meta.cause ??
          error.graphQLErrors[0].message,
        status: "error",
      });
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(schemaEdit),
  });
  React.useEffect(() => {
    if (!user) return;
    reset({
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.parent?.email ?? "",
      verified: user?.parent?.status === ParentStatus.Verified,
    });
  }, [user]);

  const onCloseDelete = (): void => {
    setConfirmText("");
    setDisplayDelete(false);
  };

  // Table stuff
  const [getUsers, users] = useAdminFindManyUsersLazyQuery();
  const [fetchCount, count] = useAdminCountUserLazyQuery();

  if (!user) return <>Loading</>;
  const args = {
    loginAsUser: (): any =>
      tryLoginAs({
        variables: {
          data: {
            role: user!.role,
            userId: user!.id,
            team: user!.team.name,
          },
        },
      }),
    description: `Information about ${user.firstName ?? ""} ${
      user.lastName ?? ""
    }`,
    inputProps: {
      firstName: register("firstName"),
      lastName: register("lastName"),
      email: register("email"),
      verified: register("verified"),
    },
    ...(readonly
      ? {
          title: "User Details",
          readonly,
          buttons: (
            <>
              <Flex direction="row" py="4" px={{ base: "4", md: "6" }}>
                <Button
                  leftIcon={<HiPencil />}
                  type="button"
                  variant="primary"
                  onClick={(): any => setReadonly(false)}
                >
                  Edit
                </Button>
                <Flex justifyContent="right" flexGrow="1">
                  <Button
                    type="button"
                    variant="ghost"
                    textColor="red"
                    onClick={(): any => setDisplayDelete(true)}
                  >
                    Delete
                  </Button>
                </Flex>
              </Flex>
              <Modal isOpen={displayDelete} onClose={onCloseDelete}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Delete User</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>
                        <Text pb={6}>
                          This will permanently delete user{" "}
                          <b>{`${user?.firstName} ${user?.lastName}`}</b> and
                          all associated information related to them
                        </Text>
                        <Text pb={6}>
                          Please type{" "}
                          <b>{`${user?.firstName} ${user?.lastName}`}</b> to
                          confirm
                        </Text>
                        <Text pb={6} textColor="red">
                          This action <b>cannot</b> be undone
                        </Text>
                      </FormLabel>
                      <Input
                        value={confirmText}
                        onChange={(e): any => setConfirmText(e.target.value)}
                      />
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="red"
                      mr={3}
                      disabled={
                        confirmText !== `${user?.firstName} ${user?.lastName}`
                      }
                      onClick={(): any =>
                        deleteUser({
                          variables: { where: { id: user?.id } },
                        })
                      }
                    >
                      Delete
                    </Button>
                    <Button onClick={onCloseDelete}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          ),
        }
      : {
          title: "Edit User Details",
          errors,
          onSubmit: handleSubmit((data: any) => {
            updateUser({
              variables: {
                where: {
                  id: router.query.id as string,
                },
                data: {
                  parent: {
                    update: {
                      email: { set: data.email },
                      status: {
                        set: data.verified
                          ? ParentStatus.Verified
                          : ParentStatus.Unverified,
                      },
                    },
                  },
                  firstName: { set: data.firstName },
                  lastName: { set: data.lastName },
                },
              },
            });
          }),
          buttons: (
            <Flex direction="row" py="4" px={{ base: "4", md: "6" }}>
              <Button
                type="button"
                variant="ghost"
                onClick={(): any => (reset(), setReadonly(true))}
              >
                Cancel
              </Button>
              <HStack justifyContent="right" flexGrow="1" spacing="5">
                <Button
                  type="button"
                  variant="ghost"
                  disabled={!isDirty}
                  onClick={(): any => reset()}
                >
                  Reset
                </Button>
                <Button type="submit" variant="primary" disabled={!isDirty}>
                  Save
                </Button>
              </HStack>
            </Flex>
          ),
        }),
  };
  return (
    <>
      <ParentForm {...args} />
      {changePasswordElement}
      <Box>
        <Container py={{ base: "4", md: "8" }}>
          <HStack>
            <Divider />
            <Text fontSize="lg" fontWeight="medium" flexShrink={0}>
              Child Details
            </Text>
            <Divider />
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
        <Box flexGrow={1}>
          <DataTable
            {...{
              loading: users.loading || count.loading,
              requestPage: ({ searchObj, isPage, page, step }): void => {
                const option: any = {
                  where: {
                    student: {
                      is: {
                        parentId: {
                          equals: router.query.id as string,
                        },
                      },
                    },
                  },
                };
                if (searchObj) option.where.OR = searchObj;
                getUsers({
                  variables: {
                    ...option,
                    take: step,
                    skip: step * (page - 1),
                  },
                });
                if (isPage) return;
                fetchCount({
                  variables: option,
                });
              },
              data: {
                name: "Children",
                searchObj: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  student: {
                    is: {
                      bio: true,
                      email: true,
                      username: true,
                      parent: {
                        is: {
                          email: true,
                          id: true,
                        },
                      },
                    },
                  },
                } as UserWhereInput,
                count: count.data?.adminCountUser,
                header: (
                  <Tr>
                    <Th>Name</Th>
                    <Th>Username</Th>
                    <Th>Joined At</Th>
                    <Th></Th>
                  </Tr>
                ),
                body: users.data?.adminFindManyUsers.map((user) => (
                  <Tr key={user.id}>
                    <Td>
                      <HStack spacing="3">
                        {/* <Checkbox /> */}
                        {/* <IconContext.Provider value={{ color: "white" }}>
                        <Avatar
                          boxSize="10"
                          icon={<FaUserAstronaut />}
                        />
                      </IconContext.Provider> */}
                        <AspectRatio flexGrow={1} flexShrink={0} flexBasis={0}>
                          <Image
                            alt=""
                            src={
                              user.student?.avatarImage?.url ??
                              "/images/default/student.png"
                            }
                            layout="fill"
                            objectFit="cover"
                          />
                        </AspectRatio>
                        <Box flexGrow={2} flexShrink={0} flexBasis={0}>
                          <Text fontWeight="medium">{`${user.firstName} ${user.lastName}`}</Text>
                          {/* <Text color="muted">{"test"}</Text> */}
                        </Box>
                      </HStack>
                    </Td>
                    <Td>
                      <Text color="muted">{user.student?.username}</Text>
                    </Td>
                    <Td>
                      <Text color="muted">
                        {format(new Date(user.createdAt), "dd/MM/yy hh:mm:ss")}
                      </Text>
                    </Td>
                    {/* <Td>
                  <Text color="muted">
                    <Rating defaultValue={5} size="xl" />
                  </Text>
                </Td> */}
                    <Td>
                      <HStack spacing="1">
                        <IconButton
                          icon={<FiEye fontSize="1.25rem" />}
                          variant="ghost"
                          aria-label="View member"
                          onClick={(): any =>
                            router.push(`/students/${user.id}`)
                          }
                        />
                      </HStack>
                    </Td>
                  </Tr>
                )),
              },
            }}
          />
        </Box>
      </Stack>
    </>
  );
};

export default withAuthenticated(withApollo(Element));
