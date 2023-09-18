import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Container,
  StackDivider,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  Text,
  Avatar,
  AspectRatio,
  PopoverTrigger,
  PopoverHeader,
  HStack,
  Button,
  Flex,
} from "@chakra-ui/react";
import { Dashboard } from "@uppy/react";
import Image from "next/image";
import * as React from "react";
import { FaUserGraduate } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { IconContext } from "react-icons/lib";

import { Email } from "./FormControl/Email";
import { FirstName } from "./FormControl/FirstName";
import { Gender } from "./FormControl/Gender";
import { Introduction } from "./FormControl/Introduction";
import { JobTitle } from "./FormControl/JobTitle";
import { LastName } from "./FormControl/LastName";
import { Nationality } from "./FormControl/Nationality";
import { PhoneNumber } from "./FormControl/PhoneNumber";

import { FieldWrapper } from "@/components/Form/FieldWrapper";

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/image-editor/dist/style.css'

type TeacherFormProps = {
  title: string;
  description: string;
  onSubmit?: any;
  showPassword?: boolean;
  errors?: any;
  buttons?: any;
  inputProps?: {
    firstName?: any;
    lastName?: any;
    email?: any;
    gender?: any;
    nationality?: any;
    phoneNumber?: any;
    jobTitle?: any;
    profilePicture?: any;
    introduction?: any;
    password?: any;
    confirmPassword?: any;
  };
  photo?: {
    url: string;
    requestEdit: any;
    displayEdit: any;
    uppy: any;
  };
  readonly?: boolean;
  loginAsUser?: any;
};

export const TeacherForm = (props: TeacherFormProps): React.ReactElement => {
  const {
    title,
    description,
    onSubmit,
    errors,
    showPassword,
    buttons,
    inputProps,
    readonly,
    photo,
    loginAsUser,
  } = props;

  return (
    <Container py={{ base: "4", md: "8" }}>
      <Stack spacing="5" divider={<StackDivider />}>
        <Stack
          direction={{ base: "column", lg: "row" }}
          spacing={{ base: "5", lg: "8" }}
          justify="space-between"
        >
          <Stack spacing="5" flexGrow={1}>
            <Box>
              <Text fontSize="lg" fontWeight="medium">
                {title}
              </Text>
              <Text color="muted" fontSize="sm">
                {description}
              </Text>
              {loginAsUser ? (
                <>
                  <Flex py={{ base: "5", md: "6" }}>
                    <Popover>
                      <PopoverTrigger>
                        <Button>Login As User</Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Confirmation</PopoverHeader>
                        <PopoverBody>
                          Are you sure you want to login as this teacher?
                          <Flex pt="4">
                            <Button
                              variant="primary"
                              w="full"
                              onClick={loginAsUser}
                            >
                              Confirm
                            </Button>
                          </Flex>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Flex>
                </>
              ) : null}
            </Box>
          </Stack>
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
                    <AspectRatio ratio={1} flex="1 1 auto">
                      <>
                        <Box
                          borderRadius={"full"}
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
                        <IconContext.Provider value={{ color: "white" }}>
                          <Avatar
                            icon={<FaUserGraduate size="50%" />}
                            // src={photo?.url}
                            bg={photo?.url ? "bg-surface" : undefined}
                          >
                            {photo?.url && (
                              <Image
                                alt=""
                                src={photo?.url}
                                layout="fill"
                              ></Image>
                            )}
                          </Avatar>
                        </IconContext.Provider>
                      </>
                    </AspectRatio>
                    <span style={{ flexGrow: 2 }} />
                  </HStack>
                </Stack>
              )}
              <Stack spacing="6" direction={{ base: "column", md: "row" }}>
                <FirstName
                  {...{
                    readonly,
                    inputProps: inputProps?.firstName,
                    fieldWrapperProps: {
                      error: errors?.firstName,
                    },
                  }}
                />
                <LastName
                  {...{
                    readonly,
                    inputProps: inputProps?.lastName,
                    fieldWrapperProps: {
                      error: errors?.lastName,
                    },
                  }}
                />
              </Stack>
              <Email
                {...{
                  readonly,
                  inputProps: inputProps?.email,
                  fieldWrapperProps: {
                    error: errors?.email,
                  },
                }}
              />
              <Stack spacing="6" direction={{ base: "column", md: "row" }}>
                <Gender
                  {...{
                    readonly,
                    inputProps: inputProps?.gender,
                    fieldWrapperProps: {
                      error: errors?.gender,
                      parentProps: {
                        style: {
                          width: 0,
                          minWidth: "-webkit-fill-available",
                        },
                      },
                    },
                  }}
                />
                <Nationality
                  {...{
                    readonly,
                    inputProps: inputProps?.nationality,
                    fieldWrapperProps: {
                      error: errors?.nationality,
                    },
                  }}
                />
                <PhoneNumber
                  {...{
                    readonly,
                    inputProps: inputProps?.phoneNumber,
                    fieldWrapperProps: {
                      error: errors?.phoneNumber,
                    },
                  }}
                />
              </Stack>
              <Stack spacing="6" direction={{ base: "column", md: "row" }}>
                <JobTitle
                  {...{
                    readonly,
                    inputProps: inputProps?.jobTitle,
                    fieldWrapperProps: {
                      error: errors?.jobTitle,
                    },
                  }}
                />
                {/* <FormControl id="profilePicture">
                  <FormLabel>Profile Picture</FormLabel>
                  <FieldWrapper error={errors?.profilePicture}>
                    <Input {...inputProps?.profilePicture}/>
                  </FieldWrapper>
                </FormControl> */}
              </Stack>
              <Introduction
                {...{
                  readonly,
                  inputProps: inputProps?.introduction,
                  fieldWrapperProps: {
                    error: errors?.introduction,
                  },
                }}
              />
              {showPassword && (
                <Stack spacing="6" direction={{ base: "column", md: "row" }}>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <FieldWrapper error={errors?.password}>
                      <Input type="password" {...inputProps?.password} />
                    </FieldWrapper>
                  </FormControl>
                  <FormControl id="confirmPassword">
                    <FormLabel>Confirm Password</FormLabel>
                    <FieldWrapper error={errors?.confirmPassword}>
                      <Input type="password" {...inputProps?.confirmPassword} />
                    </FieldWrapper>
                  </FormControl>
                </Stack>
              )}
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
