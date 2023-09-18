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
  Switch,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toLower } from "lodash";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";
import { BsPencil } from "react-icons/bs";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { HiPencil } from "react-icons/hi";
import * as z from "zod";

import {
  AvatarAssetCatelogType,
  useDeleteAvatarAssetCatalogMutation,
  useFindUniqueAvatarAssetCatalogQuery,
  useFindUniqueAvatarAssetCatalogLazyQuery,
  useUpdateAvatarAssetCatalogMutation,
  useUploadAvatarAssetMutation,
  useDeleteNormalAvatarAssetMutation,
  useDeleteHairAvatarAssetMutation,
  useDeleteSkinAvatarAssetMutation,
  useEditNormalAvatarAssetMutation,
  namedOperations,
} from "schema/generated/graphql";
import { useResultCallback } from "utils/hooks/useResultCallback";
import { useUppyFileUpload } from "utils/hooks/useUppyFileUpload";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import { DataTable } from "@/components/DataTable";
import { DeleteAlertDialog } from "@/components/DeleteAlertDialog";
import { AvatarForm } from "@/features/avatar";

// for delete, edit assets
export const schemaEdit = z.object({
  label: z.string().nonempty(), //label
  category: z.string().nonempty(),
  subcategory: z.string(),
  isActive: z.boolean(),
});

// view/edit existing avatar asset's category, subcategory, name, catalog image url, asset url

