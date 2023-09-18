import * as React from "react";


import { Button } from "@/components/Elements";
import { deserialize } from "@/utils/slate";

import { Card } from "../../Elements/Card";

interface ICheckpointCardProps {
  className?: string;
  name?: string;
  desc?: string;
  thumbnail?: string;
  onClick?: any;
  preview?: boolean;
}

export const CheckpointCardProps = ({
  className,
  name,
  desc,
  onClick,
  thumbnail = "/images/placehold.png",
  preview,
}: ICheckpointCardProps): React.ReactElement => {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="relative p-4 bg-white aspect-video">
        <img
          src={thumbnail}
          alt=""
          className="object-contain w-full aspect-video"
        />
      </div>
      <div className="pb-4 pl-4 pr-4 bg-white">
        <p className="text-lg font-bold text-black lg:text-xl font-header tracking-header">
          {name}
        </p>
        <div className="flex flex-col text-black">
          {desc && deserialize(desc)}
        </div>
        {!preview && (
          <Button variant="brand1" className="w-full mt-4" onClick={onClick}>
            Start
          </Button>
        )}
      </div>
    </Card>
  );
};

export default CheckpointCardProps;
