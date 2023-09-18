
import {
  Button,
  Flex,
  Text,
  HStack,
  useColorModeValue,
  Stack,
  Avatar,
  Icon,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import * as React from "react";
import { FaUserAstronaut } from "react-icons/fa";
import {
  GoCalendar,
  GoEye,
} from 'react-icons/go'

interface ElementProps {
  users?: any,
}

export const ChildrenListing = (props: ElementProps): React.ReactElement => {
  const {
    users,
  } = props;
  const router = useRouter();
  const colorMode = useColorModeValue('sm','sm-dark');
  const items = users?.map?.((user: any, index:number) => (
    <Stack
      key={index}
      direction={{ base: 'column', lg: 'row' }}
      spacing={{ base: '5', lg: '8' }}
      justify="space-between"
    >
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '4' }}
        px={{ base: '4', md: '6' }}
        py={{ base: '5', md: '6' }}
        bg="bg-surface"
        borderRadius="lg"
        boxShadow={colorMode}
        flexGrow={1}
      >
        <Flex flexDir="column" justifyContent="center">
          <Avatar
            icon={<FaUserAstronaut />}
            color="bg-surface"
          >
            {/* <AvatarBadge
              borderWidth="4px"
              borderColor={useColorModeValue('white', 'gray.700')}
              insetEnd="3"
              bottom="3"
              bg={useColorModeValue('white', 'gray.700')}
            >
              <Icon as={GoVerified} fontSize="2xl" color={useColorModeValue('blue.500', 'blue.200')} />
            </AvatarBadge> */}
          </Avatar>
        </Flex>
        <Stack
          justifyContent="space-evenly"
          spacing={{ base: '1' }}
          flexGrow={1}
        >
          <Flex justifyContent="space-between" alignItems="center" >
            <Text fontSize="2xl" fontWeight="bold" letterSpacing="tight" marginEnd="6">
              { `${user?.firstName} ${user?.lastName}` }
            </Text>
            <Button
              size="sm"
              variant="outline"
              leftIcon={<Icon as={GoEye} color="gray.400" marginStart="-1" />}
              onClick={(): any => router.push(`/students/${user?.id}`)}
            >
              View
            </Button>
          </Flex>
          <Text mt="1" fontWeight="medium">
            { user?.student?.username }
          </Text>
          <Stack spacing="1" mt="2">
            {/* <HStack fontSize="sm">
              <Icon as={GoGlobe} color="gray.500" />
              <Text>Ontario, Canada</Text>
            </HStack> */}
            <HStack fontSize="sm">
              <Icon as={GoCalendar} color="gray.500" />
              <Text>Joined at {user?.createdAt && format(
                new Date(user?.createdAt),
                "dd/MM/yy hh:mm:ss",
              )}</Text>
            </HStack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )) ?? [];
  return (
    <Grid templateColumns='repeat(1, 1fr)' gap={6}>
      { items.map((item: any, index:number) => {
        return <GridItem key={index}>{ item }</GridItem>
      }) }
    </Grid>
  );
};
