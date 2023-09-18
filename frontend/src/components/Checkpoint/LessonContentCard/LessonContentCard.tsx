import clsx from "clsx";
import * as React from "react";

import { Card } from "../../Elements/Card";

interface ILessonContentCard {
  className?: string;
  name?: string;
  thumbnail?: string;
  desc?: string;
  onClick?: any;
}

export const LessonContentCard = ({
  className,
  name,
  desc,
  thumbnail,
  onClick,
}: ILessonContentCard): React.ReactElement => {
  return (
    <Card className={clsx("overflow-hidden cursor-pointer", className)}>
      <div role="none" className="p-4 bg-white" onClick={onClick}>
        <div className="flex items-start justify-between pb-4">
          <img src={thumbnail} alt="" />
          <img
            src={"/images/course/checkpoint/content/content-plus.svg"}
            alt=""
          />
        </div>
        <p className="text-lg font-bold text-sky-500 lg:text-xl font-header tracking-header">
          {name}
        </p>
        <p className="text-black">{desc}</p>
      </div>
    </Card>
  );
};

export default LessonContentCard;
