import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Switch,
  Td,
  Text,
  Th,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import * as React from "react";
import { FiEye, FiLogIn } from "react-icons/fi";

import {
  Role,
  useAdminFindManyUsersLazyQuery,
  useAdminUpdateUserMutation,
  UserWhereInput,
  useAdminCountUserLazyQuery,
  useAdminLoginAsMutation,
  namedOperations,
  ParentStatus,
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

export const ParentLayout = (): React.ReactElement => {
  const router = useRouter();
  const toast = useToast();

  const [getUsers, users] = useAdminFindManyUsersLazyQuery();
  const [fetchCount, count] = useAdminCountUserLazyQuery();
  const [verifiedLoading, setVerifiedLoading] = React.useState(false);

  const [tryLoginAs, loginAs] = useAdminLoginAsMutation();
  const [updateUser] = useAdminUpdateUserMutation();

  useResultCallback(
    loginAs,
    (token) => {
      window.open(
        `${hostname}/adult/auth/login?accessToken=${encodeURIComponent(
          token.accessToken,
        )}`,
      );
      toast({
        title: `Logged in as parent`,
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

  const onUpdateUserVerified = (verified: boolean, id: string): void => {
    updateUser({
      variables: {
        data: {
          parent: {
            update: {
              status: {
                set: verified ? ParentStatus.Verified : ParentStatus.Unverified,
              },
            },
          },
        },
        where: {
          id,
        },
      },
      onCompleted: () => {
        setVerifiedLoading(false);
        toast({
          title: `Updated user verified status`,
          status: "success",
        });
      },
      onError: () => {
        setVerifiedLoading(false);
        toast({
          title: `Failed to updated user verified status`,
          status: "error",
        });
      },
      refetchQueries: [namedOperations.Query.adminFindManyUsers],
    });
  };

  const { list, toggle, getOrderBy } = useSortOrderManager();

  return (
    <>
      <Container px="0">
        <DataTable
          loading={users.loading || count.loading}
          externalCallRequest={list}
          requestPage={({ searchObj, isPage, page, step }): any => {
            const option: AdminFindManyUsersQueryVariables = {
              where: { role: { equals: Role.Parent } },
            };
            console.log(searchObj);
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
                      parent: {
                        email: order,
                      },
                    };
                  case "verified":
                    return {
                      parent: {
                        status: order,
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
            name: "Parents",
            searchObj: {
              id: true,
              firstName: true,
              lastName: true,
              parent: {
                is: {
                  email: true,
                },
              },
            } as UserWhereInput,
            count: count.data?.adminCountUser,
            header: (
              <Tr>
                {[
                  ["Name", "name"],
                  ["Email", "email"],
                  ["Last Logged In", "lastLogin"],
                  ["Verified", "verified"],
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
                    <Box flexGrow={2} flexShrink={0} flexBasis={0}>
                      <Text fontWeight="medium">{`${user.firstName} ${user.lastName}`}</Text>
                    </Box>
                  </HStack>
                </Td>
                <Td>
                  <Text color="muted">{user.parent?.email}</Text>
                </Td>
                <Td>
                  <Text color="muted">
                    {user.lastLogin
                      ? format(new Date(user.lastLogin), "dd/MM/yy hh:mm:ss")
                      : "N/A"}
                  </Text>
                </Td>
                <Td>
                  <Switch
                    disabled={verifiedLoading}
                    isChecked={user?.parent?.status === "VERIFIED"}
                    onChange={(): void => {
                      setVerifiedLoading(true);
                      onUpdateUserVerified(
                        !(user?.parent?.status === "VERIFIED"),
                        user.id,
                      );
                    }}
                  />
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
                          Are you sure you want to login as this parent?
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
      </Container>
    </>
  );
};
