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
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";
import { FaUserGraduate } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { GoCalendar, GoEye } from "react-icons/go";
import { IconContext } from "react-icons/lib";
import * as z from "zod";

import {
  ChallengeCommentWhereInput,
  CourseAssetType,
  useDeleteChallengeCommentMutation,
  useFindChallengeCommentsLazyQuery,
  useFindOneChallengeQuery,
  useUploadCourseAssetMutation,
} from "schema/generated/graphql";
import { useResultCallback } from "utils/hooks/useResultCallback";
import { useUppyFileUpload } from "utils/hooks/useUppyFileUpload";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import { DataTable } from "@/components/DataTable";
import { DeleteAlertDialog } from "@/components/DeleteAlertDialog";
import { ChallengeForm } from "@/features/challenge";

export const schemaEdit = z.object({
  name: z.string().nonempty(),
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

  const { data } = useFindOneChallengeQuery({
    variables: {
      id,
    },
  });
  const challenge = data?.challenge;

  const {
    register,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(schemaEdit),
  });

  React.useEffect(() => {
    if (!challenge) return;
    reset({
      name: challenge.asset.name,
    });
  }, [challenge]);

  const colourModeValue = useColorModeValue("sm", "sm-dark");

  // Table stuff
  const [getComments, comments] = useFindChallengeCommentsLazyQuery();

  // File upload stuff
  const [uploadAsset] = useUploadCourseAssetMutation();
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

  // Delete stuff
  const [displayDelete, setDisplayDelete] = React.useState(false);
  const [confirmText, setConfirmText] = React.useState("");
  const [deleteComment, deletedComment] = useDeleteChallengeCommentMutation();

  useResultCallback(
    deletedComment,
    () => {
      toast({
        title: `Challenge by comment has been deleted`,
        status: "success",
      });
    },
    (error) => {
      toast({
        title: "Failed to delete Course",
        description:
          error.graphQLErrors[0].extensions?.exception.meta.cause ??
          error.graphQLErrors[0].message,
        status: "error",
      });
    },
  );

  const onCloseDelete = (): void => {
    setConfirmText("");
    setDisplayDelete(false);
  };

  // Delete alert
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!challenge) return <>Loading</>;
  const args = {
    description: `Information about challenge: ${challenge.id}`,
    inputProps: {
      name: register("name"),
    },
    photo: {
      url: challenge.asset.url ?? "",
      requestEdit: (): void => request(),
      displayEdit: displayUppy,
      uppy: {
        uppy,
        autoOpenFileEditor: true,
        animateOpenClose: false,
        plugins: ["ImageEditor"],
        closeModalOnClickOutside: true,
        onRequestClose: cancel,
      },
    },
    ...(readonly
      ? {
          title: "Challenge Details",
          readonly,
          buttons: (
            <>
              {/* <Flex direction="row" py="4" px={{ base: "4", md: "6" }}>
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
            </Flex> */}
              <Modal isOpen={displayDelete} onClose={onCloseDelete}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Delete User</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>
                        <Text pb={6}>
                          This will permanently delete course{" "}
                          <b>{`${challenge.id}`}</b> and all associated
                          information related to them
                        </Text>
                        <Text pb={6}>
                          Please type <b>{`${challenge.id}`}</b> to confirm
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
                      disabled={confirmText !== `${challenge.id}`}
                      // onClick={(): any => deleteCourse({
                      //   variables: { where: { id } },
                      // })}
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
          title: "Edit Challenge Details",
          errors,
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
      <ChallengeForm {...args} />
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
            Creator Details
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
                    bg={challenge.creator?.avatarImage?.url && "bg-surface"}
                  >
                    {challenge.creator?.avatarImage?.url && (
                      <Image
                        alt=""
                        src={challenge.creator?.avatarImage?.url}
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
                  {`${challenge.creator.user.firstName ?? ""} ${
                    challenge.creator.user.lastName ?? ""
                  }`}
                </Text>
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={
                    <Icon as={GoEye} color="gray.400" marginStart="-1" />
                  }
                  onClick={(): any =>
                    router.push(`../students/${challenge.creator.id}`)
                  }
                >
                  View
                </Button>
              </Flex>
              <Stack spacing="1" mt="2">
                <HStack fontSize="sm">
                  <Icon as={GoCalendar} color="gray.500" />
                  <Text>
                    Joined at{" "}
                    {challenge.creator.user.createdAt &&
                      format(
                        new Date(challenge.creator.user.createdAt),
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
              Challenge comments
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
              loading: comments.loading,
              requestPage: ({ searchObj, isPage, page, step }): void => {
                const option: any = {
                  where: {
                    challengeGallerId: {
                      equals: id,
                    },
                  },
                };
                if (searchObj) option.where.OR = searchObj;
                getComments({
                  variables: {
                    ...option,
                    take: step,
                    skip: step * (page - 1),
                  },
                });
                if (isPage) return;
              },
              data: {
                name: "Comments",
                searchObj: {
                  id: true,
                } as ChallengeCommentWhereInput,
                header: (
                  <Tr>
                    <Th>Name</Th>
                    <Th>Text</Th>
                    <Th>Created at</Th>
                    <Th></Th>
                  </Tr>
                ),
                body: comments.data?.challengeComments.map((comment) => (
                  <Tr key={comment.id}>
                    <Td>
                      <HStack spacing="3">
                        <AspectRatio flexGrow={1} flexShrink={0} flexBasis={0}>
                          <Image
                            alt=""
                            src={
                              comment.commenter.student?.avatarImage?.url ??
                              "/images/default/student.png"
                            }
                            layout="fill"
                            objectFit="contain"
                            width={64}
                            height={64}
                          />
                        </AspectRatio>
                        <Box>
                          <Text fontWeight="medium">{`${comment.commenter.firstName} ${comment.commenter.lastName}`}</Text>
                        </Box>
                      </HStack>
                    </Td>

                    <Td>
                      <Text color="muted">{comment.text}</Text>
                    </Td>

                    <Td>
                      <Text color="muted">{comment.createdAt}</Text>
                    </Td>

                    <Td>
                      <HStack spacing="1">
                        <IconButton
                          icon={<FiTrash2 fontSize="1.25rem" />}
                          variant="ghost"
                          aria-label="Delete comment"
                          onClick={onOpen}
                        />
                      </HStack>

                      <DeleteAlertDialog
                        isOpen={isOpen}
                        onClose={onClose}
                        title="Delete comment"
                        onDelete={(): void => {
                          deleteComment({
                            variables: {
                              commentId: comment.id,
                            },
                          });
                          getComments({
                            variables: {
                              where: {
                                challengeGallerId: {
                                  equals: id,
                                },
                              },
                            },
                          });
                          onClose();
                        }}
                      />
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
