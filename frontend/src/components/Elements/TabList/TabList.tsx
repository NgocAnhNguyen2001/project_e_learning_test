import { Tab } from "@headlessui/react";
import * as React from "react";

interface TabListProps {
  content: any[];
  disabled?: boolean;
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export const TabList = ({
  content,
  disabled = false,
}: TabListProps): React.ReactElement => {
  return (
    <Tab.List
      className={`lg:grid flex grid-cols-${content.length} overflow-x-auto lg:overflow-none pb-4`}
    >
      {content?.length > 0 &&
        content.map((item, index) => (
          <Tab
            key={index}
            disabled={index === 0 ? false : disabled}
            className={({ selected }: { selected: boolean }): string =>
              classNames(
                "transition px-8 lg:px-0 duration-200 ease-in-out inline-block text-center flex-1 pb-3 tracking-wide no-underline border-b-2 uppercase",
                selected
                  ? "border-brand1-500 text-brand1-500 hover:border-brand1-400 hover:text-brand1-400"
                  : "border-white text-white opacity-30 hover:opacity-60",
              )
            }
          >
            {item.title}
          </Tab>
        ))}
    </Tab.List>
  );
};

export default TabList;
