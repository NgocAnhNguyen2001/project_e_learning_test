import {
  Box,
  Container,
  Heading,
  HStack,
  IconButton,
  Stack,
  Td,
  Text,
  Th,
  Tr,
  useBreakpointValue,
  Flex,
  Button,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import * as React from "react";
import { FiPlus, FiEye } from "react-icons/fi";

import {
  useCountForumPostsLazyQuery,
  // useAdminLoginAsMutation,
  useFindAllPostLazyQuery,
  ForumPostOrderByWithRelationAndSearchRelevanceInput,
  FindAllPostQueryVariables,
} from "schema/generated/graphql";
// import { useResultCallback } from "utils/hooks/useResultCallback";
import {
  useSortOrderManager,
  formatSortOrder,
} from "utils/hooks/useSortOrderManager";

import { DataTable } from "@/components/DataTable";

export const ForumLayout = (): React.ReactElement => {
  const router = useRouter();
 
  const [fetchPosts, posts] = useFindAllPostLazyQuery();
  const [fetchCount, count] = useCountForumPostsLazyQuery();

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
              Forum Posts
            </Heading>
            <Text color="muted">All important metrics at a glance</Text>
          </Stack>
          <HStack spacing="3">
            <Button
              variant="secondary"
              leftIcon={<FiPlus fontSize="1.25rem" />}
              onClick={(): Promise<boolean> => router.push("/forum/create")}
            >
              Create
            </Button>
          </HStack>
        </Stack>
        <Container px="0">
          <DataTable
            {...{
              externalCallRequest: list,
              requestPage: ({ searchObj, isPage, page, step }): any => {
                const option: FindAllPostQueryVariables = {};
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
                      case "createdAt": return { createdAt: order };
                      case "updatedAt": return { updatedAt: order };
                      case "reportCount": return { reportCount: order };
                      case "text": return { text: order };
                      case "category":
                        return {
                          category: {
                            name: order,
                          },
                        };
                      case "creator":
                        return [
                          {
                            user: {
                              firstName: order,
                            },
                          },
                          {
                            user: {
                              lastName: order,
                            },
                          },
                        ];
                    }
                  })
                  .reduce((orders, val) => {
                    if (Array.isArray(val)) orders.push(...val);
                    else orders.push(val);
                    return orders;
                  }, [] as ForumPostOrderByWithRelationAndSearchRelevanceInput[]);
                fetchPosts({
                  variables: {
                    ...option,
                    take: step,
                    skip: step * (page - 1),
                  },
                });
              },
              loading: posts.loading || count.loading,
              data: {
                name: "Posts",
                searchObj: {
                  id: true,
                  text: true,
                   category: {
                    is: {
                      name: true,
                    },
                  },
                  user: {
                    is: {
                      firstName: true,
                      lastName: true,
                    },
                  },
                } as unknown,
                count: count.data?.forumPostsCount,
                header: (
                  <Tr>
                    {[
                      ["Text", "text"],
                      ["Category", "category"],
                      ["Creator", "creator"],
                      ["Reports", "reportCount"],
                      ["Created At", "createdAt"],
                      ["Updated At", "updatedAt"],
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
                body: posts.data?.findManyPosts.map((post) => (
                  <Tr key={post.id}>
                    <Td>
                      <Text maxWidth={300} isTruncated>
                        {post.text}
                      </Text>
                    </Td>
                    <Td>{post.category.name}</Td>
                    <Td>
                      <HStack spacing="3">
                        {/* <Checkbox /> */}
                        <Box>
                          <Text fontWeight="medium">{`${post.user.firstName} ${post.user.lastName}`}</Text>
                        </Box>
                      </HStack>
                    </Td>
                    <Td>
                      <Text maxWidth={300} isTruncated>
                        {post.reportCount}
                      </Text>
                    </Td>
                    <Td>
                      <Text color="muted">
                        {format(new Date(post.createdAt), "dd/MM/yy hh:mm:ss")}
                      </Text>
                    </Td>
                    <Td>
                      <Text color="muted">
                        {format(new Date(post.updatedAt), "dd/MM/yy hh:mm:ss")}
                      </Text>
                    </Td>
                    <Td>
                      <HStack spacing="1">
                        <IconButton
                          icon={<FiEye fontSize="1.25rem" />}
                          variant="ghost"
                          aria-label="View course"
                          onClick={(): any =>
                            router.push(`${router.pathname}/${post.id}`)
                          }
                        />
                        { /*}
                        <IconButton
                          icon={<BsPencil fontSize="1.25rem" />}
                          variant="ghost"
                          aria-label="Edit course"
                          onClick={(): any => {
                            post.parentPostId == null
                              ? router.push({
                                  pathname: `${router.pathname}/${post.id}`,
                                  query: {
                                    edit: true,
                                  },
                                })
                              : router.push({
                                  pathname: `${router.pathname}/comments/${post.id}`,
                                  query: {
                                    edit: true,
                                  },
                                });
                          }}
                        />
                        <IconButton
                          icon={<FiLink fontSize="1.25rem" />}
                          variant="ghost"
                          aria-label="Preview course"
                          onClick={(): void => loginAsStudent(post)}
                        />
                      */ }
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

export * from "./CreatePost";
