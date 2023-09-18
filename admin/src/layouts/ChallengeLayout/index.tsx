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
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import * as React from "react";
import { FiEye } from "react-icons/fi";

import {
  useAdminLoginAsMutation,
  useAdminCountChallengeLazyQuery,
  useFindManyChallengesLazyQuery,
  FindManyChallengesQueryVariables,
  ChallengeWhereInput,
  ChallengeOrderByWithRelationAndSearchRelevanceInput,
} from "schema/generated/graphql";
import { hostname } from "utils/getFrontendHostname";
import { useResultCallback } from "utils/hooks/useResultCallback";
import {
  useSortOrderManager,
  formatSortOrder,
} from "utils/hooks/useSortOrderManager";

import { DataTable } from "@/components/DataTable";

export const ChallengeLayout = (): React.ReactElement => {
  const router = useRouter();
  const toast = useToast();

  const [redirString] = React.useState("");
  const [fetchCount, count] = useAdminCountChallengeLazyQuery();
  const [fetchChallenges, challenges] = useFindManyChallengesLazyQuery();
  const [, loginAs] = useAdminLoginAsMutation();

  // let redirectString: string;
  useResultCallback(
    loginAs,
    (token) => {
      window.open(
        `${hostname}/navigator/auth/login?accessToken=${encodeURIComponent(
          token.accessToken,
        )}&redir=navigator||challenges||preview||${redirString}`,
      );
      toast({
        title: `Logged in as teacher`,
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

  // const loginAsTeacher = (course: any) => {
  //   setRedirString(course.id)

  //   tryLoginAs({
  //     variables: {
  //       data: {
  //         role: course!.teacher.user.role,
  //         userId: course!.teacher.id,
  //         team: course!.teacher.user.teamId
  //       },
  //     },
  //   })
  // }

  const { list, toggle, getOrderBy } = useSortOrderManager();

  console.log("hello", list);

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
              Challenges
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
          </HStack>
        </Stack>
        <Container px="0">
          <DataTable
            {...{
              externalCallRequest: list,
              requestPage: ({ searchObj, isPage, page, step }): any => {
                const option: FindManyChallengesQueryVariables = {};
                if (searchObj) option.where = { OR: searchObj };
                if (isPage)
                  fetchCount({
                    variables: { ...option },
                  });
                option.orderBy = list
                  .map(([key, order]) => {
                    switch (key) {
                      default:
                        return { [key]: order };
                      case "creator":
                        return [
                          {
                            creator: {
                              user: {
                                firstName: order,
                              },
                            },
                          },
                          {
                            creator: {
                              user: {
                                lastName: order,
                              },
                            },
                          },
                        ];
                      case "course":
                        return {
                          challengeBlock: {
                            block: {
                              checkpoint: {
                                course: {
                                  title: order,
                                },
                              },
                            },
                          },
                        };
                      case "checkpoint":
                        return {
                          challengeBlock: {
                            block: {
                              checkpoint: {
                                title: order,
                              },
                            },
                          },
                        };
                    }
                  })
                  .reduce((orders, val) => {
                    if (Array.isArray(val)) orders.push(...val);
                    else orders.push(val);
                    return orders;
                  }, [] as ChallengeOrderByWithRelationAndSearchRelevanceInput[]);
                fetchChallenges({
                  variables: {
                    ...option,
                    take: step,
                    skip: step * (page - 1),
                  },
                });
              },
              loading: challenges.loading,
              data: {
                name: "Challenges",
                searchObj: {
                  id: true,
                  challengeBlock: {
                    is: {
                      block: {
                        is: {
                          checkpoint: {
                            is: {
                              title: true,
                              course: {
                                is: {
                                  title: true,
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                } as ChallengeWhereInput,
                count: count.data?.adminCountChallenge,
                header: (
                  <Tr>
                    {[
                      // ["Challenge", "challenge"],
                      ["Course", "course"],
                      ["Checkpoint", "checkpoint"],
                      ["Creator", "creator"],
                      ["Created At", "createdAt"],
                    ].map(([label, key], index) => {
                      // console.log({ key });
                      return (
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
                                <Flex
                                  direction="column"
                                  justifyContent="center"
                                >
                                  {formatSortOrder(getOrderBy(key))}
                                </Flex>
                              </Flex>
                            </button>
                          ) : (
                            <Text>{label}</Text>
                          )}
                        </Th>
                      );
                    })}
                    <Th></Th>
                  </Tr>
                ),
                body: challenges.data?.challenges.map((challenge) => (
                  <Tr key={challenge.id}>
                    {/* <Td>
                      <AspectRatio>
                        <Image
                          alt=""
                          src={
                            challenge?.asset?.url ??
                            "/images/default/course.png"
                          }
                          layout="fill"
                          objectFit="contain"
                        ></Image>
                      </AspectRatio>
                    </Td> */}
                    <Td>
                      <Box>
                        <Text fontWeight="medium">
                          {
                            challenge.challengeBlock.block?.checkpoint.course
                              ?.title
                          }
                        </Text>
                      </Box>
                    </Td>
                    <Td>{challenge.challengeBlock.block?.checkpoint.title}</Td>
                    <Td>
                      <Text color="muted">
                        {challenge.creator.user.firstName}
                      </Text>
                    </Td>
                    <Td>
                      <Text color="muted">
                        {format(
                          new Date(challenge.createdAt),
                          "dd/MM/yy hh:mm:ss",
                        )}
                      </Text>
                    </Td>
                    <Td>
                      <HStack spacing="1">
                        <IconButton
                          icon={<FiEye fontSize="1.25rem" />}
                          variant="ghost"
                          aria-label="View course"
                          onClick={(): any =>
                            router.push(`${router.pathname}/${challenge.id}`)
                          }
                        />
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
