import clsx from "clsx";
import React from "react";

import { ExtendedEnrolledState } from "@/types/ExtendedEnrolledState";
import { EnrolledState } from "schema/generated/graphql";


interface CheckpointProps {
  direction: "vertical" | "horizontal";
  className?: string;
  state?: EnrolledState | ExtendedEnrolledState;
}

const CheckpointConnector = ({
  direction,
  className,
  state,
}: CheckpointProps): React.ReactElement => {
  return (
    <>
      {direction === "vertical" ? (
        <div
          className={clsx(
            "w-2 h-16 lg:h-28 rounded-full self-center justify-self-center",
            className,
            state === EnrolledState.NotStarted
              ? "bg-white bg-opacity-30"
              : state === EnrolledState.Incomplete ||
                state === ExtendedEnrolledState.ToStart
              ? "bg-brand1-500"
              : "bg-green-500",
          )}
        />
      ) : (
        <div
          className={clsx(
            "w-16 lg:w-28 h-2 rounded-full self-center justify-self-center",
            className,
            state === EnrolledState.NotStarted
              ? "bg-white bg-opacity-30"
              : state === EnrolledState.Incomplete ||
                state === ExtendedEnrolledState.ToStart
              ? "bg-brand1-500"
              : "bg-green-500",
          )}
        />
      )}
    </>
  );
};

export default CheckpointConnector;
