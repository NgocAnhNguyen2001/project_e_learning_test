import { Disclosure } from "@headlessui/react";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  HiChevronLeft,
  HiChevronRight,
  HiChevronUp,
  HiOutlineTrash,
} from "react-icons/hi";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { toast } from "react-toastify";

import CheckpointSpace from "@/components/Course/Checkpoint/CheckpointSpace";
import CourseThumbnail from "@/components/Course/CourseThumbnail/CourseThumbnail";
import { Button, Dialog } from "@/components/Elements";
import { Divider } from "@/components/Elements/Divider";
import Section from "@/components/Elements/Section";
import { Feedback } from "@/components/Feedback";
import { LightBackground } from "@/components/Layout/LightBackground";
import { ParentTooltip, ParentArrowTooltip } from "@/components/Onboard";
import { ItemTypes } from "@/types/ItemTypes";
import { getCategoryImages } from "@/utils/categoryImages";
import { deserialize } from "@/utils/slate";
import { sortAscending } from "@/utils/sorting";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  Checkpoint,
  namedOperations,
  State,
  TopicType,
  useCourseLazyQuery,
  useCreateCheckpointMutation,
  useRemoveCourseMutation,
  useUpdateCourseMutation,
  useUpdateUserOnboardedMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { useStore } from "utils/hooks/zustand";
// import { Card } from "@/components/Elements/Card";
// import clsx from "clsx";
// import { useStore } from "utils/hooks/zustand";
// import { scroller } from "react-scroll";

