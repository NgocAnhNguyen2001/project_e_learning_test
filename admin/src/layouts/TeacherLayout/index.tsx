import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  Stack,
  PopoverTrigger,
  PopoverHeader,
  Td,
  Text,
  Th,
  Tr,
  useBreakpointValue,
  useToast,
  Flex,
  ResponsiveValue,
} from "@chakra-ui/react";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { FaUserGraduate } from "react-icons/fa";
import { FiEye, FiLogIn } from "react-icons/fi";
import { IconContext } from "react-icons/lib";

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
import {
  formatSortOrder,
  useSortOrderManager,
} from "utils/hooks/useSortOrderManager";
import { DataTable } from "@/components/DataTable";

export const TeacherLayout = (): React.ReactElement => {
  const router = useRouter();
  const toast = useToast();

  const [getUsers, users] = useAdminFindManyUsersLazyQuery();
  const [fetchCount, count] = useAdminCountUserLazyQuery();

  const [tryLoginAs, loginAs] = useAdminLoginAsMutation();

  useResultCallback(
    loginAs,
    (token) => {
      window.open(
        `${hostname}/navigator/auth/login?accessToken=${encodeURIComponent(
          token.accessToken,
        )}`,
      );
      toast({
        title: `Logged in as user`,
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

  const { list, toggle, getOrderBy } = useSortOrderManager();

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
              Teachers
            </Heading>
            <Text color="muted">All important metrics at a glance</Text>
          </Stack>
          <HStack spacing="3">
            <Button
              variant="primary"
              onClick={(): void =>
                void router.push(`${router.pathname}/create`)
              }
            >
              Create
            </Button>
          </HStack>
        </Stack>
        <Container px="0">
          <DataTable
            loading={users.loading || count.loading}
            externalCallRequest={list}
            requestPage={({ searchObj, isPage, page, step }: any): any => {
              const option: AdminFindManyUsersQueryVariables = {
                where: { role: { equals: Role.Teacher } },
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
                    case "email":
                      return {
                        teacher: {
                          email: order,
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
            }}
            data={{
              name: "Teachers",
              searchObj: {
                id: true,
                firstName: true,
                lastName: true,
                teacher: {
                  is: {
                    email: true,
                    phoneNumber: true,
                    introduction: true,
                    jobTitle: true,
                  },
                },
              } as UserWhereInput,
              count: count.data?.adminCountUser,
              header: (
                <Tr>
                  {[
                    ["Name", "name"],
                    ["Email", "email"],
                    ["Joined At", "createdAt"],
                    ["Last Logged In", "lastLogin"],
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
                      <IconContext.Provider value={{ color: "white" }}>
                        <Box overflow={"hidden"} borderRadius={"full"}>
                          <Avatar
                            boxSize="10"
                            icon={<FaUserGraduate />}
                            bg={user.teacher?.photo?.url && "bg-surface"}
                          >
                            {user.teacher?.photo?.url && (
                              <Image
                                alt=""
                                src={user.teacher?.photo?.url}
                                layout="fill"
                              />
                            )}
                          </Avatar>
                        </Box>
                      </IconContext.Provider>
                      <Box>
                        <Text
                          fontWeight="medium"
                          align={"center"}
                        >{`${user.firstName} ${user.lastName}`}</Text>
                      </Box>
                    </HStack>
                  </Td>
                  <Td>
                    <Text color="muted">{user.teacher?.email}</Text>
                  </Td>
                  <Td>
                    <Text color="muted">
                      {format(new Date(user.createdAt), "dd/MM/yy hh:mm:ss")}
                    </Text>
                  </Td>
                  <Td>
                    <Text
                      color="muted"
                      align={
                        `${user.lastLogin ? undefined : "center"}` as
                          | ResponsiveValue<any>
                          | undefined
                      }
                    >
                      {user.lastLogin
                        ? format(new Date(user.lastLogin), "dd/MM/yy hh:mm:ss")
                        : "N/A"}
                    </Text>
                  </Td>
                  <Td>
                    <HStack spacing="1">
                      <IconButton
                        icon={<FiEye fontSize="1.25rem" />}
                        variant="ghost"
                        aria-label="View member"
                        onClick={(): any =>
                          router.push(`${router.pathname}/${user.id}`)
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
                            Are you sure you want to login as this teacher?
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
            }}
          />
          {/* <Box
            bg="bg-surface"
            boxShadow={{ base: "none", md: useColorModeValue("sm", "sm-dark") }}
            borderRadius={useBreakpointValue({ base: "none", md: "lg" })}
          >
            <Stack spacing="5">
              <Box px={{ base: "4", md: "6" }} pt="5">
                <Stack
                  direction={{ base: "column", md: "row" }}
                  justify="space-between"
                >
                  <Text fontSize="lg" fontWeight="medium">
                    Teachers
                  </Text>
                  <InputGroup maxW="xs">
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiSearch} color="muted" boxSize="5" />
                    </InputLeftElement>
                    <Input
                      placeholder="Search"
                      value={searchText}
                      onChange={(event): void =>
                        setSearchText(event.target.value)
                      }
                    />
                  </InputGroup>
                </Stack>
              </Box>
              <Box overflowX="auto">
                {users.loading || count.loading ? (
                  <Box
                    h={{ base: "sm", md: "lg" }}
                    w="full"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <BarLoader height={4} width={128} loading color="#3182ce" />
                  </Box>
                ) : (
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Joined At</Th>
                        <Th>Last Logged In</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {users.data?.adminFindManyUsers.map((user) => (
                        <Tr key={user.id}>
                          <Td>
                            <HStack spacing="3">
                              <IconContext.Provider value={{ color: "white" }}>
                                <Box overflow={"hidden"} borderRadius={"full"}>
                                  <Avatar
                                    boxSize="10"
                                    icon={<FaUserGraduate />}
                                    bg={
                                      user.teacher?.photo?.url && "bg-surface"
                                    }
                                  >
                                    {user.teacher?.photo?.url && (
                                      <Image
                                        alt=""
                                        src={user.teacher?.photo?.url}
                                        layout="fill"
                                      />
                                    )}
                                  </Avatar>
                                </Box>
                              </IconContext.Provider>
                              <Box>
                                <Text fontWeight="medium">{`${user.firstName} ${user.lastName}`}</Text>
                              </Box>
                            </HStack>
                          </Td>
                          <Td>
                            <Text color="muted">{user.teacher?.email}</Text>
                          </Td>
                          <Td>
                            <Text color="muted">
                              {format(
                                new Date(user.createdAt),
                                "dd/MM/yy hh:mm:ss",
                              )}
                            </Text>
                          </Td>
                          {/* <Td>
                            <Text color="muted">
                              {user.lastLogin === null ? (
                                <> N/A </>
                              ) : (
                                <>
                                  {format(
                                    new Date(user.lastLogin),
                                    "dd/MM/yy hh:mm:ss",
                                  )}
                                </>
                              )}
                            </Text>
                          </Td> *
                          <Td>
                            <HStack spacing="1">
                              <IconButton
                                icon={<FiEye fontSize="1.25rem" />}
                                variant="ghost"
                                aria-label="View member"
                                onClick={(): any =>
                                  router.push(`${router.pathname}/${user.id}`)
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
                                    Are you sure you want to login as this
                                    teacher?
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
                      ))}
                    </Tbody>
                  </Table>
                )}
              </Box>
              <Box px={{ base: "4", md: "6" }} pb="5">
                <HStack spacing="3" justify="space-between">
                  {!isMobile && (
                    <Text color="muted" fontSize="sm">
                      {formatPagnation(page, step, count.data?.adminCountUser)}
                    </Text>
                  )}
                  <ButtonGroup
                    spacing="3"
                    justifyContent="space-between"
                    width={{ base: "full", md: "auto" }}
                    variant="secondary"
                  >
                    <Button
                      disabled={page === 1}
                      onClick={(): void => setPage(page - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      disabled={
                        page * step >= (count.data?.adminCountUser ?? 0)
                      }
                      onClick={(): void => setPage(page + 1)}
                    >
                      Next
                    </Button>
                  </ButtonGroup>
                </HStack>
              </Box>
            </Stack>
          </Box> */}
        </Container>
      </Stack>
    </>
  );
};
