import * as React from "react";
import { HiChevronRight } from "react-icons/hi";

import { Progressbar } from "@/components/Elements/Progressbar";

interface Course {
  title: string;
  duration: number;
  thumbnail: {
    url: string;
  };
}
interface EnrolledCourse {
  name: string;
  progress: number;
  checkpoint: string;
  course: Course;
}

interface ICourseProgressProps {
  className?: string;
  course: EnrolledCourse;
  key?: any;
}

export const CourseProgress = (
  props: ICourseProgressProps,
): React.ReactElement => {
  return (
    <div className={`grid grid-cols-8 gap-6 ${props.className}`}>
      <div className="relative col-span-2 overflow-hidden rounded-xl pb-16:9">
        <img
          src={
            props.course.course.thumbnail?.url
              ? props.course.course.thumbnail.url
              : "/images/placehold.png"
          }
          alt=""
          className="object-contain w-full h-full"
        />
      </div>
      <div className="flex flex-col items-start self-center w-full col-span-5">
        <div className="flex flex-row justify-between w-full mb-4">
          <p className="text-lg font-bold lg:text-xl">
            {props.course.course.title}
          </p>
          <p className="text-sm font-bold opacity-80 lg:text-base">
            {props.course.progress}%
          </p>
        </div>
        <Progressbar percent={props.course.progress} />
        <p className="mt-4 text-sm opacity-60 lg:text-base">
          Checkpoint: {props.course.checkpoint}
        </p>
      </div>
      <div className="self-center col-span-1 justify-self-center">
        <HiChevronRight size={36} />
      </div>
    </div>
  );
};

export default CourseProgress;
