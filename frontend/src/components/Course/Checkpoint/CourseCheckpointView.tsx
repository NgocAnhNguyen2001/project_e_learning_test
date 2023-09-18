import { Popover } from "@headlessui/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import { usePopper } from "react-popper";
import { toast } from "react-toastify";

import { formatIcon } from "@/components/Checkpoint/FormatIcon";
import { Button } from "@/components/Elements";
import { Card } from "@/components/Elements/Card";
import { Feedback } from "@/components/Feedback";
import { ExtendedEnrolledState } from "@/types/ExtendedEnrolledState";
import { deserialize } from "@/utils/slate";
import {
  Checkpoint,
  EnrolledState,
  namedOperations,
  TopicType,
  useStartCheckpointMutation,
} from "schema/generated/graphql";
import { useStore } from "utils/hooks/zustand";

import CheckpointConnectorState from "./CheckpointConnectorState";
import CheckpointThumbnail from "./CheckpointThumbnail";

interface CheckpointProps {
  text: string;
  data: Checkpoint;
  parentConnectedState?: EnrolledState;
  childConnectedState: EnrolledState;
  subCheckpointsLength?: number;
  state: EnrolledState | ExtendedEnrolledState;
}

const preAssesmentCourseId = [
  // "8e58fbaf-8ef2-4998-b020-d3538ad9be41",
  "797732f2-93ea-4b1a-a290-44a6969e1380", //preassess 2
  // "0100e569-e0d1-4105-a0a7-30e46096499f",
  "4b873a62-0076-4644-a6df-6e2784a0a54c", //preassess 1
  "0f70cfeb-c031-4ca6-8555-7f16a2515d5e", // staging
  // "b4b2b560-75a2-481c-b124-1962ab8fabf5", //dev
];

