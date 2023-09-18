import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { HiChevronRight } from "react-icons/hi";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { toast } from "react-toastify";

import { CourseCardProps } from "@/components/Course/CourseCard";
import { Button, Dialog } from "@/components/Elements";
import { Card } from "@/components/Elements/Card";
import Section from "@/components/Elements/Section";
import { Feedback } from "@/components/Feedback";
import { AppLayout } from "@/components/Layout";
import { ParentTooltip, ParentArrowTooltip } from "@/components/Onboard";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  Category,
  State,
  useStartChatMutation,
  useTeacherProfileLazyQuery,
  useUpdateUserOnboardedMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import { useStore } from "utils/hooks/zustand";

const TeacherProfile = ({ hostname }: Props): React.ReactElement => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setMe);
  const tourOpen = useStore((state) => state.onboarding);
  const setTourOpen = useStore((state) => state.setOnboarding);
  const [startChat, chatResponse] = useStartChatMutation();
  const [steps, setSteps] = React.useState<Step[]>([]);
  const [tourStep, setTourStep] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [profileData, setProfileData] = React.useState<any>();
  const router = useRouter();
  // const { data } = useTeacherQuery();
  const [getUser, userResponse] = useTeacherProfileLazyQuery();
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();
  const [bannerUrl, setBannerUrl] = React.useState<string>("");
  const publishedCourses = React.useMemo(() => {
    if (userResponse?.data && userResponse.data?.teacher.Course) {
      return userResponse.data.teacher?.Course.filter(
        (course) => course.state === State.Published && course.deleted === null,
      );
    }
    return [];
  }, [userResponse.data]);

  // Retrieves the user profile
  React.useEffect(() => {
    if (router && router.query.id) {
      getUser({
        variables: {
          id: router.query.id as string,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, userResponse.data]);

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
                  Here is your Profile to share about yourself in the
                  Nova-verse! To edit the contents, visit Settings.
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
          placement: "bottom-start",
          target: ".navigator_tour_81",
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
                  Here is your Profile to share about yourself in the
                  Nova-verse! To edit the contents, visit Settings.
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
          placement: "bottom-start",
          target: "#Profile",
          disableBeacon: true,
          spotlightClicks: true,
        },
        {
          //3
          content: (
            <div className="w-64 lg:w-80">
              <div className="space-y-4 font-semibold">
                <p>
                  You can also take a visit to other teacher’s profile. Click
                  this button to send them a message!
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
                    router.push("/navigator/courses");
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
          target: ".navigator_tour_82",
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

  // Sets the user profile
  React.useEffect(() => {
    if (userResponse && userResponse.data) {
      setProfileData(userResponse.data?.teacher);
    }
    setBannerUrl(user?.teacher?.banner?.url || "");
  }, [userResponse]);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname);
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

  const beginChat = async (): Promise<void> => {
    try {
      await startChat({
        variables: {
          data: {
            userId: profileData.id,
            name: `${profileData.user.firstName} ${profileData.user.lastName}`,
          },
        },
      });
    } catch (e) {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Unable to start chat with user"
          type="error"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
    }
  };

  // Once a chat is created, we can navigate to the chat
  React.useEffect(() => {
    if (chatResponse && chatResponse.data) {
      router.push(
        `/${user?.role === "STUDENT" ? "student" : "navigator"}/chat`,
      );
    }
  }, [chatResponse, router]);

  return (
    <AppLayout hostname={hostname}>
      <Head>
        <title>{memoTenant.name}</title>
      </Head>
      <div className="relative z-10 flex min-h-screen">
        <Section size="2xl" className="">
          {/* <Link href="/">
            <a className="flex items-center group">
              <Button
                className="mr-2 aspect-square group-hover:bg-gray-400 group-hover:border-b-gray-500 group-active:bg-gray-600"
                size="sm"
                variant="secondary"
              >
                <HiChevronLeft size={16} />
              </Button>
              <p className="text-sm uppercase lg:text-base">Back to course</p>
            </a>
          </Link> */}
          <div className="w-full mt-10">
            <img
              src={
                bannerUrl === "" ? "/images/profile/background.png" : bannerUrl
              }
              alt=""
              className="object-fill w-full rounded-2xl"
            />
          </div>
          <div className="relative w-full mb-14">
            <div className="absolute flex items-end w-32 h-32 mb-6 mr-6 overflow-hidden bg-white border-2 border-gray-300 rounded-full left-10 -top-20 aspect-square">
              <img
                src={
                  userResponse.data?.teacher?.photo?.url ||
                  "/images/avatar-placeholder.png"
                }
                alt=""
              />
            </div>
          </div>
          {/* Content */}
          <div className="grid grid-cols-1 pt-8 mb-6 space-y-6 lg:space-x-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <p className="mb-5 text-xl font-bold lg:text-2xl">
                Personal Details
              </p>
              <Card className="p-6 mb-12">
                <p className="mb-3 text-xl font-extrabold lg:text-2xl">
                  {userResponse?.data?.teacher.user.firstName}{" "}
                  {userResponse?.data?.teacher.user.lastName}
                </p>
                <p className="mb-3 text-sm opacity-60 lg:text-base">
                  {userResponse?.data?.teacher?.jobTitle}
                </p>
                <p className="text-sm font-bold opacity-80 lg:text-base">
                  {userResponse?.data?.teacher?.introduction}
                </p>
              </Card>
              {/* <p className="mb-5 text-xl font-bold lg:text-2xl ">Statistics</p>
              <div className="grid grid-cols-3 gap-4 mb-12">
                <Card className="px-4 py-3 cols-span-1">
                  <div className="flex flex-col">
                    <img
                      src="/images/profile/star.png"
                      alt=""
                      className="w-12 max-w-3xl mb-4"
                    />
                    <p className="text-lg font-extrabold lg:text-xl">4.8</p>
                    <p className="text-sm font-bold opacity-60">
                      Average Review
                    </p>
                  </div>
                </Card>
                <Card className="px-4 py-3 cols-span-1">
                  <div className="flex flex-col">
                    <img
                      src="/images/profile/leaderboard.svg"
                      alt=""
                      className="w-12 max-w-3xl mb-4"
                    />
                    <p className="text-lg font-extrabold lg:text-xl">8,888</p>
                    <p className="text-sm font-bold opacity-60">
                      Total Enrollments
                    </p>
                  </div>
                </Card>
                <Card className="px-4 py-3 cols-span-1">
                  <div className="flex flex-col">
                    <img
                      src="/images/profile/leaderboard.svg"
                      alt=""
                      className="w-12 max-w-3xl mb-4"
                    />
                    <p className="text-lg font-extrabold lg:text-xl">8,888</p>
                    <p className="text-sm font-bold opacity-60">
                      Total Completed
                    </p>
                  </div>
                </Card>
              </div> */}
              <div>
                <div className="flex flex-col mb-5 lg:flex-row">
                  <div className="flex items-center lg:w-2/3">
                    <p className="text-xl font-bold lg:text-2xl font-header tracking-header">
                      Top Courses
                    </p>
                  </div>
                  {/* <div className="flex items-center">
                    <Button variant="ghost" className="whitespace-nowrap">
                      View All Courses By This Navigator
                    </Button>
                  </div> */}
                </div>
                <div className="grid grid-cols-1 gap-y-4 md:gap-x-4 md:grid-cols-2">
                  {publishedCourses.length > 0 ? (
                    publishedCourses.map((course) => {
                      return (
                        <div
                          onClick={(): void => {
                            if (user && user.role === "STUDENT") {
                              router.push(`/student/courses/${course.id}`);
                            } else if (user && user.role === "TEACHER") {
                              router.push(
                                `/navigator/courses/preview/${course.id}`,
                              );
                            } else if (user && user.role === "PARENT") {
                              router.push(
                                `/adult/courses/preview/${course.id}`,
                              );
                            } else {
                              router.push(`/courses/${course.id}`);
                            }
                          }}
                          key={course.id}
                          role="none"
                        >
                          <CourseCardProps
                            hostname={hostname}
                            name={course.title}
                            difficulty={course.level}
                            category={course.category as Category}
                            thumbnail={
                              course.thumbnail?.url ?? memoTenant.logo.png
                            }
                            duration={course.duration}
                            teacher={course.teacher}
                            className="cursor-pointer"
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex flex-col">No courses yet</div>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              {user && user?.role !== "PARENT" && (
                <div className="flex justify-end pb-4">
                  <div role="none" onClick={beginChat}>
                    <button className="flex flex-row items-center justify-center font-sans text-sm font-extrabold uppercase text-brand1 lg:text-base navigator_tour_82">
                      <img
                        src="/images/common/edit.svg"
                        alt="Edit"
                        className="mr-3"
                      />
                      Start Chat
                    </button>
                  </div>
                </div>
              )}
              <Card className="flex flex-col p-6 mb-6 ">
                <p className="w-full pb-6 text-xl font-bold text-center lg:text-2xl">
                  Work Experiences
                </p>
                {userResponse?.data &&
                  userResponse?.data?.teacher?.experiences?.length < 1 && (
                    <p>No info</p>
                  )}
                {userResponse?.data &&
                  userResponse?.data?.teacher?.experiences?.length > 0 &&
                  userResponse?.data?.teacher?.experiences.map(
                    (item: any, index: number) => {
                      return (
                        <div key={index} className="mb-4">
                          <p className="text-sm font-bold leading-normal lg:text-lg">
                            {item.title}
                          </p>
                          <p className="text-sm font-bold opacity-60">
                            {item.startEndDate}
                          </p>
                          <p className="text-sm font-bold opacity-80">
                            {item.employer}
                          </p>
                          <p className="text-sm opacity-80">
                            {item.description}
                          </p>
                        </div>
                      );
                    },
                  )}
              </Card>
              <Card className="flex flex-col p-6 mb-6 ">
                <p className="w-full pb-6 text-xl font-bold text-center lg:text-2xl">
                  Education
                </p>
                {userResponse?.data &&
                  userResponse?.data?.teacher?.education?.length < 1 && (
                    <p>No info</p>
                  )}
                {userResponse?.data &&
                  userResponse?.data?.teacher?.education?.length > 0 &&
                  userResponse?.data?.teacher?.education.map(
                    (item: any, index: number) => {
                      return (
                        <div key={index} className="mb-4">
                          <p className="text-sm font-bold leading-normal lg:text-lg">
                            {item.degree}
                          </p>
                          <p className="text-sm font-bold opacity-60">
                            {item.startEndDate}
                          </p>
                          <p className="text-sm font-bold opacity-80">
                            {item.school}
                          </p>
                          <p className="text-sm opacity-80">
                            {item.description}
                          </p>
                        </div>
                      );
                    },
                  )}
              </Card>
              <Card className="flex flex-col p-6 mb-6 ">
                <p className="w-full pb-6 text-xl font-bold text-center lg:text-2xl">
                  Certificates
                </p>
                {userResponse?.data &&
                  userResponse?.data?.teacher?.certificates?.length < 1 && (
                    <p>No info</p>
                  )}
                {userResponse?.data &&
                  userResponse?.data?.teacher?.certificates?.length > 0 &&
                  userResponse?.data?.teacher?.certificates.map(
                    (item: any, index: number) => {
                      return (
                        <div key={index} className="mb-4">
                          <p className="text-sm font-bold leading-normal lg:text-lg">
                            {item.title}
                          </p>
                          <p className="text-sm font-bold opacity-60">
                            {item.startEndDate}
                          </p>
                          <p className="text-sm font-bold opacity-80">
                            {item.issuer}
                          </p>
                          <p className="text-sm opacity-80">
                            {item.description}
                          </p>
                        </div>
                      );
                    },
                  )}
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

export default withApollo(TeacherProfile);

export const getServerSideProps = extractHostname;
