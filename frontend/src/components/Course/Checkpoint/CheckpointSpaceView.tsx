import React from "react";

import { ExtendedEnrolledState } from "@/types/ExtendedEnrolledState";
import { Checkpoint, EnrolledState } from "schema/generated/graphql";

import CourseCheckpointView from "./CourseCheckpointView";


interface IProp {
  text: string;
  data: Checkpoint;
  parentConnectedState?: EnrolledState;
  childConnectedState: EnrolledState;
  onClick?: any;
  subCheckpointsLength?: number;
  state: EnrolledState | ExtendedEnrolledState;
}

const CheckpointSpaceView = ({
  text,
  data,
  parentConnectedState,
  childConnectedState,
  onClick,
  state,
  subCheckpointsLength,
}: IProp): React.ReactElement => {
  return (
    <div role="none" className="col-span-1 mt-2 w-max" onClick={onClick}>
      <CourseCheckpointView
        {...{
          text,
          data,
          parentConnectedState,
          childConnectedState,
          state,
          subCheckpointsLength,
        }}
      />
    </div>
  );
};

export default CheckpointSpaceView;
