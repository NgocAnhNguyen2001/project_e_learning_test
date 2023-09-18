import * as React from "react";

interface TabsProps {
  children?: any;
}

export const Tabs = ({
  children
}: TabsProps): React.ReactElement => {
  return (
    <div className="mx-auto">
      <div className="my-4">
        <nav className="flex flex-row justify-center -mb-px text-center text-gray-400">
          {children}
        </nav>
      </div>
    </div>
  );
};

export default Tabs;
