// chakra imports
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Box,
  Text,
  useToast,
  Container,
  Th,
  Tr,
  AspectRatio,
  IconButton,
  Td,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";
import { BsPencil } from "react-icons/bs";
import { FiEye, FiLink } from "react-icons/fi";
import { HiPencil } from "react-icons/hi";

import {
  useAdminFindUniqueUserQuery,
  useAdminUpdateUserMutation,
  useDeleteUserMutation,
  useAdminUploadTeacherProfileMutation,
  Role,
  useAdminLoginAsMutation,
  FindManyCoursesQueryVariables,
  CourseOrderByWithRelationAndSearchRelevanceInput,
  CourseWhereInput,
  State,
  useAdminCountCourseLazyQuery,
  useFindManyCoursesLazyQuery,
} from "schema/generated/graphql";
import { hostname } from "utils/getFrontendHostname";
import { useResultCallback } from "utils/hooks/useResultCallback";
import {
  formatSortOrder,
  useSortOrderManager,
} from "utils/hooks/useSortOrderManager";
import { useUppyFileUpload } from "utils/hooks/useUppyFileUpload";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import { DataTable } from "@/components/DataTable";
import { ChangePassword } from "@/features/ChangePassword";
import { schemaEdit } from "@/features/teacher/components/FormControl/Schema/Edit";
import { TeacherForm } from "@/features/teacher/components/TeacherForm";






const Element: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  // const [openFileSelector, { plainFiles }] = useFilePicker({
  //   accept: ['.png', '.jpg'],
  //   multiple: false,
  // });
  const { cancel, displayUppy, request, uppy } = useUppyFileUpload({
    ratio: 1,
    upload: (file): void => {
      uploadProfile({
        variables: {
          file,
          id,
        },
      }).catch((err) => err);
    },
  });
  const toast = useToast();
  const changePasswordElement = ChangePassword({
    id,
    role: Role.Teacher,
  });

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
        `${hostname}/navigator/auth/login?accessToken=${encodeURIComponent(
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

  // const [showUpload, setShowUpload] = React.useState(false);
  // const uppy = useUppy(() => {
  //   const uppy = new Uppy({
  //     restrictions: {
  //       maxNumberOfFiles: 1,
  //       maxFileSize: 1000 ** 2 * 20,
  //     },
  //   }).use(ImageEditor, {
  //     cropperOptions: {
  //       aspectRatio: 1,
  //       initialAspectRatio: 1,
  //       croppedCanvasOptions: {},
  //     },
  //     actions: {
  //       flip: true,
  //       granularRotate: true,
  //       revert: true,
  //       rotate: true,
  //       zoomIn: true,
  //       zoomOut: true,
  //       cropSquare: true,
  //       cropWidescreen: false,
  //       cropWidescreenVertical: false,
  //     },
  //   });
  //   return uppy;
  // });
  const [uploadProfile, uploadedProfile] =
    useAdminUploadTeacherProfileMutation();
  useResultCallback(
    uploadedProfile,
    () => {
      remoteUser.refetch();
      // uppy.reset();
      cancel();
      toast({
        title: `Teacher Profile has been updated`,
        status: "success",
      });
    },
    (err) => {
      toast({
        title: "Failed to update Teacher Profile",
        description:
          err?.graphQLErrors?.[0]?.extensions?.exception?.meta?.cause ??
          err?.graphQLErrors?.[0]?.message,
        status: "error",
      });
    },
  );

  const [readonly, setReadonly] = React.useState(true);
  // Delete stuff
  const [displayDelete, setDisplayDelete] = React.useState(false);
  const [confirmText, setConfirmText] = React.useState("");
  const [deleteUser, deletedUser] = useDeleteUserMutation();
  useResultCallback(
    deletedUser,
    (user) => {
      toast({
        title: `Teacher ${user.firstName} ${user.lastName} has been deleted`,
        status: "success",
      });
      router.push(`.`);
    },
    (error) => {
      toast({
        title: "Failed to delete Teacher",
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
        title: `Teacher ${user.firstName} ${user.lastName} has been updated`,
        status: "success",
      });
    },
    (error) => {
      toast({
        title: "Failed to update Teacher",
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
      email: user?.teacher?.email ?? "",
      gender: user?.teacher?.gender ?? "",
      nationality: user?.teacher?.nationality ?? "",
      phoneNumber: user?.teacher?.phoneNumber ?? "",
      jobTitle: user?.teacher?.jobTitle ?? "",
      introduction: user?.teacher?.introduction ?? "",
      password: "",
      confirmPassword: "",
    });
  }, [user]);
  const onCloseDelete = (): void => {
    setConfirmText("");
    setDisplayDelete(false);
  };

  const [fetchCourses, courses] = useFindManyCoursesLazyQuery();
  const [fetchCount, count] = useAdminCountCourseLazyQuery();

  const { list, toggle, getOrderBy } = useSortOrderManager();

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
    photo: {
      url: user?.teacher?.photo?.url ?? "",
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
    description: `Information about ${user.firstName ?? ""} ${
      user.lastName ?? ""
    }`,
    inputProps: {
      firstName: register("firstName"),
      lastName: register("lastName"),
      email: register("email"),
      gender: register("gender"),
      introduction: register("introduction"),
      jobTitle: register("jobTitle"),
      nationality: register("nationality"),
      phoneNumber: register("phoneNumber"),
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
                  teacher: {
                    update: {
                      email: { set: data.email },
                      gender: { set: data.gender },
                      nationality: { set: data.nationality },
                      phoneNumber: { set: data.phoneNumber },
                      jobTitle: { set: data.jobTitle },
                      // profilePicture: { set: data.profilePicture },
                      introduction: { set: data.introduction },
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
      <TeacherForm {...args} />
      {changePasswordElement}
      <Box>
        <Container py={{ base: "4", md: "8" }}>
          <HStack>
            <Divider />
            <Text fontSize="lg" fontWeight="medium" flexShrink={0}>
              Courses Details
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
        <DataTable
          {...{
            externalCallRequest: list,
            requestPage: ({ searchObj, isPage, page, step }): void => {
              const option: FindManyCoursesQueryVariables = {
                where: {
                  teacherId: { equals: id },
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
                    ["Thumbnail", null],
                    ["Title", "title"],
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
                  <Td>
                    <AspectRatio>
                      <Image
                        alt=""
                        src={
                          course.thumbnail?.url ?? "/images/default/course.png"
                        }
                        layout="fill"
                        objectFit="contain"
                      />
                    </AspectRatio>
                  </Td>
                  <Td>{course.title}</Td>
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
                      {format(new Date(course.createdAt), "dd/MM/yy hh:mm:ss")}
                    </Text>
                  </Td>
                  <Td>
                    <Text color="muted">
                      {format(new Date(course.updatedAt), "dd/MM/yy hh:mm:ss")}
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
      </Stack>
    </>
  );
};

export default withAuthenticated(withApollo(Element));
