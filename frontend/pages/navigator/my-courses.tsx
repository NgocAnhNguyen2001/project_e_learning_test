import { Tab } from "@headlessui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { HiChevronRight } from "react-icons/hi";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

import { CourseCardProps } from "@/components/Course/CourseCard";
import { Button, Dialog } from "@/components/Elements";
import Section from "@/components/Elements/Section";
import { AppLayout } from "@/components/Layout";
import { ParentTooltip, ParentArrowTooltip } from "@/components/Onboard";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  Course,
  State,
  useCoursesLazyQuery,
  useUpdateUserOnboardedMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { useStore } from "utils/hooks/zustand";
export const getServerSideProps = extractHostname;

const AddCourseTemplate = (): React.ReactElement => {
  return (
    <div className="flex flex-col items-center">
      <img
        src="/images/dashboard/add-course.png"
        alt=""
        className="w-24 pb-4"
      />
      <p className="pb-4 text-xl font-semibold text-center font-header tracking-header">
        Add some courses now
      </p>
      <p className="pb-4 text-center lg:w-1/2">
        Create a new one or check out some courses to get inspired.
      </p>
    </div>
  );
};

const TeacherMyCourses = ({ hostname }: Props): React.ReactElement => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setMe);
  const tourOpen = useStore((state) => state.onboarding);
  const setTourOpen = useStore((state) => state.setOnboarding);
  const onboardStep = useStore((state) => state.onboardStep);
  const [steps, setSteps] = React.useState<Step[]>([]);
  const [tourStep, setTourStep] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();
  const [getCourses, courses] = useCoursesLazyQuery();
  const [published, setPublished] = React.useState<any>();
  const [drafts, setDrafts] = React.useState<any>();
  const [underReview, setUnderReview] = React.useState<any>();
  const [rejected, setRejected] = React.useState<any>();
  const router = useRouter();

  React.useEffect(() => {
    const getAllMyCourses = async (): Promise<void> => {
      if (user) {
        await getCourses({
          variables: {
            where: {
              teacherId: {
                equals: user.id,
              },
            },
          },
        });
      }
    };

    if (user) {
      getAllMyCourses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (tourOpen) {
      setSteps([
        {
          //0
          content: (
            <div className="w-64 lg:w-80">
              <div className="space-y-4 font-semibold">
                <p>
                  Here you can manage your courses, including to create a new
                  course and keep track of the approval status.
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
          target: ".navigator_tour_4",
          disableBeacon: true,
          spotlightClicks: true,
        },
        {
          //1-mobile
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
                  Here you can manage your courses, including to create a new
                  course and keep track of the approval status.
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
                    setTourStep(3);
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
          placement: "bottom",
          target: "#Courses",
          disableBeacon: true,
          spotlightClicks: true,
        },
        {
          //3-mobile
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
                      "false"
                    ) {
                      setTourStep(4);
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
          //4
          content: (
            <div className="w-64 lg:w-80">
              <div className="space-y-4 font-semibold">
                <p>
                  Let’s create your first course. Click this button to begin.
                </p>
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
          target: ".navigator_tour_5",
          disableBeacon: true,
          spotlightClicks: true,
        },
        {
          //5
          content: (
            <div className="w-64 lg:w-80">
              <div className="space-y-4 font-semibold">
                <p>
                  Your course will be going “Under Review” and be available for
                  your students soon if not being “Rejected”.
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
                    router.push("/navigator/reports");
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
          target: ".navigator_tour_79",
          disableBeacon: true,
          spotlightClicks: true,
        },
      ]);
      if (onboardStep > 70) {
        setTourStep(5);
      } else {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");

        const mobileMenuTourHandler = (e: any): void => {
          e.matches ? setTourStep(0) : setTourStep(1);
        };

        mediaQuery.addEventListener("change", mobileMenuTourHandler);

        mobileMenuTourHandler(mediaQuery);
      }
    }
  }, []);

  React.useEffect(() => {
    const published: React.SetStateAction<any[] | undefined> = [];
    const drafts: React.SetStateAction<any[] | undefined> = [];
    const underReview: React.SetStateAction<any[] | undefined> = [];
    const rejected: React.SetStateAction<any[] | undefined> = [];

    if (courses.data) {
      courses.data.courses.forEach((course) => {
        if (course.state === State.Draft) {
          drafts.push(course);
        } else if (course.state === State.Published) {
          published.push(course);
        } else if (course.state === State.Review) {
          underReview.push(course);
        } else if (course.state === State.Rejected) {
          rejected.push(course);
        }
      });

      setPublished(published);
      setUnderReview(underReview);
      setDrafts(drafts);
      setRejected(rejected);
    }
  }, [courses.data]);

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
        {user ? (
          <Section size="2xl">
            <div className="grid pb-6 md:grid-cols-2 gap-y-6">
              <div>
                <p className="pb-4 text-3xl font-bold font-header">
                  Welcome back, {user?.firstName} {user?.lastName}
                </p>
                <p>
                  {
                    "Keep track of your designed courses and student's learning progress"
                  }
                </p>
              </div>
              <div className="flex md:items-end md:justify-end">
                <Link href={`/navigator/courses/create`} passHref>
                  <Button variant="brand1" className="h-12 navigator_tour_5">
                    Create new
                  </Button>
                </Link>
              </div>
            </div>

            {/* Content */}
            <Tab.Group>
              <div className="mx-auto">
                <div className="mt-4 mb-10">
                  <Tab.List className="flex flex-row text-center text-gray-400 justify-center-mb-px">
                    <Tab
                      className={({ selected }): string =>
                        selected
                          ? "inline-block text-center flex-1 pb-3 tracking-wide no-underline border-b-2 border-brand1-500 text-brand1-500"
                          : "inline-block text-center flex-1 pb-3 tracking-wide no-underline border-b-2 border-gray-200"
                      }
                    >
                      Published
                    </Tab>
                    <Tab
                      className={({ selected }): string =>
                        selected
                          ? "inline-block text-center flex-1 pb-3 tracking-wide no-underline border-b-2 border-brand1-500 text-brand1-500"
                          : "inline-block text-center flex-1 pb-3 tracking-wide no-underline border-b-2 border-gray-200"
                      }
                    >
                      Drafts
                    </Tab>
                    <Tab
                      className={({ selected }): string =>
                        selected
                          ? "inline-block text-center flex-1 pb-3 tracking-wide no-underline border-b-2 border-brand1-500 text-brand1-500 navigator_tour_79"
                          : "inline-block text-center flex-1 pb-3 tracking-wide no-underline border-b-2 border-gray-200 navigator_tour_79"
                      }
                    >
                      Under Review
                    </Tab>
                    <Tab
                      className={({ selected }): string =>
                        selected
                          ? "inline-block text-center flex-1 pb-3 tracking-wide no-underline border-b-2 border-brand1-500 text-brand1-500"
                          : "inline-block text-center flex-1 pb-3 tracking-wide no-underline border-b-2 border-gray-200"
                      }
                    >
                      Rejected
                    </Tab>
                  </Tab.List>
                </div>
              </div>
              <Tab.Panels>
                <Tab.Panel>
                  {published && published.length > 0 ? (
                    <div className="grid grid-cols-2 overflow-x-auto gap-x-4 gap-y-4 lg:grid-cols-3 xl:grid-cols-4">
                      {published.map((course: Course) => (
                        <div
                          onClick={(): any =>
                            router.push(
                              `/navigator/courses/${course.id}/details`,
                            )
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
                    <AddCourseTemplate />
                  )}
                </Tab.Panel>
                <Tab.Panel>
                  {drafts && drafts.length > 0 ? (
                    <div className="grid grid-cols-2 overflow-visible gap-x-4 gap-y-4 lg:grid-cols-3 xl:grid-cols-4">
                      {drafts.map((course: Course) => (
                        <div
                          onClick={(): any =>
                            router.push(
                              `/navigator/courses/${course.id}/details`,
                            )
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
                    <AddCourseTemplate />
                  )}
                </Tab.Panel>
                <Tab.Panel>
                  {underReview && underReview.length > 0 ? (
                    <div className="grid grid-cols-2 overflow-x-auto gap-x-4 gap-y-4 lg:grid-cols-3 xl:grid-cols-4">
                      {underReview.map((course: Course) => (
                        <div
                          onClick={(): any =>
                            router.push(
                              `/navigator/courses/${course.id}/details`,
                            )
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
                    <AddCourseTemplate />
                  )}
                </Tab.Panel>
                <Tab.Panel>
                  {rejected && rejected.length > 0 ? (
                    <div className="grid grid-cols-2 overflow-x-auto gap-x-4 gap-y-4 lg:grid-cols-3 xl:grid-cols-4">
                      {rejected.map((course: Course) => (
                        <div
                          onClick={(): any =>
                            router.push(
                              `/navigator/courses/${course.id}/details`,
                            )
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
                    <AddCourseTemplate />
                  )}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </Section>
        ) : null}
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

export default withAuthenticated(withApollo(TeacherMyCourses));