const EditOthers = ({ hostname }: Props): React.ReactElement => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setMe);
  const tourOpen = useStore((state) => state.onboarding);
  const setTourOpen = useStore((state) => state.setOnboarding);
  const onboardStep = useStore((state) => state.onboardStep);
  const setOnboardStep = useStore((state) => state.setOnboardStep);
  const [steps, setSteps] = React.useState<Step[]>([]);
  const [tourStep, setTourStep] = React.useState<number>(0);
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();
  const [course, setCourse] = React.useState<any>();
  const [checkpoints, setCheckpoints] = React.useState<any>([]);
  const [getCourse, courseResponse] = useCourseLazyQuery();
  const [update] = useUpdateCourseMutation();
  const [createCheckpoint] = useCreateCheckpointMutation();
  const [removeCourse] = useRemoveCourseMutation();
  const hasEndCheckpoint = React.useMemo(() => {
    return !!courseResponse.data?.course.checkpoints?.find(
      (checkpoint) => checkpoint.type === TopicType.End,
    );
  }, [courseResponse.data]);
  const isPublished = React.useMemo(() => {
    if (courseResponse.data && courseResponse.data.course.state) {
      return courseResponse.data.course.state === State.Published;
    }
  }, [courseResponse.data]);

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isPublishOpen, setIsPublishOpen] = React.useState<boolean>(false);
  const [isTourOpen, setIsTourOpen] = React.useState<boolean>(false);
  const router = useRouter();

  const buttonVariants = {
    plusClosed: { rotate: "-180deg" },
    plusOpen: { rotate: "0deg" },
  };

  const deleteCourse = async (): Promise<void> => {
    try {
      await removeCourse({
        variables: {
          id: router.query.id as string,
        },
      });
      toast(
        <Feedback
          title="Success!"
          subtitle="Course deleted successfully"
          type="success"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
      router.push("/navigator/my-courses");
    } catch {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Failed to delete course"
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

  const updateTourStep = (stp: number): any => {
    setTourStep(stp);
  };

  const promptDeleteCourse = (): void => {
    setIsOpen(true);
  };

  const submitCourse = async (): Promise<void> => {
    try {
      await update({
        variables: {
          data: {
            state:
              isPublished ||
              course.state == "PUBLISHED" ||
              course.state === "REVIEW"
                ? State.Draft
                : State.Review,
            published: false,
          },
          id: router.query.id as string,
        },
      });
      router.push("/navigator/my-courses");
    } catch {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Failed to publish course"
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

  const closeTour = (): void => {
    setTourOpen(false);
    setIsTourOpen(false);
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

  const stepsArr: Step[] = [
    {
      //0
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              You have successfully created a new course! However it is still
              unpublish yet as you will need to fulfill all the course content
              first.
            </p>
            <p>Unpublish courses will be store under “Drafts”. </p>
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
                setTourStep(1);
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
      placement: "auto",
      target: ".navigator_tour_12",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //1
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Here is the course details section, click the dropdown to view all
              details
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
                setTourStep(2);
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
      placement: "right",
      target: ".navigator_tour_13",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //2
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Click this button if you wish to further edit the course details.
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
      placement: "left",
      target: ".navigator_tour_14",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //3
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Here is the checkpoint design section, checkpoints work as
              chapters or unit of the couse.
            </p>
            <p>
              There are a total of 5 types of checkpoints, including intro,
              lesson, quiz, challenge, end. You may plan the checkpoints
              accordingly.
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
      placement: "right",
      target: ".navigator_tour_15",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //4
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Let’s try adding 2 new checkpoints, click “Add New Checkpoint”
              twice.
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
          overlayColor: "rgba(0,0, 0, 0.0)",
        },
      },
      tooltipComponent: ParentArrowTooltip,
      placement: "right",
      target: ".navigator_tour_16",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //5
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Checkpoints successfully added!</p>
            <p>To view the edit options, click on the Checkpoint.</p>
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
      placement: "right",
      target: ".navigator_tour_17",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //6
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              To re-order the checkpoints, click & HOLD this button to drag them
              around.
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
                setTourStep(7);
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
      placement: "right",
      target: ".navigator_tour_18",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //7
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>To remove checkpoints, click this button. </p>
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
                setTourStep(8);
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
      placement: "right",
      target: ".navigator_tour_19",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //8
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              You also have the option to add branches to the main checkpoints
              as well.
            </p>
            <p>
              Branches can be served as additional learning points of the main
              lesson.
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
                setTourStep(9);
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
      placement: "right",
      target: ".navigator_tour_20",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //9
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Coursemaps are form with multiple checkpoints created in a course
              and work as a learning journey.
            </p>
            <p>
              Click this button if you wish to preview your checkpoints on the
              coursemap.
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
                setTourStep(10);
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
      placement: "right",
      target: ".navigator_tour_21",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //10
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Now that you have learn how to structure your coursemap, let’s
              edit the checkpoints.
            </p>
            <p>To begin, each courses will have a Introduction checkpoint.</p>
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
                setTourStep(11);
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
      placement: "right",
      target: ".navigator_tour_22",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //11
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Click on the Checkpoint</p>
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
      placement: "right",
      target: ".navigator_tour_23",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //12
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Select “Edit” to edit the checkpoint.</p>
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
      placement: "right",
      target: ".navigator_tour_24",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //13
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Checkpoints successfully updated!</p>
            <p>
              Next, let’s go through the 3 main checkpoints, lesson, challenge
              and quiz.
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
      placement: "right",
      target: ".navigator_tour_17",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //14
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Select “Edit” to edit the checkpoint.</p>
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
      placement: "right",
      target: ".navigator_tour_42",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //15
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Once you have every checkpoints designed, it’s time to put an
              “End” to the coursemap.
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
      placement: "right",
      target: ".navigator_tour_71",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //16
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>Select “Edit” to edit the checkpoint.</p>
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
      placement: "right",
      target: ".navigator_tour_72",
      disableOverlay: false,
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //17
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Successfully complete the coursemap and it’s ready to be publish!
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
                setTourStep(18);
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
      placement: "right",
      target: ".navigator_tour_71",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //18
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Before publishing your course, you can always preview it first.
              Click here to preview the course in student’s view.
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
                setTourStep(19);
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
      placement: "right",
      target: ".navigator_tour_76",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //19
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              If you wish to delete this course, click here to permanently
              delete it.
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
                setTourStep(20);
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
      placement: "right",
      target: ".navigator_tour_77",
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      //20
      content: (
        <div className="w-64 lg:w-80">
          <div className="space-y-4 font-semibold">
            <p>
              Once everythings is checked, click here to publish your course!
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
                setOnboardStep(78);
                router.push("/navigator/my-courses");
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
      placement: "right",
      target: ".navigator_tour_78",
      disableBeacon: true,
      spotlightClicks: true,
    },
  ];

  //============EFFECTS
  React.useEffect(() => {
    const onClick = (): void => {
      if (
        document.querySelector(".tour_button")?.ariaExpanded === "true" &&
        tourStep == 5
      ) {
        setTourStep(6);
      } else if (
        document.querySelector(".tour_button_2")?.ariaExpanded === "true" &&
        tourStep == 11
      ) {
        setTourStep(12);
      } else if (
        document.querySelector(".tour_button")?.ariaExpanded === "true" &&
        tourStep == 13
      ) {
        setTourStep(14);
      } else if (
        document.querySelector(".tour_button_3")?.ariaExpanded === "true" &&
        tourStep == 15
      ) {
        setTourStep(16);
      }
    };

    window.addEventListener("click", onClick);

    return (): any => {
      window.removeEventListener("click", onClick);
    };
  }, [tourStep]);

  React.useEffect(() => {
    if (courseResponse.data) {
      setCourse(courseResponse.data?.course);
      if (courseResponse.data?.course.checkpoints) {
        const temp = [...courseResponse.data.course.checkpoints];
        setCheckpoints(temp.sort(sortAscending));
      }

      if (tourOpen && !steps.length) {
        window.scrollTo(0, 0);
        if (onboardStep >= 40 && onboardStep < 70) {
          setTourStep(13);
        } else if (onboardStep >= 70 && onboardStep < 74) {
          setTourStep(15);
        } else if (onboardStep >= 74) {
          setTourStep(17);
        }
        setSteps(stepsArr);
      }
    }
  }, [courseResponse.data, user]);

  React.useEffect(() => {
    const getCourseData = async (): Promise<void> => {
      await getCourse({
        variables: {
          id: router.query.id as string,
        },
      });
    };

    if (router.query && router.query.id) {
      getCourseData();
    }
  }, [router, getCourse]);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  // const scrollRef = useStore((state) => state.scroll);
  // const setScrollRef = useStore((state) => state.setScrollRef);

  // React.useEffect(() => {
  //   if (scrollRef && checkpoints && courseResponse) {
  //     setTimeout(() => {
  //       scroller.scrollTo(scrollRef, {
  //         duration: 800,
  //         delay: 0,
  //         smooth: "easeInOutQuart",
  //       });
  //       setScrollRef("");
  //     }, 200);
  //   }
  // }, [scrollRef, setScrollRef, checkpoints, courseResponse]);
  return (
    // <AppLayout hostname={hostname}>
    <LightBackground>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <div className="relative z-10 flex items-center min-h-screen">
        <Section size="2xl">
          <div className="flex flex-row items-center justify-between w-full px-6 mb-11 lg:px-8">
            <Link href="/navigator/my-courses">
              <a className="flex items-center col-span-2 group w-max">
                <Button
                  className="mr-2 aspect-square group-hover:bg-gray-400 group-hover:border-b-gray-500 group-active:bg-gray-600"
                  size="sm"
                  variant="secondary"
                >
                  <HiChevronLeft size={16} />
                </Button>
                <p className="uppercase ">My Courses</p>
              </a>
            </Link>
            <Button
              className="aspect-square group-hover:bg-gray-400 group-hover:border-b-gray-500 group-active:bg-gray-600 navigator_tour_77"
              size="sm"
              variant="secondary"
              onClick={promptDeleteCourse}
            >
              <HiOutlineTrash size={16} color="red" />
            </Button>
          </div>
          <div className="flex flex-col justify-center ">
            <form className="flex flex-col">
              <div className="flex flex-col items-center justify-between w-full mb-12 lg:flex-row">
                <div className="flex flex-col items-center justify-center lg:flex-row">
                  <CourseThumbnail preview={course?.thumbnail?.url} />
                  <p className="mt-4 mb-8 text-2xl font-extrabold lg:text-xl lg:my-0  navigator_tour_12">
                    {course?.title}
                  </p>
                </div>
                <div className="flex flex-col">
                  <Button
                    variant="green"
                    className="w-full navigator_tour_78"
                    disabled={!hasEndCheckpoint}
                    onClick={(): void => setIsPublishOpen(true)}
                  >
                    {isPublished || course?.state === "REVIEW"
                      ? "Unpublish"
                      : "Publish"}{" "}
                    Course
                  </Button>
                  {/* <p className="mt-2 mb-4 text-xs font-bold text-gray-600">
                      All submitted course will be reviewed by a Novalearn admin
                    </p> */}
                  {isPublished || course?.state === "REVIEW" ? (
                    <p className="mt-2 mb-4 text-xs font-bold text-gray-600">
                      Unpublishing your course will make it unreachable for all
                      users
                    </p>
                  ) : (
                    <p className="mt-2 mb-4 text-xs font-bold text-gray-600">
                      All published courses will be instantly viewable by other
                      users
                    </p>
                  )}
                  <Link
                    passHref
                    href={`/navigator/courses/preview/${router.query.id}`}
                  >
                    <a target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="brand1"
                        className="w-full navigator_tour_76"
                      >
                        Preview as student
                      </Button>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="w-full">
                <Divider />
                <Disclosure as="div">
                  {({ open }): any => (
                    <>
                      <Disclosure.Button
                        className="flex flex-row items-center justify-between w-full py-10"
                        as="div"
                      >
                        <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center">
                          <p className="mb-4 text-2xl font-extrabold text-gray-800 lg:text-xl md:mb-0 navigator_tour_13">
                            Course Details
                          </p>
                          <div className="flex flex-row items-center">
                            <Button
                              variant="white"
                              className="mr-8 w-max navigator_tour_14"
                              onClick={(): Promise<boolean> =>
                                router.push(
                                  `/navigator/courses/${router.query.id}`,
                                )
                              }
                            >
                              Edit Details
                            </Button>
                          </div>
                        </div>
                        <motion.div
                          className="text-gray-300"
                          animate={open ? "plusOpen" : "plusClosed"}
                          variants={buttonVariants}
                        >
                          <HiChevronUp className="w-8 h-8" />
                        </motion.div>
                      </Disclosure.Button>
                      <Disclosure.Panel className="pt-2 pb-10 text-sm lg:text-base">
                        <div className="flex flex-col my-6">
                          <p className="mb-2 font-bold text-gray-500">
                            Category
                          </p>
                          <p className="flex flex-row font-extrabold text-gray-800 uppercase">
                            <img
                              src={getCategoryImages(course?.category.name)}
                              alt=""
                              className="mr-4 w-7"
                            />
                            {course?.category.name}
                          </p>
                        </div>
                        <div className="flex flex-col my-6">
                          <p className="mb-2 font-bold text-gray-500">
                            Course Name
                          </p>
                          <p className="flex flex-row font-extrabold text-gray-800">
                            {course?.title}
                          </p>
                        </div>
                        <div className="flex flex-col my-6">
                          <p className="mb-2 font-bold text-gray-500">
                            Description
                          </p>
                          <div className="flex flex-col">
                            {deserialize(course?.description)}
                          </div>
                        </div>
                        <div className="flex flex-col my-6">
                          <p className="mb-2 font-bold text-gray-500">
                            Difficulty
                          </p>
                          <p className="flex flex-row font-extrabold text-gray-800">
                            {course?.level}
                          </p>
                        </div>
                        <div className="flex flex-col my-6">
                          <p className="mb-2 font-bold text-gray-500">
                            Cover Photo
                          </p>
                          <CourseThumbnail preview={course?.thumbnail?.url} />
                        </div>
                        <div className="flex flex-col my-6">
                          <p className="mb-2 font-bold text-gray-500">
                            Background Image throughout the course (Optional -
                            Skip this step to use default background provided)
                          </p>
                          <img
                            src={"/images/dashboard/dashboard-light.png"}
                            alt=""
                            className="object-cover max-w-sm mr-6 aspect-video rounded-xl"
                          />
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Divider />
                {/* <div className="flex max-h-screen pt-4 lg:top-0 lg:sticky">
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
                                {checkpoints.map((checkpoint: any) => (
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
                                        className={clsx(""
                                          // checkpoint.state ===
                                          //   EnrolledState.NotStarted
                                          //   ? "opacity-30"
                                          //   : checkpoint.state ===
                                          //       EnrolledState.Incomplete ||
                                          //     checkpoint.state ===
                                          //       ExtendedEnrolledState.ToStart
                                          //   ? "text-brand1"
                                          //   : "text-green-500",
                                          // "cursor-pointer",
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
                                                  "",
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
                  <Divider/> */}
                {/* This is the drag & drop part */}
                <Disclosure as="div" className="mt-2" defaultOpen>
                  {({ open }): any => (
                    <>
                      <Disclosure.Button className="py-10" as="div">
                        <div className="flex flex-row items-center justify-between w-full">
                          <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center">
                            <p className="mb-4 text-2xl font-extrabold text-gray-800 lg:text-xl md:mb-0 navigator_tour_15">
                              Checkpoints Design
                            </p>
                            <div className="flex flex-row items-center">
                              <Link
                                passHref
                                href={`/navigator/courses/preview/${router.query.id}/coursemap`}
                              >
                                <a target="_blank" rel="noopener noreferrer">
                                  <Button
                                    variant="white"
                                    className="mr-8 w-max navigator_tour_21"
                                  >
                                    Preview Coursemap
                                  </Button>
                                </a>
                              </Link>
                            </div>
                          </div>
                          <motion.div
                            className="text-gray-300"
                            animate={open ? "plusOpen" : "plusClosed"}
                            variants={buttonVariants}
                          >
                            <HiChevronUp className="w-8 h-8" />
                          </motion.div>
                        </div>

                        {course?.published ||
                        course?.state === "REVIEW" ||
                        course?.state === "PUBLISHED" ? (
                          <h5 style={{ color: "red" }}>
                            Unpublish your course to enable editing
                          </h5>
                        ) : null}
                      </Disclosure.Button>
                      <Disclosure.Panel className="pt-2 pb-10 overflow-x-auto text-sm lg:text-base">
                        <DndProvider backend={HTML5Backend}>
                          <div className="flex items-center justify-start w-full h-full px-2 pb-8 overflow-x-auto max-w-screen lg:justify-center lg:px-8">
                            <div className="grid grid-flow-row w-max">
                              {checkpoints.map((c: Checkpoint) => (
                                <div
                                  className="grid max-w-screen-lg grid-flow-col w-max"
                                  key={c.id + "div"}
                                >
                                  <CheckpointSpace
                                    key={c.id}
                                    accept={
                                      c.title
                                        .toUpperCase()
                                        .includes("INTRODUCTION")
                                        ? ItemTypes.INTRODUCTION
                                        : ItemTypes.CHECKPOINT
                                    }
                                    text={c.title}
                                    data={c}
                                    connected={true}
                                    forceVerticalLineAppear={
                                      c.order === 0 ? false : true
                                    }
                                    disableModify={
                                      course?.published ||
                                      course?.state === "REVIEW" ||
                                      course?.state === "PUBLISHED"
                                    }
                                    horizontalConnection={
                                      c?.subCheckpoints?.length ? true : false
                                    }
                                  />
                                  {c.subCheckpoints ? (
                                    <>
                                      {[...c.subCheckpoints]
                                        .sort(sortAscending)
                                        .map((sub: Checkpoint) => (
                                          <CheckpointSpace
                                            key={sub.id}
                                            accept={ItemTypes.SUBCHECKPOINT}
                                            text={sub.title}
                                            data={sub}
                                            subCheckpointsLength={
                                              c._count.subCheckpoints
                                            }
                                            connected={
                                              sub.order + 1 !==
                                              c?.subCheckpoints?.length
                                            }
                                            disableModify={
                                              course?.published ||
                                              course?.state === "REVIEW" ||
                                              course?.state === "PUBLISHED"
                                            }
                                            horizontalConnection={
                                              sub.order + 1 !==
                                              c?.subCheckpoints?.length
                                            }
                                          />
                                        ))}
                                      {c.type !== TopicType.Introduction &&
                                      c.type !== TopicType.End &&
                                      [...c.subCheckpoints].sort(sortAscending)[
                                        checkpoints.length - 1
                                      ]?.type !== TopicType.End &&
                                      !course?.published &&
                                      !(course?.state === "REVIEW") &&
                                      !(course?.state === "PUBLISHED") ? (
                                        <CheckpointSpace
                                          key={"add"}
                                          accept={ItemTypes.ADD}
                                          text="Add New Branch"
                                          connected={false}
                                          onClick={(): void => {
                                            createCheckpoint({
                                              variables: {
                                                data: {
                                                  parentCheckpointId: c.id,
                                                  title:
                                                    "Branch" +
                                                    c.subCheckpoints?.length,
                                                  type: TopicType.Lesson,
                                                },
                                              },
                                              refetchQueries: [
                                                namedOperations.Query.course,
                                              ],
                                            });
                                          }}
                                          disableModify={
                                            course?.published ||
                                            course?.state === "REVIEW" ||
                                            course?.state === "PUBLISHED"
                                          }
                                        />
                                      ) : null}
                                    </>
                                  ) : null}
                                </div>
                              ))}
                              {checkpoints &&
                              checkpoints.length > 0 &&
                              checkpoints[checkpoints.length - 1].type !==
                                TopicType.End &&
                              !course?.published &&
                              !(course?.state === "REVIEW") &&
                              !(course?.state === "PUBLISHED") ? (
                                <CheckpointSpace
                                  accept={ItemTypes.ADD}
                                  text="Add New Checkpoint"
                                  forceVerticalLineAppear={true}
                                  onClick={(): any => {
                                    createCheckpoint({
                                      variables: {
                                        data: {
                                          courseId: router.query.id as string,
                                          title: "Lesson" + checkpoints.length,
                                          type: TopicType.Lesson,
                                        },
                                      },
                                      refetchQueries: [
                                        namedOperations.Query.course,
                                      ],
                                    });
                                  }}
                                  updateTourStep={updateTourStep}
                                  disableModify={
                                    course?.published ||
                                    course?.state === "REVIEW" ||
                                    course?.state === "PUBLISHED"
                                  }
                                />
                              ) : null}
                            </div>
                          </div>
                        </DndProvider>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Divider />
              </div>
            </form>
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
        disableOverlay
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
        isOpen={isPublishOpen}
        onClose={(): void => setIsPublishOpen(false)}
        className=""
      >
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-xl font-extrabold text-red-600 lg:text-2xl">
            Warning!
          </p>
          <p className="my-6 text-base text-center text-gray-600 lg:text-lg">
            Are you sure you want to{" "}
            {course?.state === "PUBLISHED" || course?.state === "REVIEW"
              ? "unpublish"
              : "publish"}{" "}
            this course?
          </p>
          <div className="flex flex-row items-center space-x-8">
            <Button
              variant="brand1"
              onClick={(): void => setIsPublishOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={submitCourse}>
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
      <Dialog
        isOpen={isOpen}
        onClose={(): void => setIsOpen(false)}
        className=""
      >
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-xl font-extrabold text-red-600 lg:text-2xl">
            Warning!
          </p>
          <p className="my-6 text-base text-center text-gray-600 lg:text-lg">
            Are you sure you want to delete this course?
          </p>
          <div className="flex flex-row items-center space-x-8">
            <Button variant="brand1" onClick={(): void => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={deleteCourse}>
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
      <Dialog
        isOpen={isTourOpen}
        onClose={(): void => {
          setIsTourOpen(false);
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
                setIsTourOpen(false);
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
    </LightBackground>
    // </AppLayout>
  );
};

export default withAuthenticated(withApollo(EditOthers));

export const getServerSideProps = extractHostname;
