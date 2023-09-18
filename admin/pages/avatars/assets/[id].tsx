// chakra imports
import {
  Button,
  Flex,
  Text,
  HStack,
  Box,
  Container,
  Divider,
  useToast,
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
import type { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";
import { HiPencil } from "react-icons/hi";
import * as z from "zod";

import {
  AvatarAssetCatelogType,
  useFindOneNormalAvatarAssetQuery,
  useFindOneHairAvatarAssetQuery,
  useFindOneSkinAvatarAssetQuery,
  useUploadAvatarAssetMutation,
  useDeleteNormalAvatarAssetMutation,
  useDeleteHairAvatarAssetMutation,
  useDeleteSkinAvatarAssetMutation,
  useEditNormalAvatarAssetMutation,
  useEditHairAvatarAssetMutation,
  useEditSkinAvatarAssetMutation,
} from "schema/generated/graphql";
import { useResultCallback } from "utils/hooks/useResultCallback";
import { useUppyFileUpload } from "utils/hooks/useUppyFileUpload";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

import { AssetForm } from "@/features/asset";

// for delete, edit assets
export const schemaEdit = z.object({
  label: z.string().nonempty(), //label
  // category: z.string().nonempty(),
  // subcategory: z.string(),
});

// view/edit existing avatar asset's category, subcategory, name, catalog image url, asset url

const Element: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const id = router.query.id as string;
  const type = router.query.type as string;
  const [readonly, setReadonly] = React.useState(true);

  React.useEffect(() => {
    if (router.query.edit !== "true") return;
    setReadonly(false);
  }, [router.query.id]);

  const { data: normalData } = useFindOneNormalAvatarAssetQuery({
    variables: {
      where: {
        id: {
          equals: id,
        },
      },
    },
  });

  const { data: hairData } = useFindOneHairAvatarAssetQuery({
    variables: {
      where: {
        id: {
          equals: id,
        },
      },
    },
  });

  const { data: skinData } = useFindOneSkinAvatarAssetQuery({
    variables: {
      where: {
        id: {
          equals: id,
        },
      },
    },
  });

  const [deleteNormalAvatar, deletedNormalAvatar] =
    useDeleteNormalAvatarAssetMutation();
  const [deleteSkinAvatar, deletedSkinAvatar] =
    useDeleteSkinAvatarAssetMutation();
  const [deleteHairAvatar, deletedHairAvatar] =
    useDeleteHairAvatarAssetMutation();

  const [editNormalAvatar] = useEditNormalAvatarAssetMutation();
  const [editSkinAvatar] = useEditSkinAvatarAssetMutation();
  const [editHairAvatar] = useEditHairAvatarAssetMutation();

  const asset =
    type === AvatarAssetCatelogType.Normal
      ? normalData?.findOneNormalAvatarAsset
      : type === AvatarAssetCatelogType.Skin
      ? skinData?.findOneSkinAvatarAsset
      : type === AvatarAssetCatelogType.Hair
      ? hairData?.findOneHairAvatarAsset
      : undefined;

  // Delete asset
  const deleteHandler = (id: string): void => {
    switch (type) {
      case AvatarAssetCatelogType.Hair:
        deleteHairAvatar({
          variables: {
            where: {
              id: id,
            },
          },
        });
        break;
      case AvatarAssetCatelogType.Normal:
        deleteNormalAvatar({
          variables: {
            where: {
              id: id,
            },
          },
        });
        break;
      case AvatarAssetCatelogType.Skin:
        deleteSkinAvatar({
          variables: {
            where: {
              id: id,
            },
          },
        });
        break;
    }
  };

  // edit asset
  const editHandler = (id: string, label: string): void => {
    switch (type) {
      case AvatarAssetCatelogType.Hair:
        editHairAvatar({
          variables: {
            data: {
              label: {
                set: label,
              },
            },
            where: {
              id: id,
            },
          },
        });
        break;
      case AvatarAssetCatelogType.Normal:
        editNormalAvatar({
          variables: {
            data: {
              label: {
                set: label,
              },
            },
            where: {
              id: id,
            },
          },
        });
        break;
      case AvatarAssetCatelogType.Skin:
        editSkinAvatar({
          variables: {
            data: {
              label: {
                set: label,
              },
            },
            where: {
              id: id,
            },
          },
        });
        break;
    }
    setReadonly(true);
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
      category: "",
      subcategory: "",
    });
  }, [asset]);

  // File upload stuff
  const [uploadAsset, uploadedAsset] = useUploadAvatarAssetMutation();
  const { cancel, displayUppy, request, uppy } = useUppyFileUpload({
    ratio: 16 / 9,
    upload: (file): void => {
      uploadAsset({
        variables: {
          assetType: type as any,
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

  useResultCallback(
    uploadedAsset,
    (asset) => {
      if (type === AvatarAssetCatelogType.Normal) {
        editNormalAvatar({
          variables: {
            where: { id },
            data: { imgUrl: { set: asset } },
          },
          onCompleted: () => {
            cancel();
          },
        });
      } else if (type === AvatarAssetCatelogType.Skin) {
        editSkinAvatar({
          variables: {
            where: { id },
            data: { imgUrl: { set: asset } },
          },
          onCompleted: () => {
            cancel();
          },
        });
      } else if (type === AvatarAssetCatelogType.Hair) {
        editHairAvatar({
          variables: {
            where: { id },
            data: { imgUrl: { set: asset } },
          },
          onCompleted: () => {
            cancel();
          },
        });
      }
      setReadonly(true);
    },
    (error) => {
      toast({
        title: "Failed to update asset img",
        description:
          error.graphQLErrors[0].extensions?.exception.meta.cause ??
          error.graphQLErrors[0].message,
        status: "error",
      });
    },
  );

  useResultCallback(
    type === AvatarAssetCatelogType.Normal
      ? deletedNormalAvatar
      : type === AvatarAssetCatelogType.Hair
      ? deletedHairAvatar
      : deletedSkinAvatar,
    () => {
      toast({
        title: `Asset has been deleted`,
        status: "success",
      });
    },
    (error) => {
      toast({
        title: "Failed to delete Asset",
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
  // const { isOpen, onOpen, onClose } = useDisclosure();

  if (!asset) return <>Loading</>;
  // if (loading) return <>Loading</>;

  const args = {
    description: `Information about item: ${asset.id}`,
    inputProps: {
      label: register("label"),
      // category: register("category"),
      // subcategory: register("subcategory"),
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
          title: "Asset item",
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
                  <ModalHeader>Delete Asset</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>
                        <Text pb={6}>
                          This will permanently delete the item{" "}
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
                        deleteHandler(asset.id);
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
          title: "Edit Avatar Asset",
          errors,
          onSubmit: handleSubmit((data: any) => {
            editHandler(id, data.label);
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
  console.log("id ----> ", id);
  return (
    <>
      {/* Challenge Form -- To Update*/}
      <AssetForm {...args} />
      {/* Divider -- Empty */}
      <Box>
        <Container py={{ base: "4", md: "8" }}>
          <HStack>
            <Divider />
          </HStack>
        </Container>
      </Box>
    </>
  );
};

export default withAuthenticated(withApollo(Element));
