// chakra imports
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Td,
  Text,
  Th,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";
import { BsPencil } from "react-icons/bs";
import { FaUserTie, FaUserGraduate } from "react-icons/fa";
import { FiEye, FiLink } from "react-icons/fi";
import { GoCalendar, GoEye } from "react-icons/go";
import { HiPencil } from "react-icons/hi";
import { IconContext } from "react-icons/lib";

import {
  Role,
  useAdminFindManyUsersLazyQuery,
  useAdminFindUniqueUserQuery,
  useDeleteUserMutation,
  useAdminLoginAsMutation,
  useAdminUpdateChildMutation,
  CourseWhereInput,
  useFindManyCoursesLazyQuery,
  useAdminCountCourseLazyQuery,
  State,
  FindManyCoursesQueryVariables,
  CourseOrderByWithRelationAndSearchRelevanceInput,
} from "schema/generated/graphql";
import { hostname } from "utils/getFrontendHostname";
import { useResultCallback } from "utils/hooks/useResultCallback";
import {
  useSortOrderManager,
  formatSortOrder,
} from "utils/hooks/useSortOrderManager";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import { DataTable } from "@/components/DataTable";
import { ChangePattern } from "@/features/ChangePattern";
import { schemaEdit } from "@/features/student/components/FormControl/Schema/Edit";
import { StudentForm } from "@/features/student/components/StudentForm";

