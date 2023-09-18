import { getTenant } from "@/utils/tenant";
import * as React from "react";
import capitalize from "lodash/toUpper";

import { Category, LevelCourse } from "schema/generated/graphql";

import { Card } from "../../Elements/Card";

type Maybe<Category> = Category | undefined | null;

interface ICourseCardProps {
  hostname: string | undefined;
  className?: string;
  classNameForHomepage?: string;
  name?: string;
  difficulty?: string;
  thumbnail?: string;
  duration?: number;
  teacher?: any;
  category?: Maybe<Category> | undefined;
  isUploadedImage?: boolean;
}

export const CourseCardProps = ({
  className,
  name,
  difficulty,
  category,
  thumbnail = "/images/placehold.png",
  duration = 0,
  teacher,
  hostname,
  classNameForHomepage,
}: ICourseCardProps): React.ReactElement => {
  // if (typeof isUploadedImage!== 'undefined' && isUploadedImage === true)
  //   console.log(`${thumbnail}`)
  // else
  //   console.log(`${thumbnail}?x-oss-process=image/resize,w_400,limit_0`)
  const memoTenant = React.useMemo(() => {
    return getTenant(hostname);
  }, [hostname]);

  return (
    <Card
      border="custom"
      className={`overflow-hidden flex flex-col h-full group hover:scale-105 transition duration-150 ${className}`}
    >
      <div className="relative aspect-video">
        <img
          src={thumbnail}
          alt=""
          className="object-cover w-full bg-white aspect-video"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow p-4 bg-white">
        <div>
          <div className="flex items-center justify-between pb-4">
            {duration === 0 ? (
              <p className="font-semibold text-gray-200 uppercase">
                Duration TBC
              </p>
            ) : (
              <p className="font-semibold text-blue-600 uppercase mr-1">
                {duration} Minutes
              </p>
            )}
            {((): any => {
              switch (difficulty) {
                case LevelCourse.Beginner:
                  return (
                    <div
                      className={`flex flex-row px-3.5 py-1 font-bold text-[#88A3C1] text-sm uppercase rounded-lg bg-[#EDF9FF]`}
                    >
                      <img src={"/images/course/level/beginner.svg"} alt="" />
                      &ensp;
                      <p className={`mt-0.5`}>{difficulty}</p>
                    </div>
                  );
                case LevelCourse.Intermediate:
                  return (
                    <div
                      className={`flex flex-row px-3.5 py-1 font-bold text-[#7634AE] text-sm uppercase rounded-lg bg-[#F0DEFF] ${classNameForHomepage ? classNameForHomepage : `xl:pr-9`} 2xl:px-3.5`}
                    >
                      <img
                        src={"/images/course/level/intermediate.svg"}
                        alt=""
                      />
                      &ensp;
                      <p className={`mt-0.5`}>{difficulty}</p>
                    </div>
                  );
                case LevelCourse.Advanced:
                  return (
                    <div
                      className={`flex flex-row px-3.5 py-1 font-bold text-[#FF9F13] text-sm uppercase rounded-lg bg-[#FFF5CA]`}
                    >
                      <img src={"/images/course/level/advanced.svg"} alt="" />
                      &ensp;
                      <p className={`mt-0.5`}>{difficulty}</p>
                    </div>
                  );
                default:
                  return null;
              }
            })()}
          </div>
          <p className="text-lg font-bold text-black lg:text-xl font-header tracking-header">
            {name}
          </p>
          {teacher ? (
            <p className="text-black">
              by {teacher.user.firstName} {teacher.user.lastName}
            </p>
          ) : (
            <p className="text-black">by Ms YB Tan Li Ming</p>
          )}
        </div>
        <div className="flex items-center justify-between pt-4">
          <p className="font-semibold text-gray-200 uppercase">
            {/* Rewards TBC */}
          </p>
          <img
            src={
              memoTenant.courseCategoriesReplacment?.[
                capitalize(category?.name) as "ART" | "TECH"
              ]?.img ??
              (category?.activeImgUrl || "")
            }
            alt=""
            className="w-12"
          />
          {/* <img
            src={category?.inactiveImgUrl || ""}
            alt=""
            className="w-12 group-hover:hidden block"
          /> */}
        </div>
      </div>
    </Card>
  );
};

export default CourseCardProps;
