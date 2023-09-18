import {
  Avatar,
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
  AspectRatio,
  // useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
// import { BsPencil } from "react-icons/bs";
import { FaUserGraduate } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { IconContext } from "react-icons/lib";

import {
  useFindManyCoursesLazyQuery,
  CourseWhereInput,
  State,
  useAdminCountCourseLazyQuery,
  FindManyCoursesQueryVariables,
  CourseOrderByWithRelationAndSearchRelevanceInput,
  // useAdminLoginAsMutation,
} from "schema/generated/graphql";
// import { hostname } from "utils/getFrontendHostname";
// import { useResultCallback } from "utils/hooks/useResultCallback";
import {
  useSortOrderManager,
  formatSortOrder,
} from "utils/hooks/useSortOrderManager";

import { DataTable } from "@/components/DataTable";

export const CourseLayout = (): React.ReactElement => {
  const router = useRouter();
  // const toast = useToast();

  // const [redirString, setRedirString] = React.useState("");
  const [fetchCourses, courses] = useFindManyCoursesLazyQuery();
  const [fetchCount, count] = useAdminCountCourseLazyQuery();
  // const [tryLoginAs, loginAs] = useAdminLoginAsMutation();

  // let redirectString: string;
  // useResultCallback(
  //   loginAs,
  //   (token) => {
  //     window.open(
  //       `${hostname}/navigator/auth/login?accessToken=${encodeURIComponent(
  //         token.accessToken,
  //       )}&redir=navigator||courses||preview||${redirString}`,
  //     );
  //     toast({
  //       title: `Logged in as teacher`,
  //       status: "success",
  //     });
  //   },
  //   (error) => {
  //     toast({
  //       title: "Failed to login as User",
  //       description:
  //         error.graphQLErrors[0].extensions?.exception.meta.cause ??
  //         error.graphQLErrors[0].message,
  //       status: "error",
  //     });
  //   },
  // );

  // const loginAsTeacher = (course: any): void => {
  //   setRedirString(course.id);

  //   tryLoginAs({
  //     variables: {
  //       data: {
  //         role: course!.teacher.user.role,
  //         userId: course!.teacher.id,
  //         team: course!.teacher.user.teamId,
  //       },
  //     },
  //   });
  // };

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
              Courses
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
                const option: FindManyCoursesQueryVariables = {};
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
                      case "title":
                        return { title: order };
                      case "state":
                        return { state: order };
                      case "updatedAt":
                        return { updatedAt: order }; 
                      case "createdAt":
                         return { createdAt: order }; 
                      case "teacher":
                        return [
                          {
                            teacher: {
                              user: {
                                firstName: order,
                              },
                            },
                          },
                          {
                            teacher: {
                              user: {
                                lastName: order,
                              },
                            },
                          },
                        ];
                    }
                  })
                  .reduce((orders, val) => {
                    if (Array.isArray(val)) orders.push(...val);
                    else orders.push(val);
                    return orders;
                  }, [] as CourseOrderByWithRelationAndSearchRelevanceInput[]);
                fetchCourses({
                  variables: {
                    ...option,
                    take: step,
                    skip: step * (page - 1),
                  },
                });
              },
              loading: courses.loading || count.loading,
              data: {
                name: "Courses",
                searchObj: {
                  id: true,
                  title: true,
                  // cannot put state. filter by state as doesn't match Graphql input parameter
                  // state: true,
                  teacher: {
                    is: {
                      user: {
                        is: {
                          firstName: true,
                          lastName: true,
                        },
                      },
                    },
                  },
                } as CourseWhereInput,
                count: count.data?.adminCountCourse,
                header: (
                  <Tr>
                    {[
                      ["Teacher", "teacher"],
                      ["Thumbnail", null],
                      ["Title", "title"],
                      ["State", "state"],
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
                body: courses.data?.courses.map((course) => (
                  <Tr key={course.id}>
                    <Td>
                      <HStack spacing="3">
                        {/* <Checkbox /> */}
                        <IconContext.Provider value={{ color: "white" }}>
                          <Box overflow={"hidden"} borderRadius={"full"}>
                            <Avatar
                              boxSize="10"
                              icon={<FaUserGraduate />}
                              // src={user.teacher?.photo?.url}
                              bg={course.teacher?.photo?.url && "bg-surface"}
                            >
                              {course.teacher?.photo?.url && (
                                <Image
                                  alt=""
                                  src={course.teacher?.photo?.url}
                                  layout="fill"
                                />
                              )}
                            </Avatar>
                          </Box>
                        </IconContext.Provider>
                        <Box>
                          <Text fontWeight="medium">{`${course.teacher.user.firstName} ${course.teacher.user.lastName}`}</Text>
                          {/* <Text color="muted">{"test"}</Text> */}
                        </Box>
                      </HStack>
                    </Td>
                    <Td>
                      <AspectRatio>
                        <Image
                          alt=""
                          src={
                            course.thumbnail?.url ??
                            "/images/default/course.png"
                          }
                          layout="fill"
                          objectFit="contain"
                        />
                      </AspectRatio>
                    </Td>
                    <Td>{course.title}</Td>
                    <Td>
                      <Text color="muted">
                        {((state): any => {
                          switch (state) {
                            case State.Draft:
                              return "In Draft";
                            case State.Published:
                              return "Published";
                            case State.Rejected:
                              return "Rejected";
                            case State.Review:
                              return "In Review";
                          }
                        })(course.state)}
                      </Text>
                    </Td>
                    <Td>
                      <Text color="muted">
                        {format(
                          new Date(course.createdAt),
                          "dd/MM/yy hh:mm:ss",
                        )}
                      </Text>
                    </Td>
                    <Td>
                      <Text color="muted">
                        {format(
                          new Date(course.updatedAt),
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
                            router.push(`${router.pathname}/${course.id}`)
                          }
                        />
                        {/* <IconButton
                          icon={<BsPencil fontSize="1.25rem" />}
                          variant="ghost"
                          aria-label="Edit course"
                          onClick={(): any =>
                            router.push({
                              pathname: `${router.pathname}/${course.id}`,
                              query: {
                                edit: true,
                              },
                            })
                          }
                        />
                        <IconButton
                          icon={<FiLink fontSize="1.25rem" />}
                          variant="ghost"
                          aria-label="Preview course"
                          onClick={(): void => loginAsTeacher(course)}
                        /> */}
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
