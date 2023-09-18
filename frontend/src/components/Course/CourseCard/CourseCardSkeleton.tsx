import * as React from "react";

import { Card } from "../../Elements/Card";

export const CourseCardSkeleton = (): React.ReactElement => {
  return (
    <Card className={`overflow-hidden h-full flex flex-col ${"skeleton"}`}>
      <div className="relative aspect-video animate-pulse">
        <div className="object-cover w-full aspect-video bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="flex flex-col justify-between flex-grow p-4 bg-white">
        <div>
          <div className="flex items-center justify-between pb-4">
            <div className="h-2 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>

            <div
              className={`px-4 py-1 font-bold text-teal-500 text-sm uppercase rounded-lg bg-teal-100 animate-pulse`}
            >
              <div className="h-4 w-8" />
            </div>
          </div>
          <div className="space-y-2 animate-pulse">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
          </div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <p className="font-semibold text-gray-200 uppercase">
            {/* Rewards TBC */}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CourseCardSkeleton;
