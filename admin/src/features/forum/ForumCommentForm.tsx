import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Stack,
  useColorModeValue,
  Container,
  StackDivider,
  Text,
  HStack,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";
import { GoEye } from "react-icons/go";

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
    commentType?: any;
  };
  readonly?: boolean;
  forumReaction?: any;
  forumPostId: string | null | undefined;
  isSubComment?: boolean;
};

export const ForumCommentForm = (props: Props): React.ReactElement => {
  const {
    title,
    description,
    onSubmit,
    errors,
    buttons,
    inputProps,
    readonly,
    forumReaction,
    forumPostId,
    isSubComment,
  } = props;

  const router = useRouter();

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
            <HStack paddingTop={2}>
              <Button
                size="sm"
                variant="outline"
                leftIcon={<Icon as={GoEye} color="gray.400" marginStart="-1" />}
                onClick={(): any => router.push(`/forum/${forumPostId}`)}
              >
                {" "}
                {isSubComment ? "View Main Comment" : "View Forum Post"}
              </Button>
            </HStack>
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
              <Stack>
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
                <FormControl id="commentType">
                  <FormLabel>Comment Type</FormLabel>
                  <FieldWrapper
                    {...{
                      error: errors?.commentType,
                    }}
                  >
                    <Input
                      {...{
                        inputProps: inputProps?.commentType,
                      }}
                      readonly={true}
                    />
                  </FieldWrapper>
                </FormControl>
                <HStack>
                  <FormControl id="reaction">
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
