import clsx from "clsx";
import * as React from "react";

import { Card } from "../../Elements/Card";

interface IQuizContentCard {
  className?: string;
  name?: string;
  onClick?: any;
}

export const QuizContentCard = ({
  className,
  name,
  onClick,
}: IQuizContentCard): React.ReactElement => {
  return (
    <Card className={clsx("overflow-hidden cursor-pointer", className)}>
      <div role="none" className="p-4 bg-white" onClick={onClick}>
        <div className="flex items-start justify-between pb-2">
          <p className="text-lg font-bold text-sky-500 lg:text-xl font-header tracking-header">
            {name}
          </p>
          <img
            src={"/images/course/checkpoint/content/content-plus.svg"}
            alt=""
          />
        </div>
        <div className="flex">
          <p className="font-medium text-green-500">Try</p>
          <img
            src={"/images/course/checkpoint/content/arrow-right.svg"}
            alt=""
          />
        </div>
      </div>
    </Card>
  );
};

export default QuizContentCard;
