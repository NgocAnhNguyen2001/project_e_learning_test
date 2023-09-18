import React from "react";
import { useDrop } from "react-dnd";
import { toast } from "react-toastify";

import { Feedback } from "@/components/Feedback";
import {
  Checkpoint,
  namedOperations,
  useUpdateCheckpointMutation,
} from "schema/generated/graphql";

import CourseCheckpoint from "./CourseCheckpoint";


interface IProp {
  accept: string;
  text: string;
  data?: Checkpoint;
  connected?: boolean;
  onClick?: any;
  subCheckpointsLength?: number;
  forceVerticalLineAppear?: boolean;
  disableModify?: boolean;
  horizontalConnection?: boolean;
  updateTourStep?: any;
}

const CheckpointSpace = ({
  accept,
  text,
  data,
  connected,
  onClick,
  subCheckpointsLength,
  forceVerticalLineAppear,
  disableModify = false,
  horizontalConnection = true,
  updateTourStep,
}: IProp): React.ReactElement => {
  const [updateCheckpoint] = useUpdateCheckpointMutation();

  const [, drop] = useDrop(
    () => ({
      accept: accept,
      drop: async (item: Checkpoint): Promise<void> => {
        try {
          const temp = {
            order: item.order,
            parentCheckpointId: item.parentCheckpointId,
          };

          if (data) {
            await updateCheckpoint({
              variables: {
                data: {
                  order: data.order,
                  parentCheckpointId: data.parentCheckpointId,
                },
                id: item.id,
              },
              refetchQueries: [namedOperations.Query.course],
            });

            await updateCheckpoint({
              variables: {
                data: {
                  order: temp.order,
                  parentCheckpointId: temp.parentCheckpointId,
                },
                id: data.id,
              },
              refetchQueries: [namedOperations.Query.course],
            });
          }
        } catch (err) {
          console.log(err);
          toast(
            <Feedback
              title="There's an error!"
              subtitle="Failed to update checkpoints"
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
      },
    }),
    [data],
  );

  return (
    <div
      ref={drop}
      role="none"
      className="col-span-1 mt-2 w-max"
      onClick={onClick}
    >
      <CourseCheckpoint
        text={text}
        data={data}
        connected={connected}
        subCheckpointsLength={subCheckpointsLength}
        forceVerticalLineAppear={forceVerticalLineAppear}
        disableModify={disableModify}
        horizontalConnection={horizontalConnection || !disableModify}
        updateTourStep={updateTourStep}
      />
    </div>
  );
};

export default CheckpointSpace;
