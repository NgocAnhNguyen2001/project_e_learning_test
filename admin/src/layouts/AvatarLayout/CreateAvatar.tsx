// chakra imports
import {
  Stack,
  Heading,
  useBreakpointValue,
  Button,
  Text,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Box,
  StackDivider,
  useColorModeValue,
  useToast,
  Switch,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";

import {
  AvatarAssetCatelogType,
  useCreateAvatarAssetCatalogMutation,
  useUploadAvatarAssetMutation,
  ItemCatalogType,
} from "schema/generated/graphql";
import { useResultCallback } from "utils/hooks/useResultCallback";

interface Props {
  tab: string;
  categoryId: string;
}

export const CreateAvatar: React.FC<Props> = (props): React.ReactElement => {
  const { tab, categoryId } = props;

  const toast = useToast();
  const router = useRouter();
  const [uploadAsset] = useUploadAvatarAssetMutation();
  const [createAsset, asset] = useCreateAvatarAssetCatalogMutation();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const getType = (): {
    catalogType: ItemCatalogType;
    assetType: any;
  } => {
    const characters: any = {
      Ears: AvatarAssetCatelogType.Skin,
      Shoes: AvatarAssetCatelogType.Normal,
      Shirt: AvatarAssetCatelogType.Normal,
      Jacket: AvatarAssetCatelogType.Normal,
      Bottom: AvatarAssetCatelogType.Normal,
    };
    const Accessories: any = {
      Head: AvatarAssetCatelogType.Normal,
      Eyes: AvatarAssetCatelogType.Normal,
      Items: AvatarAssetCatelogType.Normal,
      Pets: AvatarAssetCatelogType.Normal,
    };

    if (tab in characters) {
      return {
        catalogType: ItemCatalogType.Character,
        assetType: characters[tab],
      };
    }
    return {
      catalogType: ItemCatalogType.Accessory,
      assetType: Accessories[tab],
    };
  };

  async function onSubmit(values: any): Promise<void> {
    const { assetType } = getType();
    await uploadAsset({
      variables: {
        assetType: assetType,
        file: values.file[0],
      },
      onCompleted: (data) => {
        uploadAsset({
          variables: {
            assetType: assetType,
            file: values.asset_file[0],
          },
          onCompleted: (asset_data) => {
            createAsset({
              variables: {
                data: {
                  label: values.label,
                  type: assetType,
                  imgUrl: data.uploadAvatarAsset,
                  isActive: values.is_active,
                  avatarAssetCategory: {
                    connect: { id: categoryId },
                  },
                  normalAvatarAsset: {
                    create: [
                      {
                        imgUrl: asset_data.uploadAvatarAsset,
                        label: values.asset_label,
                      },
                    ],
                  },
                },
              },
              onCompleted: () => {
                router.push({ pathname: "/avatars", query: { tab: tab } });
              },
            });
          },
        });
      },
    });
  }

  useResultCallback(
    asset,
    (asset) => {
      toast({
        title: `Asset ${asset.label} has been created`,
        status: "success",
      });
      router.push({ pathname: "/avatars", query: { tab: tab } });
    },
    (error) => {
      toast({
        title: "Failed to create Asset",
        description:
          error.graphQLErrors[0]?.extensions?.exception?.meta?.cause ??
          error.graphQLErrors[0]?.message ??
          error.message,
        status: "error",
      });
    },
  );

  return (
    <Stack>
      <Stack
        spacing={{ base: "8", lg: "6" }}
        className="ml-6"
        justify="space-between"
        align="flex-start"
        pt="8"
        flexDirection={{ base: "column", xl: "row" }}
      >
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
              Create avatar Catalog
            </Heading>
            <Text color="muted">Information about this avatar Catalog.</Text>
          </Stack>
        </Stack>

        <Stack spacing="5" divider={<StackDivider />}>
          <Stack
            direction={{ base: "column", lg: "row" }}
            spacing={{ base: "5", lg: "8" }}
            justify="space-between"
          >
            <Box
              as="form"
              width="xl"
              bg="bg-surface"
              boxShadow={useColorModeValue("sm", "sm-dark")}
              borderRadius="lg"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <Stack
                spacing="5"
                px={{ base: "4", md: "6" }}
                py={{ base: "5", md: "6" }}
              >
                <FormControl isInvalid={errors.label}>
                  <FormLabel htmlFor="label">Catalog label</FormLabel>
                  <Input
                    id="label"
                    placeholder="label"
                    required
                    {...register("label", {
                      required: "This is required",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.label && errors.label.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <div className="text-center">
                    <h1>
                      <b>{tab}</b>
                    </h1>
                  </div>
                </FormControl>

                <FormControl isInvalid={errors.label}>
                  <FormLabel htmlFor="file">Catalog file</FormLabel>
                  <Input
                    className="py-1"
                    id="file"
                    type="file"
                    required
                    {...register("file", {
                      required: "This is required",
                      validate: (e) => {
                        if (!e?.[0]?.type?.includes("image"))
                          return "This field accepts images only!";
                        return true;
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.file && errors.file.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.label}>
                  <FormLabel htmlFor="label">Asset label</FormLabel>
                  <Input
                    id="asset_label"
                    placeholder="asset label"
                    required
                    {...register("asset_label", {
                      required: "This is required",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.asset_label && errors.asset_label.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.label}>
                  <FormLabel htmlFor="file">Asset file</FormLabel>
                  <Input
                    className="py-1"
                    id="asset_file"
                    type="file"
                    required
                    {...register("asset_file", {
                      required: "This is required",
                      validate: (e) => {
                        if (!e?.[0]?.type?.includes("image"))
                          return "This field accepts images only!";
                        return true;
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.asset_file && errors.asset_file.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.label}>
                  <FormLabel htmlFor="label">Is Active</FormLabel>
                  <Switch
                    id="is_active"
                    // placeholder="asset label"
                    required
                    {...register("is_active")}
                  />
                </FormControl>

                <Button
                  mt={4}
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
