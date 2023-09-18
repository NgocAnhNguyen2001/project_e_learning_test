import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Stack,
  useColorModeValue,
  Container,
  StackDivider,
  Text,
  HStack,
  AspectRatio,
  Spinner,
} from "@chakra-ui/react";
import { Dashboard } from "@uppy/react";
import Image from "next/image";
import * as React from "react";
import { GrClose } from "react-icons/gr";

import { FieldWrapper } from "@/components/Form/FieldWrapper";
import { Input } from "@/features/Input/Input";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/image-editor/dist/style.css";

type Props = {
  title: string;
  description: string;
  onSubmit?: any;
  errors?: any;
  buttons?: any;
  inputProps?: {
    label?: any;
    // category?: any;
    // subcategory?: any;
  };
  photo?: {
    url: string;
    requestEdit: any;
    disabled: any;
    uppy: any;
  };
  readonly?: boolean;
};

export const AssetForm = (props: Props): React.ReactElement => {
  const {
    title,
    description,
    onSubmit,
    errors,
    buttons,
    inputProps,
    photo,
    readonly,
  } = props;

  return (
    <Container py={{ base: "4", md: "8" }}>
      <Stack spacing="5" divider={<StackDivider />}>
        <Stack
          direction={{ base: "column", lg: "row" }}
          spacing={{ base: "5", lg: "8" }}
          justify="space-between"
        >
          <Box flexShrink={0}>
            <Text fontSize="lg" fontWeight="medium">
              {title}
            </Text>
            <Text color="muted" fontSize="sm">
              {description}
            </Text>
          </Box>
          <Box
            as="form"
            bg="bg-surface"
            boxShadow={useColorModeValue("sm", "sm-dark")}
            borderRadius="lg"
            onSubmit={onSubmit}
          >
            <Stack
              spacing="5"
              px={{ base: "4", md: "6" }}
              py={{ base: "5", md: "6" }}
            >
              {photo && (
                <Stack>
                  <HStack justifyContent="space-between">
                    <FormLabel>Item Image</FormLabel>
                    <Button
                      variant="ghost"
                      onClick={(): void => photo?.uppy.onRequestClose()}
                      hidden={!photo?.disabled}
                    >
                      <GrClose />
                    </Button>
                  </HStack>
                  <Dashboard {...photo?.uppy} hidden={true}></Dashboard>
                  <HStack flexGrow={1}>
                    <AspectRatio flex="1 1 auto">
                      {photo?.disabled ? (
                        <div>
                          <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                          />
                        </div>
                      ) : (
                        <>
                          <Box
                            pos="absolute"
                            zIndex={1}
                            transition={"ease-in-out 0.1s"}
                            background={"#0007"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            opacity={0}
                            {...{
                              display: "flex",
                              onClick: (): void => photo?.requestEdit?.(),
                              _hover: { opacity: 1 },
                              cursor: "pointer",
                            }}
                            {...(readonly
                              ? {
                                  hidden: true,
                                }
                              : {})}
                          >
                            <Text color={"white"}>Upload a new Image</Text>
                          </Box>
                          <Image
                            alt=""
                            src={photo?.url || "/images/default/course.png"}
                            layout="fill"
                            objectFit="contain"
                          />
                        </>
                      )}
                    </AspectRatio>
                  </HStack>
                </Stack>
              )}
              <Stack>
                <FormControl id="label">
                  <FormLabel>Label</FormLabel>
                  <FieldWrapper
                    {...{
                      error: errors?.firstName,
                    }}
                  >
                    <Input
                      {...{
                        inputProps: inputProps?.label,
                        readonly,
                      }}
                    />
                  </FieldWrapper>
                </FormControl>
                {/* <FormControl id="category">
                  <FormLabel>Category</FormLabel>
                  <FieldWrapper
                    {...{
                      error: errors?.gender,
                      parentProps: {
                        style: {
                          width: 0,
                          minWidth: "-webkit-fill-available",
                        },
                      },
                    }}
                  >
                    <Input
                      {...{
                        inputProps: inputProps?.category,
                      }}
                      readonly={true}
                    />
                  </FieldWrapper>
                </FormControl>
                <FormControl id="subcategory">
                  <FormLabel>Sub Category</FormLabel>
                  <FieldWrapper
                    {...{
                      error: errors?.gender,
                      parentProps: {
                        style: {
                          width: 0,
                          minWidth: "-webkit-fill-available",
                        },
                      },
                    }}
                  >
                    <Input
                      {...{
                        inputProps: inputProps?.subcategory,
                      }}
                      readonly={true}
                    />
                  </FieldWrapper>
                </FormControl> */}
              </Stack>
            </Stack>
            {buttons && (
              <>
                <Divider />
                {buttons}
              </>
            )}
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};
