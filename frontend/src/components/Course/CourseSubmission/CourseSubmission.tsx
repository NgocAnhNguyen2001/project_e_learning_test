import * as React from "react";
import { HiChevronRight, HiHeart, HiChat } from "react-icons/hi";

// Temporary
interface Course {
  name: string;
  checkpoint: string;
}

interface ICourseSubmissionProps {
  className?: string;
  course: Course;
}

export const CourseSubmission = (
  props: ICourseSubmissionProps,
): React.ReactElement => {
  return (
    <div className={`grid grid-cols-8 gap-6 ${props.className}`}>
      <div className="relative col-span-2 overflow-hidden rounded-xl pb-16:9">
        <img
          src="/images/placehold.png"
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col items-start self-center w-full col-span-5">
        <p className="text-lg lg:text-xl font-bold">{props.course.name}</p>
        <p className="mt-4 opacity-60 mb-2 text-sm lg:text-base">
          Checkpoint: {props.course.checkpoint}
        </p>
        <p className="font-bold mb-2 flex flex-row items-center">
          <HiHeart
            className="mr-2 text-sm lg:text-base"
            color="#FF4B4B"
            size={20}
          />{" "}
          8,888,888
        </p>
        <p className="font-bold mb-2 flex flex-row items-center">
          <HiChat
            className="mr-2 text-sm lg:text-base"
            color="#1CB0F6"
            size={20}
          />{" "}
          8,888,888
        </p>
      </div>
      <div className="self-center col-span-1 justify-self-center">
        <HiChevronRight size={36} />
      </div>
    </div>
  );
};

export default CourseSubmission;
