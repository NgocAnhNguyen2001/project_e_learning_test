import Link from "next/link";
import * as React from "react";

import { Button } from "../Elements";

interface IChildOverviewProps {
  child: any;
}

export const ChildOverview = (
  props: IChildOverviewProps,
): React.ReactElement => {
  return (
    <div className="grid gap-4 p-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <div className="grid grid-cols-6 gap-4">
          <div className="flex items-center w-full col-span-2 mr-6 overflow-hidden border-2 border-gray-300 rounded-full lg:col-span-1 aspect-square">
            <img src={props.child.avatarImage?.url ?? "/images/common/default.png"} alt="avatar" />
          </div>
          <div className="flex flex-col justify-center col-span-4 lg:col-span-5">
            <p className="pb-4 text-xl font-bold lg:text-2xl">
              {props.child?.user.firstName} {props.child?.user.lastName}
            </p>
            {/* <div className="flex flex-col md:flex-row md:items-center">
              <div className="mr-2">
                <HiClock size="24" />
              </div>
              Last Active 30 Aug 2021 10:52PM
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center col-span-1">
        <Link passHref href={`/student/profile/${props.child?.id}`}>
          <Button className="w-full mb-2" variant="brand1" size="sm">
            View Profile
          </Button>
        </Link>
        {/* <Button className="w-full mb-2" variant="green" size="sm">
          Top Up Now
        </Button>
        <p className="text-xl font-bold text-red-400 lg:text-2xl">
          999,999 LEFT
        </p> */}
      </div>
    </div>
  );
};

export default ChildOverview;
