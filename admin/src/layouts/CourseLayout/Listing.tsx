
import {
  Button,
  Flex,
  Text,
  HStack,
  useColorModeValue,
  Stack,
  Icon,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import {
  GoCalendar,
  GoEye,
} from 'react-icons/go'



interface ElementProps {
  courses?: any[],
}
export const CourseListing = (props: ElementProps): React.ReactElement => {
  const {
    courses,
  } = props;
  const router = useRouter();
  const colorMode = useColorModeValue('sm', 'sm-dark');


  const items = courses?.map?.((course, index) => {
    return (
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
            {course.thumbnail?.url && <Image
              src={course.thumbnail.url}
              alt=""
            />}
          </Flex>
          <Stack
            justifyContent="space-evenly"
            spacing={{ base: '1' }}
            flexGrow={1}
          >
            <Flex justifyContent="space-between" alignItems="center" >
              <Text fontSize="2xl" fontWeight="bold" letterSpacing="tight" marginEnd="6">
                {`${course.title}`}
              </Text>
              <Button
                size="sm"
                variant="outline"
                leftIcon={<Icon as={GoEye} color="gray.400" marginStart="-1" />}
                onClick={(): any => router.push(`../courses/${course.id}`)}
              >
                View
              </Button>
            </Flex>
            {/* <Text mt="1" fontWeight="medium">
            { user?.student?.username }
          </Text> */}
            <Stack spacing="1" mt="2">
              {/* <HStack fontSize="sm">
              <Icon as={GoGlobe} color="gray.500" />
              <Text>Ontario, Canada</Text>
            </HStack> */}
              <HStack fontSize="sm">
                <Icon as={GoCalendar} color="gray.500" />
                <Text>Updated at {format(
                  new Date(course.updatedAt),
                  "dd/MM/yy hh:mm:ss",
                )}</Text>
              </HStack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    )
  }) ?? [];
  return (
    <Grid templateColumns='repeat(1, 1fr)' gap={6}>
      {items.map((item: any, index: number) => {
        return <GridItem key={index}>{item}</GridItem>
      })}
    </Grid>
  );
};
