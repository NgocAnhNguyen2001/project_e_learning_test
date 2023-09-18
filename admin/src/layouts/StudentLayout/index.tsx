import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Td,
  Text,
  Th,
  Tr,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { FiEye, FiLogIn } from "react-icons/fi";

import {
  Role,
  useAdminFindManyUsersLazyQuery,
  UserWhereInput,
  useAdminCountUserLazyQuery,
  useAdminLoginAsMutation,
  AdminFindManyUsersQueryVariables,
  UserOrderByWithRelationAndSearchRelevanceInput,
} from "schema/generated/graphql";
import { hostname } from "utils/getFrontendHostname";
import { useResultCallback } from "utils/hooks/useResultCallback";

import { DataTable } from "@/components/DataTable";
import {
  formatSortOrder,
  useSortOrderManager,
} from "utils/hooks/useSortOrderManager";

export const StudentLayout = (): React.ReactElement => {
  const router = useRouter();
  const toast = useToast();

  const [tryLoginAs, loginAs] = useAdminLoginAsMutation();
  useResultCallback(
    loginAs,
    (token) => {
      window.open(
        `${hostname}/student/auth/login?accessToken=${encodeURIComponent(
          token.accessToken,
        )}`,
      );
      toast({
        title: `Logged in as student`,
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

  const [getUsers, users] = useAdminFindManyUsersLazyQuery();
  const [fetchCount, count] = useAdminCountUserLazyQuery();

  const { list, toggle, getOrderBy } = useSortOrderManager();

  console.log("users =====> ", users.data?.adminFindManyUsers);

  return (
    <>
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
              Students
            </Heading>
            <Text color="muted">All important metrics at a glance</Text>
          </Stack>
          <HStack spacing="3">
            {/* <Button
              variant="secondary"
              leftIcon={<FiDownloadCloud fontSize="1.25rem" />}
            >
              Download
            </Button> */}
            <Button
              variant="primary"
              onClick={(): any => router.push(`${router.pathname}/create`)}
            >
              Create
            </Button>
          </HStack>
        </Stack>
        <Container px="0">
          <DataTable
            {...{
              externalCallRequest: list,
              loading: users.loading || count.loading,
              requestPage: ({ searchObj, isPage, page, step }): any => {
                const option: AdminFindManyUsersQueryVariables = {
                  where: { role: { equals: Role.Student } },
                };
                if (searchObj) option.where = { OR: searchObj };
                if (isPage === true)
                  fetchCount({
                    variables: { ...option },
                  });

                option.orderBy = list
                  .map(([key, order]) => {
                    switch (key) {
                      default:
                        return { [key]: order };
                      case "name":
                        return [
                          {
                            firstName: order,
                          },
                          {
                            lastName: order,
                          },
                        ];
                      case "username":
                        return {
                          student: {
                            username: order,
                          },
                        };
                    }
                  })
                  .reduce((orders, val) => {
                    if (Array.isArray(val)) orders.push(...val);
                    else orders.push(val);
                    return orders;
                  }, [] as UserOrderByWithRelationAndSearchRelevanceInput[]);

                getUsers({
                  variables: {
                    ...option,
                    take: step,
                    skip: step * (page - 1),
                  },
                });
              },
              data: {
                name: "Students",
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
                    {[
                      ["Name", "name"],
                      ["Username", "username"],
                      ["Joined At", "createdAt"],
                      ["Last Login", "lastLogin"],
                      ["", "actions"],
                    ].map(([label, key], index) => (
                      <Th key={index}>
                        {key ? (
                          <button
                            onClick={(): any => toggle(key)}
                            style={{
                              fontWeight: "inherit",
                            }}
                          >
                            <Flex>
                              <Text>{label}</Text>
                              <Flex direction="column" justifyContent="center">
                                {formatSortOrder(getOrderBy(key))}
                              </Flex>
                            </Flex>
                          </button>
                        ) : (
                          <Text>{label}</Text>
                        )}
                      </Th>
                    ))}
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
                    <Td>
                      <Text color="muted">
                        {user.lastLogin
                          ? format(
                              new Date(user.lastLogin),
                              "dd/MM/yy hh:mm:ss",
                            )
                          : "N/A"}
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
                        <Popover>
                          <PopoverTrigger>
                            <IconButton
                              icon={<FiLogIn fontSize="1.25rem" />}
                              variant="ghost"
                              aria-label="View member"
                            />
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Confirmation</PopoverHeader>
                            <PopoverBody>
                              Are you sure you want to login as this student?
                              <Flex pt="4">
                                <Button
                                  variant="primary"
                                  w="full"
                                  onClick={(): any =>
                                    tryLoginAs({
                                      variables: {
                                        data: {
                                          userId: user.id,
                                          role: user.role,
                                          team: user.team.name,
                                        },
                                      },
                                    })
                                  }
                                >
                                  Confirm
                                </Button>
                              </Flex>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </HStack>
                    </Td>
                  </Tr>
                )),
              },
            }}
          />
        </Container>
      </Stack>
    </>
  );
};
