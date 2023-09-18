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
import _ from "lodash";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";
import { BsPencil } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FiEye, FiPlus, FiTrash2 } from "react-icons/fi";
import { GoCalendar, GoEye } from "react-icons/go";
import { HiPencil } from "react-icons/hi";
import { IconContext } from "react-icons/lib";
import * as z from "zod";

import {
  SortOrder,
  useCountForumPostsLazyQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useFindUniquePostQuery,
  useUpdatePostMutation,
  useFindAllPostLazyQuery,
} from "schema/generated/graphql";
import { useResultCallback } from "utils/hooks/useResultCallback";
import {
  formatSortOrder,
  useSortOrderManager,
} from "utils/hooks/useSortOrderManager";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import { DataTable } from "@/components/DataTable";
import { DeleteAlertDialog } from "@/components/DeleteAlertDialog";
import { ForumCommentForm } from "@/features/forum";
import { TextAreaInput } from "@/features/Input/TextAreaInput";

export const schemaEdit = z.object({
  text: z.string().nonempty(),
  commentType: z.string().nonempty(),
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

  const forumPostComment = useFindUniquePostQuery({
    variables: {
      where: {
        id,
      },
    },
  });

  const forumComment = forumPostComment.data?.findOnePosts;

  const [fetchComments, { data: commentData, loading: commentLoading }] =
    useFindAllPostLazyQuery();
  const [fetchCount, count] = useCountForumPostsLazyQuery();
  const [updateComment, updatedComment] = useUpdatePostMutation();

  useResultCallback(
    updatedComment,
    (comment) => {
      forumPostComment.refetch();
      setReadonly(true);
      toast({
        title: `Updated ${comment.text}`,
        status: "success",
      });
    },
    (error) => {
      toast({
        title: "Failed to update Forum comment",
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

  const commentQuery = {
    where: {
      parentPostId: {
        equals: id,
      },
      deleted: {
        equals: null,
      },
    },
    orderBy: {
      createdAt: SortOrder.Desc,
    },
  };

  React.useEffect(() => {
    if (!forumComment) return;
    reset({
      text: forumComment.text,
      commentType: forumComment.isSubComment ? "Sub" : "Main",
    });
    fetchComments({
      variables: { ...commentQuery },
    });
  }, [forumComment]);

  const colourModeValue = useColorModeValue("sm", "sm-dark");

  // Table stuff
  const [newCommentText, setNewCommentText] = React.useState("");
  const [createComment] = useCreatePostMutation();

  // Delete stuff
  const [displayDelete, setDisplayDelete] = React.useState(false);
  const [confirmText, setConfirmText] = React.useState("");
  const [deleteComment, deletedComment] = useDeletePostMutation();
  const [selectedComment, setSelectedComment] = React.useState("");

  useResultCallback(
    deletedComment,
    (comment) => {
      toast({
        title: `Forum comment ${comment.id} has been deleted`,
        status: "success",
      });
      router.push(
        `/forum${comment.parentPostId ? "/" + comment.parentPostId : ""}`,
      );
    },
    (error) => {
      toast({
        title: "Failed to delete Forum comment",
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

  const { list, toggle, getOrderBy } = useSortOrderManager();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // for create comment modal
  const {
    isOpen: isCreateCommentOpen,
    onOpen: onCreateCommentOpen,
    onClose: onCreateCommentClose,
  } = useDisclosure();

  if (!forumComment) return <>Loading</>;

  const args = {
    description: `Information about forum comment id ${forumComment.id}`,
    forumPostId: forumComment.parentPostId,
    isSubComment: forumComment.isSubComment,
    inputProps: {
      text: register("text"),
      commentType: register("commentType"),
    },
    forumReaction: forumComment.ForumReaction,
    ...(readonly
      ? {
          title: "Forum Comment Details",
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
                          This will permanently delete the forum post{" "}
                          <b>{`${forumComment.id}`}</b> and all associated
                          information related to them
                        </Text>
                        <Text pb={6}>
                          Please type <b>{`${forumComment.id}`}</b> to confirm
                        </Text>
                        <Text pb={6} textColor="red">
                          This action <b>cannot</b> be undone
                        </Text>
                      </FormLabel>
                      <Input
                        value={confirmText}
                        onChange={(e: any): void =>
                          setConfirmText(e.target.value)
                        }
                      />
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="red"
                      mr={3}
                      disabled={confirmText !== `${forumComment.id}`}
                      onClick={async (): Promise<void> => {
                        await deleteComment({
                          variables: {
                            id: forumComment.id,
                          },
                        });
                      }}
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
          title: "Edit Forum Post Details",
          errors,
          onSubmit: handleSubmit((data: any) => {
            updateComment({
              variables: {
                id,
                data: {
                  text: data.text,
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
      <ForumCommentForm {...args} />

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
                  <Avatar boxSize="16" icon={<FaUser />} />
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
                  {`${forumComment.user.firstName ?? ""} ${
                    forumComment.user.lastName ?? ""
                  }`}
                </Text>
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={
                    <Icon as={GoEye} color="gray.400" marginStart="-1" />
                  }
                  onClick={(): any =>
                    router.push(
                      `../${_.lowerCase(forumComment.user.role)}s/${
                        forumComment.userId
                      }`,
                    )
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
                    {forumComment.user.createdAt &&
                      format(
                        new Date(forumComment.user.createdAt),
                        "dd/MM/yy hh:mm:ss",
                      )}
                  </Text>
                </HStack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {!forumComment.isSubComment && (
        <>
          <Box>
            <Container py={{ base: "4", md: "8" }}>
              <HStack>
                <Divider />
                <Text fontSize="lg" fontWeight="medium" flexShrink={0}>
                  Forum Comments
                </Text>
                <Divider />
              </HStack>
            </Container>
          </Box>

          <Container py={{ base: "4", md: "8" }}>
            <div className="pb-4">
              {!forumComment.isSubComment && (
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={<FiPlus fontSize="1.25rem" />}
                  onClick={onCreateCommentOpen}
                >
                  {" "}
                  Add Forum Subcomment
                </Button>
              )}

              {/* Modal for create new comment */}
              <Modal
                isOpen={isCreateCommentOpen}
                onClose={onCreateCommentClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Create new subcomment</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormControl>
                      <FormLabel>Subcomment Text</FormLabel>
                      <TextAreaInput
                        inputProps={{
                          placeholder: "Enter your comment",
                          required: true,
                          value: newCommentText,
                          onChange: (e: any): void =>
                            setNewCommentText(e.target.value),
                        }}
                      />
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme={"blue"}
                      mr={3}
                      onClick={async (): Promise<void> => {
                        await createComment({
                          variables: {
                            text: newCommentText,
                            categoryId: forumComment.categoryId,
                            parentPostId: forumComment.id,
                          },
                          onCompleted: () => {
                            fetchComments({
                              variables: { ...commentQuery },
                            });
                          },
                        }).catch((err) => err);

                        setNewCommentText("");
                        onCreateCommentClose();
                      }}
                    >
                      Confirm
                    </Button>
                    <Button
                      onClick={(): void => {
                        setNewCommentText("");
                        onCreateCommentClose();
                      }}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
            <DataTable
              {...{
                externalCallRequest: list,
                requestPage: ({ searchObj, isPage, page, step }): any => {
                  const option: any = {
                    where: {
                      mainCommentId: {
                        equals: id,
                      },
                      deletedAt: {
                        equals: null,
                      },
                    },
                  };

                  if (searchObj)
                    option.where = {
                      mainCommentId: {
                        equals: id,
                      },
                      deletedAt: {
                        equals: null,
                      },
                      OR: searchObj,
                    };
                  if (isPage === true)
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
                    }, [] as any[]);

                  fetchComments({
                    variables: {
                      ...option,
                      take: step,
                      skip: step * (page - 1),
                    },
                  });
                },
                loading: commentLoading,
                data: {
                  name: "Comments",
                  count: count.data?.forumPostsCount,
                  searchObj: {
                    id: true,
                    text: true,
                    user: {
                      is: { firstName: true, lastName: true },
                    },
                  } as unknown,
                  header: (
                    <Tr>
                      {[
                        ["Text", "text"],
                        ["Creator", "creator"],
                        ["Comment Type", "isSubComment"],
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
                      ))}
                      <Th></Th>
                    </Tr>
                  ),
                  body:
                    commentData &&
                    commentData.findManyPosts.map((comment) => (
                      <Tr key={comment.id}>
                        <Td>
                          <Box>
                            <Text fontWeight="medium">{comment.text}</Text>
                          </Box>
                        </Td>
                        <Td>
                          <Text color="muted">
                            {comment.user.firstName} {comment.user.lastName}
                          </Text>
                        </Td>
                        <Td>
                          <Text color="muted">
                            {comment.isSubComment ? "Sub" : "Main"}
                          </Text>
                        </Td>
                        <Td>
                          <Text color="muted">
                            {format(
                              new Date(comment.createdAt),
                              "dd/MM/yy hh:mm:ss",
                            )}
                          </Text>
                        </Td>
                        <Td>
                          <Text color="muted">
                            {format(
                              new Date(comment.updatedAt),
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
                                router.push(`/forum/comments/${comment.id}`)
                              }
                            />
                            <IconButton
                              icon={<BsPencil fontSize="1.25rem" />}
                              variant="ghost"
                              aria-label="Edit Asset"
                              onClick={(): void => {
                                router.push(
                                  `/forum/comments/${comment.id}?edit=true`,
                                );
                              }}
                            />
                            <IconButton
                              icon={<FiTrash2 fontSize="1.25rem" />}
                              variant="ghost"
                              aria-label="Delete Comment"
                              onClick={(): void => {
                                setSelectedComment(comment.id);
                                onOpen();
                              }}
                            />
                          </HStack>

                          <DeleteAlertDialog
                            isOpen={isOpen && selectedComment === comment.id}
                            onClose={(): void => {
                              setSelectedComment("");
                              onClose();
                            }}
                            title="Delete comment"
                            onDelete={async (): Promise<void> => {
                              await deleteComment({
                                variables: {
                                  id: comment.id,
                                },
                                onCompleted: () => {
                                  fetchComments({
                                    variables: { ...commentQuery },
                                  });
                                },
                              }).catch((err) => err);
                              setSelectedComment("");
                              onClose();
                            }}
                          />
                        </Td>
                      </Tr>
                    )),
                },
              }}
            />
          </Container>
        </>
      )}
    </>
  );
};

export default withAuthenticated(withApollo(Element));
