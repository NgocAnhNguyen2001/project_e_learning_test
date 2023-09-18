import lodash from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { HiChevronRight } from "react-icons/hi";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

import { CourseCardProps } from "@/components/Course/CourseCard";
import { Button, Dialog } from "@/components/Elements";
import { Card } from "@/components/Elements/Card";
import { Divider } from "@/components/Elements/Divider";
import Section from "@/components/Elements/Section";
import { AppLayout } from "@/components/Layout";
import { ParentTooltip, ParentArrowTooltip } from "@/components/Onboard";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  Course,
  State,
  useCoursesLazyQuery,
  useTeacherReportLazyQuery,
  useUpdateUserOnboardedMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { useStore } from "utils/hooks/zustand";

export const getServerSideProps = extractHostname;

const TeacherHome = ({ hostname }: Props): React.ReactElement => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setMe);
  const tourOpen = useStore((state) => state.onboarding);
  const setTourOpen = useStore((state) => state.setOnboarding);
  const router = useRouter();
  const [steps, setSteps] = React.useState<Step[]>([]);
  const [tourStep, setTourStep] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [getCourses, courses] = useCoursesLazyQuery();
  const [getReport, reportResponse] = useTeacherReportLazyQuery();
  const [published, setPublished] = React.useState<any>();
  const [courseRanking, setCourseRanking] = React.useState<any[]>([]);
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (tourOpen) {
      setSteps([
        {
          //0
          content: (
            <div>
              <div className="space-y-4 font-semibold text-center">
                <p>
                  Welcome to Novalearn, {user?.firstName + " " + user?.lastName}
                  , where you can share your knowledge with students from
                  anywhere!
                </p>
                <p>Let&apos;s get started.</p>
              </div>
              <div className="flex items-center justify-center mt-10 gap-x-3">
                <Button
                  className="w-24"
                  size="sm"
                  variant="gray"
                  onClick={updateOnboardStatus}
                >
                  Skip
                </Button>
                <Button
                  className="w-52"
                  size="sm"
                  variant="brand1"
                  onClick={(): void => {
                    // Check if hit lg breakpoint
                    const mediaQuery = window.matchMedia("(min-width: 1024px)");

                    const mobileMenuTourHandler = (e: any): void => {
                      e.matches ? setTourStep(1) : setTourStep(2);
                    };

                    mediaQuery.addEventListener(
                      "change",
                      mobileMenuTourHandler,
                    );

                    mobileMenuTourHandler(mediaQuery);
                  }}
                >
                  Begin Tutorial
                </Button>
              </div>
            </div>
          ),
          styles: {
            options: {
              overlayColor: "rgba(0,0, 0, 0.85)",
            },
          },
          placement: "center",
          target: "body",
          hideFooter: true,
          disableBeacon: true,
        },
        {
          //1
          content: (
            <div className="w-64 lg:w-80">
              <div className="space-y-4 font-semibold">
                <p>
                  This is your Dashboard with quick access to create and keep
                  track of your courses.
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
                    setTourStep(5);
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
          target: ".navigator_tour_2",
          disableBeacon: true,
          spotlightClicks: true,
        },
        {
          //2-mobile
          content: (
            <div className="w-64 lg:w-80">
              <div className="space-y-4 font-semibold">
                <p>Click on Menu icon </p>
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
                      setTourStep(3);
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
          //3
          content: (
            <div className="w-64 lg:w-80">
              <div className="space-y-4 font-semibold">
                <p>
                  This is your Dashboard with quick access to create and keep
                  track of your courses.
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
                    setTourStep(4);
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
          target: "#Home",
          disableBeacon: true,
          spotlightClicks: true,
        },
        {
          //4
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
                      "false"
                    ) {
                      setTourStep(5);
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
          //5
          content: (
            <div className="w-64 lg:w-80">
              <div className="space-y-4 font-semibold">
                <p>To manage all your existing courses, click this button</p>
              </div>
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={updateOnboardStatus}
                  className="flex items-center font-bold text-[#66FFEE] active:none"
                >
                  <p>Skip Tutorial</p>
                </button>
              </div>
            </div>
          ),
          styles: {
            options: {
              arrowColor: "#00C7B1",
              overlayColor: "rgba(0,0, 0, 0.85)",
            },
          },
          tooltipComponent: ParentArrowTooltip,
          placement: "bottom-start",
          target: ".navigator_tour_3",
          disableBeacon: true,
          spotlightClicks: true,
        },
      ]);
    }
  }, []);

  React.useEffect(() => {
    if (user) {
      getReport();
      getCourses({
        variables: {
          where: {
            teacherId: {
              equals: user.id,
            },
          },
        },
      });
    }
  }, [user, getCourses, getReport]);

  React.useEffect(() => {
    const published: React.SetStateAction<any[] | undefined> = [];

    if (courses.data) {
      courses.data.courses.forEach((course) => {
        if (course.state === State.Published) {
          published.push(course);
        }
      });

      setPublished(published);
    }
  }, [courses.data]);

  React.useEffect(() => {
    if (reportResponse.data?.me.teacher?.Course) {
      const sorted = lodash.orderBy(
        reportResponse.data.me.teacher?.Course,
        "_count.enrolledCourses",
        "desc",
      );

      // Filter to get only published courses
      const filtered = sorted.filter(
        (course) => course.state === State.Published && course.deleted === null,
      );

      setCourseRanking(filtered);
    }
  }, [reportResponse.data]);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname);
  }, [hostname]);

  // ============FUNCTIONS
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

  return (
    <AppLayout hostname={hostname}>
      <Head>
        <title>{memoTenant.name}</title>
      </Head>
      <div className="relative z-10 flex min-h-screen">
        <Section size="2xl">
          <div className="pb-6 text-center ">
            <p className="pb-4 text-3xl font-bold font-header tracking-header">
              Welcome back, {user?.firstName} {user?.lastName}
            </p>
            <p>
              {
                "Keep track of your designed courses and student's learning progress"
              }
            </p>
          </div>
          <Divider />

          {/* Content */}
          <div className="grid grid-cols-1 pt-8 space-y-6 lg:space-y-0 lg:space-x-12 lg:grid-cols-5">
            {/* Left Col */}
            <div className="lg:col-span-3">
              {/* <p className="pb-6 text-xl font-bold lg:text-2xl font-header tracking-header">
                See What Happened While You Are Away!
              </p>
              <div className="grid space-y-4 lg:space-y-0 lg:grid-cols-3 lg:space-x-4">
                <Card>
                  <div className="flex flex-col items-start p-4">
                    <img
                      src="/images/placehold.png"
                      alt=""
                      className="object-cover object-center w-1/4 mb-4 rounded-full aspect-square"
                    />
                    <p className="text-lg font-bold text-green-400 lg:text-xl tracking-header">
                      8,888
                    </p>
                    <p className="font-semibold text-gray-400">
                      New Enrollments
                    </p>
                  </div>
                </Card>
                <Card>
                  <div className="flex flex-col items-start p-4">
                    <img
                      src="/images/placehold.png"
                      alt=""
                      className="object-cover object-center w-1/4 mb-4 rounded-full aspect-square"
                    />
                    <p className="text-lg font-bold text-green-400 lg:text-xl tracking-header">
                      8,888
                    </p>
                    <p className="font-semibold text-gray-400">New Comments</p>
                  </div>
                </Card>
                <Card>
                  <div className="flex flex-col items-start p-4">
                    <img
                      src="/images/placehold.png"
                      alt=""
                      className="object-cover object-center w-1/4 mb-4 rounded-full aspect-square"
                    />
                    <p className="text-lg font-bold text-green-400 lg:text-xl tracking-header">
                      8,888
                    </p>
                    <p className="font-semibold text-gray-400">
                      New Submissions
                    </p>
                  </div>
                </Card>
              </div> */}
              <div>
                <div className="flex flex-col lg:flex-row">
                  <div className="flex items-center lg:w-2/3">
                    <p className="text-xl font-bold lg:text-2xl font-header tracking-header">
                      My Newly Approved Course This Week!
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Link href="/navigator/my-courses" passHref>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="navigator_tour_3"
                      >
                        Manage my courses
                      </Button>
                    </Link>
                  </div>
                </div>
                {published && published.length > 0 ? (
                  <div className="grid grid-cols-1 space-y-4 md:space-y-0 md:space-x-4 md:grid-cols-2">
                    {published.map((course: Course) => (
                      <div
                        onClick={(): any =>
                          router.push(`/navigator/courses/${course.id}/details`)
                        }
                        key={course.id}
                        role="none"
                      >
                        <CourseCardProps
                          hostname={hostname}
                          name={course.title}
                          difficulty={course.level}
                          category={course.category}
                          thumbnail={
                            course.thumbnail?.url ?? memoTenant.logo.png
                          }
                          duration={course.duration}
                          teacher={course.teacher}
                          className="cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  "No courses yet"
                )}
              </div>
            </div>

            {/* Right Col */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <div className="px-6 pt-6 ">
                  <div className="flex">
                    <div className="w-4/5 text-opacity-80">
                      <p className="text-xl font-bold lg:text-2xl font-header tracking-header">
                        Ignite their passion of learning!
                      </p>
                    </div>
                    <div className="w-1/5">
                      <img
                        src="/images/dashboard/add-course.png"
                        alt=""
                        className="w-16"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <Link href="/navigator/courses/create" passHref>
                    <Button variant="brand1" size="md" className="w-full">
                      Create a new course
                    </Button>
                  </Link>
                </div>
              </Card>
              <Card className="mb-6">
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
                {courseRanking.length > 0 && (
                  <div>
                    <Divider />
                    <div className="flex flex-col px-4 py-4 space-y-2 overflow-auto max-h-56">
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
                                <div>
                                  {item._count.enrolledCourses} Enrolled
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </Card>
              <Card>
                <Link href="/navigator/courses" passHref>
                  <div className="flex p-4 transition duration-200 ease-in-out hover:cursor-pointer hover:bg-gray-200 hover:bg-opacity-50 rounded-2xl">
                    <img
                      src="/images/dashboard/explore-courses-active.png"
                      alt=""
                      className="object-contain w-16 mr-4"
                    />
                    <div className="mr-4 grow">
                      <p className="font-bold font-header tracking-header">
                        Explore Courses
                      </p>
                      <p>
                        {
                          "Discover our carefully tailored courses that are ready to take your students to the next level"
                        }
                      </p>
                    </div>
                    <div className="flex items-center justify-end w-1/12">
                      <HiChevronRight size={32} />
                    </div>
                  </div>
                </Link>
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
            boxShadow: "0px 0px 16px 8px rgba(255,255,255,0.10)",
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

export default withAuthenticated(withApollo(TeacherHome));
