import { Disclosure } from "@headlessui/react";
// import { enableBodyScroll } from "body-scroll-lock";
import clsx from "clsx";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { HiChevronRight, HiChevronUp, HiChevronLeft } from "react-icons/hi";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { Element, scroller } from "react-scroll";

import CheckpointSpaceView from "@/components/Course/Checkpoint/CheckpointSpaceView";
import CourseThumbnail from "@/components/Course/CourseThumbnail/CourseThumbnail";
import { Button, Dialog } from "@/components/Elements";
import { Card } from "@/components/Elements/Card";
// import { Progressbar } from "@/components/Elements/Progressbar";
import Section from "@/components/Elements/Section";
import { AppLayout } from "@/components/Layout";
import { Tooltip } from "@/components/Onboard";
import { Role } from "@/types/Auth";
import { ExtendedEnrolledState } from "@/types/ExtendedEnrolledState";
import {
  sortAscending,
  // sortDescending,
} from "@/utils/sorting";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  EnrolledState,
  useCoursemapPreviewLazyQuery,
  useEnrolledCourseProgressLazyQuery,
  useUpdateUserOnboardedMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { useStore } from "utils/hooks/zustand";

export const getServerSideProps = extractHostname;

const StudentCoursemap = ({ hostname }: Props): React.ReactElement => {
  // ============HOOKS
  const user = useStore((state) => state.user);
  const scrollRef = useStore((state) => state.scroll);
  const setScrollRef = useStore((state) => state.setScrollRef);
  const tourOpen = useStore((state) => state.onboarding);
  const setTourOpen = useStore((state) => state.setOnboarding);
  const setUser = useStore((state) => state.setMe);
  const setTourStepStore = useStore((state) => state.setOnboardStep);

  const [steps, setSteps] = React.useState<Step[]>([]);
  const [tourStep, setTourStep] = React.useState(0);
  const [checkpoints, setCheckpoints] = React.useState<any>([]);
  const [checkpointList, setCheckpointList] = React.useState<any>([]);
  const [course, setCourse] = React.useState<any>();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();
  const router = useRouter();
  const [getCourse, courseResponse] = useEnrolledCourseProgressLazyQuery();
  const [getCoursePreview, coursePreviewResponse] =
    useCoursemapPreviewLazyQuery();
  const audio: HTMLAudioElement[] = !tourOpen
    ? []
    : [
        new Audio("/audio/onboarding/student/7.mp3"),
        new Audio("/audio/onboarding/student/8.mp3"),
        new Audio("/audio/onboarding/student/9.mp3"),
        new Audio("/audio/onboarding/student/10.mp3"),
        new Audio("/audio/onboarding/student/11.mp3"),
      ];
  const [audioState, setAudioState] = React.useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const stepsArr: Step[] = [
    {
      content: (
        <div>
          <img
            className="absolute z-20 -mt-36 -ml-60 sm:block hidden"
            src="/images/onboarding/helios.png"
            alt=""
          />
          <div className="sm:ml-[46px] sm:pl-4 w-60 sm:w-80">
            <div className="flex flex-col space-y-4 font-semibold">
              <p>Here is all your course lessons!</p>
              <button
                id="volume"
                className="h-6 w-6 text-gray-500 cursor-pointer"
                onClick={(): void => {
                  toggleVolume(0);
                }}
              >
                <img src="/images/onboarding/volume-on.svg" alt="" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-10">
              <button
                onClick={(): Promise<boolean> => {
                  setTourStepStore(6);
                  audio[0].pause();
                  return router.push(`/student/courses/${router.query.id}`);
                }}
                className="flex items-center font-bold text-[#6B7280] focus:outline-none"
              >
                <HiChevronLeft size={16} />
                <p>Back</p>
              </button>
              <button
                onClick={(): void => {
                  audio[0].pause();
                  setTourStep(1);
                }}
                className="flex items-center font-bold text-[#9B26B6]"
              >
                <p>Next</p>
                <HiChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ),
      placement: "center",
      target: "body",
      hideFooter: true,
      disableCloseOnEsc: true,
      disableOverlayClose: true,
      spotlightClicks: false,
    },
    {
      content: (
        <div>
          <img
            className="absolute z-20 -mt-44 ml-[77.5%] sm:block hidden"
            src="/images/onboarding/helios.png"
            alt=""
          />
          <div className="w-64 sm:w-full">
            <div className="flex justify-between space-x-4 font-semibold">
              <p>Here is your first checkpoint. Click to enter!</p>
              <img src="/images/onboarding/introduction.png" alt="" />
            </div>
            <button
              id="volume"
              className="h-6 w-6 text-gray-500 cursor-pointer"
              onClick={(): void => {
                toggleVolume(1);
              }}
            >
              <img src="/images/onboarding/volume-on.svg" alt="" />
            </button>
            <div className="flex items-center justify-between mt-10">
              <button
                onClick={(): void => {
                  audio[1].pause();
                  setTourStep(0);
                }}
                className="flex items-center font-bold text-[#6B7280] focus:outline-none"
              >
                <HiChevronLeft size={16} />
                <p>Back</p>
              </button>
              <button
                onClick={(): void => {
                  audio[1].pause();
                  setTourStep(2);
                }}
                className="flex items-center font-bold text-[#9B26B6]"
              >
                <p>Next</p>
                <HiChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ),
      styles: {
        options: {
          overlayColor: "rgba(0,0, 0, 0.85)",
        },
      },
      placement: "bottom",
      target: ".tour_8",
      hideFooter: true,
      disableCloseOnEsc: true,
      disableOverlayClose: true,
      spotlightClicks: true,
    },
    {
      content: (
        <div>
          <img
            className="absolute z-20 -mt-32 -ml-60 lg:block hidden"
            src="/images/onboarding/helios.png"
            alt=""
          />
          <div className="w-64 sm:w-[95%] lg:ml-[46px] lg:pl-4">
            <div className="space-y-4 font-semibold">
              <p>
                Here are all the checkpoints in this Course. You can repeat them
                anytime!
              </p>
              <div>
                <p>Green = Completed</p>
                <p>Purple = In progress</p>
                <p>Gray = Not completed yet</p>
              </div>
              <button
                id="volume"
                className="h-6 w-6 text-gray-500 cursor-pointer"
                onClick={(): void => {
                  toggleVolume(2);
                }}
              >
                <img src="/images/onboarding/volume-on.svg" alt="" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-10">
              <button
                onClick={(): void => {
                  audio[2].pause();
                  setTourStep(1);
                }}
                className="flex items-center font-bold text-[#6B7280] active:none"
              >
                <HiChevronLeft size={16} />
                <p>Back</p>
              </button>
              <button
                onClick={(): void => {
                  audio[2].pause();
                  setTourStep(3);
                }}
                className="flex items-center font-bold text-[#9B26B6]"
              >
                <p>Next</p>
                <HiChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ),
      placement: "bottom",
      target: ".tour_9",
      hideFooter: true,
      disableBeacon: true,
      spotlightClicks: false,
    },
    {
      content: (
        <div>
          <img
            className="absolute z-20 -mt-44 -ml-60 lg:block hidden"
            src="/images/onboarding/helios.png"
            alt=""
          />
          <div className="w-64 sm:w-[95%] lg:ml-[46px] lg:pl-4">
            <div className="flex justify-between space-x-4 font-semibold">
              <p>
                A ‘?’ symbol means this checkpoint is a quiz. Answer all and get
                more XP!
              </p>
              <img
                src="/images/onboarding/quiz.png"
                alt=""
                className="w-16 h-16 object-fit"
              />
            </div>
            <button
              id="volume"
              className="h-6 w-6 text-gray-500 cursor-pointer mt-4"
              onClick={(): void => {
                toggleVolume(3);
              }}
            >
              <img src="/images/onboarding/volume-on.svg" alt="" />
            </button>
            <div className="flex items-center justify-between mt-10">
              <button
                onClick={(): void => {
                  audio[3].pause();
                  setTourStep(2);
                }}
                className="flex items-center font-bold text-[#6B7280] focus:outline-none"
              >
                <HiChevronLeft size={16} />
                <p>Back</p>
              </button>
              <button
                onClick={(): void => {
                  audio[3].pause();
                  setTourStep(4);
                }}
                className="flex items-center font-bold text-[#9B26B6]"
              >
                <p>Next</p>
                <HiChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ),
      placement: "top",
      target: ".tour_10",
      hideFooter: true,
      disableCloseOnEsc: true,
      disableOverlayClose: true,
      spotlightClicks: false,
    },
    {
      content: (
        <div>
          <img
            className="absolute z-20 -mt-44 ml-[80%] lg:block hidden"
            src="/images/onboarding/helios.png"
            alt=""
          />
          <div className="w-64 sm:w-[95%] lg:pr-6">
            <div className="flex justify-between space-x-4 font-semibold">
              <div className="flex flex-col items-center sm:items-start space-y-4 sm:space-y-0">
                <img
                  src="/images/onboarding/checkpoint.png"
                  alt=""
                  className="block sm:hidden object-fit w-16"
                />
                <p>
                  This is a Challenge checkpoint where you can upload your
                  projects and see other Novalier’s projects!
                </p>
                <p>Give them a like or some encouraging words if you like.</p>
              </div>
              <img
                src="/images/onboarding/checkpoint.png"
                alt=""
                className="hidden sm:block"
              />
            </div>
            <button
              id="volume"
              className="h-6 w-6 text-gray-500 cursor-pointer mt-4"
              onClick={(): void => {
                toggleVolume(4);
              }}
            >
              <img src="/images/onboarding/volume-on.svg" alt="" />
            </button>
            <div className="flex items-center justify-between mt-10">
              <button
                onClick={(): void => {
                  audio[4].pause();
                  setTourStep(3);
                }}
                className="flex items-center font-bold text-[#6B7280] active:none"
              >
                <HiChevronLeft size={16} />
                <p>Back</p>
              </button>
              <button
                onClick={(): Promise<boolean> => {
                  setTourStepStore(11);
                  audio[4].pause();
                  return router.push(`/student/courses/${router.query.id}`);
                }}
                className="flex items-center font-bold text-[#9B26B6]"
              >
                <p>Continue</p>
                <HiChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      ),
      placement: "top",
      target: ".tour_10",
      hideFooter: true,
      disableCloseOnEsc: true,
      disableOverlayClose: true,
      spotlightClicks: false,
    },
  ];

  // ============EFFECTS
  React.useEffect(() => {
    if (
      courseResponse.data &&
      courseResponse.data.course &&
      courseResponse.data.enrolledCourse
    ) {
      setCourse(courseResponse.data.course);
      if (
        courseResponse.data.course.checkpoints &&
        courseResponse.data.enrolledCourse.checkpoints
      ) {
        // Here we merge checkpoints with their statuses
        const temp: any[] = [...courseResponse.data.course.checkpoints];
        for (let i = 0; i < temp.length; i++) {
          temp[i] = hasProgress(temp[i]);
          if (temp[i] && temp[i].subCheckpoints.length > 0) {
            const tempSubcheckpoints: any[] = [...temp[i].subCheckpoints];
            for (let j = 0; j < tempSubcheckpoints.length; j++) {
              tempSubcheckpoints[j] = hasProgress(tempSubcheckpoints[j]);
            }
            temp[i].subCheckpoints = tempSubcheckpoints;
          }
        }
        // After we merge, we need to add some parsing to check if we need to add a 'BLUE' TO_START state
        const hasIncomplete = temp.find(
          (checkpoint) => checkpoint.state === EnrolledState.Incomplete,
        );
        temp.sort(sortAscending);

        // We loop through all the parent checkpoints
        for (let i = 0; i < temp.length; i++) {
          // If there are no checkpoints in progress AND there are checkpoints that are not started,
          // We make it TO_START
          if (!hasIncomplete && temp[i].state === EnrolledState.NotStarted) {
            temp[i].state = ExtendedEnrolledState.ToStart;
            break;
          }

          // Whether or not we set a parent checkpoint to TO_START, we need to check if they have subcheckpoints
          // However, only checkpoints that are COMPLETED will have subcheckpoints highlighted
          // The next subcheckpoint should be highlighted blue as well (if there are no incomplete)
          if (
            temp[i].state === EnrolledState.Complete &&
            i > 0 &&
            temp[i].subCheckpoints
          ) {
            const hasIncomplete = temp[i].subCheckpoints.find(
              (checkpoint: any) =>
                checkpoint.state === EnrolledState.Incomplete,
            );
            if (!hasIncomplete) {
              const tempSubcheckpoints = [
                ...temp[i].subCheckpoints.sort(sortAscending),
              ];
              for (let j = 0; j < tempSubcheckpoints.length; j++) {
                if (tempSubcheckpoints[j].state === EnrolledState.NotStarted) {
                  tempSubcheckpoints[j].state = ExtendedEnrolledState.ToStart;
                  break;
                }
              }
              temp[i].subCheckpoints = tempSubcheckpoints;
            }
          }
        }
        const descending = [...temp];
        setCheckpoints(descending.sort(sortAscending));
        setCheckpointList(temp.sort(sortAscending));
        const arrayFilterComplete = temp
          .sort(sortAscending)
          ?.filter(
            (checkPointChild) =>
              checkPointChild.state !== EnrolledState.Complete,
          );
        if (
          !(
            Array.isArray(arrayFilterComplete) && !arrayFilterComplete?.length
          ) &&
          temp
            .sort(sortAscending)
            ?.some(
              (childComplete) => childComplete.state === EnrolledState.Complete,
            )
        ) {
          setScrollRef(arrayFilterComplete[0]?.id);
        }
        else {
          window.scrollTo(0, 0);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseResponse.data]);

  React.useEffect(() => {
    if (coursePreviewResponse.data && coursePreviewResponse.data.course) {
      setCourse(coursePreviewResponse.data.course);
      if (coursePreviewResponse.data.course.checkpoints) {
        // Here we merge checkpoints with their statuses
        const temp: any[] = [...coursePreviewResponse.data.course.checkpoints];
        for (let i = 0; i < temp.length; i++) {
          temp[i] = {
            ...temp[i],
            state: EnrolledState.Incomplete,
          };
          if (temp[i] && temp[i].subCheckpoints.length > 0) {
            const tempSubcheckpoints: any[] = [...temp[i].subCheckpoints];
            for (let j = 0; j < tempSubcheckpoints.length; j++) {
              tempSubcheckpoints[j] = {
                ...tempSubcheckpoints[j],
                state: EnrolledState.Incomplete,
              };
            }
            temp[i].subCheckpoints = tempSubcheckpoints;
          }
        }

        temp.sort(sortAscending);
        const descending = [...temp];
        setCheckpoints(descending.sort(sortAscending));
        setCheckpointList(temp.sort(sortAscending));
        const arrayFilterComplete = temp
          .sort(sortAscending)
          ?.filter(
            (checkPointChild) =>
              checkPointChild.state !== EnrolledState.Complete,
          );
        if (
          !(
            Array.isArray(arrayFilterComplete) && !arrayFilterComplete?.length
          ) &&
          temp
            .sort(sortAscending)
            ?.some(
              (childComplete) => childComplete.state === EnrolledState.Complete,
            )
        ) {
          setScrollRef(arrayFilterComplete[0]?.id);
        }
        else {
          window.scrollTo(0, 0);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coursePreviewResponse.data]);

  React.useEffect(() => {
    if (router.query && router.query.id) {
      if (user?.role === Role.Student) {
        getCourse({
          variables: {
            id: router.query.id as string,
          },
        });
      } else if (user?.role === Role.Teacher || user?.role === Role.Parent) {
        getCoursePreview({
          variables: {
            id: router.query.id as string,
          },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, getCourse]);

  React.useEffect(() => {
    if (scrollRef && checkpoints && courseResponse) {
      setTimeout(() => {
        scroller.scrollTo(scrollRef, {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
        });
        setScrollRef("");
      }, 200);
    }
  }, [scrollRef, setScrollRef, checkpoints, courseResponse]);

  React.useEffect(() => {
    if (tourOpen) {
      setSteps(stepsArr);
    }
  }, []);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  // ============FUNCTIONS
  const closeTour = (): void => {
    setTourOpen(false);
    setIsOpen(false);
  };

  const toggleVolume = (index: number): void => {
    let src = "";
    if (audioState[index]) {
      audio[index].pause();
      src = "/images/onboarding/volume-on.svg";
    } else {
      audio[index].play();
      src = "/images/onboarding/volume-off.svg";
    }
    const tempAudioState = audioState;
    tempAudioState[index] = !tempAudioState[index];
    setAudioState(tempAudioState);

    //toggle volume icon in button
    const elem = document.getElementById("volume");
    let child = elem?.lastElementChild;
    while (child) {
      elem?.removeChild(child);
      child = elem?.lastElementChild;
    }

    const volumeIcon = document.createElement("img");
    volumeIcon.setAttribute("src", src);
    volumeIcon.setAttribute("alt", "");
    elem?.appendChild(volumeIcon);
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
      router.push("/student/home");
    } catch (error) {
      console.log(error);
    }
  };

  // const disableBody = (target: any): void => disableBodyScroll(target);
  // const enableBody = (target: any): void => enableBodyScroll(target);

  const hasProgress = (checkpoint: any): any => {
    // Checks if this checkpoint exists in the enrolledCheckpoint array
    const enrolledCheckpoint =
      courseResponse.data?.enrolledCourse?.checkpoints?.find(
        (el: any) => el.checkpointId === checkpoint.id,
      );
    if (enrolledCheckpoint) {
      return {
        ...checkpoint,
        state: enrolledCheckpoint.state,
      };
    }
    return {
      ...checkpoint,
      state: EnrolledState.NotStarted,
    };
  };

  const handleJoyrideCallback = (data: CallBackProps): void => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      // setTourOpen(false);
    }

    // logGroup(type, data);
  };

  // ============VIEWS
  return (
    <AppLayout hostname={hostname} darkLayout>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <div className=" relative z-10 flex min-h-screen" data-tut="reactour__10">
        <Section size="2xl">
          {/* <a
            className="flex items-center col-span-2 px-6 cursor-pointer group mb-11 lg:px-8 w-max"
            onClick={(): void => {
              router.push(`/student/courses/${router.query.id}`);
            }}
            role="none"
          >
            <Button
              className="mr-2 aspect-square group-hover:bg-gray-400 group-hover:border-b-gray-500 group-active:bg-gray-600"
              size="sm"
              variant="secondary"
            >
              <HiChevronLeft size={16} />
            </Button>
            <p className="text-white uppercase">Back to course details</p>
          </a> */}

          {/* Content */}
          {course ? (
            <div className="relative grid grid-cols-12 gap-y-6">
              <div className="flex flex-col col-span-12 pt-12 lg:col-span-9">
                <div className="flex flex-col items-center lg:flex-row">
                  <CourseThumbnail preview={course.thumbnail?.url} />
                  <p className="mt-4 text-2xl font-extrabold text-white lg:text-xl lg:mt-0">
                    {course.title}
                  </p>
                </div>
                <div className="tour_10 flex items-center h-full px-2 pb-8 overflow-x-auto scrollbar-thin scrollbar-thumb-transparent scrollbar-thumb-rounded-md hover:scrollbar-thumb-slate-400 max-w-screen lg:px-8">
                  <div
                    className="grid m-auto mt-16 lg:mt-28"
                    data-tut="reactour__5"
                  >
                    {checkpoints.map((c: any, index: number, array: any[]) => (
                      <Element name={c.id} key={c.id + "div"}>
                        <div className="grid max-w-screen-lg grid-flow-col w-max">
                          <CheckpointSpaceView
                            {...{
                              key: c.id,
                              text: c.title,
                              data: c,
                              state: c.state,
                              parentConnectedState:
                                index - 1 >= 0
                                  ? array[index].state
                                  : EnrolledState.NotStarted,
                              childConnectedState:
                                c.subCheckpoints && c.subCheckpoints.length > 0
                                  ? c.subCheckpoints.sort(sortAscending)[0]
                                      .state
                                  : EnrolledState.NotStarted,
                            }}
                          />
                          {c.subCheckpoints ? (
                            <>
                              {[...c.subCheckpoints]
                                .sort(sortAscending)
                                .map(
                                  (sub: any, index: number, array: any[]) => (
                                    <Element name={sub.id} key={sub.id + "div"}>
                                      <CheckpointSpaceView
                                        {...{
                                          key: sub.id,
                                          text: sub.title,
                                          data: sub,
                                          subCheckpointsLength:
                                            c._count.subCheckpoints,
                                          state: sub.state,
                                          childConnectedState:
                                            index + 1 < array.length
                                              ? array[index + 1].state
                                              : EnrolledState.NotStarted,
                                        }}
                                      />
                                    </Element>
                                  ),
                                )}
                            </>
                          ) : null}
                        </div>
                      </Element>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid w-full col-span-12 gap-x-6 lg:col-span-3 lg:max-w-sm xl:max-w-md">
                {/* <Card className="flex flex-col items-center justify-center w-full col-span-1 p-6 mb-6 lg:col-span-2">
                  <p className="mb-5 text-xl font-bold text-white lg:text-2xl">
                    Total Course Rewards
                  </p>
                  <Card className="w-full px-4 py-3 mb-5 text-white">
                    <div className="flex flex-row">
                      <img
                        src="/images/course/information/rewards.png"
                        alt=""
                        className="w-12 max-w-3xl mr-4"
                      />
                      <div className="flex flex-col w-full">
                        <div className="flex flex-row items-center justify-between w-full">
                          <p className="text-lg font-extrabold lg:text-xl">
                            3,600
                          </p>
                          <p className="text-xs font-bold">+21.5%</p>
                        </div>
                        <Progressbar percent={80} customColor="#C042F1" />
                      </div>
                    </div>
                  </Card>
                  <Card className="w-full px-4 py-3 text-white">
                    <div className="flex flex-row">
                      <img
                        src="/images/common/coin.svg"
                        alt=""
                        className="w-12 max-w-3xl mr-4"
                      />
                      <div className="flex flex-col items-start justify-start w-full">
                        <p className="text-lg font-extrabold lg:text-xl">
                          8,888,888
                        </p>
                        <p className="text-xs font-bold opacity-60">Coin</p>
                      </div>
                    </div>
                  </Card>
                </Card> */}
                <div className="relative w-full h-full col-span-1 lg:col-span-2">
                  <div
                    className="tour_9 flex max-h-screen pt-4 lg:top-0 lg:sticky"
                    data-tut="reactour__9"
                  >
                    <Card className="z-20 flex flex-col w-full p-6 bg-opacity-50 bg-dark-overlay lg:overflow-y-auto">
                      <Disclosure as="div" defaultOpen>
                        {({ open }): any => (
                          <>
                            <Disclosure.Button
                              className="flex items-start justify-between text-xl font-extrabold text-white lg:text-2xl"
                              as="div"
                            >
                              Checkpoints
                              <HiChevronUp
                                className={`${
                                  open ? "transform rotate-180" : ""
                                } w-8 h-8 text-gray-300`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 mt-6 font-bold text-white border-l-2 border-l-gray-400">
                              <ul className="leading-loose list-none">
                                {checkpointList.map((checkpoint: any) => (
                                  <div
                                    key={checkpoint.id + "div"}
                                    // href={`#${checkpoint.id}`}
                                  >
                                    <ul
                                      // key={checkpoint.id + "div"}
                                      className="mb-2 font-bold"
                                    >
                                      <li
                                        key={checkpoint.id}
                                        className={clsx(
                                          checkpoint.state ===
                                            EnrolledState.NotStarted
                                            ? "opacity-30"
                                            : checkpoint.state ===
                                                EnrolledState.Incomplete ||
                                              checkpoint.state ===
                                                ExtendedEnrolledState.ToStart
                                            ? "text-brand1"
                                            : "text-green-500",
                                          "cursor-pointer",
                                        )}
                                        role="none"
                                        onClick={(): void =>
                                          setScrollRef(checkpoint.id)
                                        }
                                      >
                                        {checkpoint.title}
                                      </li>
                                      {checkpoint.subCheckpoints ? (
                                        <>
                                          {[...checkpoint.subCheckpoints]
                                            .sort(sortAscending)
                                            .map((sub: any) => (
                                              <li
                                                key={sub.id}
                                                className={clsx(
                                                  "border-l-2 border-l-gray-400 px-4 cursor-pointer",
                                                  sub.state ===
                                                    EnrolledState.NotStarted
                                                    ? "opacity-30"
                                                    : sub.state ===
                                                        EnrolledState.Incomplete ||
                                                      sub.state ===
                                                        ExtendedEnrolledState.ToStart
                                                    ? "text-brand1"
                                                    : "text-green-500",
                                                )}
                                                role="none"
                                                onClick={(): void =>
                                                  setScrollRef(sub.id)
                                                }
                                              >
                                                {sub.title}
                                              </li>
                                            ))}
                                        </>
                                      ) : null}
                                    </ul>
                                  </div>
                                ))}
                              </ul>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
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
        disableCloseOnEsc
        disableOverlayClose
        disableOverlay={false}
        steps={steps}
        stepIndex={tourStep}
        tooltipComponent={Tooltip}
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

export default withAuthenticated(withApollo(StudentCoursemap));