const Element: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const id = router.query.id as string;
  const [readonly, setReadonly] = React.useState(true);
  const [disabledIsOuterMost, setDisabledIsOuterMost] = React.useState(false);

  const [deleteNormalAvatar] = useDeleteNormalAvatarAssetMutation();
  const [deleteSkinAvatar] = useDeleteSkinAvatarAssetMutation();
  const [deleteHairAvatar] = useDeleteHairAvatarAssetMutation();
  const [editNormalAvatarAsset] = useEditNormalAvatarAssetMutation();

  React.useEffect(() => {
    if (router.query.edit !== "true") return;
    setReadonly(false);
  }, [router.query.id]);

  const { data: assetData } = useFindUniqueAvatarAssetCatalogQuery({
    variables: {
      where: {
        id: {
          equals: id,
        },
      },
    },
  });

  const [getCatalog, { data: assetTableData, loading }] =
    useFindUniqueAvatarAssetCatalogLazyQuery({
      variables: {
        where: {
          id: {
            equals: id,
          },
        },
      },
    });

  const asset = assetData?.findOneAvatarAssetCatalog;
  // Table stuff
  const onUpdateNormalAvatarAsset = (
    id: string,
    isOuterMost: boolean,
  ): void => {
    if (toLower(asset?.avatarAssetCategory?.label) == "bottom") {
      editNormalAvatarAsset({
        variables: {
          data: {
            isOuterMost: {
              set: isOuterMost,
            },
          },
          where: {
            id,
          },
        },
        refetchQueries: [namedOperations.Query.findUniqueAvatarAssetCatalog],
        onCompleted: () => {
          setDisabledIsOuterMost(false);
        },
        onError: () => {
          setDisabledIsOuterMost(false);
        },
      });
    }
  };
  const deleteHandler = async (id: string): Promise<void> => {
    switch (asset?.type) {
      case AvatarAssetCatelogType.Hair:
        await deleteHairAvatar({
          variables: {
            where: {
              id: id,
            },
          },
        });
        break;
      case AvatarAssetCatelogType.Normal:
        await deleteNormalAvatar({
          variables: {
            where: {
              id: id,
            },
          },
        });
        break;
      case AvatarAssetCatelogType.Skin:
        await deleteSkinAvatar({
          variables: {
            where: {
              id: id,
            },
          },
        });
        break;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(schemaEdit),
  });

  React.useEffect(() => {
    if (!asset) return;

    reset({
      label: asset.label,
      category:
        asset.avatarAssetCategory.parentCategory === null
          ? asset.avatarAssetCategory.label
          : asset.avatarAssetCategory.parentCategory?.label,
      subcategory:
        asset.avatarAssetCategory.parentCategory === null
          ? ""
          : asset.avatarAssetCategory.label,
      isActive: asset.isActive,
    });
  }, [asset]);

  const [updateCatalog] = useUpdateAvatarAssetCatalogMutation();
  // File upload stuff
  const [uploadAsset, uploadedAsset] = useUploadAvatarAssetMutation();
  const { cancel, displayUppy, request, uppy } = useUppyFileUpload({
    ratio: 16 / 9,
    upload: (file): void => {
      uploadAsset({
        variables: {
          assetType: AvatarAssetCatelogType.Normal as any,
          file,
        },
      }).catch((err) => {
        console.log("err ----> ", err);
      });
      close();
    },
    disableEditing: true,
  });

  // Delete stuff
  const [displayDelete, setDisplayDelete] = React.useState(false);
  const [confirmText, setConfirmText] = React.useState("");
  const [deleteCatalog, deletedCatalog] = useDeleteAvatarAssetCatalogMutation();

  useResultCallback(
    uploadedAsset,
    (asset) => {
      updateCatalog({
        variables: {
          where: { id },
          data: { imgUrl: { set: asset } },
        },
        onCompleted: () => {
          cancel();
        },
      });
    },
    (error) => {
      toast({
        title: "Failed to update catalog img",
        description:
          error.graphQLErrors[0].extensions?.exception.meta.cause ??
          error.graphQLErrors[0].message,
        status: "error",
      });
    },
  );

  useResultCallback(
    deletedCatalog,
    (catalog) => {
      console.log(catalog);
      toast({
        title: `Catalog has been deleted`,
        status: "success",
      });
    },
    (error) => {
      toast({
        title: "Failed to delete Catalog",
        description:
          error.graphQLErrors[0].extensions?.exception.meta.cause ??
          error.graphQLErrors[0].message,
        status: "error",
      });
    },
  );

  // On Close for delete Avatar Asset
  const onCloseDelete = (): void => {
    setConfirmText("");
    setDisplayDelete(false);
  };

  // Delete alert (For all modal)
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!asset) return <>Loading</>;
  if (loading) return <>Loading</>;

  const args = {
    description: `Information about asset: ${asset.id}`,
    inputProps: {
      label: register("label"),
      category: register("category"),
      subcategory: register("subcategory"),
      isActive: register("isActive"),
    },
    photo: {
      url: asset.imgUrl ?? "",
      requestEdit: (): void => request(),
      disabled: displayUppy,
      uppy: {
        uppy,
        autoOpenFileEditor: false,
        animateOpenClose: false,
        plugins: [],
        closeModalOnClickOutside: true,
        onRequestClose: cancel,
      },
    },
    ...(readonly
      ? {
          title: "Avatar Catalog",
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
                  <ModalHeader>Delete Catalog</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>
                        <Text pb={6}>
                          This will permanently delete the catalog{" "}
                          <b>{`${asset.label}`}</b> and all associated
                          information related to them
                        </Text>
                        <Text pb={6}>
                          Please type <b>{`${asset.label}`}</b> to confirm
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
                      disabled={confirmText !== `${asset.label}`}
                      onClick={(): void => {
                        deleteCatalog({
                          variables: { where: { id } },
                        });
                        router.push("/avatars");
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
          title: "Edit Avatar Catalog",
          errors,
          onSubmit: handleSubmit((data: any) => {
            updateCatalog({
              variables: {
                data: {
                  label: { set: data.label },
                  isActive: { set: data.isActive },
                },
                where: {
                  id: asset.id,
                },
              },
            });
            setReadonly(true);
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
      {/* Challenge Form -- To Update*/}
      <AvatarForm {...args}>
        {/* Divider -- Empty */}
        <Box maxW="100%">
          <Box>
            <Container py={{ base: "4", md: "8" }}>
              <HStack>
                <Divider />
              </HStack>
            </Container>
          </Box>

          {/* Comments Table */}
          <Stack
            direction={{ base: "row", lg: "row" }}
            spacing={{ base: "5", lg: "8" }}
            px={{ base: "4", md: "6" }}
            py={{ base: "5", md: "6" }}
            justify="flex-end"
            width="100%"
          >
            <HStack spacing="3">
              <Button
                variant="primary"
                onClick={(): any =>
                  router.push({
                    pathname: `/avatars/${id}/create`,
                    query: {
                      tab: assetTableData?.findOneAvatarAssetCatalog
                        ?.avatarAssetCategory?.label,
                    },
                  })
                }
              >
                Create
              </Button>
            </HStack>
          </Stack>
          <Stack
            direction={{ base: "column", lg: "row" }}
            spacing={{ base: "5", lg: "8" }}
            px={{ base: "4", md: "6" }}
            py={{ base: "5", md: "6" }}
            justify="space-between"
          >
            <Box flexGrow={1} overflow="auto">
              <DataTable
                {...{
                  loading: loading,
                  requestPage: ({ searchObj, isPage, page, step }): void => {
                    const option: any = {
                      where: {
                        id: {
                          equals: id,
                        },
                      },
                    };
                    if (searchObj) option.where.OR = searchObj;
                    getCatalog({
                      variables: {
                        ...option,
                        take: step,
                        skip: step * (page - 1),
                      },
                    });
                    if (isPage) return;
                  },
                  data: {
                    name: "Assets",
                    searchObj: {
                      id: true,
                    },
                    header: (
                      <Tr>
                        <Th>Image</Th>
                        <Th>Label</Th>
                        <Th>Image URL</Th>
                        <Th>Created at</Th>
                        <Th>Updated at</Th>
                        {!(
                          toLower(
                            assetTableData?.findOneAvatarAssetCatalog
                              ?.avatarAssetCategory?.label,
                          ) != "bottom" || disabledIsOuterMost
                        ) && <Th>Is outer most</Th>}
                        <Th></Th>
                      </Tr>
                    ),
                    body: (assetTableData?.findOneAvatarAssetCatalog.type ===
                    AvatarAssetCatelogType.Normal
                      ? assetTableData?.findOneAvatarAssetCatalog
                          .normalAvatarAsset
                      : assetTableData?.findOneAvatarAssetCatalog.type ===
                        AvatarAssetCatelogType.Skin
                      ? assetTableData?.findOneAvatarAssetCatalog
                          .skinAvatarAsset
                      : assetTableData?.findOneAvatarAssetCatalog.type ===
                        AvatarAssetCatelogType.Hair
                      ? assetTableData?.findOneAvatarAssetCatalog
                          .hairAvatarAsset
                      : []
                    )?.map((asset: any) => {
                      return (
                        <Tr key={asset.id}>
                          <Td width={400}>
                            <AspectRatio
                              flexGrow={1}
                              flexShrink={1}
                              flexBasis={1}
                            >
                              <Image
                                alt=""
                                src={
                                  asset.imgUrl ?? "/images/default/student.png"
                                }
                                layout="fill"
                                objectFit="contain"
                                width={300}
                                height={300}
                              />
                            </AspectRatio>
                          </Td>

                          <Td>
                            <Text color="muted">{asset.label}</Text>
                          </Td>

                          <Td
                            onClick={(): void => {
                              navigator.clipboard.writeText(asset.imgUrl);
                              toast({
                                title: `Image URL has been copied`,
                                status: "success",
                              });
                            }}
                            className="hover:cursor-pointer"
                          >
                            <Text color="muted" maxWidth={150} isTruncated>
                              {asset.imgUrl}
                            </Text>
                          </Td>

                          <Td>
                            <Text color="muted">
                              {new Date(asset.createdAt).toUTCString()}
                            </Text>
                          </Td>

                          <Td>
                            <Text color="muted">
                              {new Date(asset.updatedAt).toUTCString()}
                            </Text>
                          </Td>
                          {!(
                            toLower(
                              assetTableData?.findOneAvatarAssetCatalog
                                ?.avatarAssetCategory?.label,
                            ) != "bottom" || disabledIsOuterMost
                          ) && (
                            <Td>
                              <Switch
                                isChecked={asset.isOuterMost}
                                onChange={(): void => {
                                  setDisabledIsOuterMost(true);
                                  onUpdateNormalAvatarAsset(
                                    asset.id,
                                    !asset.isOuterMost,
                                  );
                                }}
                                disabled={
                                  toLower(
                                    assetTableData?.findOneAvatarAssetCatalog
                                      ?.avatarAssetCategory?.label,
                                  ) != "bottom" || disabledIsOuterMost
                                }
                              />
                            </Td>
                          )}
                          <Td>
                            <HStack spacing="1">
                              <IconButton
                                icon={<FiEye fontSize="1.25rem" />}
                                variant="ghost"
                                aria-label="View course"
                                onClick={(): any =>
                                  router.push(
                                    `/avatars/assets/${asset.id}?type=${assetTableData?.findOneAvatarAssetCatalog.type}`,
                                  )
                                }
                              />
                              <IconButton
                                icon={<BsPencil fontSize="1.25rem" />}
                                variant="ghost"
                                aria-label="Edit Asset"
                                onClick={(): void => {
                                  router.push(
                                    `/avatars/assets/${asset.id}?type=${assetTableData?.findOneAvatarAssetCatalog.type}&edit=true`,
                                  );
                                }}
                              />
                              <IconButton
                                icon={<FiTrash2 fontSize="1.25rem" />}
                                variant="ghost"
                                aria-label="Delete Asset"
                                onClick={onOpen}
                              />
                            </HStack>

                            <DeleteAlertDialog
                              isOpen={isOpen}
                              onClose={onClose}
                              title="Delete asset"
                              onDelete={(): void => {
                                deleteHandler(asset.id).then(() => {
                                  getCatalog({
                                    variables: {
                                      where: {
                                        id: {
                                          equals: id,
                                        },
                                      },
                                    },
                                  });
                                });
                                onClose();
                              }}
                            />
                          </Td>
                        </Tr>
                      );
                    }),
                  },
                }}
              />
            </Box>
          </Stack>
        </Box>
      </AvatarForm>
    </>
  );
};

export default withAuthenticated(withApollo(Element));
