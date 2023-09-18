import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Table,
  Tbody,
  Text,
  Thead,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { FiSearch } from "react-icons/fi";
import BarLoader from "react-spinners/BarLoader";
import { useDebounce } from "use-debounce";

import { QueryMode } from "schema/generated/graphql";

const buildSearch = (obj: any): any[] => {
  const output: any = [];
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object") {
      for (const entry of buildSearch(value)) {
        output.push({ [key]: entry });
      }
      continue;
    }
    output.push({ [key]: value });
  }
  return output;
};

const buildSearchText = (text: string, searchEntry: any): any[] => {
  text = text.replace(/_/g, "\\_");
  const searchObj = {
    contains: text,
    mode: QueryMode.Insensitive,
  };
  return buildSearch(searchEntry).map((search) => {
    let last = search, key = null;
    while (typeof last[key = Object.keys(last)[0]] === "object") {
      last = last[key];
    }
    last[key] = searchObj;
    return search;
  });
};

const formatPagnation = (
  page: number,
  step: number,
  total?: number,
): string => {
  if (typeof total !== "number")
    return `Showing ${step * (page - 1) + 1} to ${step * page}`;
  if (total === 0) return `Showing 0 result`;
  return `Showing ${step * (page - 1) + 1} to ${Math.min(
    step * page,
    total,
  )} of ${total} results`;
};

interface Props {
  data: {
    name: string;
    searchObj?: any;
    header?: React.ReactElement;
    body?: React.ReactElement[];
    count?: number;
  },
  step?: number;
  loading?: boolean;
  externalCallRequest?: any;
  requestPage: (args: {
    search: string;
    searchObj: any;
    page: number;
    step: number;
    isPage: boolean | null;
  }) => void;
};

export const DataTable = ({
  data: {
    name,
    searchObj,
    header,
    body,
    count,
  },
  step = 10,
  loading,
  externalCallRequest,
  requestPage,
}: Props): React.ReactElement => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [page, setPage] = React.useState(1);
  React.useEffect((): void => { // Clamp page to last page
    if (typeof count !== "number") return;
    const maxPage = Math.ceil(count / step) || 1;
    if (page <= maxPage) return;
    setPage(maxPage);
  }, [count]);

  const [searchText, setSearchText] = React.useState("");
  const [debouncedSearchText] = useDebounce(searchText, 300);
  const handleRequest = (isPage: boolean | null): void => {
    requestPage({
      search: debouncedSearchText,
      searchObj: debouncedSearchText && searchObj
        ? buildSearchText(debouncedSearchText, searchObj) : null,
      page,
      step,
      isPage,
    });
  }
  React.useEffect((): void => {
    setPage(1)
    handleRequest(true);
  }, [debouncedSearchText]);
  React.useEffect((): void => {
    handleRequest(true);
  }, [page]);
  React.useEffect((): void => {
    handleRequest(null);
  }, [externalCallRequest]);

  return (
    <>
      <Box
        bg="bg-surface"
        boxShadow={{ base: "none", md: useColorModeValue("sm", "sm-dark") }}
        borderRadius={useBreakpointValue({ base: "none", md: "lg" })}
        maxW="100%"
        flexGrow={1}
      >
        <Stack spacing="5">
          <Box px={{ base: "4", md: "6" }} pt="5">
            <Stack
              direction={{ base: "column", md: "row" }}
              justify="space-between"
            >
              <Text fontSize="lg" fontWeight="medium">
                {name}
              </Text>
              <InputGroup maxW="xs">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiSearch} color="muted" boxSize="5" />
                </InputLeftElement>
                <Input
                  placeholder="Search"
                  value={searchText}
                  onChange={(event): any =>
                    setSearchText(event.target.value)
                  }
                />
              </InputGroup>
            </Stack>
          </Box>
          <Box overflowX="auto">
            {loading ? (
              <Box
                h={{ base: "sm", md: "lg" }}
                w="full"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <BarLoader height={4} width={128} loading color="#3182ce" />
              </Box>
            ) : (
              <Table>
                <Thead>
                  {header}
                </Thead>
                <Tbody>
                  {body}
                </Tbody>
              </Table>
            )}
          </Box>
          <Box px={{ base: "4", md: "6" }} pb="5">
            <HStack spacing="3" justify="space-between">
              {!isMobile && (
                <Text color="muted" fontSize="sm">
                  {formatPagnation(page, step, count)}
                </Text>
              )}
              <ButtonGroup
                spacing="3"
                justifyContent="space-between"
                width={{ base: "full", md: "auto" }}
                variant="secondary"
              >
                <Button
                  disabled={page === 1}
                  onClick={(): any => setPage(page - 1)}
                >
                  Previous
                </Button>
                <Button
                  disabled={
                    page * step >= (count ?? 0)
                  }
                  onClick={(): any => setPage(page + 1)}
                >
                  Next
                </Button>
              </ButtonGroup>
            </HStack>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
