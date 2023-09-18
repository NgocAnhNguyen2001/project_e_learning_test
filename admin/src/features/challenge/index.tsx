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
    name?: any;
  };
  photo?: {
    url: string;
    requestEdit: any;
    displayEdit: any;
    uppy: any;
  };
  readonly?: boolean;
};

export const ChallengeForm = (props: Props): React.ReactElement => {
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
                    <FormLabel>Picture</FormLabel>
                    <Button
                      variant="ghost"
                      onClick={(): void => photo?.uppy.onRequestClose()}
                      hidden={!photo?.displayEdit}
                    >
                      <GrClose />
                    </Button>
                  </HStack>
                  <Dashboard
                    {...photo?.uppy}
                    hidden={!photo?.displayEdit}
                  ></Dashboard>
                  <HStack flexGrow={1} hidden={photo?.displayEdit}>
                    <AspectRatio flex="1 1 auto">
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
                    </AspectRatio>
                  </HStack>
                </Stack>
              )}
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <FieldWrapper
                  {...{
                    error: errors?.name,
                  }}
                >
                  <Input
                    {...{
                      inputProps: inputProps?.name,
                      readonly,
                    }}
                  />
                </FieldWrapper>
              </FormControl>
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
