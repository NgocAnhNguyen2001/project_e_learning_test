import { Tab } from "@headlessui/react";
import React from "react";

import { ItemCatalogType } from "schema/generated/graphql";

import { TabList } from "../Elements/TabList";

import { CategoryCard } from "./CategoryCard";

export interface CategoryMenuProps {
  typeOnChange: (index: number) => void;
  categoryOnChange: (index: number) => void;
  isLoading: boolean;
  categoryList:
    | { value: string; label: string; category: ItemCatalogType }[]
    | undefined;
  typeList: string[];
}

export const CategoryMenu = ({
  typeOnChange,
  categoryOnChange,
  isLoading,
  categoryList,
  typeList,
}: CategoryMenuProps): React.ReactElement => {
  return (
    <Tab.Group
      // onChange set type
      onChange={typeOnChange}
      defaultIndex={0}
    >
      <TabList
        disabled={isLoading}
        content={typeList.map((type) => {
          return { title: type };
        })}
      />
      <div data-tut="reactour__13" className="tour_13">
        <Tab.Panels
          className={"flex overflow-x-auto lg:overflow-none mt-8 w-full"}
        >
          {
            // Render Categories
            typeList.map((type) => (
              <Tab.Panel className={"w-full"} key={type}>
                <Tab.Group
                  // onChange set Categories
                  onChange={categoryOnChange}
                >
                  <Tab.List
                    className={`lg:grid flex flex-row overflow-x-auto lg:overflow-none lg:gap-x-4 gap-x-2 w-max pb-4`}
                    style={{
                      gridTemplateColumns: `repeat(${
                        (categoryList as any).length
                      }, minmax(0, 1fr))`,
                    }}
                  >
                    {(categoryList as any).map(
                      ({
                        value,
                        label,
                        category,
                      }: {
                        value: string;
                        label: string;
                        category: ItemCatalogType;
                      }) => (
                        <CategoryCard
                          key={`${value}-${category}`}
                          value={value}
                          label={label}
                          category={category}
                        />
                      ),
                    )}
                  </Tab.List>
                </Tab.Group>
              </Tab.Panel>
            ))
          }
        </Tab.Panels>
      </div>
    </Tab.Group>
  );
};
