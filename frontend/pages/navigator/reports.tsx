import { subDays } from "date-fns";
import lodash from "lodash";
import { useRouter } from "next/router";
import Head from "next/head";
import React, { useEffect, useState, useMemo } from "react";
import { Accordion } from "react-accessible-accordion";
import { HiChevronRight } from "react-icons/hi";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

import { Button, Dialog } from "@/components/Elements";
import { Card } from "@/components/Elements/Card";
import { Divider } from "@/components/Elements/Divider";
import Section from "@/components/Elements/Section";
import { Title } from "@/components/Elements/Title";
import { AppLayout } from "@/components/Layout";
import { ParentTooltip, ParentArrowTooltip } from "@/components/Onboard";
import TeacherReportItem from "@/components/Reports/teacherReportItem";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  State,
  useTeacherReportLazyQuery,
  useUpdateUserOnboardedMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { useStore } from "utils/hooks/zustand";
export const getServerSideProps = extractHostname;

const TeacherReports = ({ hostname }: Props): React.ReactElement => {
  const today = new Date();
  const lastWeek = subDays(today, 7);
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();
  const [getReport, reportResponse] = useTeacherReportLazyQuery();
  const [steps, setSteps] = React.useState<Step[]>([]);
  const [tourStep, setTourStep] = React.useState(0);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setMe);
  const tourOpen = useStore((state) => state.onboarding);
  const setTourOpen = useStore((state) => state.setOnboarding);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [courseRanking, setCourseRanking] = useState<any[]>([]);
  const [studentsEnrolled, setStudentsEnrolled] = useState(0);
  const router = useRouter();

  useEffect(() => {
    getReport({
      variables: { where: { createdAt: { gt: lastWeek, lt: today } } },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (tourOpen) {
      setSteps([
        {
          //0
          content: (
            <div className="w-64 lg:w-80">
              <div className="space-y-4 font-semibold">
                <p>
                  Here is the Weekly Reports of your courses’ performance on
                  NovaLearn.
                </p>
              </div>
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={updateOnboardStatus}
                  className="flex items-center font-bold text-[#66FFEE] active:none"
                >
                  <p>Skip Tutorial</p>
                </button>
                <button
                  onClick={(): void => {
                    router.push(`/navigator/profile/${user?.id}`);
                  }}
                  className="flex items-center font-bold"
                >
                  <p>Continue</p>
                  <HiChevronRight size={16} />
                </button>
              </div>
            </div>
          ),
          styles: {
            options: {
              arrowColor: "#00C7B1",
              overlayColor: "rgba(0,0, 0, 0.0)",
            },
          },
          tooltipComponent: ParentArrowTooltip,
          placement: "bottom-start",
          target: ".navigator_tour_80",
          disableBeacon: true,
          spotlightClicks: true,
        },
        {
          //1
          content: (
            <div className="w-64 lg:w-80">
              <div className="space-y-4 font-semibold">
                <p>Click on Menu icon</p>
              </div>
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={updateOnboardStatus}
                  className="flex items-center font-bold text-[#66FFEE] active:none"
                >
                  <p>Skip Tutorial</p>
                </button>
                <button
                  onClick={(): void => {
                    if (
                      document.querySelector(".mobile-menu")?.ariaExpanded ==
                      "true"
                    ) {
                      setTourStep(2);
                    }
                  }}
                  className="flex items-center font-bold"
                >
                  <p>Continue</p>
                  <HiChevronRight size={16} />
                </button>
              </div>
            </div>
          ),
          styles: {
            options: {
              arrowColor: "#00C7B1",
              overlayColor: "rgba(0,0, 0, 0.0)",
            },
          },
          tooltipComponent: ParentArrowTooltip,
          placement: "bottom-start",
          target: ".tour_2_mobile",
          disableBeacon: true,
          spotlightClicks: true,
        },
        {
          //2
          content: (
            <div className="w-64 lg:w-80">
              <div className="space-y-4 font-semibold">
                <p>
                  Here is the Weekly Reports of your courses’ performance on
                  NovaLearn.
                </p>
              </div>
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={updateOnboardStatus}
                  className="flex items-center font-bold text-[#66FFEE] active:none"
                >
                  <p>Skip Tutorial</p>
                </button>
                <button
                  onClick={(): void => {
                    router.push("/navigator/profile");
                  }}
                  className="flex items-center font-bold"
                >
                  <p>Continue</p>
                  <HiChevronRight size={16} />
                </button>
              </div>
            </div>
          ),
          styles: {
            options: {
              arrowColor: "#00C7B1",
              overlayColor: "rgba(0,0, 0, 0.0)",
            },
          },
          tooltipComponent: ParentArrowTooltip,
          placement: "bottom-start",
          target: "#Reports",
          disableBeacon: true,
          spotlightClicks: true,
        },
      ]);

      const mediaQuery = window.matchMedia("(min-width: 1024px)");

      const mobileMenuTourHandler = (e: any): void => {
        e.matches ? setTourStep(0) : setTourStep(1);
      };

      mediaQuery.addEventListener("change", mobileMenuTourHandler);

      mobileMenuTourHandler(mediaQuery);
    }
  }, []);

  useEffect(() => {
    if (reportResponse.data?.me.teacher?.Course) {
      const course = reportResponse.data.me.teacher?.Course;

      const sorted = lodash.orderBy(course, "_count.enrolledCourses", "desc");

      // Filter student enrolled based on their ID
      const sum = new Set();
      for (let i = 0; i < course.length; ++i) {
        if (!course[i].deleted) {
          course[i].enrolledCourses?.forEach((enrolled) =>
            sum.add(enrolled.studentId),
          );
        }
      }
      setStudentsEnrolled(sum.size);

      // Filters to get only published courses
      const filtered = sorted.filter(
        (course) => course.state === State.Published && course.deleted === null,
      );

      setCourseRanking(filtered);
    }
  }, [reportResponse.data]);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  //=====FUNCTIONS
  const closeTour = (): void => {
    setTourOpen(false);
    setIsOpen(false);
  };

  const handleJoyrideCallback = (data: CallBackProps): void => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setTourOpen(false);
    }
  };

  const updateOnboardStatus = async (): Promise<void> => {
    closeTour();
    setUser({ ...user, onboarded: true });
    try {
      await updateUserOnboarded({
        variables: {
          data: {
            onboarded: {
              set: true,
            },
          },
        },
      });
      router.push("/navigator/home");
    } catch (error) {
      console.log(error);
    }
  };

  const calcNewStudents = (): number => {
    const sum = new Set();
    if (reportResponse.data?.me.teacher?.Course) {
      reportResponse.data?.me.teacher?.Course.forEach((course) => {
        if (course.state === "PUBLISHED" && !course.deleted) {
          course.enrolledCourses?.forEach((enrolledCourse) => {
            const currDate = new Date();
            const enrolledDate = new Date(enrolledCourse.createdAt);
            //168 hours = 1 week
            if (
              Math.abs(currDate.valueOf() - enrolledDate.valueOf()) / 36e5 <
              168
            ) {
              sum.add(enrolledCourse.studentId);
            }
          });
        }
      });
    }
    return sum.size;
  };

  const numNewStudents = useMemo(
    () => calcNewStudents(),
    [reportResponse.data],
  );

  return (
    <AppLayout hostname={hostname}>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <div className="relative z-10 flex min-h-screen">
        <Section size="2xl">
          <div className="flex flex-col items-center pb-8">
            <Title color="black">Courses Report</Title>
            <p className="pt-6">{"Take a look at your courses' performance"}</p>
          </div>
          <Divider />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="col-span-2">
              <Accordion
                allowZeroExpanded
                allowMultipleExpanded
                className="mt-8 border-2 border-gray-300 border-opacity-60 rounded-2xl"
              >
                {courseRanking && courseRanking?.length > 0 ? (
                  courseRanking.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`${
                          courseRanking && index === courseRanking.length - 1
                            ? ""
                            : "border-b-2"
                        } border-gray-300`}
                      >
                        <TeacherReportItem course={item} />
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col p-6">No reports yet</div>
                )}
              </Accordion>
            </div>
            <div className="mt-8">
              <Card className="flex items-center p-4 space-x-4">
                <div className="w-12">
                  <img src="/images/avatar-placeholder.png" alt="" />
                </div>
                <div className="font-bold">
                  <p className="text-gray-400">Total Students</p>
                  <p className="text-xl">
                    {studentsEnrolled}{" "}
                    {studentsEnrolled > 1 ? "Students" : "Student"}
                  </p>
                  <p className="text-xl text-green-300">
                    +{numNewStudents}{" "}
                    {numNewStudents > 1 ? "Students" : "Student"}
                  </p>
                </div>
              </Card>

              <Card className="mt-6">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold lg:text-2xl font-header tracking-header">
                      My Course Ranking
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <img
                      src="/images/dashboard/ranking.png"
                      alt=""
                      className="w-14 h-14 mr-4"
                    />
                    <p className="text-gray-500">
                      See which courses from you are loved by students the most!
                    </p>
                  </div>
                </div>
                <Divider />
                <div className="flex flex-col px-4 py-4 space-y-2 overflow-y-auto max-h-56">
                  {courseRanking.length > 0 &&
                    courseRanking.map((item, index) => {
                      return (
                        <div key={index} className="flex items-center">
                          <div className="w-8">{index + 1}.</div>
                          <img
                            src={
                              item.thumbnail?.url
                                ? item.thumbnail.url
                                : "/images/placehold.png"
                            }
                            alt=""
                            className="w-12 mr-4 rounded-lg"
                          />
                          <div className="flex items-center justify-between w-full font-bold">
                            <div>
                              <p className="text-xs text-gray-400 capitalize">
                                {item.level}
                              </p>
                              <p>{item.title}</p>
                            </div>
                            <div>{item._count.enrolledCourses} Enrolled</div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Card>
            </div>
          </div>
        </Section>
      </div>
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideBackButton
        hideCloseButton
        run={tourOpen}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        stepIndex={tourStep}
        disableCloseOnEsc
        disableOverlayClose
        tooltipComponent={ParentTooltip}
        styles={{
          options: {
            width: "auto",
            zIndex: 10000,
          },
          spotlight: {
            borderRadius: 20,
          },
        }}
      />
      <Dialog
        isOpen={isOpen}
        onClose={(): void => {
          setIsOpen(false);
          setTourOpen(true);
        }}
        className=""
      >
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-xl font-extrabold text-red-600 lg:text-2xl">
            Warning!
          </p>
          <p className="my-6 text-base text-center text-gray-600 lg:text-lg">
            Are you sure you want to end the tour?
          </p>
          <div className="flex flex-row items-center space-x-8">
            <Button
              variant="brand1"
              onClick={(): void => {
                setIsOpen(false);
                setTourOpen(true);
              }}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={updateOnboardStatus}>
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </AppLayout>
  );
};

export default withAuthenticated(withApollo(TeacherReports));
