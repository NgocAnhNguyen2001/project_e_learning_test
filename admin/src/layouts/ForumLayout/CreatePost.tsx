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
  Box,
  StackDivider,
  useColorModeValue,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";

import {
  useCreatePostMutation,
  useFindAllCategoriesQuery,
} from "schema/generated/graphql";
import { useResultCallback } from "utils/hooks/useResultCallback";

import { TextAreaInput } from "@/features/Input/TextAreaInput";

export const CreatePost: React.FC = (): React.ReactElement => {
  const toast = useToast();
  const router = useRouter();

  const [createPost, post] = useCreatePostMutation();

  const { data: categoriesOption } = useFindAllCategoriesQuery();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  async function onSubmit(values: any): Promise<void> {
      await createPost({
          variables: {
            text: values.text,
            categoryId: values.category,
          },
          onCompleted: () => {
            router.push("/forum");
          },
        });
    };
  

  // after asset created
  useResultCallback(
    post,
    (post) => {
      toast({
        title: `Forum Post ${post.id} has been created`,
        status: "success",
      });
      router.push("/forum");
    },
    (error) => {
      toast({
        title: "Failed to create Forum Post",
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
              Create Forum Post
            </Heading>
            <Text color="muted">Information about this forum post.</Text>
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
                  <FormLabel htmlFor="text">Text</FormLabel>
                  <TextAreaInput
                    inputProps={{
                      placeholder: "Write your text here",
                      ...register("text", {
                        required: "This is required",
                      }),
                      required: true,
                    }}
                  />
                  <FormErrorMessage>
                    {errors.label && errors.label.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel>Category</FormLabel>
                  {/* Category dropdown */}
                  <div className="text-left">
                    <Select
                      placeholder="Choose the category"
                      required
                      {...register("category", {
                        required: "This is required",
                      })}
                    >
                      {categoriesOption &&
                        categoriesOption?.categories.map((category) => {
                          return (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          );
                        })}
                    </Select>
                  </div>
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
