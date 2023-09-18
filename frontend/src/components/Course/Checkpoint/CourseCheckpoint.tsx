import { Disclosure } from "@headlessui/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import { useDrag } from "react-dnd";
import {
  HiOutlineDotsHorizontal,
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiPlus,
} from "react-icons/hi";
import { usePopper } from "react-popper";
import { toast } from "react-toastify";



import { formatIcon } from "@/components/Checkpoint/FormatIcon";
import { Feedback } from "@/components/Feedback";
import { ItemTypes } from "@/types/ItemTypes";
import {
  Checkpoint,
  namedOperations,
  TopicType,
  useRemoveCheckpointMutation,
} from "schema/generated/graphql";

import CheckpointConnector from "./CheckpointConnector";

interface CheckpointProps {
  text: string;
  data?: Checkpoint;
  connected?: boolean;
  subCheckpointsLength?: number;
  forceVerticalLineAppear?: boolean;
  disableModify?: boolean;
  horizontalConnection?: boolean;
  updateTourStep?: any;
}

const CourseCheckpoint = ({
  text,
  connected,
  data,
  subCheckpointsLength,
  forceVerticalLineAppear,
  disableModify = false,
  horizontalConnection = false,
  updateTourStep,
}: CheckpointProps): React.ReactElement => {
  const [referenceElement, setReferenceElement] = React.useState<any>();
  const [popperElement, setPopperElement] = React.useState<any>();
  const [clicks, setClicks] = React.useState<number>(0);
  const [removeCheckpoint] = useRemoveCheckpointMutation();
  const router = useRouter();

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: data?.parentCheckpointId === null ? "left" : "bottom-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  const [{ isDragging }, dragRef, preview] = useDrag(
    () => ({
      type: data?.parentCheckpointId
        ? ItemTypes.SUBCHECKPOINT
        : ItemTypes.CHECKPOINT,
      item: { ...data },
      collect: (monitor): any => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [data],
  );

  const deleteCheckpoint = async (): Promise<void> => {
    try {
      if (data) {
        await removeCheckpoint({
          variables: {
            id: data.id,
          },
          refetchQueries: [namedOperations.Query.course],
        });
        toast(
          <Feedback
            title="Success!"
            subtitle="Checkpoint removed"
            type="success"
            disableFeedback={true}
          />,
          {
            progress: undefined,
            toastId: 1,
            autoClose: 3000,
          },
        );
      }
    } catch {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Failed to delete checkpoint"
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

  return (
    <>
      {!data ? (
        /* eslint-disable-next-line */
        <div
          onClick={(): void => {
            setClicks(clicks + 1);
            clicks >= 1 && updateTourStep(5);
          }}
          className="grid grid-cols-1 gap-y-2 grid-rows-10 h-full items-end"
        >
          {text.toUpperCase().includes("CHECKPOINT") ? null : (
            <span className="col-span-1 row-span-4 h-16 lg:h-28" />
          )}
          {forceVerticalLineAppear && (
            <CheckpointConnector
              direction="vertical"
              className="col-span-1 row-span-4"
              connected={false}
            />
          )}
          <div className="flex flex-col items-center justify-center cursor-pointer col-span-1 row-span-4 col-start-1 row-start-5 justify-self-center">
            <div
              className={clsx(
                "w-16 lg:w-24 h-16 lg:h-24 rounded-full border-8 lg:border-10 p-2 border-gray-300 flex items-center justify-center opacity-100 navigator_tour_16 navigator_tour_20",
              )}
            >
              <HiPlus size={64} color="#E5E5E5" />
            </div>
          </div>
          <p className="text-sm lg:text-base font-extrabold text-gray-300 uppercase text-center col-span-1 col-start-1 row-span-2 row-start-9 w-20 lg:w-32 h-max line-clamp-2 text-wrap text-ellipsis">
            {text}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-y-2 grid-rows-10">
          {(
            forceVerticalLineAppear === undefined
              ? data.parentCheckPoint === null && data.type !== TopicType.End
              : forceVerticalLineAppear
          ) ? (
            <CheckpointConnector
              direction="vertical"
              className="col-span-1 row-span-4"
              connected={connected}
            />
          ) : (
            <span className="col-span-1 row-span-4 h-16 lg:h-28" />
          )}
          <div
            className={clsx(
              "flex flex-col items-center justify-center col-span-1 row-span-4 col-start-1 justify-self-center cursor-pointer",
            )}
          >
            <Disclosure>
              <Disclosure.Button
                ref={setReferenceElement}
                className={clsx(
                  "outline-none",
                  data.order == 1 && "tour_button",
                  data.order == 0 && "tour_button_2",
                  data.order == 2 && "tour_button_3",
                )}
              >
                <div
                  className={clsx(
                    "w-16 lg:w-24 h-16 lg:h-24 rounded-full border-8 lg:border-10 p-2 border-brand1-500 flex items-center justify-center",
                    isDragging ? "opacity-50" : "opacity-100",
                    data.order == 1 && "navigator_tour_17",
                    data.order == 0 && "navigator_tour_22 navigator_tour_23",
                    data.order == 2 && "navigator_tour_71",
                  )}
                  ref={preview}
                >
                  <div className="w-full h-full bg-brand1-500 rounded-full flex items-center justify-center">
                    {formatIcon(data.type)}
                  </div>
                </div>
              </Disclosure.Button>
              <Disclosure.Panel
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
              >
                {({ close }): any => {
                  if (!disableModify)
                    return (
                      <motion.div
                        className="flex flex-col justify-evenly font-extrabold uppercase items-start bg-white rounded-xl p-4 shadow-lg"
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
                          duration: 0.2,
                        }}
                        animate={"contentOpen"}
                      >
                        <div
                          className={clsx(
                            "flex flex-row text-orange-400 cursor-pointer my-2 items-center",
                            data.order == 0 && "navigator_tour_24",
                            data.order == 1 && "navigator_tour_42",
                            data.order == 2 && "navigator_tour_72",
                          )}
                          onClick={(): void => {
                            router.push(`/navigator/checkpoints/${data.id}`);
                          }}
                          role="none"
                        >
                          <HiOutlinePencilAlt
                            size={24}
                            className="mr-2 w-6 lg:w-8"
                          />
                          Edit
                        </div>
                        {data.type !== TopicType.Introduction ? (
                          <>
                            <div
                              className="flex flex-row max-w-3xs text-gray-500 cursor-pointer my-2 items-center navigator_tour_18"
                              ref={dragRef}
                              onDragEnd={(): void => close()}
                            >
                              <HiOutlineDotsHorizontal
                                size={24}
                                className="mr-2 w-6 lg:w-8"
                              />
                              Click this and drag to move
                            </div>
                            <div
                              role="none"
                              className="flex flex-row text-red-500 cursor-pointer my-2 items-center navigator_tour_19"
                              onClick={deleteCheckpoint}
                            >
                              <HiOutlineTrash
                                size={24}
                                className="mr-2 w-6 lg:w-8"
                              />
                              Delete
                            </div>
                          </>
                        ) : null}
                      </motion.div>
                    );
                  return null;
                }}
              </Disclosure.Panel>
            </Disclosure>
          </div>
          {data.type === TopicType.Introduction ||
          data.type === TopicType.End ||
          !horizontalConnection ? null : (
            <CheckpointConnector
              direction="horizontal"
              className="col-span-1 col-start-2 row-start-6 row-span-2 self-center justify-self-center"
              connected={
                data.subCheckpoints
                  ? data.subCheckpoints.length > 0 ||
                    (data.parentCheckPoint !== null &&
                      subCheckpointsLength !== data.order + 1)
                  : false
              }
            />
          )}
          <p className="text-sm lg:text-base font-extrabold text-gray-700 uppercase text-center col-span-1 col-start-1 row-span-2 w-20 lg:w-32 h-max line-clamp-2 text-wrap text-ellipsis">
            {text}
          </p>
        </div>
      )}
    </>
  );
};

export default CourseCheckpoint;