const Element: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const id = router.query.id as string;
  const changePatternElement = ChangePattern({ id });
  const [readonly, setReadonly] = React.useState(true);
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
        `${hostname}/student/auth/login?accessToken=${encodeURIComponent(
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
  const remoteStudentParent = useAdminFindUniqueUserQuery({
    variables: {
      where: {
        id: remoteUser.data?.adminFindUniqueUser.student?.parentId,
      },
    },
  });
  const studentParent = remoteStudentParent.data?.adminFindUniqueUser;

  const [updateChild, updatedChild] = useAdminUpdateChildMutation();
  useResultCallback(
    updatedChild,
    (user) => {
      remoteUser.refetch();
      setReadonly(true);
      toast({
        title: `Student ${user.user.firstName} ${user.user.lastName} has been updated`,
        status: "success",
      });
    },
    (error) => {
      if (error.graphQLErrors[0].extensions?.exception?.code === "P2025") {
        toast({
          title: "Failed to update Student",
          description: `No such ${
            error.graphQLErrors[0].extensions.exception.meta.cause.split(`'`)[1]
          } exists`,
          status: "error",
        });
        return;
      }
      toast({
        title: "Failed to update Student",
        description:
          error.graphQLErrors[0].extensions?.exception?.meta?.cause ??
          error.graphQLErrors[0]?.message ??
          error.message,
        status: "error",
      });
    },
  );
  // Parent Auto Complete
  const [findManyUsers, parents] = useAdminFindManyUsersLazyQuery();
  // Delete stuff
  const [displayDelete, setDisplayDelete] = React.useState(false);
  const [confirmText, setConfirmText] = React.useState("");
  const [deleteUser, deletedUser] = useDeleteUserMutation();
  useResultCallback(
    deletedUser,
    (user) => {
      toast({
        title: `Student ${user.firstName} ${user.lastName} has been deleted`,
        status: "success",
      });
      router.push(`.`);
    },
    (error) => {
      toast({
        title: "Failed to delete Student",
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
    watch,
    getValues,
  } = useForm({
    resolver: zodResolver(schemaEdit),
  });

  React.useEffect(() => {
    // onRemoteUser
    if (!user) return;
    reset({
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.student?.email ?? "",
      bio: user?.student?.bio ?? "",
      parentEmail: user?.student?.parent?.email ?? "",
      username: user?.student?.username ?? "",
    });
  }, [user]);
  React.useEffect(() => {
    // onParentEmail
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
  const onCloseDelete = (): void => {
    setConfirmText("");
    setDisplayDelete(false);
  };

  const [fetchCourses, courses] = useFindManyCoursesLazyQuery();
  const [fetchCount, count] = useAdminCountCourseLazyQuery();

  const { list, toggle, getOrderBy } = useSortOrderManager();

  const colorModeValue = useColorModeValue("sm", "sm-dark");

  // arguments
  const args: any = {
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
    inputProps: {
      firstName: register("firstName"),
      lastName: register("lastName"),
      bio: register("bio"),
      email: register("email"),
      parentEmail: register("parentEmail"),
      username: register("username"),
    },
    description: `Information about ${user?.firstName} ${user?.lastName}`,
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
          onSubmit: handleSubmit((data: any): any => {
            updateChild({
              variables: {
                id: router.query.id as string,
                data: {
                  email: data.email || null,
                  username: data.username,
                  bio: data.bio,
                  parentEmail: data.parentEmail || null,
                  firstName: data.firstName,
                  lastName: data.lastName,
                },
              },
            }).catch((err) => err);
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
          parentAutoComplete: parents.data?.adminFindManyUsers.map((user) => {
            return user.parent?.email as string;
          }),
        }),
  };
  return (
    <>
      <StudentForm {...args} />
      {changePatternElement}
      <Box>
        <Container py={{ base: "4", md: "8" }}>
          <HStack>
            <Divider />
            {/* <Text fontSize="lg" fontWeight="medium">
              Children
            </Text>
            <Divider /> */}
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
        <Box flexGrow={3}>
          <Text fontSize="lg" fontWeight="medium">
            Parent Details
          </Text>
        </Box>
        <Stack
          flexGrow={1}
          direction={{ base: "column", lg: "row" }}
          spacing={{ base: "1" }}
          justify="space-between"
        >
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: "4" }}
            px={{ base: "4", md: "6" }}
            py={{ base: "5", md: "6" }}
            bg="bg-surface"
            borderRadius="lg"
            boxShadow={colorModeValue}
            flexGrow={1}
          >
            <Flex flexDir="column" justifyContent="center">
              <Avatar icon={<FaUserTie />} color="bg-surface">
                {/* <AvatarBadge
                  borderWidth="4px"
                  borderColor={useColorModeValue('white', 'gray.700')}
                  insetEnd="3"
                  bottom="3"
                  bg={useColorModeValue('white', 'gray.700')}
                >
                  <Icon as={GoVerified} fontSize="2xl" color={useColorModeValue('blue.500', 'blue.200')} />
                </AvatarBadge> */}
              </Avatar>
            </Flex>
            <Stack
              justifyContent="space-evenly"
              spacing={{ base: "1" }}
              flexGrow={1}
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  letterSpacing="tight"
                  marginEnd="6"
                >
                  {`${studentParent?.firstName ?? ""} ${
                    studentParent?.lastName ?? ""
                  }`}
                </Text>
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={
                    <Icon as={GoEye} color="gray.400" marginStart="-1" />
                  }
                  onClick={(): any =>
                    router.push(`../parents/${studentParent?.id}`)
                  }
                >
                  View
                </Button>
              </Flex>
              <Text mt="1" fontWeight="medium" marginEnd="6">
                {studentParent?.parent?.email}
              </Text>
              <Stack spacing="1" mt="2">
                {/* <HStack fontSize="sm">
                  <Icon as={GoGlobe} color="gray.500" />
                  <Text>Ontario, Canada</Text>
                </HStack> */}
                <HStack fontSize="sm">
                  <Icon as={GoCalendar} color="gray.500" />
                  <Text>
                    Joined at{" "}
                    {studentParent?.createdAt &&
                      format(
                        new Date(studentParent?.createdAt),
                        "dd/MM/yy hh:mm:ss",
                      )}
                  </Text>
                </HStack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Box>
        <Container py={{ base: "4", md: "8" }}>
          <HStack>
            <Divider />
            <Text fontSize="lg" fontWeight="medium" flexShrink={0}>
              Enrolled Course Details
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
        <Box flexGrow={1} maxW="100%">
          <DataTable
            {...{
              externalCallRequest: list,
              requestPage: ({ searchObj, isPage, page, step }): void => {
                const option: FindManyCoursesQueryVariables = {
                  where: {
                    enrolledCourses: {
                      some: {
                        studentId: { equals: id },
                      },
                    },
                  },
                };
                if (searchObj) option.where!.OR = searchObj;
                if (isPage === true)
                  fetchCount({
                    variables: { ...option },
                  });
                option.orderBy = list
                  .map(([key, order]) => {
                    switch (key) {
                      default:
                        return { [key]: order };
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
                      ["Title", "title"],
                      ["Thumbnail", null],
                      ["Teacher", "teacher"],
                      ["State", "state"],
                      ["Created At", "createdAt"],
                      ["Updated At", "updatedAt"],
                    ].map(([label, key], index) => (
                      <Th key={index}>
                        {key ? (
                          <button
                            onClick={(): void => toggle(key)}
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
                    <Td>{course.title}</Td>
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
                      <Text color="muted">
                        {((state): string => {
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
                            router.push(`/courses/${course.id}`)
                          }
                        />
                        <IconButton
                          icon={<BsPencil fontSize="1.25rem" />}
                          variant="ghost"
                          aria-label="Edit course"
                          onClick={(): any =>
                            router.push({
                              pathname: `/courses/${course.id}`,
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
                          onClick={(): any =>
                            router.push(
                              `${hostname}/navigator/courses/preview/${course.id}`,
                            )
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
