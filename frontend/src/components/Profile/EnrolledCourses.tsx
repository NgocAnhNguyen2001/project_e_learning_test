import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { HiChevronDown, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import {
  CountCourseQuery,
  EnrolledCourse,
  State,
} from "schema/generated/graphql";
import { ProgressProvider } from "./ProgressProvider";
import { Progressbar } from "@/components/Elements/Progressbar";
import { useRouter } from "next/router";

import "react-circular-progressbar/dist/styles.css";
import Image from "next/image";
import autoAnimate from "@formkit/auto-animate";

type Props = {
  courseCount: CountCourseQuery | undefined;
  enrolledCourse: EnrolledCourse[] | null | undefined;
  setDisplayTab: (value: "MAIN" | "FRIENDS" | "JOURNAL" | "COURSES") => void;
};

export const EnrolledCourses: React.FC<Props> = (props) => {
  const router = useRouter();
  const { courseCount, enrolledCourse, setDisplayTab } = props;
  const [showMore, setShowMore] = React.useState(false);
  const [completedCourses, setCompletedCourses] = React.useState<
    any[] | undefined
  >([]);
  const [showCompletedCourses, setShowCompletedCourses] = React.useState(false);

  const courseRef = React.useRef(null);

  React.useEffect(() => {
    setCompletedCourses(
      enrolledCourse?.filter((course) => {
        return (
          course.state == "COMPLETE" &&
          course.progress == 100 &&
          course.course.deleted == null &&
          course.course.state == "PUBLISHED"
        );
      }),
    );
  }, [enrolledCourse]);

  React.useEffect(() => {
    courseRef.current && autoAnimate(courseRef.current);
  }, [courseRef]);

  return (
    <div className="w-full rounded-md p-4 h-full">
      <div
        className="flex flex-row text-center items-center cursor-pointer"
        onClick={(): void => {
          setDisplayTab("MAIN");
        }}
      >
        <HiChevronLeft className="w-8 h-8 text-white " />
        <p className="text-white text-base font-bold">COURSES ENROLLED</p>
      </div>
      <div className="flex flex-row items-start h-fit	 w-full py-8 sm:space-x-16 lg:space-x-24">
        <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 mr-6 sm:mr-0">
          <ProgressProvider
            valueStart={0}
            valueEnd={
              courseCount?.adminCountCourse
                ? ((enrolledCourse?.length ?? 0) /
                    courseCount?.adminCountCourse) *
                  100
                : 0
            }
          >
            {(value: number): JSX.Element => (
              <>
                <GradientSVG />
                <CircularProgressbarWithChildren
                  value={value}
                  styles={{
                    path: { stroke: `url(#circularBar)`, height: "100%" },
                  }}
                >
                  <div className="flex flex-col text-center mx-2">
                    <p className="text-white text-sm sm:text-md md:text-2xl lg:text-4xl font-bold">
                      {enrolledCourse?.filter(
                        (course) => course.course.published,
                      )?.length ?? 0}
                    </p>
                    <p className="text-white text-[0.6rem] sm:text-xs md:text-md lg:text-xl font-medium">
                      <p className="hidden sm:block">courses</p> enrolled
                    </p>
                  </div>
                </CircularProgressbarWithChildren>
              </>
            )}
          </ProgressProvider>
        </div>
        <div
          className="h-12 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 cursor-pointer"
          onClick={(): void => {
            setShowCompletedCourses(!showCompletedCourses);
            setShowMore(false);
          }}
        >
          <ProgressProvider
            valueStart={0}
            valueEnd={
              ((completedCourses?.length ?? 0) /
                (enrolledCourse?.length ?? 1)) *
              100
            }
          >
            {(value: number): JSX.Element => (
              <CircularProgressbarWithChildren
                value={value}
                styles={{
                  path: { stroke: `url(#circularBar)`, height: "100%" },
                }}
              >
                <div className="flex flex-col text-center mx-2">
                  <p className="text-white text-sm sm:text-md md:text-2xl lg:text-4xl font-bold">
                    {completedCourses?.length ?? 0}
                  </p>
                  <p className="text-white text-[0.6rem] sm:text-xs md:text-md lg:text-[1.20rem] font-medium">
                    <p className="hidden sm:block">courses</p> completed
                  </p>
                </div>
              </CircularProgressbarWithChildren>
            )}
          </ProgressProvider>
        </div>
      </div>
      <div className={`space-y-4 rounded-lg`} ref={courseRef}>
        {showCompletedCourses
          ? completedCourses?.map((course, index) => {
              return (
                (index < 2 || showMore) && (
                  <div
                    className="bg-[#2D0745]/70 w-full p-2 md:p-4 lg:p-6 h-24 md:h-28 lg:h-44 rounded-xl flex items-center cursor-pointer"
                    onClick={(): void => {
                      router.push(`/student/courses/${course.course.id}`);
                    }}
                  >
                    <div
                      className={`relative w-1/2 lg:w-4/12 h-20 md:h-20 lg:h-32 ${
                        !course.course.thumbnail?.url && "bg-white rounded-xl"
                      }`}
                    >
                      <Image
                        src={course.course.thumbnail?.url ?? "/images/logo.png"}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-xl"
                        alt={course.course.title}
                      />
                    </div>
                    <div className="flex flex-col p-3 lg:p-4 w-full md:w-1/2 lg:w-8/12 space-y-4">
                      <div className="flex flex-row justify-between">
                        <p className="text-white text-lg lg:text-2xl font-bold truncate">
                          {course.course.title}
                        </p>

                        <p className="text-white text-lg lg:text-2xl font-bold">
                          {course.progress}%
                        </p>
                      </div>
                      <Progressbar
                        percent={course.progress}
                        // percent={(profileData.EXP % 1000) / 10}
                        barColorClassName="bg-gradient-to-r from-[#FFC12C] via-[#FFFF00] to-[#FFC12C]"
                        customColor="#20B5FF"
                        className="w-full"
                      />
                    </div>
                    <HiChevronRight className="w-10 h-10 text-white cursor-pointer" />
                  </div>
                )
              );
            })
          : enrolledCourse
              ?.filter((course) => course.course.published)
              .map((course, index) => {
                if (course.course.state == State.Published)
                  return (
                    (index < 2 || showMore) && (
                      <div
                        className="bg-[#2D0745]/70 w-full p-2 md:p-4 lg:p-6 h-24 md:h-28 lg:h-44 rounded-xl flex items-center cursor-pointer"
                        onClick={(): void => {
                          router.push(`/student/courses/${course.course.id}`);
                        }}
                      >
                        <div
                          className={`relative w-1/2 lg:w-4/12 h-20 md:h-20 lg:h-32 ${
                            !course.course.thumbnail?.url &&
                            "bg-white rounded-xl"
                          }`}
                        >
                          <Image
                            src={
                              course.course.thumbnail?.url ?? "/images/logo.png"
                            }
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl"
                            alt={course.course.title}
                          />
                        </div>
                        <div className="flex flex-col p-3 lg:p-4 w-full md:w-1/2 lg:w-8/12 space-y-4">
                          <div className="flex flex-row justify-between">
                            <p className="text-white text-lg lg:text-2xl font-bold truncate">
                              {course.course.title}
                            </p>

                            <p className="text-white text-lg lg:text-2xl font-bold">
                              {course.progress}%
                            </p>
                          </div>
                          <Progressbar
                            percent={course.progress}
                            // percent={(profileData.EXP % 1000) / 10}
                            barColorClassName="bg-gradient-to-r from-[#FFC12C] via-[#FFFF00] to-[#FFC12C]"
                            customColor="#20B5FF"
                            className="w-full"
                          />
                        </div>
                        <HiChevronRight className="w-10 h-10 text-white cursor-pointer" />
                      </div>
                    )
                  );
              })}
      </div>
      {!showMore &&
        (showCompletedCourses
          ? (completedCourses?.length ?? 0) > 2
          : (enrolledCourse?.filter((course) => course.course.published)
              ?.length ?? 0) > 2) && (
          <div
            className="flex flex-row items-center justify-center cursor-pointer"
            onClick={(): void => {
              setShowMore(true);
            }}
          >
            <p className="text-white font-semibold">SHOW MORE</p>
            <HiChevronDown className="w-10 h-10 text-white cursor-pointer" />
          </div>
        )}
    </div>
  );
};

const GradientSVG = (): JSX.Element => {
  const idCSS = "circularBar";
  const gradientTransform = `rotate(90)`;
  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient id={idCSS} gradientTransform={gradientTransform}>
          <stop offset="16.44%" stopColor="#9B26B6" />
          <stop offset="85.56%" stopColor="#4F00B1" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default GradientSVG;
