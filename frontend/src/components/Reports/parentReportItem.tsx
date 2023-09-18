import {
  endOfWeek,
  format,
  formatDistanceStrict,
  startOfWeek,
  subDays,
} from "date-fns";
import { motion } from "framer-motion";
import * as React from "react";
import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemState,
} from "react-accessible-accordion";
import { HiOutlineChevronDown } from "react-icons/hi";

import { useChildReportLazyQuery } from "schema/generated/graphql";

import { Button } from "../Elements";
import { Progressbar } from "../Elements/Progressbar";
import { SelectFieldNoControl } from "../Form/SelectFieldNoControl";

interface IParentReportItemProps {
  child: any;
  key?: number;
}

type TotalTimeSpentTimeUnitType = "Hours" | "Minutes" | "Hour" | "Minute";

export const ParentReportItem = ({
  child,
  key,
}: IParentReportItemProps): React.ReactElement => {
  const [getChild, reportResponse] = useChildReportLazyQuery();
  const [totalTimeSpent, setTotalTimeSpent] = React.useState<number>(0);
  const [totalTimeSpentTimeUnit, setTotalTimeSpentTimeUnit] =
    React.useState<TotalTimeSpentTimeUnitType>("Minute");
  const [friendsCount, setFriendsCount] = React.useState<number>(0);
  const [workSubmittedCount, setWorkSubmittedCount] = React.useState<number>(0);
  const buttonVariants = {
    plusClosed: { rotate: "0deg" },
    plusOpen: { rotate: "-180deg" },
  };

  const contentVariants = {
    contentClosed: { height: "0px", opacity: 0 },
    contentOpen: { height: "auto" },
  };

  const startDate = startOfWeek(new Date(), { weekStartsOn: 0 });
  const endDate = endOfWeek(new Date(), { weekStartsOn: 0 });

  const [weeks, setWeeks] = React.useState([
    {
      label: `${format(startDate, "dd MMM yyyy")} - ${format(
        endDate,
        "dd MMM yyyy",
      )}`,
      value: {
        start: startDate,
        end: endDate,
      },
    },
  ]);

  const [selectedWeek, setSelectedWeek] = React.useState({
    start: startDate,
    end: endDate,
  });

  const [numberShown, setNumberShown] = React.useState(3);

  React.useEffect(() => {
    const today = new Date();
    const weekData = [];
    for (let i = 0; i < 5; i++) {
      const prevWeek = subDays(today, 7 * i);
      const start = startOfWeek(prevWeek, { weekStartsOn: 0 });
      const end = endOfWeek(prevWeek, { weekStartsOn: 0 });

      weekData.push({
        label: `${format(start, "dd MMM yyyy")} - ${format(
          end,
          "dd MMM yyyy",
        )}`,
        value: { start, end },
      });
    }

    setWeeks(weekData);
  }, []);

  React.useEffect(() => {
    getChild({
      variables: {
        id: child.id,
        where: { createdAt: { gt: selectedWeek.start, lt: selectedWeek.end } },
      },
    });
    const friendList = child.friendsRequestee
      .concat(child.friendsRequester)
      .filter((friend: any) => {
        return (
          friend.friendStatus == "ACCEPTED" &&
          new Date(friend.createdAt).getTime() >=
            selectedWeek.start.getTime() &&
          new Date(friend.createdAt).getTime() <= selectedWeek.end.getTime()
        );
      });
    setFriendsCount(friendList.length);

    const challengeGalleryList =
      reportResponse.data?.child.challengeGallery?.filter((challenge: any) => {
        return (
          new Date(challenge.createdAt).getTime() >=
            selectedWeek.start.getTime() &&
          new Date(challenge.createdAt).getTime() <= selectedWeek.end.getTime()
        );
      });
    setWorkSubmittedCount(challengeGalleryList?.length ?? 0);
  }, [selectedWeek, child, getChild]);

  React.useEffect(() => {
    const formatTotalTimeSpent = (time: number): void => {
      const unit = time < 60 ? "minute" : "hour";
      const [calculatedTime, timeUnit] = formatDistanceStrict(
        new Date(time * 60 * 1000),
        new Date(0),
        {
          roundingMethod: "floor",
          unit,
        },
      ).split(" ");

      const numberTime = Number(calculatedTime);
      const formattedTimeUnit =
        timeUnit.charAt(0).toUpperCase() + timeUnit.slice(1);
      setTotalTimeSpent(numberTime);
      setTotalTimeSpentTimeUnit(
        formattedTimeUnit as TotalTimeSpentTimeUnitType,
      );
    };
    let timeSpent = 0;
    reportResponse.data?.child?.enrolledCourses?.forEach((courses) => {
      courses.checkpoints?.forEach((item) => {
        if (item.state === "COMPLETE") {
          timeSpent += item.checkpoint?.duration || 0;
        }
      });
    });
    formatTotalTimeSpent(timeSpent);
  }, [reportResponse.data?.child.enrolledCourses]);

  return (
    <AccordionItem className="" key={key}>
      <AccordionItemHeading>
        <AccordionItemState>
          {({ expanded }): React.ReactElement => {
            return (
              <AccordionItemButton className="flex items-center justify-between p-4 text-lg font-bold lg:text-xl">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center justify-center w-12 overflow-hidden rounded-full aspect-square">
                    <img
                      src={
                        child.avatarImage
                          ? child.avatarImage.url
                          : "/images/common/default.png"
                      }
                      alt=""
                    />
                  </div>
                  <p>{child.username}</p>
                </div>
                <div className="relative flex items-center w-4 h-4 lg:w-8 lg:h-8">
                  <motion.div
                    className="text-gray-400"
                    animate={expanded ? "plusOpen" : "plusClosed"}
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
              variants={contentVariants}
              animate={expanded ? "contentOpen" : "contentClosed"}
            >
              <div className="grid gap-6 pl-4 pr-4 mb-8 lg:pl-20 lg:gap-12 lg:grid-cols-2">
                <div>
                  <div>
                    <SelectFieldNoControl
                      options={weeks}
                      setValue={setSelectedWeek}
                      defaultValue={weeks[0]}
                    />
                  </div>
                  <div className="grid grid-cols-2 lg:gap-x-12 gap-x-4 gap-y-4">
                    <div className="flex">
                      <img src="/images/profile/search.svg" alt="" className="w-7" />
                      <div className="ml-4 font-semibold">
                        <p className="text-gray-400">Total Time Spent</p>
                        <p>
                          {totalTimeSpent} {totalTimeSpentTimeUnit}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <img src="/images/profile/search.svg" alt="" className="w-7" />
                      <div className="ml-4 font-semibold">
                        <p className="text-gray-400">New Enrolled Course</p>
                        <p>
                          {reportResponse.data?.child.enrolledCourses?.length}{" "}
                          {reportResponse.data?.child.enrolledCourses &&
                          reportResponse.data?.child.enrolledCourses?.length > 1
                            ? "Courses"
                            : "Course"}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <img src="/images/profile/search.svg" alt="" className="w-7" />
                      <div className="ml-4 font-semibold">
                        <p className="text-gray-400">New Friends Added</p>
                        <p>
                          {friendsCount}{" "}
                          {friendsCount > 1 ? "Friends" : "Friend"}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <img src="/images/profile/search.svg" alt="" className="w-7" />
                      <div className="ml-4 font-semibold">
                        <p className="text-gray-400">Completed Courses</p>
                        <p>
                          {
                            reportResponse.data?.child.enrolledCourses?.filter(
                              (enrolledCourse) =>
                                enrolledCourse.state === "COMPLETE",
                            ).length
                          }{" "}
                          {reportResponse.data?.child.enrolledCourses &&
                          reportResponse.data?.child.enrolledCourses?.length &&
                          reportResponse.data?.child.enrolledCourses?.filter(
                            (enrolledCourse) =>
                              enrolledCourse.state === "COMPLETE",
                          ).length > 1
                            ? "Courses"
                            : "Course"}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <img src="/images/profile/search.svg" alt="" className="w-7" />
                      <div className="ml-4 font-semibold">
                        <p className="text-gray-400">Works Submitted</p>
                        <p>
                          {workSubmittedCount}{" "}
                          {workSubmittedCount > 1 ? "Works" : "Work"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="pb-4 font-bold text-gray-400">
                    Current Enrolled Course Progress
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    {/* Content */}
                    {child.enrolledCourses.length === 0 ? (
                      <p className="font-semibold">No enrolled courses yet</p>
                    ) : (
                      <>
                        {child.enrolledCourses
                          .filter((enrolledCourse: any) => {
                            return (
                              enrolledCourse.course.state === "PUBLISHED" &&
                              enrolledCourse.course.deleted === null
                            );
                          })
                          .map((item: any, index: number) => {
                            if (index < numberShown) {
                              return (
                                <div key={index} className="flex items-center">
                                  <div className="flex items-center justify-center object-cover w-24 mr-4 overflow-hidden aspect-video rounded-xl">
                                    <img
                                      src={
                                        item.course.thumbnail
                                          ? item.course.thumbnail.url
                                          : "/images/placehold.png"
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div className="flex-grow">
                                    <p className="font-bold">
                                      {item.course.title}
                                    </p>
                                    <Progressbar
                                      percent={item.progress}
                                      showPercentage
                                    />
                                  </div>
                                </div>
                              );
                            }
                          })}
                      </>
                    )}
                    {numberShown < child.enrolledCourses.length ? (
                      <Button
                        className={`${
                          child.enrolledCourses.length < 4 && "hidden"
                        }`}
                        variant="ghost"
                        size="none"
                        onClick={(): void => setNumberShown(numberShown + 3)}
                      >
                        SEE MORE
                      </Button>
                    ) : (
                      <Button
                        className={`${
                          child.enrolledCourses.length < 4 && "hidden"
                        }`}
                        variant="ghost"
                        size="none"
                        onClick={(): void => setNumberShown(numberShown - 3)}
                      >
                        SEE LESS
                      </Button>
                    )}
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

export default ParentReportItem;
