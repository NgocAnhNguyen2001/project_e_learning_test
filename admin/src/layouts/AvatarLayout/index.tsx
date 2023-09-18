import {
  Heading,
  HStack,
  IconButton,
  Stack,
  Td,
  Text,
  Th,
  Tr,
  useBreakpointValue,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { startCase, toLower } from "lodash";
import { useRouter } from "next/router";
import * as React from "react";
import { FiEye } from "react-icons/fi";

import {
  useFindManyAvatarAssetCatalogLazyQuery,
  AvatarAssetCategoryWhereInput,
  useUpdateAvatarAssetCatalogMutation,
  useAvatarAssetCatalogCountLazyQuery,
  namedOperations,
  AvatarAssetCatelogOrderByWithRelationAndSearchRelevanceInput,
} from "schema/generated/graphql";
import { useResultCallback } from "utils/hooks/useResultCallback";
import {
  useSortOrderManager,
  formatSortOrder,
} from "utils/hooks/useSortOrderManager";

import { DataTable } from "@/components/DataTable";

interface Props {
  tabs: string[];
  tabIndex: number;
  tabsId: string[];
  setTabIndex: (value: number) => void;
}

export const AvatarLayout: React.FC<Props> = (props): React.ReactElement => {
  const { tabs, tabIndex, tabsId, setTabIndex } = props;
  const router = useRouter();
  const toast = useToast();
  const [catalogCountState, setCatalogCountState] = React.useState(0);

  const { list, toggle, getOrderBy } = useSortOrderManager();
  const [getCatalog, catalog] = useFindManyAvatarAssetCatalogLazyQuery();
  const [getCatalogCount, catalogCount] = useAvatarAssetCatalogCountLazyQuery();
  const [updateCatelog] = useUpdateAvatarAssetCatalogMutation();

  React.useEffect(() => {
    onTabChange(tabIndex);
  }, []);

  const onTabChange = (index: number): void => {
    setTabIndex(index);
    const where = {
      avatarAssetCategory: {
        is: {
          label: {
            equals: tabs[tabIndex],
          },
        },
      },
    };
    getCatalogCount({
      variables: {
        where,
      },
    });
    getCatalog({
      variables: {
        where,
        take: 10,
      },
    });
  };

  const onUpdateCatelogActive = (id: string, isActive: boolean): void => {
    updateCatelog({
      variables: {
        data: { isActive: { set: isActive } },
        where: {
          id,
        },
      },
      refetchQueries: [namedOperations.Query.findManyAvatarAssetCatalog],
      onCompleted: () => {
        toast({
          title: `Status has been updated`,
          status: "success",
        });
      },
      onError: (error) => {
        toast({
          title: "Failed to create updated status",
          description:
            error.graphQLErrors[0]?.extensions?.exception?.meta?.cause ??
            error.graphQLErrors[0]?.message ??
            error.message,
          status: "error",
        });
      },
    });
  };

  const onFetchCatalog = (
    page: number,
    step: number,
    searchObj: { label: { contains: string; mode: any } }[],
    orderBy: AvatarAssetCatelogOrderByWithRelationAndSearchRelevanceInput[],
  ): void => {
    const where = {
      avatarAssetCategory: {
        is: {
          label: {
            equals: tabs[tabIndex],
          },
        },
      },
    };
    getCatalogCount({
      variables: {
        orderBy,
        where: {
          ...where,
          OR: searchObj ?? undefined,
        },
      },
    });
    getCatalog({
      variables: {
        orderBy,
        where: {
          ...where,
          OR: searchObj ?? undefined,
        },
        take: step,
        skip: step * (page - 1),
      },
    });
  };

  useResultCallback(
    catalogCount,
    (count) => {
      setCatalogCountState(count);
    },
    (err) => {
      setCatalogCountState(0);
      console.log(err);
    },
  );

  return (
    <>
      <Stack spacing={{ base: "8", lg: "6" }}>
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
              Avatar assets
            </Heading>
            <Text color="muted">All important metrics at a glance</Text>
          </Stack>
          <HStack
            spacing="3"
            style={{ display: "flex", flexDirection: "row-reverse" }}
          >
            <Button
              variant="primary"
              onClick={(): any =>
                router.push(
                  `/avatars/create?tab=${tabs[tabIndex]}&categoryId=${tabsId[tabIndex]}`,
                )
              }
            >
              Create
            </Button>
          </HStack>
        </Stack>

        <Tabs
          isLazy
          onChange={(index): void => {
            onTabChange(index);
          }}
          index={tabIndex}
        >
          <TabList>
            {tabs.map((x) => {
              return <Tab key={`tab-${x}`}>{x}</Tab>;
            })}
          </TabList>
          <TabPanels>
            {tabs.map((x) => {
              return (
                <TabPanel key={`tabPanel-${x}`}>
                  <DataTable
                    {...{
                      externalCallRequest: list,
                      requestPage: ({ searchObj, page, step }): any => {
                        const orderBy = list
                          .map(([key, order]) => {
                            switch (key) {
                              default:
                                return { [key]: order };
                              case "active": {
                                return {
                                  isActive: order,
                                };
                              }
                            }
                          })
                          .reduce((orders, val) => {
                            if (Array.isArray(val)) orders.push(...val);
                            else orders.push(val);
                            return orders;
                          }, [] as AvatarAssetCatelogOrderByWithRelationAndSearchRelevanceInput[]);
                        onFetchCatalog(page, step, searchObj, orderBy);
                      },
                      loading: catalog.loading,
                      data: {
                        count: catalogCountState,
                        name: `${x} Assets`,
                        searchObj: {
                          label: true,
                        } as AvatarAssetCategoryWhereInput,
                        header: (
                          <Tr>
                            {[
                              ["Label", "label"],
                              ["Type", "type"],
                              ["Created At", "createdAt"],
                              ["Updated At", "updatedAt"],
                              ["Active", "active"],
                            ].map(([label, key], index) => (
                              <Th key={index}>
                                {key ? (
                                  <button
                                    onClick={(): any => toggle(key)}
                                    style={{
                                      fontWeight: "inherit",
                                    }}
                                  >
                                    <Flex>
                                      <Text>{startCase(label)}</Text>
                                      <Flex
                                        direction="column"
                                        justifyContent="center"
                                      >
                                        {formatSortOrder(getOrderBy(key))}
                                      </Flex>
                                    </Flex>
                                  </button>
                                ) : (
                                  <Text>{startCase(label)}</Text>
                                )}
                              </Th>
                            ))}
                            <Th></Th>
                          </Tr>
                        ),
                        body: catalog.data?.findManyAvatarAssetCatalog.map(
                          (catalog) => {
                            return toLower(catalog.label) != "none" &&
                              !["skin", "hair"].includes(
                                toLower(catalog.type),
                              ) ? (
                              <Tr key={catalog.id}>
                                <Td>
                                  <Text fontWeight="medium">
                                    {startCase(toLower(catalog.label))}
                                  </Text>
                                </Td>
                                <Td>
                                  <h4>{startCase(toLower(catalog.type))}</h4>
                                </Td>
                                <Td>
                                  <h4>
                                    {new Date(catalog.createdAt).toUTCString()}
                                  </h4>
                                </Td>
                                <Td>
                                  <h4>
                                    {new Date(catalog.updatedAt).toUTCString()}
                                  </h4>
                                </Td>
                                <Td>
                                  <Switch
                                    isChecked={catalog.isActive}
                                    onChange={(): void => {
                                      onUpdateCatelogActive(
                                        catalog.id,
                                        !catalog.isActive,
                                      );
                                    }}
                                  />
                                </Td>
                                <Td>
                                  <HStack spacing="1">
                                    <IconButton
                                      icon={<FiEye fontSize="1.25rem" />}
                                      variant="ghost"
                                      aria-label="View course"
                                      onClick={(): any =>
                                        router.push(
                                          `${router.pathname}/${catalog.id}`,
                                        )
                                      }
                                    />
                                  </HStack>
                                </Td>
                              </Tr>
                            ) : (
                              <></>
                            );
                          },
                        ),
                      },
                    }}
                  />
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      </Stack>
    </>
  );
};

export * from "./CreateAvatar";
