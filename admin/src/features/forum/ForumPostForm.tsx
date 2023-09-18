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
import _ from "lodash";
import Image from "next/image";
import * as React from "react";
import { GrClose } from "react-icons/gr";
import ReactPlayer from "react-player/file";

import { ReactionEmoji } from "schema/generated/graphql";

import { TextAreaInput } from "../Input/TextAreaInput";

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
    text?: any;
    category?: any;
  };
  forumReaction: any;
  photo?: {
    url: string;
    requestEdit: any;
    disabled: any;
    uppy: any;
  };
  readonly?: boolean;
};

export const ForumPostForm = (props: Props): React.ReactElement => {
  const {
    title,
    description,
    onSubmit,
    errors,
    buttons,
    inputProps,
    forumReaction,
    photo,
    readonly,
  } = props;

  const parseReaction = (emoji: ReactionEmoji): string => {
    switch (emoji) {
      case ReactionEmoji.Celebrate:
        return "🥳";
      case ReactionEmoji.Clap:
        return "👏";
      case ReactionEmoji.Heart:
        return "❤";
      case ReactionEmoji.Laugh:
        return "😀";
      case ReactionEmoji.Like:
        return "👍";
      case ReactionEmoji.Relaxed:
        return "😂";
      case ReactionEmoji.Smile:
        return "😊";
    }
  };

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
                    <FormLabel>Forum Post Image/Video</FormLabel>
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
                            <Text color={"white"}>
                              Upload a new Image/Video
                            </Text>
                          </Box>

                          {_.endsWith(photo?.url, "mp4") ? (
                            <ReactPlayer
                              playing={false}
                              url={photo?.url}
                              muted={true}
                              width="100%"
                              height="100%"
                            />
                          ) : (
                            <Image
                              alt=""
                              src={photo?.url || "/images/default/course.png"}
                              layout="fill"
                              objectFit="contain"
                            />
                          )}
                        </>
                      )}
                    </AspectRatio>
                  </HStack>
                </Stack>
              )}
              <Stack>
                <HStack>
                  <FormControl id="category">
                    <FormLabel>Category</FormLabel>
                    <FieldWrapper
                      {...{
                        error: errors?.category,
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
                </HStack>

                <FormControl id="text">
                  <FormLabel>Text</FormLabel>
                  <FieldWrapper
                    {...{
                      error: errors?.text,
                    }}
                  >
                    <TextAreaInput
                      {...{
                        inputProps: inputProps?.text,
                        readonly,
                      }}
                    />
                  </FieldWrapper>
                </FormControl>
                <HStack>
                  <FormControl id="reactions">
                    <FormLabel>Reactions</FormLabel>
                    {/* <FieldWrapper
                      {...{
                        error: errors?.upvoteCount,
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
                          inputProps: inputProps?.upvoteCount,
                        }}
                        readonly={true}
                      />
                    </FieldWrapper> */}
                    <div className="flex space-x-2 pt-4">
                      {forumReaction &&
                        forumReaction
                          .filter((reaction: any) => reaction.count !== 0)
                          .map((reaction: any) => {
                            return (
                              <div
                                key={reaction.emoji}
                                className="px-2 py-[2px] text-base rounded-[4px] space-x-1"
                              >
                                <span>{parseReaction(reaction.emoji)}</span>
                                <span>{reaction.count}</span>
                              </div>
                            );
                          })}
                    </div>
                  </FormControl>
                </HStack>
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
