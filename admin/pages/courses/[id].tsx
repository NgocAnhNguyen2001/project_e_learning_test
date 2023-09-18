// chakra imports
import {
  Button,
  Flex,
  Text,
  HStack,
  Box,
  Container,
  Divider,
  Stack,
  useToast,
  Icon,
  useColorModeValue,
  Avatar,
  Tr,
  Th,
  IconButton,
  Td,
  AspectRatio,
  ModalOverlay,
  Modal,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  FormControl,
  ModalBody,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";
import { FaUserGraduate } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { GoCalendar, GoEye } from "react-icons/go";
import { HiPencil } from "react-icons/hi";
import { IconContext } from "react-icons/lib";
import * as z from "zod";

import {
  ChallengeWhereInput,
  CourseAssetType,
  FindManyChallengesQueryVariables,
  State,
  useAdminCountUserLazyQuery,
  useAdminDeleteCourseMutation,
  useAdminFindManyUsersLazyQuery,
  useFindManyChallengesLazyQuery,
  useFindUniqueCourseQuery,
  UserWhereInput,
  useUpdateCourseMutation,
  useUploadCourseAssetMutation,
} from "schema/generated/graphql";
import { useResultCallback } from "utils/hooks/useResultCallback";
import { formatSortOrder, useSortOrderManager } from "utils/hooks/useSortOrderManager";
import { useUppyFileUpload } from "utils/hooks/useUppyFileUpload";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import { DataTable } from "@/components/DataTable";
import { CourseForm } from "@/features/course";



export const schemaEdit = z.object({
  state: z.enum(Object.values(State) as any),
  title: z.string().nonempty(),
});

const Element: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const id = router.query.id as string;
  const [readonly, setReadonly] = React.useState(true);
  React.useEffect(() => {
    if (router.query.edit !== "true") return;
    setReadonly(false);
  }, [router.query.id]);

  const remoteCourse = useFindUniqueCourseQuery({
    variables: {
      where: {
        id,
      },
    },
  });
  const course = remoteCourse.data?.course;

  const [updateCourse, updatedCourse] = useUpdateCourseMutation();
  useResultCallback(
    updatedCourse,
    (course) => {
      remoteCourse.refetch();
      setReadonly(true);
      toast({
        title: `Updated ${course.title}`,
        status: "success",
      });
    },
    (error) => {
      toast({
        title: "Failed to update Course",
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
    if (!course) return;
    reset({
      state: course.state,
      title: course.title,
    });
  }, [course]);

  const colourModeValue = useColorModeValue("sm", "sm-dark");

  // Table stuff
  const [getUsers, users] = useAdminFindManyUsersLazyQuery();
  const [fetchCount, count] = useAdminCountUserLazyQuery();
  const [fetchChallenges, challenges] = useFindManyChallengesLazyQuery();

  // File upload stuff
  const [uploadAsset, uploadedAsset] = useUploadCourseAssetMutation();
  const { cancel, displayUppy, request, uppy } = useUppyFileUpload({
    ratio: 16 / 9,
    upload: (file): void => {
      uploadAsset({
        variables: {
          courseAssetType: CourseAssetType.Thumbnail,
          file,
        },
      }).catch((err) => err);
    },
  });
  useResultCallback(
    uploadedAsset,
    (asset) => {
      cancel();
      updateCourse({
        variables: {
          id,
          data: {
            thumbnail: {
              connect: {
                id: asset.id,
              },
            },
          },
        },
      }).catch((err) => err);
    },
    (error) => {
      toast({
        title: "Failed to upload CourseAsset",
        description:
          error.graphQLErrors[0].extensions?.exception.meta.cause ??
          error.graphQLErrors[0].message,
        status: "error",
      });
    },
  );

  // Delete stuff
  const [displayDelete, setDisplayDelete] = React.useState(false);
  const [confirmText, setConfirmText] = React.useState('');
  const [deleteCourse, deletedCourse] = useAdminDeleteCourseMutation();
  
  useResultCallback(deletedCourse, course => {
    toast({
      title: `Course ${course.title} has been deleted`,
      status: 'success',
    });
    router.push(`.`);
  }, error => {
    toast({
      title: 'Failed to delete Course',
      description: error.graphQLErrors[0].extensions?.exception.meta.cause ?? error.graphQLErrors[0].message,
      status: 'error',
    });
  });

  const onCloseDelete = (): void => {
    setConfirmText('');
    setDisplayDelete(false);
  }

  const {
    list,
    toggle,
    getOrderBy,
  } = useSortOrderManager();

  if (!course) return <>Loading</>;
  const args = {
    description: `Information about ${course.title}`,
    inputProps: {
      state: register("state"),
      title: register("title"),
    },
    photo: {
      url: course?.thumbnail?.url ?? "",
      requestEdit: (): void => request(),
      displayEdit: displayUppy,
      uppy: {
        uppy,
        autoOpenFileEditor: true,
        animateOpenClose: false,
        plugins: ["ImageEditor"],
        closeModalOnClickOutside: true,
        // open: showUpload,
        onRequestClose: cancel,
      },
    },
    ...(readonly
      ? {
        title: "Course Details",
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
                <Button type="button" variant="ghost" textColor="red" onClick={(): any => setDisplayDelete(true)}>
                  Delete
                </Button>
              </Flex>
            </Flex>
            <Modal
              isOpen={displayDelete}
              onClose={onCloseDelete}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete User</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>
                      <Text pb={6}>This will permanently delete course <b>{`${course.title}`}</b> and all associated information related to them</Text>
                      <Text pb={6}>Please type <b>{`${course.title}`}</b> to confirm</Text>
                      <Text pb={6} textColor="red">This action <b>cannot</b> be undone</Text>
                    </FormLabel>
                    <Input
                      value={confirmText}
                      onChange={(e): any => setConfirmText(e.target.value)}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme='red'
                    mr={3}
                    disabled={confirmText !== `${course.title}`}
                    onClick={(): any => deleteCourse({
                      variables: { where: { id } },
                    })}
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
        title: "Edit Course Details",
        errors,
        onSubmit: handleSubmit((data: any) => {
          updateCourse({
            variables: {
              id,
              data: {
                title: data.title,
                state: data.state,
                published: data.state === "PUBLISHED" && true,
              },
            },
          });
        }),
        buttons: (
          <>
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
          </>
        ),
      }),
  };
  return (
    <>
      <CourseForm {...args} />
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
            Teacher Details
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
            boxShadow={colourModeValue}
            flexGrow={1}
          >
            <Flex flexDir="column" justifyContent="center">
              <IconContext.Provider value={{ color: "white" }}>
                <Box overflow={"hidden"} borderRadius={"full"}>
                  <Avatar
                    boxSize="16"
                    icon={<FaUserGraduate />}
                    // src={user.teacher?.photo?.url}
                    bg={course?.teacher?.photo?.url && "bg-surface"}
                  >
                    {course?.teacher?.photo?.url && (
                      <Image
                        alt=""
                        src={course?.teacher?.photo?.url}
                        layout="fill"
                      />
                    )}
                  </Avatar>
                </Box>
              </IconContext.Provider>
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
                  {`${course?.teacher.user.firstName ?? ""} ${course?.teacher.user.lastName ?? ""
                    }`}
                </Text>
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={
                    <Icon as={GoEye} color="gray.400" marginStart="-1" />
                  }
                  onClick={(): any =>
                    router.push(`../teachers/${course?.teacherId}`)
                  }
                >
                  View
                </Button>
              </Flex>
              {/* <Text mt="1" fontWeight="medium" marginEnd="6">
                {course.teacher?.parent?.email}
              </Text> */}
              <Stack spacing="1" mt="2">
                {/* <HStack fontSize="sm">
                  <Icon as={GoGlobe} color="gray.500" />
                  <Text>Ontario, Canada</Text>
                </HStack> */}
                <HStack fontSize="sm">
                  <Icon as={GoCalendar} color="gray.500" />
                  <Text>
                    Joined at{" "}
                    {course?.teacher.createdAt &&
                      format(
                        new Date(course?.teacher.createdAt),
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
              Enrolled Students
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
                        enrolledCourses: {
                          some: {
                            course: {
                              is: {
                                id: { equals: id },
                              },
                            },
                          },
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
                    <Th>Name</Th>
                    <Th>Username</Th>
                    <Th>Progress</Th>
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
                        <Box>
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
                        {user.student?.enrolledCourses?.[0]?.progress}
                      </Text>
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

      <Box>
        <Container py={{ base: "4", md: "8" }}>
          <HStack>
            <Divider />
            <Text fontSize="lg" fontWeight="medium" flexShrink={0}>
              Course challenges
            </Text>
            <Divider />
          </HStack>
        </Container>
      </Box>

      <Container py={{ base: "4", md: "8" }}>
          <DataTable {...{
            externalCallRequest: list,
            requestPage: ({
              searchObj,
              page,
              step,
            }): any => {
              const option: FindManyChallengesQueryVariables = {
                where: {
                  challengeBlock: {
                    is: {
                      block: {
                        is: {
                          checkpoint: {
                            is: {
                              courseId: {
                                equals: id
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              };

              if (searchObj) option.where = { OR: searchObj };
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
              name: 'Challenges',
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
                                title: true
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } as ChallengeWhereInput,
              header: (
                <Tr>
                  {[
                    ['Challenge', 'challenge'],
                    ['Course', 'course'],
                    ['Checkpoint', 'checkpoint'],
                    ['Creator', 'creator'],
                    ['Created At', 'createdAt'],
                  ].map(([label, key], index) => (<Th key={index}>
                    {key ? <button
                      onClick={(): any => toggle(key)}
                      style={{
                        fontWeight: 'inherit',
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
                      : <Text>{label}</Text>}
                  </Th>))}
                  <Th></Th>
                </Tr>
              ),
              body: challenges.data?.challenges.map(challenge => (
                <Tr key={challenge.id}>
                  <Td>
                    <AspectRatio>
                      <Image
                        alt=""
                        src={challenge?.asset?.url ?? '/images/default/course.png'}
                        layout="fill"
                        objectFit="contain"
                      >
                      </Image>
                    </AspectRatio>
                  </Td>

                  <Td>
                    <Box>
                      <Text fontWeight="medium">{challenge.challengeBlock.block?.checkpoint.course?.title}</Text>
                    </Box>
                  </Td>
                  <Td>
                    {challenge.challengeBlock.block?.checkpoint.title}
                  </Td>
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
                          router.push(`/challenges/${challenge.id}`)
                        }
                      />
                    </HStack>
                  </Td>
                </Tr>
              )),
            },
          }} />
        </Container>
    </>
  );
};

export default withAuthenticated(withApollo(Element));
