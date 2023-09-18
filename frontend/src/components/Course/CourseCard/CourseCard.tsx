import * as React from "react";

import { Card } from "../../Elements/Card";

interface ICourseCardProps {
  className?: string;
}

export const CourseCard = ({
  className,
}: ICourseCardProps): React.ReactElement => {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="relative aspect-video">
        <div className="absolute top-0 left-0 px-4 py-2 text-white bg-pink-500 rounded-br-xl">
          NOVA
        </div>
        <img src="/images/placehold.png" alt="" />
      </div>
      <div className="p-4 bg-white">
        <div className="flex items-center justify-between pb-4">
          <p className="font-semibold text-gray-200 uppercase">Duration TBC</p>
          <div className="px-4 py-1 font-bold text-teal-500 uppercase bg-teal-100">
            <p>Beginner</p>
          </div>
        </div>
        <p className="text-lg font-bold lg:text-xl font-header tracking-header text-black">
          Origami with YB
        </p>
        <p className="text-black">by Ms YB Tan Li Ming</p>
        <div className="flex items-center justify-between pt-4">
          <p className="font-semibold text-gray-200 uppercase">
            {/* Rewards TBC */}
          </p>
          <img src="/images/common/credit_cards.png" alt="" />
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
