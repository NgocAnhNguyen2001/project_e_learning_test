import * as React from "react";

import { Head } from "../Head";

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const ContentLayout = ({
  children,
  title,
}: ContentLayoutProps): React.ReactElement => {
  return (
    <>
      <Head title={title} />
      <div className="py-6">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">{children}</div>
      </div>
    </>
  );
};
