import { motion } from "framer-motion";
import * as React from "react";
import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemState,
} from "react-accessible-accordion";
import { HiOutlineChevronDown } from "react-icons/hi";

interface TeacherReportItemProps {
  course: any;
  key?: number;
}

export const TeacherReportItem = ({
  course,
  key,
}: TeacherReportItemProps): React.ReactElement => {
  const buttonVariants = {
    plusClosed: { rotate: "0deg" },
    plusOpen: { rotate: "-180deg" },
  };

  const contentVariants = {
    contentClosed: { height: "0px", opacity: 0 },
    contentOpen: { height: "auto", opacity: 1 },
  };
  return (
    <AccordionItem className="" key={key}>
      <AccordionItemHeading>
        <AccordionItemState>
          {({ expanded }): React.ReactElement => {
            return (
              <AccordionItemButton className="flex items-center justify-between p-4 text-lg font-bold lg:text-xl">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center justify-center w-12 overflow-hidden rounded-lg aspect-square">
                    <img src={course.thumbnail?.url || '/images/placehold.png'} alt="" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 capitalize">
                      {course.level}
                    </p>
                    <p>{course.title}</p>
                  </div>
                </div>
                <div className="relative flex items-center w-4 h-4 lg:w-8 lg:h-8">
                  <motion.div
                    className="text-gray-400"
                    animate={expanded ? "plusOpen" : "plusClosed"}
                    initial="plusClosed"
                    variants={buttonVariants}
                  >
                    <HiOutlineChevronDown />
                  </motion.div>
                </div>
              </AccordionItemButton>
            );
          }}
        </AccordionItemState>
      </AccordionItemHeading>
      <AccordionItemState>
        {({ expanded }): React.ReactElement => {
          return (
            <motion.div
              className="overflow-hidden"
              variants={contentVariants}
              animate={expanded ? "contentOpen" : "contentClosed"}
              initial="contentClosed"
            >
              <div className="grid gap-6 pl-4 pr-4 mb-8 lg:pl-20">
                <div>
                  <p className="pb-4"></p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex space-x-4">
                      <img
                        src="/images/profile/star.png"
                        alt=""
                        className="w-14 h-14"
                      />
                      <div className="font-bold">
                        <p className="text-gray-400">Students Enrolled</p>
                        <p>
                          {course._count.enrolledCourses}{" "}
                          {course._count.enrolledCourses > 1
                            ? "Students"
                            : "Student"}
                        </p>
                        <p>+{course.enrolledCourses?.length} (New)</p>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <img
                        src="/images/profile/star.png"
                        alt=""
                        className="w-14 h-14"
                      />
                      <div className="font-bold">
                        <p className="text-gray-400">Students Comments</p>
                        <p>0 Comment(s)</p>
                        <p>+0 (New)</p>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <img
                        src="/images/profile/star.png"
                        alt=""
                        className="w-14 h-14"
                      />
                      <div className="font-bold">
                        <p className="text-gray-400">Challenge Uploaded</p>
                        <p>0 Submission(s)</p>
                        <p>+0 (New)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        }}
      </AccordionItemState>
    </AccordionItem>
  );
};

export default TeacherReportItem;