const CourseCheckpointView = ({
  text,
  data,
  subCheckpointsLength,
  parentConnectedState,
  childConnectedState,
  state,
}: CheckpointProps): React.ReactElement => {
  const user = useStore((state) => state.user);
  const scrollRef = useStore((state) => state.scroll);
  const [referenceElement, setReferenceElement] = React.useState<any>();
  const [popperElement, setPopperElement] = React.useState<any>();
  const [startCheckpoint] = useStartCheckpointMutation();
  const router = useRouter();

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: data.parentCheckpointId === null ? "left" : "bottom-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  const beginCheckpoint = async (): Promise<void> => {
    try {
      if (
        (data as any).state !== EnrolledState.Complete &&
        !(
          preAssesmentCourseId.includes(router.query.id as string) &&
          data.type == TopicType.Introduction
        )
      ) {
        await startCheckpoint({
          variables: {
            id: data.id,
            enrolledCourseId:
              data.parentCheckPoint === null
                ? (data.courseId as string)
                : (data.parentCheckPoint?.courseId as string),
          },
          refetchQueries: [namedOperations.Query.checkpoint],
        });
      }
      if (user?.role === "STUDENT") {
        router.push(`/student/checkpoint/${data.id}`);
      } else if (user?.role === "TEACHER") {
        router.push(`/navigator/checkpoint/${data.id}`);
      } else {
        router.push(`/adult/checkpoint/${data.id}`);
      }
    } catch {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Failed to start checkpoint"
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

  React.useEffect(() => {
    if (data.id === scrollRef) {
      setTimeout(() => {
        referenceElement?.click?.();
      }, 850);
    }
  }, [referenceElement, scrollRef, data]);

  return (
    <>
      <div className="grid grid-cols-2 gap-y-2 grid-rows-10">
        {data.parentCheckPoint === null && data.order !== 0 ? (
          <CheckpointConnectorState
            direction="vertical"
            className="col-span-1 row-span-4"
            state={parentConnectedState}
          />
        ) : (
          <span
            className={`${
              data.order === 0 && data.parentCheckPoint === null
                ? ""
                : "h-16 lg:h-28"
            }  col-span-1 row-span-4`}
          />
        )}
        <div
          className={clsx(
            "tour_8 flex flex-col items-center justify-center col-span-1 row-span-4 col-start-1 justify-self-center",
          )}
          data-tut="reactour__8"
        >
          <Popover>
            {({ open }): React.ReactElement => (
              <>
                <Popover.Button
                  ref={setReferenceElement}
                  className="outline-none"
                  disabled={
                    (data as any).state === EnrolledState.NotStarted ||
                    (preAssesmentCourseId.includes(router.query.id as string) &&
                      (data as any).state === EnrolledState.Complete)
                  }
                >
                  <div
                    className={clsx(
                      "w-16 lg:w-24 h-16 lg:h-24 rounded-full border-8 lg:border-10 p-2 flex items-center justify-center opacity-100",
                      state === EnrolledState.NotStarted
                        ? "border-white opacity-30"
                        : state === EnrolledState.Incomplete ||
                          state === ExtendedEnrolledState.ToStart
                        ? "border-brand1-500"
                        : "border-green-500",
                    )}
                  >
                    <div
                      className={clsx(
                        "w-full h-full bg-brand1-500 rounded-full flex items-center justify-center",
                        state === EnrolledState.NotStarted
                          ? "bg-white bg-opacity-30"
                          : state === EnrolledState.Incomplete ||
                            state === ExtendedEnrolledState.ToStart
                          ? "bg-brand1-500"
                          : "bg-green-500",
                      )}
                    >
                      {formatIcon(data.type)}
                    </div>
                  </div>
                </Popover.Button>
                {open && (
                  <>
                    <Popover.Panel
                      static
                      ref={setPopperElement}
                      style={styles.popper}
                      {...attributes.popper}
                      className={`${open ? "z-20" : "z-[-1]"}`}
                    >
                      <div className="w-[256px]">
                        <motion.div
                          className="bg-dark-overlay rounded-3xl"
                          variants={{
                            contentClosed: {
                              visibility: "visible",
                              opacity: 0,
                              translateY: "-40px",
                              transitionEnd: {
                                visibility: "hidden",
                              },
                            },
                            contentOpen: {
                              visibility: "visible",
                              opacity: 1,
                              translateY: "0px",
                            },
                          }}
                          initial="contentClosed"
                          transition={{
                            type: "tween",
                          }}
                          animate={
                            open === true ? "contentOpen" : "contentClosed"
                          }
                        >
                          <Card className="z-30 flex flex-col items-start p-4 font-extrabold uppercase w-[256px] justify-evenly rounded-xl bg-dark-overlay">
                            <CheckpointThumbnail preview={data.image?.url} />
                            <h1 className="mt-4 font-extrabold text-white capitalize text-md lg:text-lg">
                              {data.title}
                            </h1>
                            <p className="flex flex-col text-sm font-normal leading-relaxed text-white normal-case lg:text-md">
                              {data.description &&
                                deserialize(data.description)}
                            </p>
                            {/* <div className="flex flex-row w-full my-1">
                        <img
                          src="/images/common/xp.svg"
                          alt=""
                          className="w-6 mr-2"
                        />
                        <p className="font-extrabold text-md lg:text-lg text-brand1">
                          + 8,888,888
                        </p>
                      </div>
                      <div className="flex flex-row w-full my-1">
                        <img
                          src="/images/common/coin.svg"
                          alt=""
                          className="w-6 mr-2"
                        />
                        <p className="font-extrabold text-yellow-500 text-md lg:text-lg">
                          + 88,888,888
                        </p>
                      </div> */}
                            {(data as any).state ===
                            EnrolledState.Incomplete ? (
                              <Button
                                variant="brand1"
                                className="w-full mt-4"
                                onClick={(): any => {
                                  if (user?.role === "STUDENT") {
                                    router.push(
                                      `/student/checkpoint/${data.id}`,
                                    );
                                  } else if (user?.role === "TEACHER") {
                                    router.push(
                                      `/navigator/checkpoint/${data.id}`,
                                    );
                                  } else {
                                    router.push(`/adult/checkpoint/${data.id}`);
                                  }
                                }}
                              >
                                Continue
                              </Button>
                            ) : (
                              <Button
                                variant="brand1"
                                className="w-full mt-4"
                                onClick={beginCheckpoint}
                              >
                                Start
                              </Button>
                            )}
                          </Card>
                        </motion.div>
                      </div>
                    </Popover.Panel>
                  </>
                )}
              </>
            )}
          </Popover>
        </div>
        {(data.subCheckpoints && data.subCheckpoints.length > 0) ||
        (data.parentCheckPoint !== null &&
          subCheckpointsLength !== data.order + 1) ? (
          <CheckpointConnectorState
            direction="horizontal"
            className="self-center col-span-1 col-start-2 row-span-2 row-start-6 justify-self-center"
            state={childConnectedState}
          />
        ) : null}
        <p
          className={clsx(
            "text-sm lg:text-base font-extrabold text-gray-100 uppercase text-center col-span-1 col-start-1 row-span-2 w-20 lg:w-32 h-max text-wrap text-ellipsis",
            state === EnrolledState.NotStarted ? "opacity-30" : "opacity-100",
          )}
        >
          {text}
        </p>
      </div>
    </>
  );
};

export default CourseCheckpointView;
