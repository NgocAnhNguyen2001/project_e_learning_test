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
import { toLower } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";

import {
  AvatarAssetCatelogType,
  useUploadAvatarAssetMutation,
  ItemCatalogType,
  useUpdateAvatarAssetCatalogMutation,
} from "schema/generated/graphql";
import { useResultCallback } from "utils/hooks/useResultCallback";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";

const Element: NextPage = () => {
  const router = useRouter();

  const { id, tab } = router.query;

  const toast = useToast();
  const [uploadAsset] = useUploadAvatarAssetMutation();
  const [updateCatalog, catalog] = useUpdateAvatarAssetCatalogMutation();

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

    if ((tab as string) in characters) {
      return {
        catalogType: ItemCatalogType.Character,
        assetType: characters[tab as string],
      };
    }
    return {
      catalogType: ItemCatalogType.Accessory,
      assetType: Accessories[tab as string],
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
        updateCatalog({
          variables: {
            data: {
              normalAvatarAsset: {
                create: [
                  {
                    imgUrl: data.uploadAvatarAsset,
                    label: values.label,
                    isOuterMost: values.isOuterMost,
                  },
                ],
              },
            },
            where: {
              id: id as string,
            },
          },
          onCompleted: () => {
            router.push({ pathname: "/avatars", query: { tab: tab } });
          },
        });
      },
    });
  }

  useResultCallback(
    catalog,
    () => {
      toast({
        title: `Asset has been created`,
        status: "success",
      });
      router.push({ pathname: `/avatars/${id}` });
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
              Create asset item
            </Heading>
            <Text color="muted">Information about this asset item.</Text>
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
                  <FormLabel htmlFor="label">Asset label</FormLabel>
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

                <FormControl isInvalid={errors.label}>
                  <FormLabel htmlFor="file">Asset file</FormLabel>
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

                {toLower(tab as string) === "bottom" && (
                  <FormControl isInvalid={errors.label}>
                    <FormLabel htmlFor="label">Is outer most</FormLabel>
                    <Switch
                      id="isOuterMost"
                      // placeholder="asset label"
                      required
                      {...register("isOuterMost")}
                    />
                  </FormControl>
                )}

                <Button
                  mt={4}
                  colorScheme="teal"
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

export default withAuthenticated(withApollo(Element));
